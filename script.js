// ==================== 配置区域 ====================
// 👇 你的 GitHub 用户名
const GITHUB_USERNAME = 'St3pXX';

// 👇 你的邮箱
const YOUR_EMAIL = 'stepoct09@163.com';

// 👇 你的名字
const YOUR_NAME = '田育玮';

// 👇 你的职位
const YOUR_TITLE = '寻找 Java 后端 / Agent 开发实习';

// 👇 你的个人简介
const YOUR_BIO = '热爱 Java 后端开发与 AI Agent 技术探索，可实习 4-6 个月';

// =================================================

// 更新页面内容
function updatePersonalInfo() {
  document.title = `${YOUR_NAME} | 开发者`;
  document.querySelector('meta[name="description"]').content = `${YOUR_TITLE} · 开源贡献者`;

  // Footer - 只需要更新这些
  document.querySelector('.footer-logo').textContent = YOUR_NAME;
  document.querySelector('.footer-tagline').textContent = YOUR_TITLE;
  document.querySelector('.footer-copyright').innerHTML = `&copy; 2026 ${YOUR_NAME}. All rights reserved.`;

  // Contact
  document.querySelector('.contact-card[href^="mailto"]').href = `mailto:${YOUR_EMAIL}`;
  document.querySelector('.contact-card[href^="mailto"] .contact-info').textContent = YOUR_EMAIL;

  const githubContact = document.querySelector('.contact-card[href*="github"]');
  if (githubContact) {
    githubContact.href = `https://github.com/${GITHUB_USERNAME}`;
    githubContact.querySelector('.contact-info').textContent = `github.com/${GITHUB_USERNAME}`;
  }

  // Links
  document.getElementById('github-profile-link').href = `https://github.com/${GITHUB_USERNAME}`;
  document.getElementById('github-username').href = `https://github.com/${GITHUB_USERNAME}`;
  document.getElementById('github-username').textContent = `@${GITHUB_USERNAME}`;
}

// 获取 GitHub 用户信息
async function fetchGitHubUser() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!response.ok) throw new Error('User not found');

    const data = await response.json();

    // 更新头像和名字
    document.getElementById('github-avatar').src = data.avatar_url;
    document.getElementById('github-name').textContent = data.name || GITHUB_USERNAME;
    document.getElementById('github-followers').textContent = data.followers || 0;

    // 更新 Hero 标题
    if (data.name) {
      document.querySelector('.hero-title').textContent = `我是${data.name}`;
    }
  } catch (error) {
    console.log('Could not fetch GitHub user data:', error);
  }
}

// 获取 GitHub Stars 总数
async function fetchTotalStars() {
  try {
    // 获取用户所有仓库的 Stars
    let page = 1;
    let totalStars = 0;
    let repos;

    do {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&page=${page}`
      );
      if (!response.ok) break;
      repos = await response.json();

      for (const repo of repos) {
        totalStars += repo.stargazers_count;
      }

      page++;
    } while (repos.length === 100);

    document.getElementById('stat-stars').textContent = totalStars;
  } catch (error) {
    console.log('Could not fetch stars:', error);
    document.getElementById('stat-stars').textContent = '0';
  }
}

// 获取仓库列表
async function fetchRepos() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stargazers&per_page=6&type=public`
    );

    if (!response.ok) throw new Error('Repos not found');

    const repos = await response.json();
    const projectsGrid = document.getElementById('projects-grid');

    // 清空加载提示
    projectsGrid.innerHTML = '';

    // 渲染项目卡片
    repos.forEach(repo => {
      if (repo.description) {
        const card = document.createElement('a');
        card.href = repo.html_url;
        card.target = '_blank';
        card.className = 'project-card';

        // 获取语言
        const langEmoji = getLanguageEmoji(repo.language);

        card.innerHTML = `
          <div class="project-header">
            <div class="project-emoji">${langEmoji}</div>
            <div class="project-stars">⭐ ${repo.stargazers_count}</div>
          </div>
          <h3 class="project-title">${repo.name}</h3>
          <p class="project-description">${repo.description || '暂无描述'}</p>
          <div class="project-footer">
            <span class="project-lang">${repo.language || 'Unknown'}</span>
            <span class="project-link-text">View →</span>
          </div>
        `;

        projectsGrid.appendChild(card);
      }
    });

    // 如果没有公开项目
    if (projectsGrid.children.length === 0) {
      projectsGrid.innerHTML = `
        <div style="text-align: center; padding: 60px; color: var(--apple-text-secondary); grid-column: span 2;">
          <p>暂无公开项目</p>
        </div>
      `;
    }

  } catch (error) {
    console.log('Could not fetch repos:', error);
    document.getElementById('projects-grid').innerHTML = `
      <div style="text-align: center; padding: 60px; color: var(--apple-text-secondary); grid-column: span 2;">
        <p>无法加载项目，请检查 GitHub 用户名是否正确</p>
      </div>
    `;
  }
}

// 语言对应表情
function getLanguageEmoji(lang) {
  const emojis = {
    'Java': '☕',
    'Python': '🐍',
    'JavaScript': '📜',
    'TypeScript': '📘',
    'Go': '🔵',
    'Rust': '🦀',
    'C++': '⚙️',
    'C': '🔧',
    'Ruby': '💎',
    'PHP': '🐘',
    'Swift': '🍎',
    'Kotlin': '🟣',
    'Vue': '💚',
    'HTML': '🌐',
    'CSS': '🎨',
    'Shell': '🐚',
    'Jupyter Notebook': '📓'
  };
  return emojis[lang] || '📦';
}

// 获取 Followers
async function fetchFollowers() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    const data = await response.json();
    document.getElementById('stat-followers').textContent = data.followers || 0;
    document.getElementById('stat-repos').textContent = data.public_repos || 0;
  } catch (error) {
    console.log('Could not fetch followers:', error);
  }
}

// Animate on scroll
const animateElements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});
animateElements.forEach(el => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 初始化
updatePersonalInfo();
fetchGitHubUser();
fetchTotalStars();
fetchRepos();
fetchFollowers();