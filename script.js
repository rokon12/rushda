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

// Alphabet data
const alphabetData = {
    'A': 'Apple', 'B': 'Ball', 'C': 'Cat', 'D': 'Dog', 'E': 'Elephant',
    'F': 'Fish', 'G': 'Grapes', 'H': 'Hat', 'I': 'Ice cream', 'J': 'Jelly',
    'K': 'Kite', 'L': 'Lion', 'M': 'Moon', 'N': 'Nest', 'O': 'Orange',
    'P': 'Penguin', 'Q': 'Queen', 'R': 'Rainbow', 'S': 'Sun', 'T': 'Tree',
    'U': 'Umbrella', 'V': 'Violin', 'W': 'Watermelon', 'X': 'Xylophone', 
    'Y': 'Yacht', 'Z': 'Zebra'
};

// Spelling words organized by difficulty
const spellingWordsByDifficulty = {
    easy: [
        { word: 'CAT', image: 'cat.svg' },
        { word: 'DOG', image: 'dog.svg' },
        { word: 'SUN', image: 'sun.svg' },
        { word: 'HAT', image: 'h.svg' }
    ],
    medium: [
        { word: 'BALL', image: 'ball.svg' },
        { word: 'BOOK', image: 'book.svg' },
        { word: 'TREE', image: 'tree.svg' },
        { word: 'STAR', image: 'star.svg' },
        { word: 'FISH', image: 'fish.svg' },
        { word: 'BIRD', image: 'bird.svg' }
    ],
    hard: [
        { word: 'CAKE', image: 'cake.svg' },
        { word: 'MOON', image: 'm.svg' },
        { word: 'KITE', image: 'k.svg' },
        { word: 'LION', image: 'l.svg' }
    ]
};

// Start with easy words
let currentDifficulty = 'easy';
let spellingWords = spellingWordsByDifficulty.easy;

// Quiz questions data
const quizQuestions = {
    letters: [
        { question: "What letter is this?", content: "A", answers: ["A", "B", "C", "D"], correct: 0 },
        { question: "What letter is this?", content: "B", answers: ["A", "B", "C", "D"], correct: 1 },
        { question: "What letter is this?", content: "C", answers: ["A", "B", "C", "D"], correct: 2 },
        { question: "What letter comes after B?", content: "B ➡️ ?", answers: ["A", "C", "D", "E"], correct: 1 },
        { question: "What letter is this?", content: "🍎 = ?", answers: ["A", "B", "C", "D"], correct: 0 },
        { question: "What letter is this?", content: "🐱 = ?", answers: ["A", "B", "C", "D"], correct: 2 }
    ],
    numbers: [
        { question: "What number is this?", content: "1", answers: ["1", "2", "3", "4"], correct: 0 },
        { question: "What number is this?", content: "2", answers: ["1", "2", "3", "4"], correct: 1 },
        { question: "What number is this?", content: "3", answers: ["1", "2", "3", "4"], correct: 2 },
        { question: "What comes after 2?", content: "2 ➡️ ?", answers: ["1", "3", "4", "5"], correct: 1 },
        { question: "Count the stars", content: "⭐⭐⭐", answers: ["2", "3", "4", "5"], correct: 1 },
        { question: "Count the hearts", content: "❤️❤️", answers: ["1", "2", "3", "4"], correct: 1 }
    ],
    colors: [
        { question: "What color is this?", content: "🔴", answers: ["Red", "Blue", "Green", "Yellow"], correct: 0 },
        { question: "What color is this?", content: "🔵", answers: ["Red", "Blue", "Green", "Yellow"], correct: 1 },
        { question: "What color is this?", content: "🟢", answers: ["Red", "Blue", "Green", "Yellow"], correct: 2 },
        { question: "What color is this?", content: "🟡", answers: ["Red", "Blue", "Green", "Yellow"], correct: 3 },
        { question: "What color is the sun?", content: "☀️", answers: ["Red", "Blue", "Green", "Yellow"], correct: 3 },
        { question: "What color is grass?", content: "🌱", answers: ["Red", "Blue", "Green", "Yellow"], correct: 2 }
    ],
    shapes: [
        { question: "What shape is this?", content: "⭕", answers: ["Circle", "Square", "Triangle", "Star"], correct: 0 },
        { question: "What shape is this?", content: "⬜", answers: ["Circle", "Square", "Triangle", "Star"], correct: 1 },
        { question: "What shape is this?", content: "🔺", answers: ["Circle", "Square", "Triangle", "Star"], correct: 2 },
        { question: "What shape is this?", content: "⭐", answers: ["Circle", "Square", "Triangle", "Star"], correct: 3 },
        { question: "What shape is a ball?", content: "⚽", answers: ["Circle", "Square", "Triangle", "Star"], correct: 0 },
        { question: "What shape is a box?", content: "📦", answers: ["Circle", "Square", "Triangle", "Star"], correct: 1 }
    ]
};

