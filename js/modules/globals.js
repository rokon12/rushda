// Global variables
let currentSection = 'alphabet';
let currentSpellingWord = 0;
let currentNumber = 1;
let spellingProgress = [];
let completedWords = 0;
let hintCount = 0;
let selectedLetters = [];

// Quiz variables
let currentQuizCategory = 'all';
let currentQuizQuestion = 0;
let quizScore = 0;
let quizStreak = 0;
let answeredQuestions = 0;

// Memory game variables
let memoryDifficulty = 'easy';
let memoryCards = [];
let flippedCards = [];
let matchedCards = [];
let memoryMoves = 0;
let memoryMatches = 0;
let memoryStartTime = 0;
let memoryTimer = null;
let canFlipCards = true;

// Nursery rhymes variables
let currentSong = 0;
let isPlaying = false;
let songTimer = null;
let currentWordIndex = 0;
let playbackSpeed = 1; // 1 = normal, 0.7 = slow
let songStartTime = 0;
let songDuration = 0;

// Musical enhancement variables
let musicContext = null;
let backgroundMusicGain = null;
let drumGain = null;
let melodyGain = null;
let currentChordIndex = 0;
let beatInterval = null;

// Drawing variables
let drawingMode = 'free'; // 'free', 'trace', 'color', 'mix'
let currentColor = '#ff6b6b';
let brushSize = 20;
let isDrawing = false;
let canvas = null;
let ctx = null;
let templateCanvas = null;
let templateCtx = null;
let lastX = 0;
let lastY = 0;

// Color mixing variables
let selectedColors = [];
let mixedColor = null;
let mixingMode = 'simple'; // 'simple' or 'advanced'
let maxColors = 2;

// Arabic letters variables
let currentArabicLetter = 'أ';
let arabicGameScore = 0;
let arabicGameActive = false;

// Interactive Storybooks variables
let currentStory = null;
let currentPage = 0;
let isAutoReading = false;
let storyAutoTimer = null;
let colorMixingData = {
    // Primary + Primary combinations
    'red+blue': { color: '#8b4bff', name: 'Magical Purple' },
    'blue+red': { color: '#8b4bff', name: 'Magical Purple' },
    'red+yellow': { color: '#ff8c42', name: 'Sunset Orange' },
    'yellow+red': { color: '#ff8c42', name: 'Sunset Orange' },
    'blue+yellow': { color: '#4caf50', name: 'Forest Green' },
    'yellow+blue': { color: '#4caf50', name: 'Forest Green' },

    // Adding White (tints - lighter colors)
    'red+white': { color: '#ffb3ba', name: 'Cotton Candy Pink' },
    'white+red': { color: '#ffb3ba', name: 'Cotton Candy Pink' },
    'blue+white': { color: '#bae1ff', name: 'Sky Blue' },
    'white+blue': { color: '#bae1ff', name: 'Sky Blue' },
    'yellow+white': { color: '#ffffba', name: 'Sunshine Yellow' },
    'white+yellow': { color: '#ffffba', name: 'Sunshine Yellow' },
    'purple+white': { color: '#ddbeff', name: 'Fairy Lavender' },
    'white+purple': { color: '#ddbeff', name: 'Fairy Lavender' },
    'orange+white': { color: '#ffdab9', name: 'Peach Cream' },
    'white+orange': { color: '#ffdab9', name: 'Peach Cream' },
    'green+white': { color: '#bffcc6', name: 'Mint Fresh' },
    'white+green': { color: '#bffcc6', name: 'Mint Fresh' },

    // Adding Black (shades - darker colors)
    'red+black': { color: '#8b0000', name: 'Dragon Red' },
    'black+red': { color: '#8b0000', name: 'Dragon Red' },
    'blue+black': { color: '#191970', name: 'Midnight Blue' },
    'black+blue': { color: '#191970', name: 'Midnight Blue' },
    'yellow+black': { color: '#9acd32', name: 'Army Green' },
    'black+yellow': { color: '#9acd32', name: 'Army Green' },
    'purple+black': { color: '#4b0082', name: 'Royal Purple' },
    'black+purple': { color: '#4b0082', name: 'Royal Purple' },
    'orange+black': { color: '#ff4500', name: 'Tiger Orange' },
    'black+orange': { color: '#ff4500', name: 'Tiger Orange' },
    'green+black': { color: '#006400', name: 'Jungle Green' },
    'black+green': { color: '#006400', name: 'Jungle Green' },

    // Secondary + Primary combinations (more advanced)
    'purple+yellow': { color: '#8b4513', name: 'Chocolate Brown' },
    'yellow+purple': { color: '#8b4513', name: 'Chocolate Brown' },
    'orange+blue': { color: '#708090', name: 'Storm Gray' },
    'blue+orange': { color: '#708090', name: 'Storm Gray' },
    'green+red': { color: '#a0522d', name: 'Earth Brown' },
    'red+green': { color: '#a0522d', name: 'Earth Brown' },

    // Special combinations
    'pink+blue': { color: '#dda0dd', name: 'Princess Lilac' },
    'blue+pink': { color: '#dda0dd', name: 'Princess Lilac' },
    'pink+yellow': { color: '#f0e68c', name: 'Banana Cream' },
    'yellow+pink': { color: '#f0e68c', name: 'Banana Cream' },
    'light blue+yellow': { color: '#98fb98', name: 'Ocean Mint' },
    'yellow+light blue': { color: '#98fb98', name: 'Ocean Mint' },
    'orange+pink': { color: '#ff69b4', name: 'Bubblegum Pink' },
    'pink+orange': { color: '#ff69b4', name: 'Bubblegum Pink' },
    'green+blue': { color: '#008b8b', name: 'Mermaid Teal' },
    'blue+green': { color: '#008b8b', name: 'Mermaid Teal' },
    'purple+pink': { color: '#da70d6', name: 'Unicorn Magenta' },
    'pink+purple': { color: '#da70d6', name: 'Unicorn Magenta' },

    // Black + White
    'black+white': { color: '#808080', name: 'Elephant Gray' },
    'white+black': { color: '#808080', name: 'Elephant Gray' }
};

