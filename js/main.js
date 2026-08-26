// main.js - starting point
// loads theme, navbar and search form, then fetches github data

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

    // scroll to about section after load
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // save last username so it loads again on refresh
    localStorage.setItem('devconnect-last-user', user.login);
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      showToast(error.message, 'error');
    } else if (error instanceof TypeError) {
      showToast('Network error. Check your internet connection.', 'error');
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

  // clickable usernames under the search box
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

  // load last searched user, otherwise octocat
  const lastUser = localStorage.getItem('devconnect-last-user') || DEFAULT_USERNAME;
  const input = document.getElementById('usernameInput');
  if (input) input.value = lastUser;

  requestAnimationFrame(() => loadDeveloperProfile(lastUser));
}

document.addEventListener('DOMContentLoaded', initApp);