// Memory game card sets
const memoryCardSets = {
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    emojis: ['🍎', '🐱', '🐕', '⭐', '🌙', '🌸', '🦋', '🌈', '🎵', '🎨', '🏀', '🚗'],
    shapes: ['⭕', '⬜', '🔺', '💎', '❤️', '⭐', '🌙', '☀️', '🔥', '💧', '🌿', '🎈']
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initializeAlphabet();
    initializeSpelling();
    initializeCounting();
    initializeQuiz();
    initializeMemoryGame();
    showSection('alphabet');
});

// Navigation
function showSection(section) {
    document.querySelectorAll('.learning-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
    currentSection = section;
    
    // Play sound when switching sections
    playSound('click');
}

// Alphabet Section
function initializeAlphabet() {
    const grid = document.getElementById('alphabetGrid');
    grid.innerHTML = '';
    
    for (let letter in alphabetData) {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = letter;
        btn.onclick = () => showLetter(letter);
        grid.appendChild(btn);
    }
}

function showLetter(letter) {
    document.getElementById('bigLetter').textContent = letter;
    document.getElementById('letterWord').textContent = `${letter} is for ${alphabetData[letter]}`;
    document.getElementById('alphabetImage').src = `images/${letter.toLowerCase()}.svg`;
    document.getElementById('alphabetImage').alt = alphabetData[letter];
    
    // Play letter sound
    playSound('letter');
    speak(`${letter} is for ${alphabetData[letter]}`);
}

// Spelling Section
function initializeSpelling() {
    updateProgress();
    loadSpellingWord();
}

function loadSpellingWord() {
    const word = spellingWords[currentSpellingWord];
    spellingProgress = new Array(word.word.length).fill('');
    selectedLetters = [];
    hintCount = 0;
    
    // Show image
    document.getElementById('spellingImage').style.display = 'block';
    document.getElementById('spellingImage').src = `images/${word.image}`;
    document.getElementById('spellingImage').alt = word.word;
    document.getElementById('wordLabel').textContent = word.word;
    
    // Announce what to spell
    const wordName = word.word.toLowerCase();
    speak(`Can you spell ${wordName}? ${wordName}`);
    
    // Create letter slots
    const wordToSpell = document.getElementById('wordToSpell');
    wordToSpell.innerHTML = '';
    for (let i = 0; i < word.word.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'letter-slot';
        slot.id = `slot-${i}`;
        slot.onclick = () => removeLetterFromSlot(i);
        wordToSpell.appendChild(slot);
    }
    
    // Create letter choices (scrambled)
    const letters = word.word.split('');
    const extraLetters = ['B', 'P', 'M', 'N', 'R', 'L', 'T', 'S'];
    const extraToAdd = extraLetters.filter(l => !letters.includes(l)).slice(0, Math.min(3, 6 - letters.length));
    const allLetters = [...letters, ...extraToAdd];
    const shuffled = allLetters.sort(() => Math.random() - 0.5);
    
    const letterChoices = document.getElementById('letterChoices');
    letterChoices.innerHTML = '';
    shuffled.forEach((letter, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-letter';
        btn.textContent = letter;
        btn.id = `choice-${index}`;
        btn.dataset.letter = letter;
        btn.onclick = () => selectLetter(letter, index);
        letterChoices.appendChild(btn);
    });
    
    // Clear any hint highlights
    document.querySelectorAll('.choice-letter').forEach(btn => btn.classList.remove('hint'));
}

function selectLetter(letter, btnIndex) {
    const word = spellingWords[currentSpellingWord].word;
    const nextEmptyIndex = spellingProgress.findIndex(slot => slot === '');
    
    if (nextEmptyIndex !== -1) {
        spellingProgress[nextEmptyIndex] = letter;
        selectedLetters[nextEmptyIndex] = btnIndex;
        document.getElementById(`slot-${nextEmptyIndex}`).textContent = letter;
        document.getElementById(`slot-${nextEmptyIndex}`).classList.add('filled');
        document.getElementById(`choice-${btnIndex}`).disabled = true;
        
        // Play different sounds based on correctness
        if (letter === word[nextEmptyIndex]) {
            playSound('click');
        } else {
            playSound('pop');
        }
        
        // Check if word is complete
        if (!spellingProgress.includes('')) {
            const isCorrect = spellingProgress.join('') === word;
            
            if (isCorrect) {
                // Correct!
                completedWords++;
                updateProgress();
                setTimeout(() => {
                    celebrate();
                    speak(`Great job! You spelled ${word}!`);
                }, 500);
            } else {
                // Wrong - shake the slots
                setTimeout(() => {
                    spellingProgress.forEach((letter, index) => {
                        if (letter !== word[index]) {
                            document.getElementById(`slot-${index}`).classList.add('wrong');
                        }
                    });
                    playSound('pop');
                    speak('Oops! Try again!');
                    
                    // Auto clear after 2 seconds
                    setTimeout(() => clearSpelling(), 2000);
                }, 500);
            }
        }
    }
}

function clearSpelling() {
    // Clear all slots
    spellingProgress = spellingProgress.map(() => '');
    selectedLetters.forEach((btnIndex, slotIndex) => {
        if (btnIndex !== undefined) {
            document.getElementById(`choice-${btnIndex}`).disabled = false;
        }
    });
    selectedLetters = [];
    
    // Clear slot displays
    document.querySelectorAll('.letter-slot').forEach((slot, index) => {
        slot.textContent = '';
        slot.classList.remove('filled', 'wrong');
    });
    
    // Clear hint highlights
    document.querySelectorAll('.choice-letter').forEach(btn => btn.classList.remove('hint'));
    
    playSound('click');
}

function removeLetterFromSlot(slotIndex) {
    if (spellingProgress[slotIndex] !== '') {
        const btnIndex = selectedLetters[slotIndex];
        if (btnIndex !== undefined) {
            document.getElementById(`choice-${btnIndex}`).disabled = false;
        }
        
        spellingProgress[slotIndex] = '';
        selectedLetters[slotIndex] = undefined;
        
        const slot = document.getElementById(`slot-${slotIndex}`);
        slot.textContent = '';
        slot.classList.remove('filled', 'wrong');
        
        playSound('pop');
    }
}

function showHint() {
    const word = spellingWords[currentSpellingWord].word;
    const nextEmptyIndex = spellingProgress.findIndex(slot => slot === '');
    
    if (nextEmptyIndex !== -1 && hintCount < 2) {
        const correctLetter = word[nextEmptyIndex];
        
        // Highlight all buttons with the correct letter
        document.querySelectorAll('.choice-letter').forEach(btn => {
            if (btn.dataset.letter === correctLetter && !btn.disabled) {
                btn.classList.add('hint');
            }
        });
        
        hintCount++;
        speak(`Look for the letter ${correctLetter}`);
        playSound('letter');
        
        // Remove hint after 3 seconds
        setTimeout(() => {
            document.querySelectorAll('.choice-letter').forEach(btn => btn.classList.remove('hint'));
        }, 3000);
    } else if (hintCount >= 2) {
        speak('Try to spell it yourself!');
    }
}

function updateProgress() {
    const percentage = (completedWords / spellingWords.length) * 100;
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${completedWords}/${spellingWords.length} Words`;
    
    // Check for difficulty progression
    if (completedWords === spellingWords.length && completedWords > 0) {
        setTimeout(() => {
            celebrate();
            
            // Progress to next difficulty
            if (currentDifficulty === 'easy' && completedWords >= 3) {
                currentDifficulty = 'medium';
                spellingWords = spellingWordsByDifficulty.medium;
                speak('Amazing! Now let\'s try some harder words!');
            } else if (currentDifficulty === 'medium' && completedWords >= 4) {
                currentDifficulty = 'hard';
                spellingWords = spellingWordsByDifficulty.hard;
                speak('Excellent! Ready for a challenge?');
            } else {
                speak('Amazing! You completed all the words!');
            }
            
            completedWords = 0; // Reset for next round
            currentSpellingWord = 0;
            setTimeout(() => loadSpellingWord(), 2000);
        }, 1000);
    }
}

function nextWord() {
    currentSpellingWord = (currentSpellingWord + 1) % spellingWords.length;
    loadSpellingWord();
    playSound('click');
}

// Counting Section
function initializeCounting() {
    createNumberButtons();
    showNumber(1);
}

function createNumberButtons() {
    const container = document.getElementById('numberButtons');
    container.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = 'number-btn';
        btn.textContent = i;
        btn.onclick = () => showNumber(i);
        container.appendChild(btn);
    }
}

function showNumber(num) {
    currentNumber = num;
    document.getElementById('numberDisplay').textContent = num;
    
    const container = document.getElementById('objectsContainer');
    container.innerHTML = '';
    
    // Use different emojis for different numbers
    const emojis = ['🌟', '🎈', '🍎', '🌺', '🦋', '🌈', '🎨', '🎵', '🌸', '🎪'];
    const emoji = emojis[num - 1] || '⭐';
    
    for (let i = 0; i < num; i++) {
        setTimeout(() => {
            const obj = document.createElement('div');
            obj.className = 'count-object';
            obj.textContent = emoji;
            container.appendChild(obj);
            playSound('pop');
        }, i * 200);
    }
    
    speak(`${num} ${num === 1 ? 'item' : 'items'}`);
}

// Celebration
function celebrate() {
    const celebration = document.getElementById('celebration');
    celebration.classList.add('show');
    playSound('success');
}

function closeCelebration() {
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('show');
    if (currentSection === 'spelling') {
        nextWord();
    }
}

// Audio context (create once and reuse)
let audioContext = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Sound effects with more pleasant tones
function playSound(type) {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    switch(type) {
        case 'click':
            playTone(ctx, 600, 0.05, 0.1, 'sine');
            playTone(ctx, 900, 0.05, 0.1, 'sine', 0.05);
            break;
        case 'letter':
            playTone(ctx, 400, 0.1, 0.2, 'sine');
            playTone(ctx, 800, 0.08, 0.2, 'triangle', 0.05);
            break;
        case 'pop':
            // Bubble pop effect
            const popOsc = ctx.createOscillator();
            const popGain = ctx.createGain();
            popOsc.connect(popGain);
            popGain.connect(ctx.destination);
            popOsc.type = 'sine';
            popOsc.frequency.setValueAtTime(1000, now);
            popOsc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
            popGain.gain.setValueAtTime(0.2, now);
            popGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            popOsc.start(now);
            popOsc.stop(now + 0.1);
            break;
        case 'success':
            // Happy melody
            playTone(ctx, 523.25, 0.2, 0.15, 'sine'); // C
            playTone(ctx, 659.25, 0.2, 0.15, 'sine', 0.15); // E
            playTone(ctx, 783.99, 0.2, 0.15, 'sine', 0.3); // G
            playTone(ctx, 1046.5, 0.3, 0.2, 'sine', 0.45); // C
            break;
    }
}

function playTone(ctx, frequency, volume, duration, type = 'sine', delay = 0) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = frequency;
    
    // Smooth envelope
    gain.gain.setValueAtTime(0, now + delay);
    gain.gain.linearRampToValueAtTime(volume, now + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
    
    osc.start(now + delay);
    osc.stop(now + delay + duration);
}

// Enhanced text to speech with better voice selection
function speak(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85; // Slightly slower for toddlers
        utterance.pitch = 1.1; // Natural pitch
        utterance.volume = 0.9;
        
        // Try to find a child-friendly voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoices = voices.filter(voice => 
            voice.name.includes('Female') || 
            voice.name.includes('Samantha') ||
            voice.name.includes('Victoria') ||
            voice.name.includes('Karen') ||
            voice.name.includes('Google US English Female') ||
            voice.name.includes('Microsoft Zira')
        );
        
        if (preferredVoices.length > 0) {
            utterance.voice = preferredVoices[0];
        }
        
        // Add visual feedback when speaking
        utterance.onstart = () => {
            document.body.classList.add('speaking');
        };
        
        utterance.onend = () => {
            document.body.classList.remove('speaking');
        };
        
        window.speechSynthesis.speak(utterance);
    }
}

// Load voices when ready
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        // Voices loaded
    };
}

// Quiz Section Functions
function initializeQuiz() {
    loadQuizQuestion();
}

function selectQuizCategory(category) {
    currentQuizCategory = category;
    currentQuizQuestion = 0;
    answeredQuestions = 0;
    
    // Update category buttons
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    loadQuizQuestion();
    playSound('click');
}

function getQuizQuestions() {
    if (currentQuizCategory === 'all') {
        // Combine all categories
        const allQuestions = [];
        Object.values(quizQuestions).forEach(categoryQuestions => {
            allQuestions.push(...categoryQuestions);
        });
        return allQuestions;
    }
    return quizQuestions[currentQuizCategory] || [];
}

function loadQuizQuestion() {
    const questions = getQuizQuestions();
    if (questions.length === 0) return;
    
    const question = questions[currentQuizQuestion % questions.length];
    
    // Update question
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionContent').textContent = question.content;
    
    // Create answer buttons
    const answersContainer = document.getElementById('quizAnswers');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.onclick = () => selectAnswer(index, question.correct);
        answersContainer.appendChild(btn);
    });
    
    // Hide next question button
    document.getElementById('nextQuestionBtn').style.display = 'none';
    
    // Read the question aloud
    speak(question.question);
}

function selectAnswer(selectedIndex, correctIndex) {
    const answerButtons = document.querySelectorAll('.answer-btn');
    const isCorrect = selectedIndex === correctIndex;
    
    // Disable all buttons
    answerButtons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        // Correct answer
        answerButtons[selectedIndex].classList.add('correct');
        quizScore++;
        quizStreak++;
        playSound('success');
        speak('Correct! Great job!');
        
        // Celebrate if streak is high
        if (quizStreak % 5 === 0) {
            setTimeout(() => celebrate(), 500);
        }
    } else {
        // Wrong answer
        answerButtons[selectedIndex].classList.add('wrong');
        answerButtons[correctIndex].classList.add('correct');
        quizStreak = 0;
        playSound('pop');
        speak(`Oops! The correct answer is ${answerButtons[correctIndex].textContent}`);
    }
    
    answeredQuestions++;
    updateQuizScore();
    
    // Show next question button
    setTimeout(() => {
        document.getElementById('nextQuestionBtn').style.display = 'block';
    }, 2000);
}

function updateQuizScore() {
    document.getElementById('quizScore').textContent = quizScore;
    document.getElementById('quizStreak').textContent = quizStreak;
    
    // Special celebration for high scores
    if (answeredQuestions > 0 && answeredQuestions % 10 === 0) {
        setTimeout(() => {
            celebrate();
            speak(`Amazing! You've answered ${answeredQuestions} questions!`);
        }, 1000);
    }
}

