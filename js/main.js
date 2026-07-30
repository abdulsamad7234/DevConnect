/**
 * DevConnect – Main Application Entry Point
 * Orchestrates GitHub API calls, UI rendering, and app initialization
 */

import {
  fetchUserProfile,
  fetchUserRepos,
  extractLanguages,
  buildSocialLinks,
  GitHubAPIError,
} from './github-api.js';

import {
  renderProfile,
  renderProjects,
  renderSkills,
  renderSocialLinks,
  renderSkeletons,
  showToast,
  setLoading,
} from './ui.js';

import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';

const DEFAULT_USERNAME = 'octocat';

async function loadDeveloperProfile(username) {
  setLoading(true);
  renderSkeletons();

  try {
    const [user, repos] = await Promise.all([
      fetchUserProfile(username),
      fetchUserRepos(username, 9),
    ]);

    renderProfile(user);
    renderProjects(repos);
    renderSkills(extractLanguages(repos));
    renderSocialLinks(buildSocialLinks(user));

    showToast(`Loaded profile for @${user.login}`, 'success');

    // Smooth scroll to profile section
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Persist last searched username
    localStorage.setItem('devconnect-last-user', user.login);
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      showToast(error.message, 'error');
    } else if (error instanceof TypeError) {
      showToast('Network error. Please check your connection and try again.', 'error');
    } else {
      showToast('Something went wrong. Please try again.', 'error');
    }
    console.error('DevConnect error:', error);
  } finally {
    setLoading(false);
  }
}

function initSearchForm() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('usernameInput');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = input?.value.trim();
    if (username) loadDeveloperProfile(username);
  });

  // Quick-fill demo usernames
  document.querySelectorAll('[data-username]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const username = btn.getAttribute('data-username');
      if (input && username) {
        input.value = username;
        loadDeveloperProfile(username);
      }
    });
  });
}

function initApp() {
  initTheme();
  initNavigation();
  initSearchForm();

  // Auto-load demo profile or last searched user
  const lastUser = localStorage.getItem('devconnect-last-user') || DEFAULT_USERNAME;
  const input = document.getElementById('usernameInput');
  if (input) input.value = lastUser;

  // Delay initial load slightly for smoother first paint
  requestAnimationFrame(() => loadDeveloperProfile(lastUser));
}

document.addEventListener('DOMContentLoaded', initApp);
