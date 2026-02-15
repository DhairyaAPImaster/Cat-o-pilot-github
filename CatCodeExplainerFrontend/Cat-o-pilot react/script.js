const catFramesPath = 'cat video scroll animation frames 24 fps/';
const totalFrames = 145;
let currentFrame = 0;
let isPlaying = true;
let catImages = [];
let imagesLoaded = 0;

const canvas = document.getElementById('catVideoCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const playPauseBtn = document.getElementById('playPause');
const progressFill = document.getElementById('progressFill');
const progressBar = document.querySelector('.progress-bar');

const meowBtn = document.getElementById('meowBtn');
const meowSound = document.getElementById('meowSound');
const themeToggle = document.getElementById('themeToggle');
const installBtn = document.getElementById('installBtn');
const watchDemoBtn = document.getElementById('watchDemo');
const demoModal = document.getElementById('demoModal');
const closeDemo = document.getElementById('closeDemo');
const backToTopBtn = document.getElementById('backToTop');
const galleryViewer = document.getElementById('galleryViewer');
const closeViewer = document.getElementById('closeViewer');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');
const viewerImage = document.getElementById('viewerImage');
const viewerCaption = document.getElementById('viewerCaption');
const catGallery = document.getElementById('catGallery');

let currentGalleryIndex = 0;
let galleryImages = [];

function preloadCatFrames() {
    if (!ctx) return;
    
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameNumber = String(i).padStart(3, '0');
        img.src = `${catFramesPath}ezgif-frame-${frameNumber}.jpg`;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === 1) {
                drawFrame(0);
            }
        };
        catImages.push(img);
    }
}

function drawFrame(frame) {
    if (!ctx || !catImages[frame] || !catImages[frame].complete) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(catImages[frame], 0, 0, canvas.width, canvas.height);
}

function animate() {
    if (isPlaying && catImages.length > 0) {
        currentFrame = (currentFrame + 1) % totalFrames;
        drawFrame(currentFrame);
        
        if (progressFill) {
            progressFill.style.width = ((currentFrame / totalFrames) * 100) + '%';
        }
    }
    
    setTimeout(animate, 1000 / 24);
}

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    });
}

if (progressBar) {
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        currentFrame = Math.floor(percentage * totalFrames);
        drawFrame(currentFrame);
        progressFill.style.width = (percentage * 100) + '%';
    });
}

if (meowBtn) {
    meowBtn.addEventListener('click', () => {
        if (meowSound) {
            meowSound.currentTime = 0;
            meowSound.play().catch(e => console.log('Audio play failed:', e));
        }
        
        const icon = meowBtn.querySelector('i');
        const span = meowBtn.querySelector('span');
        if (icon && span) {
            icon.className = 'fas fa-cat';
            span.textContent = 'Meow!';
            setTimeout(() => {
                icon.className = 'fas fa-volume-up';
                span.textContent = 'Meow';
            }, 1200);
        }
    });
}

if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.className = savedTheme;
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.className;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.className = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

if (installBtn) {
    installBtn.addEventListener('click', (e) => {
        const isVSCode = navigator.userAgent.includes('VSCode');
        if (!isVSCode) {
            e.preventDefault();
            window.open('https://marketplace.visualstudio.com/items?itemName=catopilot', '_blank');
        }
    });
}

if (watchDemoBtn && demoModal) {
    watchDemoBtn.addEventListener('click', () => {
        demoModal.classList.add('active');
    });
}

if (closeDemo && demoModal) {
    closeDemo.addEventListener('click', () => {
        demoModal.classList.remove('active');
    });
    
    demoModal.addEventListener('click', (e) => {
        if (e.target === demoModal) {
            demoModal.classList.remove('active');
        }
    });
}

function initGallery() {
    if (!catGallery) return;
    
    const catMemes = [
        'Debugging Expert Cat',
        'Code Review Supervisor',
        'Senior Purr-grammer',
        'Chief Meow Officer',
        'Stack Overflow Cat',
        'Git Commit Champion',
        'Syntax Error Detective',
        'Async/Await Enthusiast',
        'Loop Specialist',
        'Variable Naming Guru',
        'Function Cat-ll Specialist',
        'API Integration Pro',
        'Database Administrator',
        'Front-end Feline',
        'Back-end Boss Cat',
        'DevOps Kitty'
    ];
    
    for (let i = 1; i <= 16 && i <= totalFrames; i++) {
        const frameNum = String(i * 9).padStart(3, '0');
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.index = i - 1;
        
        const img = document.createElement('img');
        img.src = `${catFramesPath}ezgif-frame-${frameNum}.jpg`;
        img.alt = catMemes[i - 1] || `Cat ${i}`;
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = catMemes[i - 1] || `Cat ${i}`;
        
        overlay.appendChild(caption);
        item.appendChild(img);
        item.appendChild(overlay);
        
        item.addEventListener('click', () => {
            openGalleryViewer(i - 1);
        });
        
        catGallery.appendChild(item);
        galleryImages.push({
            src: img.src,
            caption: catMemes[i - 1] || `Cat ${i}`
        });
    }
}

function openGalleryViewer(index) {
    currentGalleryIndex = index;
    updateViewerImage();
    if (galleryViewer) {
        galleryViewer.classList.add('active');
    }
}

function updateViewerImage() {
    if (viewerImage && galleryImages[currentGalleryIndex]) {
        viewerImage.src = galleryImages[currentGalleryIndex].src;
        if (viewerCaption) {
            viewerCaption.textContent = galleryImages[currentGalleryIndex].caption;
        }
    }
}

if (closeViewer) {
    closeViewer.addEventListener('click', () => {
        galleryViewer.classList.remove('active');
    });
}

if (prevImage) {
    prevImage.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        updateViewerImage();
    });
}

if (nextImage) {
    nextImage.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        updateViewerImage();
    });
}

if (galleryViewer) {
    galleryViewer.addEventListener('click', (e) => {
        if (e.target === galleryViewer) {
            galleryViewer.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (!galleryViewer.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            galleryViewer.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            prevImage.click();
        } else if (e.key === 'ArrowRight') {
            nextImage.click();
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const featureCards = document.querySelectorAll('.feature-card-complex');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    observer.observe(card);
});

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    observer.observe(item);
    item.style.transitionDelay = `${index * 0.15}s`;
});

const copyBtns = document.querySelectorAll('.copy-btn');
copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const code = btn.dataset.copy;
        if (code) {
            navigator.clipboard.writeText(code).then(() => {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                }, 2000);
            });
        }
    });
});

const aiButtons = document.querySelectorAll('.select-ai-btn');
aiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        aiButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        const aiType = btn.dataset.ai;
        if (aiType === 'gemini') {
            alert('To use Gemini:\n1. Get an API key from Google AI Studio\n2. Open Cat-o-Pilot settings in VS Code\n3. Enter your Gemini API key\n4. Start explaining code with cats! 🐱');
        }
    });
});

function createParticles() {
    const particlesBg = document.getElementById('particles-bg');
    if (!particlesBg) return;
    
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'var(--primary)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.3;
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesBg.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    preloadCatFrames();
    animate();
    initGallery();
    createParticles();
    
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach((card, index) => {
        card.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(card);
    });
});

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-bg-overlay');
            parallaxElements.forEach(el => {
                el.style.transform = `translateY(${scrolled * 0.5}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

const floatingCards = document.querySelectorAll('.float-card');
floatingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.1) translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
