// Enhanced Animation and Particle Effects
function createParticleExplosion(x, y, type = 'star', count = 10) {
    const container = document.getElementById('particleContainer');
    const particles = ['⭐', '💖', '🎉', '✨', '🌟', '💫', '🎊'];

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = `particle ${type}`;

        if (type === 'confetti') {
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        } else {
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        }

        // Random position around click point
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 100 + Math.random() * 100;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
}

function trigger3DLetterAnimation(element) {
    element.classList.remove('letter-3d');
    setTimeout(() => {
        element.classList.add('letter-3d');
        setTimeout(() => {
            element.classList.remove('letter-3d');
        }, 800);
    }, 10);
}

function triggerHapticFeedback(intensity = 'light') {
    if ('vibrate' in navigator) {
        const patterns = {
            light: [10],
            medium: [20],
            strong: [50],
            success: [10, 50, 10]
        };
        navigator.vibrate(patterns[intensity] || patterns.light);
    }
}

function showCelebration(type = 'success') {
    // Create celebration particles across the screen
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticleExplosion(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                Math.random() > 0.5 ? 'star' : 'heart',
                3
            );
        }, i * 100);
    }

    triggerHapticFeedback('success');
}

function enhanceLetterClick(element, letter) {
    // Track for achievements
    trackLetterClick();

    // Add 3D animation
    trigger3DLetterAnimation(element);

    // Haptic feedback
    triggerHapticFeedback('medium');

    // Add temporary rainbow effect
    element.style.animation = 'rainbow 1s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 1000);
}

