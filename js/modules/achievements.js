// Achievement System
let achievements = {
    'first_letter': { icon: '🔤', title: 'First Letter!', description: 'Clicked your first letter', unlocked: false },
    'alphabet_explorer': { icon: '🗺️', title: 'Alphabet Explorer', description: 'Visited all letter sections', unlocked: false },
    'clicking_spree': { icon: '⚡', title: 'Clicking Spree', description: 'Clicked 20 letters', unlocked: false },
    'language_learner': { icon: '🌍', title: 'Language Learner', description: 'Tried Bengali and Arabic', unlocked: false },
    'artist': { icon: '🎨', title: 'Artist', description: 'Used the drawing section', unlocked: false },
    'singer': { icon: '🎵', title: 'Singer', description: 'Played a nursery rhyme', unlocked: false },
    'color_mixer': { icon: '🌈', title: 'Color Mixer', description: 'Mixed your first color', unlocked: false },
    'persistent': { icon: '💪', title: 'Persistent', description: '10 minutes of learning', unlocked: false },
    'speed_demon': { icon: '🏃', title: 'Speed Demon', description: 'Clicked 10 letters in 30 seconds', unlocked: false },
    'completionist': { icon: '🏆', title: 'Completionist', description: 'Unlocked all achievements', unlocked: false }
};

let userStats = {
    lettersClicked: 0,
    sectionsVisited: new Set(),
    startTime: Date.now(),
    lastClickTime: 0,
    fastClicks: 0,
    colorsLearned: new Set()
};

function initializeAchievements() {
    const achievementPanel = document.getElementById('achievementPanel');
    const achievementList = document.getElementById('achievementList');

    // Create achievement items
    Object.keys(achievements).forEach(key => {
        const achievement = achievements[key];
        const item = document.createElement('div');
        item.className = 'achievement-item';
        item.innerHTML = `
            <span class="icon">${achievement.icon}</span>
            <div class="text">
                <div class="title">${achievement.title}</div>
                <div class="description">${achievement.description}</div>
            </div>
        `;
        achievementList.appendChild(item);
    });

    // Show panel on hover
    achievementPanel.addEventListener('mouseenter', () => {
        achievementPanel.classList.add('show');
    });

    achievementPanel.addEventListener('mouseleave', () => {
        achievementPanel.classList.remove('show');
    });

    updateProgressBar();
}

function unlockAchievement(key) {
    if (achievements[key] && !achievements[key].unlocked) {
        achievements[key].unlocked = true;
        showAchievementNotification(achievements[key]);
        updateAchievementDisplay(key);
        updateProgressBar();
        triggerHapticFeedback('success');

        // Check for completionist achievement
        const totalAchievements = Object.keys(achievements).length - 1; // Exclude completionist
        const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
        if (unlockedCount === totalAchievements && !achievements['completionist'].unlocked) {
            setTimeout(() => unlockAchievement('completionist'), 1000);
        }
    }
}

function showAchievementNotification(achievement) {
    const notification = document.getElementById('achievementNotification');
    const title = notification.querySelector('.achievement-title');
    const description = notification.querySelector('.achievement-description');

    title.textContent = achievement.title;
    description.textContent = achievement.description;

    notification.classList.add('show');

    // Create extra celebration particles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticleExplosion(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.5,
                'star',
                5
            );
        }, i * 100);
    }

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

function updateAchievementDisplay(key) {
    const achievementItems = document.querySelectorAll('.achievement-item');
    const keys = Object.keys(achievements);
    const index = keys.indexOf(key);

    if (index >= 0 && achievementItems[index]) {
        achievementItems[index].classList.add('unlocked');
    }
}

function updateProgressBar() {
    const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
    const totalCount = Object.keys(achievements).length;
    const percentage = (unlockedCount / totalCount) * 100;

    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    progressFill.style.width = percentage + '%';
    progressText.textContent = `${unlockedCount}/${totalCount}`;
}

function trackLetterClick() {
    userStats.lettersClicked++;
    userStats.sectionsVisited.add(currentSection);

    // Check achievements
    if (userStats.lettersClicked === 1) {
        unlockAchievement('first_letter');
    }

    if (userStats.lettersClicked === 20) {
        unlockAchievement('clicking_spree');
    }

    if (userStats.sectionsVisited.has('alphabet') && 
        userStats.sectionsVisited.has('lowercase') && 
        userStats.sectionsVisited.has('phonics')) {
        unlockAchievement('alphabet_explorer');
    }

    if (userStats.sectionsVisited.has('bangla') && 
        userStats.sectionsVisited.has('arabic')) {
        unlockAchievement('language_learner');
    }

    // Speed demon achievement
    const now = Date.now();
    if (now - userStats.lastClickTime < 3000) {
        userStats.fastClicks++;
        if (userStats.fastClicks >= 10) {
            unlockAchievement('speed_demon');
        }
    } else {
        userStats.fastClicks = 1;
    }
    userStats.lastClickTime = now;

    // Persistent achievement (10 minutes)
    if (now - userStats.startTime > 600000) {
        unlockAchievement('persistent');
    }
}

function createFloatingElements() {
    const container = document.getElementById('floatingElements');

    // Create floating bubbles
    for (let i = 0; i < 8; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'floating-bubble';
        bubble.style.width = Math.random() * 40 + 20 + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.top = Math.random() * 100 + '%';
        bubble.style.animationDelay = Math.random() * 6 + 's';
        bubble.style.animationDuration = (6 + Math.random() * 4) + 's';
        container.appendChild(bubble);
    }

    // Initialize gesture recognition
    initializeGestureRecognition();
}

