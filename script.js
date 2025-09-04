// 等待DOM載入完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initSkillBars();
    initScrollEffects();
    initContactForm();
    initSmoothScrolling();
    
    // 新增的互動功能
    initHeroInteractions();
    initBackgroundInteractions();
    initMouseTracker();
    initTechStackInteractions();
    initParticleSystem();
    initScrollAnimations();
    initClickEffects();
    initKeyboardNavigation();
    
    // 直接添加 LeBron 彩蛋功能
    const navLogoLink = document.getElementById('nav-logo-link');
    
    if (navLogoLink) {
        navLogoLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showLebronImage();
        });
    }
    
    // 鍵盤輸入 "lebron" 觸發彩蛋
    initLebronKeyTrigger();
});

// 導航欄功能
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navLogo = document.getElementById('nav-logo-link');

    // 漢堡選單切換
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 點擊導航連結時關閉漢堡選單
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 點擊導航標題顯示 LeBron 圖片
    if (navLogo) {
        navLogo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showLebronImage();
        });
    }

    // 滾動時改變導航欄樣式 - 確保始終保持深色
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.15)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
        }
    });
}

// 技能條動畫
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    // 創建Intersection Observer來監控技能條的可見性
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                
                // 延遲一下再開始動畫
                setTimeout(() => {
                    skillBar.style.width = level + '%';
                }, 200);
                
                // 動畫完成後取消觀察
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });

    // 觀察所有技能條
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// 滾動效果
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // 為每個區塊添加初始樣式和觀察
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// 聯絡表單處理
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 獲取表單數據
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // 簡單的表單驗證
            if (!name || !email || !subject || !message) {
                showNotification('請填寫所有必填欄位', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('請輸入有效的電子郵件地址', 'error');
                return;
            }
            
            // 模擬表單提交
            showNotification('訊息已發送！我們會盡快回覆您。', 'success');
            
            // 清空表單
            contactForm.reset();
        });
    }
}

// 電子郵件驗證
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 顯示通知
function showNotification(message, type = 'info') {
    // 創建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加樣式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // 根據類型設置背景色
    switch(type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    // 添加到頁面
    document.body.appendChild(notification);
    
    // 顯示動畫
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自動隱藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 平滑滾動
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]:not(#nav-logo-link)');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 跳過導航標題的處理
            if (this.id === 'nav-logo-link') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考慮導航欄高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 打字機效果（可選功能）
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 數字計數器動畫
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// 視差滾動效果（可選功能）
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// 頁面載入完成後的額外效果
window.addEventListener('load', function() {
    // 為統計數字添加計數器動畫
    const stats = document.querySelectorAll('.stat h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (number > 0) {
                    animateCounter(stat, number);
                }
                
                observer.unobserve(stat);
            }
        });
    }, {
        threshold: 0.5
    });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
});

// Hero區域互動效果
function initHeroInteractions() {
    const heroContent = document.querySelector('.hero-content');
    const heroStats = document.querySelectorAll('.hero-stat');
    
    // 為統計數字添加點擊動畫
    heroStats.forEach(stat => {
        stat.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
    
    // hero內容區域懸停效果
    if (heroContent) {
        heroContent.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(96, 165, 250, 0.2)';
        });
        
        heroContent.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(96, 165, 250, 0.1)';
        });
    }
}

// 背景元素互動
function initBackgroundInteractions() {
    const hero = document.querySelector('.hero');
    let mouseX = 0;
    let mouseY = 0;
    
    hero.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = (e.clientY - rect.top) / rect.height;
        
        // 根據滑鼠位置調整背景偏移
        const translateX = (mouseX - 0.5) * 20;
        const translateY = (mouseY - 0.5) * 20;
        
        const heroAfter = hero.querySelector('::after');
        hero.style.setProperty('--mouse-x', translateX + 'px');
        hero.style.setProperty('--mouse-y', translateY + 'px');
    });
}

// 滑鼠追蹤效果
function initMouseTracker() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-inner"></div>';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // 懸停效果
    const interactiveElements = document.querySelectorAll('button, a, .skill-card, .interest-card, .tech-icon');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

// 技術棧互動
function initTechStackInteractions() {
    const techIcons = document.querySelectorAll('.tech-icon');
    const techDetails = {
        'React': '用於建構用戶界面的 JavaScript 庫',
        'JS': 'JavaScript - 網頁互動程式語言',
        'TS': 'TypeScript - 具有型別檢查的 JavaScript',
        'Node': 'Node.js - 伺服器端 JavaScript 運行環境',
        'CSS': 'CSS3 - 網頁樣式設計語言'
    };
    
    techIcons.forEach(icon => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = techDetails[icon.textContent] || '程式設計技術';
        document.body.appendChild(tooltip);
        
        icon.addEventListener('mouseenter', function(e) {
            tooltip.style.display = 'block';
            tooltip.style.left = e.clientX + 10 + 'px';
            tooltip.style.top = e.clientY - 40 + 'px';
            
            // 添加脈衝效果
            this.style.animation = 'pulse 0.6s ease-in-out infinite';
        });
        
        icon.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
            this.style.animation = '';
        });
        
        icon.addEventListener('click', function() {
            showNotification(`你點擊了 ${this.textContent}！`, 'info');
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 600);
        });
    });
}

