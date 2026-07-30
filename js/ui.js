/**
 * UI rendering utilities
 */

const ICONS = {
  github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
  link: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  twitter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  location: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  fork: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M6 9v1a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9"/><path d="M12 12v3"/></svg>',
  repo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
};

export function formatNumber(num) {
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(num);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast--out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 4000);
}

export function setLoading(isLoading) {
  const btn = document.getElementById('searchBtn');
  const btnText = btn?.querySelector('.btn__text');
  const btnLoader = btn?.querySelector('.btn__loader');

  if (!btn) return;
  btn.disabled = isLoading;
  btnText.hidden = isLoading;
  btnLoader.hidden = !isLoading;
}

export function renderProfile(user) {
  const section = document.getElementById('about');
  const card = document.getElementById('profileCard');
  if (!section || !card) return;

  section.hidden = false;

  card.innerHTML = `
    <div class="profile__header">
      <img
        class="profile__avatar"
        src="${escapeHTML(user.avatar_url)}"
        alt="${escapeHTML(user.name || user.login)}'s avatar"
        width="120"
        height="120"
        loading="lazy"
      >
      <div class="profile__info">
        <h2 class="profile__name">${escapeHTML(user.name || user.login)}</h2>
        <p class="profile__username">@${escapeHTML(user.login)}</p>
        ${user.bio ? `<p class="profile__bio">${escapeHTML(user.bio)}</p>` : ''}
      </div>
    </div>
    <div class="profile__stats">
      <div class="stat">
        <span class="stat__value">${formatNumber(user.public_repos)}</span>
        <span class="stat__label">Repositories</span>
      </div>
      <div class="stat">
        <span class="stat__value">${formatNumber(user.followers)}</span>
        <span class="stat__label">Followers</span>
      </div>
      <div class="stat">
        <span class="stat__value">${formatNumber(user.following)}</span>
        <span class="stat__label">Following</span>
      </div>
      <div class="stat">
        <span class="stat__value">${formatNumber(user.public_gists)}</span>
        <span class="stat__label">Gists</span>
      </div>
    </div>
    <div class="profile__meta">
      ${user.company ? `<span class="profile__meta-item">🏢 ${escapeHTML(user.company)}</span>` : ''}
      ${user.location ? `<span class="profile__meta-item">📍 ${escapeHTML(user.location)}</span>` : ''}
      ${user.created_at ? `<span class="profile__meta-item">📅 Joined ${formatDate(user.created_at)}</span>` : ''}
    </div>
  `;
}

export function renderProjects(repos) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  if (!repos.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">📭</div>
        <h3>No public repositories</h3>
        <p>This user doesn't have any public non-forked repositories.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = repos
    .map(
      (repo, i) => `
    <article class="project-card" style="animation-delay: ${i * 0.05}s">
      <div class="project-card__header">
        <h3 class="project-card__title">
          <a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noopener noreferrer">
            ${escapeHTML(repo.name)}
          </a>
        </h3>
        <span class="project-card__fork" title="Repository">${ICONS.repo}</span>
      </div>
      <p class="project-card__desc">${escapeHTML(repo.description || 'No description provided.')}</p>
      <div class="project-card__footer">
        ${
          repo.language
            ? `<span class="project-card__lang">
            <span class="lang-dot" style="background: var(--color-primary)"></span>
            ${escapeHTML(repo.language)}
          </span>`
            : '<span></span>'
        }
        <div class="project-card__stats">
          <span>${ICONS.star} ${formatNumber(repo.stargazers_count)}</span>
          <span>${ICONS.fork} ${formatNumber(repo.forks_count)}</span>
        </div>
      </div>
    </article>
  `
    )
    .join('');
}

export function renderSkills(languages) {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  if (!languages.length) {
    grid.innerHTML = `
      <div class="empty-state empty-state--compact">
        <p>No languages detected from repositories.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = languages
    .map(
      (lang, i) => `
    <span class="skill-tag" style="animation-delay: ${i * 0.04}s">
      <span class="lang-dot" style="background: ${lang.color}"></span>
      ${escapeHTML(lang.name)}
      <span class="skill-tag__count">${lang.count}</span>
    </span>
  `
    )
    .join('');
}

export function renderSocialLinks(links) {
  const container = document.getElementById('contactLinks');
  if (!container) return;

  const actionable = links.filter((l) => !l.static);

  if (!actionable.length) {
    container.innerHTML = `
      <div class="empty-state empty-state--compact">
        <p>No social links available for this profile.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = actionable
    .map(
      (link, i) => `
    <a
      href="${escapeHTML(link.url)}"
      class="social-link"
      ${link.static ? '' : 'target="_blank" rel="noopener noreferrer"'}
      style="animation-delay: ${i * 0.05}s"
    >
      ${ICONS[link.icon] || ICONS.link}
      ${escapeHTML(link.label)}
    </a>
  `
    )
    .join('');
}

export function renderSkeletons() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    projectsGrid.innerHTML = Array.from({ length: 6 }, () =>
      '<div class="skeleton skeleton-card"></div>'
    ).join('');
  }
}

export function resetEmptyStates() {
  const projectsGrid = document.getElementById('projectsGrid');
  const skillsGrid = document.getElementById('skillsGrid');
  const contactLinks = document.getElementById('contactLinks');

  if (projectsGrid) {
    projectsGrid.innerHTML = `
      <div class="empty-state" id="projectsEmpty">
        <div class="empty-state__icon">📦</div>
        <h3>No projects loaded yet</h3>
        <p>Enter a GitHub username above to see their repositories here.</p>
      </div>
    `;
  }

  if (skillsGrid) {
    skillsGrid.innerHTML = `
      <div class="empty-state empty-state--compact" id="skillsEmpty">
        <p>Skills will appear after loading a profile.</p>
      </div>
    `;
  }

  if (contactLinks) {
    contactLinks.innerHTML = `
      <div class="empty-state empty-state--compact" id="contactEmpty">
        <p>Social links will appear after loading a profile.</p>
      </div>
    `;
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection) aboutSection.hidden = true;
}
