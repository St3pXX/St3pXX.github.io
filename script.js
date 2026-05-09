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

  // Footer
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

    animateCounter(document.getElementById('stat-stars'), totalStars);
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

    projectsGrid.innerHTML = '';

    repos.forEach(repo => {
      if (repo.description) {
        const card = document.createElement('a');
        card.href = repo.html_url;
        card.target = '_blank';
        card.className = 'project-card';

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

    if (projectsGrid.children.length === 0) {
      projectsGrid.innerHTML = `
        <div style="text-align: center; padding: 60px; color: var(--text-tertiary); grid-column: span 2;">
          <p>暂无公开项目</p>
        </div>
      `;
    }

  } catch (error) {
    console.log('Could not fetch repos:', error);
    document.getElementById('projects-grid').innerHTML = `
      <div style="text-align: center; padding: 60px; color: var(--text-tertiary); grid-column: span 2;">
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
    animateCounter(document.getElementById('stat-followers'), data.followers || 0);
    animateCounter(document.getElementById('stat-repos'), data.public_repos || 0);
  } catch (error) {
    console.log('Could not fetch followers:', error);
  }
}

// 数字计数器动画
function animateCounter(element, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (target - start) * eased);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ==================== 粒子系统 ====================
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.init();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(200, 255, 0, ${p.opacity})`;
      this.ctx.fill();
    });

    this.drawConnections();
    requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    const connectionDistance = 120;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(200, 255, 0, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }
}

// ==================== 滚动动画 ====================
function initScrollAnimations() {
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
}

// ==================== 平滑滚动 ====================
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

// ==================== 导航高亮 ====================
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
  // 初始化粒子系统
  const canvas = document.querySelector('.particle-canvas');
  if (canvas) {
    new ParticleSystem(canvas);
  }

  // 初始化滚动动画
  initScrollAnimations();

  // 初始化导航高亮
  initNavHighlight();

  // 更新个人信息
  updatePersonalInfo();
  fetchGitHubUser();
  fetchTotalStars();
  fetchRepos();
  fetchFollowers();
});