function nextQuestion() {
    currentQuizQuestion++;
    loadQuizQuestion();
    playSound('click');
}

// Memory Game Functions
function initializeMemoryGame() {
    startNewMemoryGame();
}

function setMemoryDifficulty(difficulty) {
    memoryDifficulty = difficulty;
    
    // Update difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    startNewMemoryGame();
    playSound('click');
}

function getCardCount() {
    switch(memoryDifficulty) {
        case 'easy': return 4; // 2 pairs
        case 'medium': return 8; // 4 pairs
        case 'hard': return 12; // 6 pairs
        default: return 4;
    }
}

function startNewMemoryGame() {
    // Reset game state
    memoryCards = [];
    flippedCards = [];
    matchedCards = [];
    memoryMoves = 0;
    memoryMatches = 0;
    memoryStartTime = Date.now();
    canFlipCards = true;
    
    // Clear existing timer
    if (memoryTimer) {
        clearInterval(memoryTimer);
    }
    
    // Create cards
    createMemoryCards();
    updateMemoryStats();
    updateMemoryMessage("Find all the matching pairs!");
    
    // Start timer
    memoryTimer = setInterval(updateMemoryTime, 1000);
    
    speak("Memory game started! Find the matching pairs!");
}

function createMemoryCards() {
    const cardCount = getCardCount();
    const pairCount = cardCount / 2;
    
    // Get random cards from different sets
    const allCards = [
        ...memoryCardSets.letters.slice(0, 3),
        ...memoryCardSets.numbers.slice(0, 3),
        ...memoryCardSets.emojis.slice(0, 3),
        ...memoryCardSets.shapes.slice(0, 3)
    ];
    
    // Select cards for this game
    const selectedCards = allCards.slice(0, pairCount);
    const gameCards = [...selectedCards, ...selectedCards]; // Create pairs
    
    // Shuffle the cards
    gameCards.sort(() => Math.random() - 0.5);
    
    // Create card objects
    memoryCards = gameCards.map((content, index) => ({
        id: index,
        content: content,
        isFlipped: false,
        isMatched: false
    }));
    
    renderMemoryBoard();
}