// 粒子系統
function initParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 0;
    `;
    hero.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        const size = Math.random() * 3 + 1;
        const speed = Math.random() * 2 + 0.5;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(96, 165, 250, 0.6), rgba(96, 165, 250, 0.2), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            box-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
            opacity: 0.8;
        `;
        
        particleContainer.appendChild(particle);
        
        function animateParticle() {
            const currentY = parseFloat(particle.style.top);
            if (currentY > -10) {
                particle.style.top = (currentY - speed) + 'px';
                particle.style.left = (parseFloat(particle.style.left) + Math.sin(currentY * 0.01) * 1) + 'px';
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        animateParticle();
    }
    
    // 立即創建更多粒子
    for (let i = 0; i < 8; i++) {
        setTimeout(createParticle, i * 150);
    }
    
    // 更頻繁地創建粒子 - 主要生成器
    setInterval(createParticle, 500);
    
    // 第二個生成器 - 創建更小的粒子
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        const size = Math.random() * 2 + 0.5;
        const speed = Math.random() * 1.5 + 0.3;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: rgba(96, 165, 250, 0.4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        
        particleContainer.appendChild(particle);
        
        function animateSmallParticle() {
            const currentY = parseFloat(particle.style.top);
            if (currentY > -10) {
                particle.style.top = (currentY - speed) + 'px';
                particle.style.left = (parseFloat(particle.style.left) + Math.sin(currentY * 0.008) * 0.8) + 'px';
                requestAnimationFrame(animateSmallParticle);
            } else {
                particle.remove();
            }
        }
        animateSmallParticle();
    }, 800);
}


// 添加一些互動效果
document.addEventListener('DOMContentLoaded', function() {
    // 為技能卡片添加點擊效果
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
    
    // 為專案卡片添加點擊效果
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
});

// 滾動動畫效果
function initScrollAnimations() {
    // 滾動顯示動畫（移除 hero 視差效果）
    window.addEventListener('scroll', function() {
        // 為各區塊添加滾動顯示動畫
        const elements = document.querySelectorAll('.skill-card, .interest-card, .course-card');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
        });
    });
}

// 點擊效果
function initClickEffects() {
    // 為所有可點擊元素添加波紋效果
    const clickableElements = document.querySelectorAll('.skill-card, .interest-card, .course-card, .nav-link');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // 創建波紋效果
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // 移除波紋效果
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 1000);
            
            // 添加震動效果
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // 三擊標題彩蛋
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        let clickCount = 0;
        heroTitle.addEventListener('click', function() {
            clickCount++;
            if (clickCount >= 3) {
                this.style.textShadow = '0 0 20px #60a5fa, 0 0 40px #60a5fa';
                setTimeout(() => {
                    this.style.textShadow = '';
                }, 2000);
                clickCount = 0;
                showNotification('✨ 發現隱藏效果！', 'success');
            }
            setTimeout(() => clickCount = Math.max(0, clickCount - 1), 1000);
        });
    }
}

// 鍵盤導航
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC 鍵滾動到頂部
        if (e.keyCode === 27) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // 數字鍵快速導航
        const sections = ['home', 'about', 'skills', 'courses', 'contact'];
        const keyCode = e.keyCode - 48; // 0-9
        
        if (keyCode >= 1 && keyCode <= sections.length) {
            const targetSection = document.getElementById(sections[keyCode - 1]);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                showNotification(`跳轉到${targetSection.id}區塊`, 'info');
            }
        }
        
        // 空白鍵暫停/恢復粒子動畫
        if (e.keyCode === 32 && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                if (particle.style.animationPlayState === 'paused') {
                    particle.style.animationPlayState = 'running';
                } else {
                    particle.style.animationPlayState = 'paused';
                }
            });
        }
    });
    
    // 顯示鍵盤快捷鍵提示
    setTimeout(() => {
        showNotification('鍵盤快捷鍵：數字1-5快速導航，ESC回到頂部，空白鍵暫停動畫', 'info');
    }, 2000);
}

// LeBron 圖片彩蛋功能
function showLebronImage() {
    const lebronImage = document.getElementById('lebronImage');
    
    if (lebronImage) {
        // 瞬間顯示
        lebronImage.style.display = 'flex';
        lebronImage.style.visibility = 'visible';
        lebronImage.style.opacity = '1';
        
        // 2秒後開始淡出
        setTimeout(() => {
            lebronImage.style.opacity = '0';
            
            // 淡出完成後隱藏
            setTimeout(() => {
                lebronImage.style.display = 'none';
                lebronImage.style.visibility = 'hidden';
            }, 500);
        }, 2000);
    }
}

// LeBron 鍵盤輸入觸發功能
function initLebronKeyTrigger() {
    let keySequence = '';
    const targetSequence = 'lebron';
    
    document.addEventListener('keydown', function(e) {
        // 跳過在輸入框中的按鍵
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // 只處理字母鍵
        if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            keySequence += e.key.toLowerCase();
            
            // 保持序列長度不超過目標序列
            if (keySequence.length > targetSequence.length) {
                keySequence = keySequence.slice(-targetSequence.length);
            }
            
            // 檢查是否匹配
            if (keySequence === targetSequence) {
                showLebronImage();
                showNotification('🏀 LeBron 彩蛋觸發！', 'success');
                keySequence = ''; // 重置序列
            }
        } else {
            // 如果按下非字母鍵，重置序列
            keySequence = '';
        }
    });
}
