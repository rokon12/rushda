// Simple Gesture Recognition
let gestureData = {
    touchStartX: 0,
    touchStartY: 0,
    touchStartTime: 0,
    swipeThreshold: 50,
    tapThreshold: 300
};

function initializeGestureRecognition() {
    const body = document.body;

    // Touch events for mobile
    body.addEventListener('touchstart', handleTouchStart, { passive: true });
    body.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Mouse events for desktop (for testing)
    body.addEventListener('mousedown', handleMouseStart);
    body.addEventListener('mouseup', handleMouseEnd);
}

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        gestureData.touchStartX = e.touches[0].clientX;
        gestureData.touchStartY = e.touches[0].clientY;
        gestureData.touchStartTime = Date.now();
    }
}

function handleTouchEnd(e) {
    if (e.changedTouches.length === 1) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();

        const deltaX = touchEndX - gestureData.touchStartX;
        const deltaY = touchEndY - gestureData.touchStartY;
        const deltaTime = touchEndTime - gestureData.touchStartTime;

        if (Math.abs(deltaX) > gestureData.swipeThreshold || Math.abs(deltaY) > gestureData.swipeThreshold) {
            handleSwipe(deltaX, deltaY);
        } else if (deltaTime < gestureData.tapThreshold) {
            handleTap(touchEndX, touchEndY);
        }
    }
}

function handleMouseStart(e) {
    gestureData.touchStartX = e.clientX;
    gestureData.touchStartY = e.clientY;
    gestureData.touchStartTime = Date.now();
}

function handleMouseEnd(e) {
    const deltaX = e.clientX - gestureData.touchStartX;
    const deltaY = e.clientY - gestureData.touchStartY;
    const deltaTime = Date.now() - gestureData.touchStartTime;

    if (Math.abs(deltaX) > gestureData.swipeThreshold || Math.abs(deltaY) > gestureData.swipeThreshold) {
        handleSwipe(deltaX, deltaY);
    } else if (deltaTime < gestureData.tapThreshold) {
        handleTap(e.clientX, e.clientY);
    }
}

function handleSwipe(deltaX, deltaY) {
    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            // Swipe right - previous section
            navigateSection('previous');
        } else {
            // Swipe left - next section
            navigateSection('next');
        }
    } else {
        if (deltaY > 0) {
            // Swipe down - show achievements
            document.getElementById('achievementPanel').classList.add('show');
            setTimeout(() => {
                document.getElementById('achievementPanel').classList.remove('show');
            }, 3000);
        } else {
            // Swipe up - trigger celebration
            showCelebration('gesture');
        }
    }

    triggerHapticFeedback('medium');
}

function handleTap(x, y) {
    // Create ripple effect at tap location
    createParticleExplosion(x, y, 'heart', 3);
}

function navigateSection(direction) {
    const sections = ['alphabet', 'lowercase', 'phonics', 'bangla', 'arabic', 'spelling', 'counting', 'quiz', 'memory', 'nursery', 'drawing', 'storybooks'];
    const currentIndex = sections.indexOf(currentSection);

    let newIndex;
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % sections.length;
    } else {
        newIndex = (currentIndex - 1 + sections.length) % sections.length;
    }

    showSection(sections[newIndex]);

    // Create transition particle effect
    createParticleExplosion(window.innerWidth / 2, window.innerHeight / 2, 'star', 8);
}

