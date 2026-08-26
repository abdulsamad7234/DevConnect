# DevConnect

A simple web application to generate a developer portfolio using GitHub username.

This project is made using HTML, CSS and JavaScript. When you enter a GitHub username, it fetches the user's profile, repositories and languages from GitHub API and shows them on the page.

## Objective

To build a responsive website that displays GitHub profile details, projects and skills by calling the GitHub REST API.

## Features

- Search any GitHub user and load their profile
- Shows avatar, bio, followers, repos etc.
- Displays public repositories (stars, forks, language)
- Skills section based on languages used in repos
- Social links like GitHub, website, twitter and email (if available)
- Dark mode and light mode (saves preference in localStorage)
- Responsive layout for mobile and desktop
- Loading state while data is being fetched

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6 modules)
- GitHub REST API

## How to run

1. Clone the repo or download the files
```
git clone https://github.com/yourusername/devconnect.git
cd devconnect
```

2. Open `index.html` in the browser.

You can also use a local server:
```
npx serve .
```

3. Type a GitHub username (example: octocat) and click Load Profile.

## Folder structure

```
devconnect/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── github-api.js
│   ├── ui.js
│   ├── theme.js
│   └── navigation.js
└── README.md
```

- `index.html` - main page
- `css/styles.css` - all styles
- `js/github-api.js` - API calls
- `js/ui.js` - rendering profile, projects, skills
- `js/theme.js` - dark/light mode
- `js/navigation.js` - navbar and scroll
- `js/main.js` - starting point of the app

## GitHub API

Two endpoints are used:

1. `GET https://api.github.com/users/{username}` - user profile
2. `GET https://api.github.com/users/{username}/repos` - public repos

**Note:** Without authentication GitHub allows only 60 requests per hour per IP. If you get rate limit error, wait for some time and try again.

## Limitations

- Only public GitHub data is shown
- Forked repos are not displayed
- Email is shown only if the user has made it public
- No backend / database, everything runs in the browser

## Future scope

- Add more filters for repositories
- Show contribution graph
- Option to download portfolio as PDF
- Use GitHub token to increase API limit

## References

- [GitHub REST API documentation](https://docs.github.com/en/rest)
