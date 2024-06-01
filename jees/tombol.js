window.addEventListener('scroll', function () {
    let navbar = document.querySelector('.navbar');
    let sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });

    // Tambahan untuk bagian 'Follow me'
    const followMeLink = document.querySelector('.nav-link[href="#followme"]');
    if (currentSection === 'followme') {
        followMeLink.classList.add('active');
    } else {
        followMeLink.classList.remove('active');
    }
});