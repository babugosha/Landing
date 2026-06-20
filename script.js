document.addEventListener('DOMContentLoaded', () => {
    // Fast, subtle Intersection Observer for scroll animations (Arc/Raycast style)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve for performance after the initial reveal
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need to animate in
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Pull the button slightly towards the cursor
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Snap back
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
});
