document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationClass = entry.target.dataset.animation;
                if (animationClass) {
                    entry.target.classList.add(animationClass);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animations to hero elements
    const heroHeading = document.querySelector('.hero-heading');
    const heroText = document.querySelector('.hero-text');
    const heroCtas = document.querySelector('.hero-ctas');
    const specialtiesCard = document.querySelector('.specialties-card');

    setTimeout(() => {
        if (heroHeading) heroHeading.classList.add('hero-fade-up');
    }, 300);
    
    setTimeout(() => {
        if (heroText) heroText.classList.add('hero-reveal');
    }, 600);
    
    setTimeout(() => {
        if (heroCtas) heroCtas.classList.add('hero-fade-up');
    }, 1000);
    
    setTimeout(() => {
        if (specialtiesCard) specialtiesCard.classList.add('hero-scale-fade');
    }, 500);

    // Add animations to specialty items
    const specItemsForAnimation = document.querySelectorAll('.spec-item');
    specItemsForAnimation.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('scale-in');
        }, 1000 + (index * 60));
    });

    // Add animations to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card) => {
        card.dataset.animation = 'bounce-in';
        observer.observe(card);
    });

    // Add animations to checkup cards
    const checkupCards = document.querySelectorAll('.checkup-card');
    checkupCards.forEach((card) => {
        card.dataset.animation = 'scale-in';
        observer.observe(card);
    });

    // Add animations to insurance logos
    const insuranceLogos = document.querySelectorAll('.insurance-logo');
    insuranceLogos.forEach((logo) => {
        logo.dataset.animation = 'fade-in';
        observer.observe(logo);
    });

    // Add animations to footer sections
    const footerLeft = document.querySelector('.footer-left');
    const footerRight = document.querySelector('.footer-right');
    if (footerLeft) {
        footerLeft.dataset.animation = 'slide-in-left';
        observer.observe(footerLeft);
    }
    if (footerRight) {
        footerRight.dataset.animation = 'slide-in-right';
        observer.observe(footerRight);
    }

    // Add animations to about section
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    if (aboutImage) {
        aboutImage.dataset.animation = 'slide-in-left';
        observer.observe(aboutImage);
    }
    if (aboutContent) {
        aboutContent.dataset.animation = 'slide-in-right';
        observer.observe(aboutContent);
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navActions.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navActions.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
        }
        
        lastScroll = currentScroll;
    });

    // Modal functionality for specialties
    const modal = document.getElementById('doctorsModal');
    
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const doctorsGrid = document.getElementById('doctorsGrid');
    const specItems = document.querySelectorAll('.spec-item');

    // Doctors data
    const doctorsData = {
        'cardiologia': [
            {
                name: 'Dr. Carlos Méndez',
                specialty: 'Cardiología',
                description: 'Especialista en cardiología clínica con más de 15 años de experiencia. Egresado de la Universidad de Buenos Aires, con especialización en enfermedades cardiovasculares.',
                image: 'https://randomuser.me/api/portraits/men/32.jpg',
                experience: '15 años de experiencia',
                education: 'Universidad de Buenos Aires'
            },
            {
                name: 'Dra. María Fernández',
                specialty: 'Cardiología',
                description: 'Cardióloga intervencionista especializada en procedimientos mínimamente invasivos. Formada en Europa con amplia trayectoria en Argentina.',
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
                experience: '12 años de experiencia',
                education: 'Universidad Austral'
            }
        ]
    };

    // Open modal when clicking on specialty
    specItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const specialty = item.getAttribute('data-specialty');
            console.log('Clicked specialty:', specialty);
            
            if (doctorsData[specialty]) {
                showDoctors(doctorsData[specialty]);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                // For specialties without doctors yet
                const specialtyName = item.querySelector('p').textContent;
                showComingSoon(specialtyName);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Show doctors in modal
    function showDoctors(doctors) {
        doctorsGrid.innerHTML = doctors.map(doctor => `
            <div class="doctor-card">
                <img src="${doctor.image}" alt="${doctor.name}" class="doctor-image">
                <h3 class="doctor-name">${doctor.name}</h3>
                <div class="doctor-specialty">${doctor.specialty}</div>
                <p class="doctor-description">${doctor.description}</p>
                <div class="doctor-info">
                    <div class="doctor-info-item">
                        <i class="fa-solid fa-graduation-cap"></i>
                        <span>${doctor.education}</span>
                    </div>
                    <div class="doctor-info-item">
                        <i class="fa-solid fa-briefcase"></i>
                        <span>${doctor.experience}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Show coming soon message
    function showComingSoon(specialty) {
        doctorsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fa-solid fa-user-doctor" style="font-size: 64px; color: var(--primary); margin-bottom: 20px;"></i>
                <h3 style="font-size: 24px; margin-bottom: 12px; color: var(--text-primary);">Información Próximamente</h3>
                <p style="color: var(--text-secondary); font-size: 16px;">
                    Los profesionales de ${specialty} estarán disponibles pronto.<br>
                    Para consultas, comuníquese al 02320-409730
                </p>
            </div>
        `;
    }
});
