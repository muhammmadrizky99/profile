/* ============================================
   Muhammad Rizky — Portfolio JavaScript
   Particles | Typing | Animations | Filtering
   ============================================ */

(function () {
    'use strict';

    // ---- Preloader ----
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        const statusEl = preloader.querySelector('.loader-status');
        const pctEl = document.getElementById('loaderPercentage');

        const statusTexts = ['Initializing...', 'Loading assets...', 'Almost ready...', 'Welcome!'];
        let statusIdx = 0;

        const statusInterval = setInterval(() => {
            statusIdx++;
            if (statusIdx < statusTexts.length) {
                statusEl.textContent = statusTexts[statusIdx];
            }
        }, 600);

        // Percentage Animation
        let count = 0;
        const totalDuration = 2400; // 2.4s to match CSS mostly
        const intervalTime = 20;
        const steps = totalDuration / intervalTime;
        const increment = 100 / steps;

        const counterInterval = setInterval(() => {
            count += increment;
            if (count >= 100) {
                count = 100;
                clearInterval(counterInterval);

                // Hide other loader elements and enter epic countdown mode
                const loaderContainer = document.querySelector('.cyber-loader');
                if (loaderContainer) loaderContainer.classList.add('countdown-mode');

                let countdown = 5;
                if (pctEl) {
                    pctEl.removeAttribute('style'); // Clear any inline styles
                    pctEl.textContent = `0${countdown}`;
                    pctEl.classList.remove('tick');
                    void pctEl.offsetWidth; // trigger reflow
                    pctEl.classList.add('tick');
                }

                const cdInterval = setInterval(() => {
                    countdown--;
                    if (countdown > 0) {
                        if (pctEl) {
                            pctEl.textContent = `0${countdown}`;
                            // Retrigger pop animation
                            pctEl.classList.remove('tick');
                            void pctEl.offsetWidth;
                            pctEl.classList.add('tick');
                        }
                    } else if (countdown === 0) {
                        if (pctEl) {
                            pctEl.textContent = 'KUY!';
                            pctEl.classList.remove('tick');
                            pctEl.classList.add('go');
                        }
                    } else {
                        clearInterval(cdInterval);
                        clearInterval(statusInterval);
                        if (preloader) preloader.classList.add('hidden');
                    }
                }, 300); // 500ms per digit for a snappier countdown

            } else {
                if (pctEl) {
                    pctEl.textContent = Math.floor(count) + '%';
                }
            }
        }, intervalTime);
    });

    // ---- Particle Canvas ----
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null };
        let animationFrame;

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.opacity = Math.random() * 0.6 + 0.2;

                const colors = ['#6c63ff', '#a855f7', '#06b6d4', '#f472b6'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        this.x -= dx * 0.01;
                        this.y -= dy * 0.01;
                    }
                }

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 100);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const opacity = 0.15 * (1 - dist / 150);
                        ctx.beginPath();

                        // Create a gradient line between the two particles
                        const grad = ctx.createLinearGradient(particles[a].x, particles[a].y, particles[b].x, particles[b].y);
                        grad.addColorStop(0, particles[a].color);
                        grad.addColorStop(1, particles[b].color);

                        ctx.strokeStyle = grad;
                        ctx.globalAlpha = opacity;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1.0;
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            animationFrame = requestAnimationFrame(animateParticles);
        }

        resizeCanvas();
        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });
    }

    // ---- Cursor Glow ----
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // ---- Typing Animation ----
    const typingEl = document.getElementById('typingText');
    if (typingEl) {
        const texts = [
            'Software Engineer',
            'UI/UX Designer',
            'Full Stack Developer',
            'Machine Learning Enthusiast',
            'Graphic Designer',
            'Creative Problem Solver'
        ];
        let textIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        function type() {
            const current = texts[textIdx];
            if (isDeleting) {
                typingEl.textContent = current.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typingEl.textContent = current.substring(0, charIdx + 1);
                charIdx++;
            }

            let speed = isDeleting ? 40 : 80;

            if (!isDeleting && charIdx === current.length) {
                speed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                textIdx = (textIdx + 1) % texts.length;
                speed = 400;
            }

            setTimeout(type, speed);
        }

        type();
    }

    // ---- Counter Animation ----
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            updateCounter();
        });
    }

    // Fire counters repeatedly when hero is visible
    let counterTimer = null;
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (!counterTimer) {
                animateCounters();
                counterTimer = setInterval(animateCounters, 6000); // 2s animate + 4s wait to read
            }
        } else {
            if (counterTimer) {
                clearInterval(counterTimer);
                counterTimer = null;
            }
        }
    }, { threshold: 0.3 });

    const heroSection = document.getElementById('home');
    if (heroSection) heroObserver.observe(heroSection);

    // ---- Scroll Reveal (Susun-Susun / Stacking) ----

    // Assign structural delays to children of grids
    const revealContainers = document.querySelectorAll('.about-grid, .skills-grid, .projects-grid, .certificates-grid, .social-grid');
    revealContainers.forEach(container => {
        // Collect direct reveal children or reveal cards
        const reveals = container.querySelectorAll('.reveal');
        reveals.forEach((el, index) => {
            el.style.setProperty('--stagger-delay', `${index * 0.08}s`);
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove active class when out of view so it staggers again next time
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ---- Navbar Scroll ----
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar bg
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ---- Back to Top ----
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // ---- Mobile Nav Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ---- Project Filtering ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach((card, idx) => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = `fadeInUp 0.4s ${idx * 0.05}s ease both`;
                } else {
                    card.classList.add('hidden');
                    card.style.animation = 'none';
                }
            });
        });
    });

    // ---- 3D Tilt Effect Initialization ----
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02,
        });
    }

    // ---- Comments Section System ----
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    // Default initial comments to make it look active
    const defaultComments = [
        {
            id: 1,
            name: 'Ahmad Kasim',
            text: 'keren euyyy',
            date: new Date(Date.now() - 3600000 * 5).toISOString()
        }
    ];

    if (commentForm && commentsList) {
        // Initialize comments from localStorage or use defaults
        let comments = JSON.parse(localStorage.getItem('portfolio_comments')) || defaultComments;

        // Save defaults if it's the first time
        if (!localStorage.getItem('portfolio_comments')) {
            localStorage.setItem('portfolio_comments', JSON.stringify(comments));
        }

        const renderComments = () => {
            commentsList.innerHTML = '';

            if (comments.length === 0) {
                commentsList.innerHTML = '<div class="no-comments">Be the first to leave a comment!</div>';
                return;
            }

            // Sort by date descending (newest first)
            const sortedComments = [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));

            sortedComments.forEach(comment => {
                const dateObj = new Date(comment.date);
                const dateString = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                const initial = comment.name.charAt(0).toUpperCase();

                const commentEl = document.createElement('div');
                commentEl.className = 'comment-item';
                commentEl.innerHTML = `
                    <div class="comment-header">
                        <div class="comment-author">
                            <div class="comment-avatar">${initial}</div>
                            <span>${escapeHtml(comment.name)}</span>
                        </div>
                        <div class="comment-date">${dateString}</div>
                    </div>
                    <div class="comment-text">${escapeHtml(comment.text).replace(/\n/g, '<br>')}</div>
                `;
                commentsList.appendChild(commentEl);
            });
        };

        const escapeHtml = (unsafe) => {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        // Render initial comments
        renderComments();

        // Handle form submission
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('commentName');
            const textInput = document.getElementById('commentText');

            if (nameInput.value.trim() === '' || textInput.value.trim() === '') return;

            const newComment = {
                id: Date.now(),
                name: nameInput.value.trim(),
                text: textInput.value.trim(),
                date: new Date().toISOString()
            };

            // Add to start of array
            comments.unshift(newComment);

            // Save to local storage
            localStorage.setItem('portfolio_comments', JSON.stringify(comments));

            // Re-render
            renderComments();

            // Reset form
            commentForm.reset();

            // Show a simple visual feedback
            const submitBtn = commentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Posted!';
            submitBtn.style.background = '#06b6d4';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 2000);
        });
    }

})();
