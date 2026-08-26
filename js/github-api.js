// github-api.js
// functions to call github api and process the response

const GITHUB_API_BASE = 'https://api.github.com';

class GitHubAPIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'GitHubAPIError';
    this.status = status;
  }
}

async function fetchJSON(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    const messages = {
      404: 'User not found. Check the username and try again.',
      403: 'API limit reached. Wait some time and try again.',
      422: 'Invalid username.',
    };
    throw new GitHubAPIError(
      messages[response.status] || `GitHub API error (${response.status})`,
      response.status
    );
  }

  return response.json();
}

// get user profile
export async function fetchUserProfile(username) {
  const trimmed = username.trim().toLowerCase();
  if (!trimmed || !/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(trimmed)) {
    throw new GitHubAPIError('Enter a valid GitHub username.', 422);
  }

  return fetchJSON(`${GITHUB_API_BASE}/users/${encodeURIComponent(trimmed)}`);
}

// get public repos (latest updated first)
export async function fetchUserRepos(username, limit = 9) {
  const trimmed = username.trim().toLowerCase();
  const repos = await fetchJSON(
    `${GITHUB_API_BASE}/users/${encodeURIComponent(trimmed)}/repos?sort=updated&direction=desc&per_page=${limit}`
  );

  return repos.filter((repo) => !repo.fork);
}

// count languages from repo list for skills section
export function extractLanguages(repos) {
  const langColors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    'C++': '#f34b7d',
    C: '#555555',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    PHP: '#4F5D95',
    Shell: '#89e051',
    Vue: '#41b883',
    Dart: '#00B4AB',
  };

  const counts = {};
  repos.forEach((repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  });

  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      color: langColors[name] || '#6366f1',
    }))
    .sort((a, b) => b.count - a.count);
}

// make contact links from profile fields
export function buildSocialLinks(user) {
  const links = [];

  if (user.html_url) {
    links.push({ label: 'GitHub', url: user.html_url, icon: 'github' });
  }
  if (user.blog) {
    const url = user.blog.startsWith('http') ? user.blog : `https://${user.blog}`;
    links.push({ label: 'Website', url, icon: 'link' });
  }
  if (user.twitter_username) {
    links.push({
      label: 'Twitter',
      url: `https://twitter.com/${user.twitter_username}`,
      icon: 'twitter',
    });
  }
  if (user.email) {
    links.push({ label: 'Email', url: `mailto:${user.email}`, icon: 'mail' });
  }
  if (user.location) {
    links.push({ label: user.location, url: user.html_url, icon: 'location', static: true });
  }

  return links;
}

export { GitHubAPIError };