function renderMemoryBoard() {
    const board = document.getElementById('memoryBoard');
    board.className = `memory-board ${memoryDifficulty}`;
    board.innerHTML = '';
    
    memoryCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.onclick = () => flipCard(index);
        
        const cardColor = getCardColor(card.content);
        
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front ${cardColor}">${card.content}</div>
                <div class="card-back"></div>
            </div>
        `;
        
        board.appendChild(cardElement);
    });
}

function getCardColor(content) {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const hash = content.charCodeAt(0) + content.length;
    return colors[hash % colors.length];
}

function flipCard(cardIndex) {
    if (!canFlipCards) return;
    
    const card = memoryCards[cardIndex];
    const cardElement = document.querySelectorAll('.memory-card')[cardIndex];
    
    // Can't flip if already flipped or matched
    if (card.isFlipped || card.isMatched) return;
    
    // Can't flip more than 2 cards
    if (flippedCards.length >= 2) return;
    
    // Flip the card
    card.isFlipped = true;
    cardElement.classList.add('flipped');
    flippedCards.push(cardIndex);
    
    playSound('click');
    
    // Check if we have 2 flipped cards
    if (flippedCards.length === 2) {
        memoryMoves++;
        updateMemoryStats();
        
        setTimeout(() => {
            checkForMatch();
        }, 1000);
    }
}

function checkForMatch() {
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = memoryCards[firstIndex];
    const secondCard = memoryCards[secondIndex];
    
    const firstElement = document.querySelectorAll('.memory-card')[firstIndex];
    const secondElement = document.querySelectorAll('.memory-card')[secondIndex];
    
    if (firstCard.content === secondCard.content) {
        // Match found!
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        firstElement.classList.add('matched');
        secondElement.classList.add('matched');
        
        memoryMatches++;
        matchedCards.push(firstIndex, secondIndex);
        
        playSound('success');
        speak('Great match!');
        
        // Check if game is complete
        if (memoryMatches === getCardCount() / 2) {
            gameComplete();
        }
    } else {
        // No match - flip cards back
        firstCard.isFlipped = false;
        secondCard.isFlipped = false;
        firstElement.classList.remove('flipped');
        secondElement.classList.remove('flipped');
        
        playSound('pop');
    }
    
    // Clear flipped cards array
    flippedCards = [];
    updateMemoryStats();
}

function gameComplete() {
    clearInterval(memoryTimer);
    canFlipCards = false;
    
    const finalTime = Math.floor((Date.now() - memoryStartTime) / 1000);
    
    setTimeout(() => {
        celebrate();
        speak(`Fantastic! You completed the memory game in ${memoryMoves} moves and ${finalTime} seconds!`);
        updateMemoryMessage(`🎉 Completed in ${memoryMoves} moves and ${finalTime} seconds!`);
    }, 500);
}

function updateMemoryStats() {
    document.getElementById('memoryMoves').textContent = memoryMoves;
    document.getElementById('memoryMatches').textContent = `${memoryMatches}/${getCardCount() / 2}`;
}

function updateMemoryTime() {
    const elapsed = Math.floor((Date.now() - memoryStartTime) / 1000);
    document.getElementById('memoryTime').textContent = `${elapsed}s`;
}

function updateMemoryMessage(message) {
    document.getElementById('memoryMessage').textContent = message;
}