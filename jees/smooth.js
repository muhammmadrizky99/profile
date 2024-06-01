// document.addEventListener('DOMContentLoaded', function() {
//     const observerOptions = {
//         threshold: 0.1
//     };

//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('show');
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, observerOptions);

//     const aboutSections = document.querySelectorAll('#about .from-left, #about .from-right, #about .from-mana, #about .from-halo, #project .from-project');
//     aboutSections.forEach(section => {
//         observer.observe(section);
//     });
// });


document.addEventListener("DOMContentLoaded", function() {
    const elementsToAnimate = document.querySelectorAll('.from-left, .from-right, .from-halo, .from-mana, .from-project');

    function handleScroll() {
        elementsToAnimate.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('show');
            } else {
                element.classList.remove('show');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once to show elements already in viewport on load
});
