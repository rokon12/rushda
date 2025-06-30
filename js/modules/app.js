// Loading sequence
function startLoadingSequence() {
    const loadingBar = document.getElementById('loadingBar');
    let progress = 0;

    const loadingSteps = [
        { text: 'Loading letters...', duration: 500 },
        { text: 'Preparing sounds...', duration: 800 },
        { text: 'Setting up achievements...', duration: 400 },
        { text: 'Creating magic...', duration: 600 },
        { text: 'Almost ready!', duration: 300 }
    ];

    let currentStep = 0;

    function nextStep() {
        if (currentStep < loadingSteps.length) {
            const step = loadingSteps[currentStep];
            progress += 20;
            loadingBar.style.width = progress + '%';

            setTimeout(() => {
                currentStep++;
                nextStep();
            }, step.duration);
        } else {
            // Loading complete
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 500);
        }
    }

    nextStep();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    startLoadingSequence();

    setTimeout(() => {
        initializeAchievements();
        createFloatingElements();
        initializeAlphabet();
        initializeLowercase();
        initializePhonics();
        initializeBangla();
        initializeArabic();
        initializeSpelling();
        initializeCounting();
        initializeQuiz();
        initializeMemoryGame();
        initializeNurseryRhymes();
        initializeDrawing();
        initializeStorybooks();
        showSection('alphabet');
    }, 1000);
});

// Navigation
function showSection(section) {
    const currentActive = document.querySelector('.learning-section.active');
    const targetSection = document.getElementById(section);

    // Check if targetSection exists
    if (!targetSection) {
        console.error(`Section with ID "${section}" not found`);
        return;
    }

    if (currentActive && currentActive !== targetSection) {
        // Add exit animation to current section
        currentActive.classList.add('slide-out-left');

        setTimeout(() => {
            // Remove active class from current section
            currentActive.classList.remove('active', 'slide-out-left');

            // Show and animate new section
            targetSection.classList.add('active');
            targetSection.classList.add('slide-in-right');

            // Remove animation class after animation completes
            setTimeout(() => {
                targetSection.classList.remove('slide-in-right');
            }, 500);

        }, 250);
    } else {
        // First load or same section
        document.querySelectorAll('.learning-section').forEach(sec => {
            sec.classList.remove('active');
        });
        targetSection.classList.add('active');
        targetSection.classList.add('scale-in');
        setTimeout(() => {
            targetSection.classList.remove('scale-in');
        }, 500);
    }

    currentSection = section;

    // Initialize specific sections when shown
    if (section === 'arabic') {
        setTimeout(() => {
            initializeArabic();
        }, 300);
    }

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

    // Find the clicked button and enhance it
    const clickedButton = event ? event.target : null;
    if (clickedButton && clickedButton.classList.contains('letter-btn')) {
        enhanceLetterClick(clickedButton, letter);
    }

    // Play letter sound
    playSound('letter');
    speak(`${letter} is for ${alphabetData[letter]}`);
}

// Lowercase Letters Section
function initializeLowercase() {
    const grid = document.getElementById('lowercaseGrid');
    grid.innerHTML = '';

    for (let letter in alphabetData) {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = letter.toLowerCase();
        btn.onclick = () => showLowercaseLetter(letter.toLowerCase());
        grid.appendChild(btn);
    }
}

function showLowercaseLetter(letter) {
    const uppercaseLetter = letter.toUpperCase();
    document.getElementById('lowercaseBigLetter').textContent = letter;
    document.getElementById('lowercaseLetterWord').textContent = `${letter} is for ${alphabetData[uppercaseLetter].toLowerCase()}`;
    document.getElementById('lowercaseAlphabetImage').src = `images/${letter}.svg`;
    document.getElementById('lowercaseAlphabetImage').alt = alphabetData[uppercaseLetter];

    // Find the clicked button and enhance it
    const clickedButton = event ? event.target : null;
    if (clickedButton && clickedButton.classList.contains('letter-btn')) {
        enhanceLetterClick(clickedButton, letter);
    }

    // Play letter sound
    playSound('letter');
    speak(`${letter} is for ${alphabetData[uppercaseLetter].toLowerCase()}`);
}

// Phonics Section
function initializePhonics() {
    generateConsonantGrid();
    updatePhonicsDisplay();
}

function generateConsonantGrid() {
    const grid = document.getElementById('consonantGrid');
    grid.innerHTML = '';

    phonicsData.consonants.forEach(consonant => {
        const btn = document.createElement('button');
        btn.className = 'consonant-btn';
        btn.textContent = consonant + currentVowel.toLowerCase();
        btn.onclick = () => selectConsonant(consonant);
        grid.appendChild(btn);
    });
}

function selectVowel(vowel) {
    // Update active vowel button
    document.querySelectorAll('.vowel-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-vowel="${vowel}"]`).classList.add('active');

    currentVowel = vowel;
    generateConsonantGrid();
    updatePhonicsDisplay();

    // Play vowel sound
    playSound('click');
    speak(`${vowel.toUpperCase()} ${phonicsData.vowels[vowel].description}`);
}

function selectConsonant(consonant) {
    currentConsonant = consonant;
    updatePhonicsDisplay();

    // Play consonant-vowel combination
    playSound('click');
    const combination = consonant + currentVowel.toLowerCase();
    speak(`${consonant} ${phonicsData.consonantSounds[consonant]} with ${currentVowel.toUpperCase()} ${phonicsData.vowels[currentVowel].sound} makes ${combination}`);
}

function updatePhonicsDisplay() {
    const combination = currentConsonant + currentVowel.toLowerCase();
    document.getElementById('currentSound').textContent = combination;

    const description = `${currentConsonant} makes "${phonicsData.consonantSounds[currentConsonant]}" sound with ${currentVowel.toUpperCase()} makes "${phonicsData.vowels[currentVowel].sound}" = "${combination}"`;
    document.getElementById('soundDescription').textContent = description;
}

function playCurrentSound() {
    const combination = currentConsonant + currentVowel.toLowerCase();
    playSound('letter');
    speak(combination, 0.8); // Slower speech for pronunciation
}

function startPhonicsGame() {
    phonicsGameActive = true;
    document.getElementById('phonicsGame').style.display = 'block';
    generatePhonicsQuestion();
}

function generatePhonicsQuestion() {
    // Pick a random consonant and vowel
    const randomConsonant = phonicsData.consonants[Math.floor(Math.random() * phonicsData.consonants.length)];
    const randomVowel = Object.keys(phonicsData.vowels)[Math.floor(Math.random() * 5)];
    const correctAnswer = randomConsonant + randomVowel;

    document.getElementById('gameQuestion').textContent = `Find "${correctAnswer}"`;

    // Generate 4 options including the correct answer
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomC = phonicsData.consonants[Math.floor(Math.random() * phonicsData.consonants.length)];
        const randomV = Object.keys(phonicsData.vowels)[Math.floor(Math.random() * 5)];
        const option = randomC + randomV;
        if (!options.includes(option)) {
            options.push(option);
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    // Create option buttons
    const optionsContainer = document.getElementById('soundOptions');
    optionsContainer.innerHTML = '';

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkPhonicsAnswer(option, correctAnswer, btn);
        optionsContainer.appendChild(btn);
    });

    // Speak the question
    speak(`Find ${correctAnswer}`);
}

function checkPhonicsAnswer(selected, correct, button) {
    if (selected === correct) {
        button.classList.add('correct');
        phonicsScore++;
        playSound('success');
        speak('Correct! Great job!');

        setTimeout(() => {
            generatePhonicsQuestion();
        }, 1500);
    } else {
        button.classList.add('wrong');
        playSound('error');
        speak(`Not quite! The answer is ${correct}`);

        // Highlight correct answer
        setTimeout(() => {
            const correctBtn = Array.from(document.querySelectorAll('.option-btn'))
                .find(btn => btn.textContent === correct);
            if (correctBtn) correctBtn.classList.add('correct');
        }, 500);

        setTimeout(() => {
            generatePhonicsQuestion();
        }, 2500);
    }

    document.getElementById('phonicsScore').textContent = phonicsScore;

    // Disable all buttons temporarily
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        setTimeout(() => btn.disabled = false, 1500);
    });
}

// Bangla Letters Section
function initializeBangla() {
    generateBanglaGrid();
    updateBanglaDisplay();
}

function selectBanglaCategory(category) {
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    currentBanglaCategory = category;
    currentBanglaLetter = category === 'vowels' ? 'অ' : 'ক';
    generateBanglaGrid();
    updateBanglaDisplay();

    playSound('click');
    // const categoryName = category === 'vowels' ? 'স্বরবর্ণ' : 'ব্যঞ্জনবর্ণ';
    // speakBengali(`${categoryName} নির্বাচিত হয়েছে`);
}

function generateBanglaGrid() {
    const grid = document.getElementById('banglaGrid');
    grid.innerHTML = '';

    const letters = banglaAlphabet[currentBanglaCategory];

    Object.keys(letters).forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'bangla-letter-btn';
        btn.textContent = letter;
        btn.onclick = () => selectBanglaLetter(letter);
        grid.appendChild(btn);
    });
}

function selectBanglaLetter(letter) {
    currentBanglaLetter = letter;
    updateBanglaDisplay();

    // Find the clicked button and enhance it
    const clickedButton = event ? event.target : null;
    if (clickedButton && clickedButton.classList.contains('bangla-letter-btn')) {
        enhanceLetterClick(clickedButton, letter);
    }

    // Play letter sound with proper Bengali letter name
    playSound('letter');
    // const letterData = banglaAlphabet[currentBanglaCategory][letter];
    // speakBengali(`${letterData.letterName}। ${letterData.word}`);
}

function updateBanglaDisplay() {
    const letterData = banglaAlphabet[currentBanglaCategory][currentBanglaLetter];

    document.getElementById('banglaBigLetter').textContent = currentBanglaLetter;
    document.getElementById('banglaPronunciation').textContent = `${currentBanglaLetter} (${letterData.pronunciation})`;
    document.getElementById('banglaWord').textContent = letterData.word;
    document.getElementById('banglaWordMeaning').textContent = letterData.meaning;

    // Update image
    const imageElement = document.getElementById('banglaAlphabetImage');
    if (imageElement) {
        imageElement.src = `images/bangla/${currentBanglaLetter}.svg`;
        imageElement.alt = letterData.word;

        // Fallback to common word images if letter-specific image doesn't exist
        imageElement.onerror = function() {
            // Try with word name instead
            this.src = `images/bangla/${letterData.word}.svg`;
            this.onerror = function() {
                // Final fallback to a default image
                this.src = `images/bangla/default.svg`;
                this.onerror = null; // Prevent infinite loop
            };
        };
    }
}

function playBanglaLetter() {
    const letterData = banglaAlphabet[currentBanglaCategory][currentBanglaLetter];
    playSound('letter');
    // speakBengali(`${letterData.letterName}। ${letterData.word}`, 0.6); // Slower for clear pronunciation
}

function startBanglaGame() {
    banglaGameActive = true;
    document.getElementById('banglaGame').style.display = 'block';
    generateBanglaQuestion();
}

function generateBanglaQuestion() {
    const letters = Object.keys(banglaAlphabet[currentBanglaCategory]);
    const correctLetter = letters[Math.floor(Math.random() * letters.length)];
    const letterData = banglaAlphabet[currentBanglaCategory][correctLetter];

    document.getElementById('banglaGameQuestion').innerHTML = `
        <div class="question-text">কোনটি "${correctLetter}" (${letterData.pronunciation})?</div>
    `;

    // Generate 4 options including the correct answer
    const options = [correctLetter];
    while (options.length < 4) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        if (!options.includes(randomLetter)) {
            options.push(randomLetter);
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    // Create option buttons
    const optionsContainer = document.getElementById('banglaOptions');
    optionsContainer.innerHTML = '';

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'bangla-option-btn';
        btn.textContent = option;
        btn.onclick = () => checkBanglaAnswer(option, correctLetter, btn);
        optionsContainer.appendChild(btn);
    });

    // Speak the question using proper letter name
    // speakBengali(`কোনটি ${letterData.letterName}?`);
}

function checkBanglaAnswer(selected, correct, button) {
    if (selected === correct) {
        button.classList.add('correct');
        banglaScore++;
        playSound('success');
        // speakBengali('সঠিক! খুব ভালো!');

        setTimeout(() => {
            generateBanglaQuestion();
        }, 1500);
    } else {
        button.classList.add('wrong');
        playSound('error');
        // const correctData = banglaAlphabet[currentBanglaCategory][correct];
        // speakBengali(`ভুল! সঠিক উত্তর হলো ${correctData.letterName}। ${correctData.word}`);

        // Highlight correct answer
        setTimeout(() => {
            const correctBtn = Array.from(document.querySelectorAll('.bangla-option-btn'))
                .find(btn => btn.textContent === correct);
            if (correctBtn) correctBtn.classList.add('correct');
        }, 500);

        setTimeout(() => {
            generateBanglaQuestion();
        }, 2500);
    }

    // Update score display (convert to Bangla numerals)
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const banglaScoreText = banglaScore.toString().split('').map(digit => banglaNumbers[parseInt(digit)]).join('');
    document.getElementById('banglaScore').textContent = banglaScoreText;

    // Disable all buttons temporarily
    document.querySelectorAll('.bangla-option-btn').forEach(btn => {
        btn.disabled = true;
        setTimeout(() => btn.disabled = false, 1500);
    });
}

// Test Bengali voice function
function testBengaliVoice() {
    console.log('Testing Bengali voice...');
    const testText = 'আসসালামু আলাইকুম! আমি বাংলায় কথা বলতে পারি।';
    // speakBengali(testText);

    // Also show instructions for installing Bengali voices
    alert(`Bengali Voice Test

Text: "${testText}"

If you don't hear Bengali pronunciation:

For Chrome/Edge:
1. Go to chrome://settings/languages
2. Add Bengali (বাংলা)
3. Enable "Use this language for spell check"
4. Restart browser

For Mac:
1. System Preferences > Accessibility > Speech
2. Click "System Voice" > "Customize"
3. Download Bengali voices

For Windows:
1. Settings > Time & Language > Speech
2. Add Bengali language pack
3. Download Bengali speech voices

The app will work with English pronunciation if Bengali voices aren't available.`);
}

// Arabic Letters Section
function initializeArabic() {
    generateArabicGrid();
    updateArabicDisplay();
}

function generateArabicGrid() {
    const arabicGrid = document.getElementById('arabicGrid');
    if (!arabicGrid) return;

    arabicGrid.innerHTML = '';

    Object.keys(arabicAlphabet).forEach(letter => {
        const letterBtn = document.createElement('button');
        letterBtn.className = 'letter-btn arabic-letter-btn';
        letterBtn.textContent = letter;
        letterBtn.onclick = () => selectArabicLetter(letter);
        letterBtn.setAttribute('aria-label', `Arabic letter ${letter}`);
        arabicGrid.appendChild(letterBtn);
    });
}

function selectArabicLetter(letter) {
    currentArabicLetter = letter;
    updateArabicDisplay();

    // Remove active class from all buttons
    document.querySelectorAll('.arabic-letter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to selected button and enhance it
    const clickedButton = event.target;
    clickedButton.classList.add('active');

    if (clickedButton && clickedButton.classList.contains('arabic-letter-btn')) {
        enhanceLetterClick(clickedButton, letter);
    }
}

function updateArabicDisplay() {
    const letterData = arabicAlphabet[currentArabicLetter];

    // Update big letter display
    const bigLetter = document.getElementById('arabicBigLetter');
    if (bigLetter) bigLetter.textContent = currentArabicLetter;

    // Update pronunciation
    const pronunciation = document.getElementById('arabicPronunciation');
    if (pronunciation) pronunciation.textContent = `${currentArabicLetter} (${letterData.pronunciation})`;

    // Update word and meaning
    const word = document.getElementById('arabicWord');
    if (word) word.textContent = letterData.word;

    const meaning = document.getElementById('arabicWordMeaning');
    if (meaning) meaning.textContent = letterData.meaning;

    // Update image
    const imageElement = document.getElementById('arabicAlphabetImage');
    if (imageElement) {
        imageElement.src = `images/arabic/${currentArabicLetter}.svg`;
        imageElement.alt = letterData.word;
        imageElement.onerror = function() {
            this.src = `images/arabic/${letterData.word}.svg`;
            this.onerror = function() {
                this.src = `images/arabic/default.svg`;
                this.onerror = null;
            };
        };
    }
}

function playArabicLetter() {
    const letterData = arabicAlphabet[currentArabicLetter];
    const textToSpeak = `${letterData.pronunciation}. ${letterData.word}`;

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'ar-SA'; // Arabic Saudi Arabia
        utterance.rate = 0.8;
        utterance.pitch = 1.1;

        // Try to find Arabic voice
        const voices = window.speechSynthesis.getVoices();
        const arabicVoice = voices.find(voice => 
            voice.lang.startsWith('ar') || 
            voice.name.toLowerCase().includes('arabic')
        );

        if (arabicVoice) {
            utterance.voice = arabicVoice;
        }

        window.speechSynthesis.speak(utterance);
    }
}

function startArabicGame() {
    const gameDiv = document.getElementById('arabicGame');
    if (!gameDiv) return;

    arabicGameActive = true;
    gameDiv.style.display = 'block';
    generateArabicQuestion();
}

function generateArabicQuestion() {
    const letters = Object.keys(arabicAlphabet);
    const correctLetter = letters[Math.floor(Math.random() * letters.length)];
    const questionDiv = document.getElementById('arabicGameQuestion');
    const optionsDiv = document.getElementById('arabicOptions');

    if (!questionDiv || !optionsDiv) return;

    questionDiv.innerHTML = `<div class="question-text">أين "${correctLetter}"؟</div>`;

    // Generate wrong answers
    const wrongAnswers = letters.filter(l => l !== correctLetter)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    const allOptions = [correctLetter, ...wrongAnswers].sort(() => Math.random() - 0.5);

    optionsDiv.innerHTML = '';
    allOptions.forEach(letter => {
        const button = document.createElement('button');
        button.className = 'option-btn arabic-option-btn';
        button.textContent = letter;
        button.onclick = () => checkArabicAnswer(letter, correctLetter, button);
        optionsDiv.appendChild(button);
    });
}

function checkArabicAnswer(selected, correct, button) {
    if (!arabicGameActive) return;

    const allButtons = document.querySelectorAll('.arabic-option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        button.classList.add('correct');
        arabicGameScore += 10;
        setTimeout(() => {
            generateArabicQuestion();
            allButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('correct', 'wrong');
            });
        }, 1500);
    } else {
        button.classList.add('wrong');
        allButtons.forEach(btn => {
            if (btn.textContent === correct) {
                btn.classList.add('correct');
            }
        });
        setTimeout(() => {
            generateArabicQuestion();
            allButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('correct', 'wrong');
            });
        }, 2000);
    }

    // Update score display
    const scoreElement = document.getElementById('arabicScore');
    if (scoreElement) scoreElement.textContent = arabicGameScore.toString();
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
            createSoundWaves(600, 'small');
            break;
        case 'letter':
            playTone(ctx, 400, 0.1, 0.2, 'sine');
            playTone(ctx, 800, 0.08, 0.2, 'triangle', 0.05);
            // Temporarily disabled to check if this causes the oval
            // createSoundWaves(400, 'medium');
            animateVolumeReactiveElements();
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
            createSoundWaves(1000, 'pop');
            break;
        case 'success':
            // Happy melody
            playTone(ctx, 523.25, 0.2, 0.15, 'sine'); // C
            playTone(ctx, 659.25, 0.2, 0.15, 'sine', 0.15); // E
            playTone(ctx, 783.99, 0.2, 0.15, 'sine', 0.3); // G
            playTone(ctx, 1046.5, 0.3, 0.2, 'sine', 0.45); // C
            createSuccessWaves();
            animateVolumeReactiveElements();
            break;
    }
}

function createSoundWaves(frequency, intensity = 'medium') {
    const container = document.getElementById('floatingElements');
    if (!container) return;

    const sizes = {
        small: { count: 2, maxScale: 2, duration: 800 },
        medium: { count: 3, maxScale: 3, duration: 1000 },
        pop: { count: 4, maxScale: 4, duration: 600 },
        large: { count: 5, maxScale: 5, duration: 1200 }
    };

    const config = sizes[intensity] || sizes.medium;

    // Create sound wave ripples
    for (let i = 0; i < config.count; i++) {
        const wave = document.createElement('div');
        wave.style.position = 'fixed';
        wave.style.top = '50%';
        wave.style.left = '50%';
        wave.style.width = '20px';
        wave.style.height = '20px';
        wave.style.border = `2px solid rgba(78, 205, 196, ${0.8 - i * 0.2})`;
        wave.style.borderRadius = '50%';
        wave.style.transform = 'translate(-50%, -50%)';
        wave.style.pointerEvents = 'none';
        wave.style.zIndex = '10';

        container.appendChild(wave);

        // Animate the wave based on frequency
        const colorIntensity = Math.min(255, frequency / 4);
        wave.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0)', 
                opacity: 1,
                borderColor: `rgb(${colorIntensity}, 205, 196)`
            },
            { 
                transform: `translate(-50%, -50%) scale(${config.maxScale})`, 
                opacity: 0,
                borderColor: `rgb(${colorIntensity}, 100, 150)`
            }
        ], {
            duration: config.duration + (i * 150),
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        });
    }
}

function createSuccessWaves() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.style.position = 'fixed';
            wave.style.top = Math.random() * 100 + '%';
            wave.style.left = Math.random() * 100 + '%';
            wave.style.width = '30px';
            wave.style.height = '30px';
            wave.style.background = colors[i];
            wave.style.borderRadius = '50%';
            wave.style.pointerEvents = 'none';
            wave.style.zIndex = '10';

            document.getElementById('floatingElements').appendChild(wave);

            wave.animate([
                { transform: 'scale(0) rotate(0deg)', opacity: 1 },
                { transform: 'scale(3) rotate(360deg)', opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out'
            }).addEventListener('finish', () => {
                if (wave.parentNode) {
                    wave.parentNode.removeChild(wave);
                }
            });
        }, i * 100);
    }
}

function animateVolumeReactiveElements() {
    // Make letters pulse with sound
    const currentSection = document.querySelector('.learning-section.active');
    if (currentSection) {
        const letters = currentSection.querySelectorAll('.letter-btn');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.transform = 'scale(1.05)';
                letter.style.filter = 'brightness(1.2)';
                setTimeout(() => {
                    letter.style.transform = '';
                    letter.style.filter = '';
                }, 200);
            }, index * 50);
        });
    }

    // Animate floating bubbles
    const bubbles = document.querySelectorAll('.floating-bubble');
    bubbles.forEach(bubble => {
        bubble.style.animation = 'none';
        bubble.offsetHeight; // Force reflow
        bubble.style.animation = 'floatingBubbles 2s ease-in-out';
    });

    // Pulse the background
    document.body.style.animation = 'none';
    document.body.offsetHeight; // Force reflow
    document.body.style.animation = 'backgroundShift 3s ease infinite';
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
function speak(text, rate = 0.85) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate; // Adjustable rate
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

// Bengali text to speech with better voice detection
function speakBengali(text, rate = 0.7) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Force reload voices if empty
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            // Wait a bit and try again
            setTimeout(() => speakBengali(text, rate), 100);
            return;
        }

        console.log('All available voices:', voices.map(v => `${v.name} (${v.lang})`));

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = 1.0;
        utterance.volume = 0.9;

        // Try to find Bengali voices (more comprehensive search)
        let selectedVoice = null;

        // First try: Bengali voices
        const bengaliVoices = voices.filter(voice => 
            voice.lang.toLowerCase().includes('bn') || 
            voice.name.toLowerCase().includes('bengali') ||
            voice.name.toLowerCase().includes('bangla')
        );

        if (bengaliVoices.length > 0) {
            selectedVoice = bengaliVoices[0];
            utterance.lang = 'bn-BD';
            console.log('Using Bengali voice:', selectedVoice.name);
        } else {
            // Second try: Hindi/Urdu voices (similar phonetics)
            const indianVoices = voices.filter(voice =>
                voice.lang.toLowerCase().includes('hi') || 
                voice.lang.toLowerCase().includes('ur') ||
                voice.name.toLowerCase().includes('hindi') ||
                voice.name.toLowerCase().includes('indian')
            );

            if (indianVoices.length > 0) {
                selectedVoice = indianVoices[0];
                utterance.lang = 'hi-IN'; // Use Hindi but it can handle some Bengali
                console.log('Using Hindi voice for Bengali:', selectedVoice.name);
            } else {
                // Third try: Any female voice (better for children)
                const femaleVoices = voices.filter(voice =>
                    voice.name.toLowerCase().includes('female') ||
                    voice.name.toLowerCase().includes('woman') ||
                    voice.name.toLowerCase().includes('samantha') ||
                    voice.name.toLowerCase().includes('zira')
                );

                if (femaleVoices.length > 0) {
                    selectedVoice = femaleVoices[0];
                    console.log('Using female voice for Bengali:', selectedVoice.name);
                } else {
                    // Last resort: use first available voice
                    selectedVoice = voices[0];
                    console.log('Using default voice for Bengali:', selectedVoice.name);
                }
                utterance.lang = 'bn-BD'; // Still try Bengali language
            }
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        // Add visual feedback when speaking
        utterance.onstart = () => {
            document.body.classList.add('speaking');
            console.log('Speaking Bengali text:', text);
        };

        utterance.onend = () => {
            document.body.classList.remove('speaking');
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            document.body.classList.remove('speaking');
        };

        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Speech synthesis not supported, text was:', text);
    }
}

// Load voices when ready with better detection
if ('speechSynthesis' in window) {
    let voicesLoaded = false;

    function loadVoices() {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0 && !voicesLoaded) {
            voicesLoaded = true;
            console.log(`Loaded ${voices.length} voices total`);

            // List Bengali voices
            const bengaliVoices = voices.filter(voice => 
                voice.lang.toLowerCase().includes('bn') || 
                voice.name.toLowerCase().includes('bengali') ||
                voice.name.toLowerCase().includes('bangla')
            );
            console.log('Available Bengali voices:', bengaliVoices.length > 0 ? bengaliVoices.map(v => v.name) : 'None found');

            // List Hindi voices as fallback
            const hindiVoices = voices.filter(voice => 
                voice.lang.toLowerCase().includes('hi') || 
                voice.name.toLowerCase().includes('hindi')
            );
            console.log('Available Hindi voices (fallback):', hindiVoices.length > 0 ? hindiVoices.map(v => v.name) : 'None found');

            // List all available languages
            const languages = [...new Set(voices.map(v => v.lang))].sort();
            console.log('All available languages:', languages);
        }
    }

    // Try multiple ways to load voices
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Also try loading immediately (some browsers need this)
    loadVoices();

    // And try after a short delay
    setTimeout(loadVoices, 500);
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

// Nursery Rhymes Functions
function initializeNurseryRhymes() {
    createSongButtons();
    loadSong(0);
}

function createSongButtons() {
    const container = document.getElementById('songButtons');
    container.innerHTML = '';

    nurseryRhymes.forEach((song, index) => {
        const btn = document.createElement('button');
        btn.className = 'song-btn';
        if (index === 0) btn.classList.add('active');
        btn.innerHTML = `<span>${song.icon}</span> ${song.title}`;
        btn.onclick = () => selectSong(index);
        container.appendChild(btn);
    });
}

function selectSong(songIndex) {
    // Stop current song if playing
    if (isPlaying) {
        stopSong();
    }

    currentSong = songIndex;

    // Update active button
    document.querySelectorAll('.song-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === songIndex);
    });

    loadSong(songIndex);
    playSound('click');
}

function loadSong(songIndex) {
    const song = nurseryRhymes[songIndex];
    currentWordIndex = 0;
    songDuration = song.duration;

    // Update UI
    document.getElementById('songTitle').textContent = song.title;
    document.getElementById('playIcon').textContent = '▶️';
    document.getElementById('speedText').textContent = 'Normal';

    // Load lyrics
    displayLyrics();

    // Load animations
    loadAnimations(song.animations);

    // Reset progress
    updateProgress(0);

    speak(`Let's sing ${song.title}!`);
}

function displayLyrics() {
    const song = nurseryRhymes[currentSong];
    const lyricsContainer = document.getElementById('lyricsLine');

    // Create word elements
    lyricsContainer.innerHTML = '';
    song.lyrics.forEach((word, index) => {
        const wordElement = document.createElement('span');
        wordElement.className = 'lyrics-word';
        wordElement.textContent = word.text;
        wordElement.id = `word-${index}`;
        wordElement.onclick = () => speakWord(word.text);
        lyricsContainer.appendChild(wordElement);
    });
}

function loadAnimations(animations) {
    const container = document.getElementById('rhymeAnimations');
    container.innerHTML = '';

    animations.forEach((emoji, index) => {
        const element = document.createElement('div');
        element.className = 'animation-element';
        element.textContent = emoji;
        container.appendChild(element);
    });
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    songStartTime = Date.now();
    currentWordIndex = 0;
    currentChordIndex = 0;

    document.getElementById('playIcon').textContent = '⏸️';

    // Clear previous highlights
    document.querySelectorAll('.lyrics-word').forEach(word => {
        word.classList.remove('highlighted', 'sung');
    });

    // Initialize musical context
    initializeMusicContext();

    // Start the song timer
    songTimer = setInterval(() => {
        updateSongProgress();
    }, 100);

    // Start musical accompaniment
    startMusicalAccompaniment();

    // Add singing indicator
    const indicator = document.createElement('div');
    indicator.className = 'singing-indicator';
    indicator.textContent = '🎵';
    indicator.id = 'singingIndicator';
    document.body.appendChild(indicator);

    playSound('success');
    speak('Let\'s sing together!');
}

function pauseSong() {
    isPlaying = false;

    if (songTimer) {
        clearInterval(songTimer);
        songTimer = null;
    }

    if (beatInterval) {
        clearInterval(beatInterval);
        beatInterval = null;
    }

    // Stop all musical sounds
    stopMusicalAccompaniment();

    document.getElementById('playIcon').textContent = '▶️';

    // Remove singing indicator
    const indicator = document.getElementById('singingIndicator');
    if (indicator) {
        indicator.remove();
    }

    playSound('click');
}

function stopSong() {
    pauseSong();
    currentWordIndex = 0;
    songStartTime = 0;

    // Clear all highlights
    document.querySelectorAll('.lyrics-word').forEach(word => {
        word.classList.remove('highlighted', 'sung');
    });

    updateProgress(0);
}

function restartSong() {
    stopSong();
    setTimeout(() => playSong(), 200);
    playSound('click');
}

function toggleSpeed() {
    playbackSpeed = playbackSpeed === 1 ? 0.7 : 1;
    const speedText = playbackSpeed === 1 ? 'Normal' : 'Slow';
    document.getElementById('speedText').textContent = speedText;

    playSound('click');
    speak(speedText + ' speed');
}

function updateSongProgress() {
    if (!isPlaying) return;

    const elapsed = (Date.now() - songStartTime) / 1000 * playbackSpeed;
    const song = nurseryRhymes[currentSong];

    // Update progress bar
    const progress = Math.min(elapsed / songDuration, 1);
    updateProgress(progress);

    // Highlight current word
    highlightCurrentWord(elapsed);

    // Check if song is finished
    if (elapsed >= songDuration) {
        finishSong();
    }
}

function highlightCurrentWord(elapsed) {
    const song = nurseryRhymes[currentSong];

    // Find current word based on timing
    for (let i = currentWordIndex; i < song.lyrics.length; i++) {
        const word = song.lyrics[i];
        const nextWord = song.lyrics[i + 1];

        if (elapsed >= word.timing && (!nextWord || elapsed < nextWord.timing)) {
            if (i !== currentWordIndex) {
                // Mark previous word as sung
                if (currentWordIndex < song.lyrics.length) {
                    const prevWordEl = document.getElementById(`word-${currentWordIndex}`);
                    if (prevWordEl) {
                        prevWordEl.classList.remove('highlighted');
                        prevWordEl.classList.add('sung');
                    }
                }

                // Highlight current word
                const currentWordEl = document.getElementById(`word-${i}`);
                if (currentWordEl) {
                    currentWordEl.classList.add('highlighted');
                    speakWord(word.text);
                    playWordAccent(word.text); // Add musical accent
                }

                currentWordIndex = i;
            }
            break;
        }
    }
}

function finishSong() {
    stopSong();

    // Mark all words as sung
    document.querySelectorAll('.lyrics-word').forEach(word => {
        word.classList.remove('highlighted');
        word.classList.add('sung');
    });

    setTimeout(() => {
        celebrate();
        speak('Great singing! You did wonderful!');
    }, 500);
}

function speakWord(word) {
    // Don't interrupt if already playing the song
    if (!isPlaying) {
        speak(word);
    }
}

function updateProgress(progress) {
    const elapsed = Math.floor(progress * songDuration);
    const total = Math.floor(songDuration);

    document.getElementById('progressFillRhyme').style.width = `${progress * 100}%`;
    document.getElementById('progressTextRhyme').textContent = 
        `${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, '0')} / ${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, '0')}`;
}

// Musical Enhancement Functions
function initializeMusicContext() {
    if (!musicContext) {
        musicContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create gain nodes for different parts
        backgroundMusicGain = musicContext.createGain();
        drumGain = musicContext.createGain();
        melodyGain = musicContext.createGain();

        // Connect to destination
        backgroundMusicGain.connect(musicContext.destination);
        drumGain.connect(musicContext.destination);
        melodyGain.connect(musicContext.destination);

        // Set initial volumes
        backgroundMusicGain.gain.value = 0.15; // Quiet background
        drumGain.gain.value = 0.1; // Subtle drums
        melodyGain.gain.value = 0.2; // Gentle melody
    }
}

function startMusicalAccompaniment() {
    if (!musicContext || !nurseryRhymes[currentSong].chords) return;

    const song = nurseryRhymes[currentSong];
    const beatDuration = 60 / song.tempo; // Beat duration in seconds

    // Start drum beat
    startDrumBeat(beatDuration);

    // Start chord progression
    startChordProgression();

    // Play gentle melody notes
    if (song.melody) {
        playMelodyNotes();
    }
}

function startDrumBeat(beatDuration) {
    let beatCount = 0;

    beatInterval = setInterval(() => {
        if (!isPlaying) return;

        // Simple kick-snare pattern
        if (beatCount % 4 === 0) {
            playDrumSound('kick'); // Kick on 1 and 3
        } else if (beatCount % 4 === 2) {
            playDrumSound('snare'); // Snare on 2 and 4
        }

        // Gentle hi-hat on every beat
        if (beatCount % 2 === 0) {
            playDrumSound('hihat');
        }

        beatCount++;
    }, (beatDuration * 1000) / playbackSpeed);
}

function playDrumSound(type) {
    if (!musicContext) return;

    const now = musicContext.currentTime;

    switch(type) {
        case 'kick':
            playPercussion(60, 0.1, 0.1, 'square');
            break;
        case 'snare':
            playPercussion(200, 0.05, 0.08, 'sawtooth');
            break;
        case 'hihat':
            playPercussion(8000, 0.02, 0.05, 'triangle');
            break;
    }
}

function playPercussion(frequency, volume, duration, type = 'sine') {
    const osc = musicContext.createOscillator();
    const gain = musicContext.createGain();

    osc.connect(gain);
    gain.connect(drumGain);

    osc.type = type;
    osc.frequency.value = frequency;

    const now = musicContext.currentTime;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.start(now);
    osc.stop(now + duration);
}

function startChordProgression() {
    const song = nurseryRhymes[currentSong];
    if (!song.chords) return;

    song.chords.forEach(chordData => {
        setTimeout(() => {
            if (isPlaying) {
                playChord(chordData.chord, chordData.duration);
            }
        }, (chordData.timing * 1000) / playbackSpeed);
    });
}

function playChord(frequencies, duration) {
    if (!musicContext) return;

    const now = musicContext.currentTime;

    frequencies.forEach((freq, index) => {
        const osc = musicContext.createOscillator();
        const gain = musicContext.createGain();

        osc.connect(gain);
        gain.connect(backgroundMusicGain);

        osc.type = 'sine';
        osc.frequency.value = freq;

        // Gentle attack and release
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
        gain.gain.setValueAtTime(0.05, now + duration - 0.2);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        osc.start(now);
        osc.stop(now + duration);
    });
}

function playMelodyNotes() {
    const song = nurseryRhymes[currentSong];
    if (!song.melody) return;

    song.melody.forEach(note => {
        setTimeout(() => {
            if (isPlaying) {
                playMelodyNote(note.note, note.duration);
            }
        }, (note.timing * 1000) / playbackSpeed);
    });
}

function playMelodyNote(frequency, duration) {
    if (!musicContext) return;

    const osc = musicContext.createOscillator();
    const gain = musicContext.createGain();

    osc.connect(gain);
    gain.connect(melodyGain);

    osc.type = 'triangle';
    osc.frequency.value = frequency;

    const now = musicContext.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    gain.gain.setValueAtTime(0.1, now + duration - 0.1);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    osc.start(now);
    osc.stop(now + duration);
}

function stopMusicalAccompaniment() {
    // All musical elements will stop naturally or are managed by intervals
    // that get cleared in pauseSong()
}

function playWordAccent(word) {
    // Play a gentle note when a word is highlighted
    if (!musicContext || !isPlaying) return;

    const frequencies = [523.25, 587.33, 659.25, 698.46]; // C5, D5, E5, F5
    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];

    const osc = musicContext.createOscillator();
    const gain = musicContext.createGain();

    osc.connect(gain);
    gain.connect(melodyGain);

    osc.type = 'sine';
    osc.frequency.value = randomFreq;

    const now = musicContext.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.start(now);
    osc.stop(now + 0.3);
}

// Drawing & Coloring Functions
function initializeDrawing() {
    canvas = document.getElementById('drawingCanvas');
    ctx = canvas.getContext('2d');
    templateCanvas = document.getElementById('templateCanvas');
    templateCtx = templateCanvas.getContext('2d');

    // Set up canvas properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Create color palette
    createColorPalette();

    // Create stickers
    createStickers();

    // Add event listeners for drawing
    addDrawingEventListeners();

    // Set initial message
    updateDrawingMessage("Choose colors and start drawing! 🎨");
}

function createColorPalette() {
    const palette = document.getElementById('colorPalette');
    palette.innerHTML = '';

    colors.forEach((color, index) => {
        const colorBtn = document.createElement('button');
        colorBtn.className = 'color-btn';
        colorBtn.style.backgroundColor = color;
        if (index === 0) colorBtn.classList.add('active');
        colorBtn.onclick = () => selectColor(color, colorBtn);
        palette.appendChild(colorBtn);
    });
}

function createStickers() {
    const stickerContainer = document.getElementById('stickers');
    stickerContainer.innerHTML = '';

    stickers.forEach(sticker => {
        const stickerBtn = document.createElement('button');
        stickerBtn.className = 'sticker-btn';
        stickerBtn.textContent = sticker;
        stickerBtn.onclick = () => addSticker(sticker);
        stickerContainer.appendChild(stickerBtn);
    });
}

function addDrawingEventListeners() {
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
}

function selectColor(color, element) {
    currentColor = color;

    // Update active color button
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    playSound('click');
    speak(`${getColorName(color)} selected!`);
}

function getColorName(hexColor) {
    const colorNames = {
        '#ff6b6b': 'Red', '#4ecdc4': 'Teal', '#45b7d1': 'Blue', '#96ceb4': 'Green',
        '#feca57': 'Yellow', '#ff9ff3': 'Pink', '#54a0ff': 'Light Blue', '#5f27cd': 'Purple',
        '#00d2d3': 'Cyan', '#ff9f43': 'Orange', '#10ac84': 'Dark Green', '#ee5a6f': 'Rose',
        '#2c2c54': 'Dark Blue', '#40407a': 'Navy', '#706fd3': 'Lavender', '#f0932b': 'Dark Orange',
        '#eb4d4b': 'Dark Red', '#6ab04c': 'Lime Green'
    };
    return colorNames[hexColor] || 'Color';
}

function setBrushSize(size) {
    brushSize = size;

    // Update active brush button
    document.querySelectorAll('.brush-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    playSound('click');
    speak(`${size === 10 ? 'Small' : size === 20 ? 'Medium' : 'Large'} brush selected!`);
}

function setDrawingMode(mode) {
    drawingMode = mode;

    // Update active mode button
    document.querySelectorAll('.activity-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Clear template canvas
    templateCtx.clearRect(0, 0, templateCanvas.width, templateCanvas.height);

    switch(mode) {
        case 'free':
            updateDrawingMessage("Free drawing mode! Let your creativity flow! ✏️");
            break;
        case 'trace':
            loadRandomTemplate();
            updateDrawingMessage("Trace the letters or numbers! 📝");
            break;
        case 'color':
            loadColoringPage();
            updateDrawingMessage("Color inside the shapes! 🎨");
            break;
        case 'mix':
            showColorMixingPanel();
            updateDrawingMessage("Mix primary colors to create new colors! 🌈");
            break;
    }

    playSound('click');
    speak(`${mode === 'free' ? 'Free drawing' : mode === 'trace' ? 'Letter tracing' : mode === 'color' ? 'Coloring' : 'Color mixing'} mode!`);
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    lastX = (e.clientX - rect.left) * scaleX;
    lastY = (e.clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const currentX = (e.clientX - rect.left) * scaleX;
    const currentY = (e.clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;

    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);

    lastX = currentX;
    lastY = currentY;
}

function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        playSound('pop');
    }
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                     e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playSound('click');
    speak('Canvas cleared!');
    updateDrawingMessage("Ready for a new masterpiece! ✨");
}

function saveDrawing() {
    try {
        // Create a new canvas to avoid clipboard API issues
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(canvas, 0, 0);

        const link = document.createElement('a');
        link.download = `drawing-${Date.now()}.png`;

        // Use toBlob instead of toDataURL to avoid clipboard API issues
        tempCanvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.click();

            // Clean up
            setTimeout(function() {
                URL.revokeObjectURL(url);
            }, 100);
        });

        celebrate();
        playSound('success');
        speak('Your drawing has been saved!');
    } catch (error) {
        console.error('Error saving drawing:', error);
        speak('Sorry, there was a problem saving your drawing.');
    }
}

function loadTemplate() {
    if (drawingMode === 'trace') {
        loadRandomTemplate();
    } else if (drawingMode === 'color') {
        loadColoringPage();
    } else {
        clearCanvas();
    }
    playSound('click');
}

function loadRandomTemplate() {
    const allTemplates = [...drawingTemplates.letters, ...drawingTemplates.numbers];
    const template = allTemplates[Math.floor(Math.random() * allTemplates.length)];

    templateCtx.clearRect(0, 0, templateCanvas.width, templateCanvas.height);
    templateCtx.font = '200px Arial';
    templateCtx.strokeStyle = '#ddd';
    templateCtx.lineWidth = 8;
    templateCtx.textAlign = 'center';
    templateCtx.textBaseline = 'middle';

    templateCtx.strokeText(template.data, templateCanvas.width / 2, templateCanvas.height / 2);

    speak(`Trace the ${template.name}!`);
}

function loadColoringPage() {
    const shapes = drawingTemplates.shapes;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    templateCtx.clearRect(0, 0, templateCanvas.width, templateCanvas.height);
    templateCtx.strokeStyle = '#333';
    templateCtx.lineWidth = 4;
    templateCtx.fillStyle = 'transparent';

    const centerX = templateCanvas.width / 2;
    const centerY = templateCanvas.height / 2;
    const size = 150;

    switch(shape.shape) {
        case 'circle':
            templateCtx.beginPath();
            templateCtx.arc(centerX, centerY, size, 0, 2 * Math.PI);
            templateCtx.stroke();
            break;
        case 'square':
            templateCtx.strokeRect(centerX - size, centerY - size, size * 2, size * 2);
            break;
        case 'triangle':
            templateCtx.beginPath();
            templateCtx.moveTo(centerX, centerY - size);
            templateCtx.lineTo(centerX - size, centerY + size);
            templateCtx.lineTo(centerX + size, centerY + size);
            templateCtx.closePath();
            templateCtx.stroke();
            break;
        case 'star':
            drawStar(templateCtx, centerX, centerY, 5, size, size * 0.5);
            break;
        case 'heart':
            drawHeart(templateCtx, centerX, centerY, size);
            break;
    }

    speak(`Color the ${shape.name}!`);
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.stroke();
}

function drawHeart(ctx, cx, cy, size) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(cx, cy + topCurveHeight);
    ctx.bezierCurveTo(cx, cy, cx - size / 2, cy, cx - size / 2, cy + topCurveHeight);
    ctx.bezierCurveTo(cx - size / 2, cy + (size + topCurveHeight) / 2, cx, cy + (size + topCurveHeight) / 2, cx, cy + size);
    ctx.bezierCurveTo(cx, cy + (size + topCurveHeight) / 2, cx + size / 2, cy + (size + topCurveHeight) / 2, cx + size / 2, cy + topCurveHeight);
    ctx.bezierCurveTo(cx + size / 2, cy, cx, cy, cx, cy + topCurveHeight);
    ctx.closePath();
    ctx.stroke();
}

function addSticker(sticker) {
    const centerX = canvas.width / 2 + (Math.random() - 0.5) * 200;
    const centerY = canvas.height / 2 + (Math.random() - 0.5) * 200;

    ctx.font = '60px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(sticker, centerX, centerY);

    playSound('click');
    speak('Sticker added!');
}

function updateDrawingMessage(message) {
    document.getElementById('drawingMessage').textContent = message;
}

// Color Mixing Functions
function showColorMixingPanel() {
    // Hide other panels
    document.getElementById('stickerPanel').style.display = 'none';

    // Show color mixing panel
    document.getElementById('colorMixingPanel').style.display = 'block';

    // Reset mixing state
    resetMixing();

    speak('Let\s learn about mixing colors! Choose two primary colors to create a new color!');
}

function selectPrimaryColor(colorName, colorValue) {
    // Check if this color is already selected
    if (selectedColors.some(c => c.name === colorName)) {
        speak(`${colorName} is already selected! Choose a different color.`);
        return;
    }

    // Add color to selection (respecting max colors for current mode)
    if (selectedColors.length < maxColors) {
        selectedColors.push({ name: colorName, value: colorValue });

        // Update visual displays
        updateSelectedColorsDisplay();
        updateMixingBowls();

        // Visual feedback for selection
        highlightSelectedColor(colorName);

        // Check if we can enable mix button
        if (selectedColors.length >= 2) {
            document.getElementById('mixBtn').disabled = false;
            if (selectedColors.length === 2) {
                speak(`Great! You selected ${selectedColors[0].name} and ${selectedColors[1].name}. ${mixingMode === 'advanced' ? 'You can add more colors or' : ''} Click the mix button!`);
            } else {
                speak(`Wow! You have ${selectedColors.length} colors selected. Ready to create something amazing!`);
            }
        } else {
            speak(`You selected ${colorName}! ${mixingMode === 'simple' ? 'Choose one more color' : 'Choose at least one more color'} to mix.`);
        }

        playSound('ding');
    } else {
        speak(`You can only select ${maxColors} colors in ${mixingMode} mode. Try removing a color first!`);
    }
}

function setMixingMode(mode) {
    mixingMode = mode;
    maxColors = mode === 'simple' ? 2 : 6; // Allow up to 6 colors in advanced mode

    // Update active button
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(mode + 'ModeBtn').classList.add('active');

    // Reset selections
    resetMixing();

    // Update explanation
    const explanation = document.getElementById('mixingExplanation');
    if (mode === 'simple') {
        explanation.textContent = 'Choose exactly 2 colors to mix together! 🌈';
    } else {
        explanation.textContent = 'Choose 2-6 colors to create amazing new colors! 🧪✨';
    }

    speak(`${mode === 'simple' ? 'Simple' : 'Advanced'} mixing mode selected! ${mode === 'simple' ? 'Choose 2 colors' : 'Choose 2 to 6 colors'} to mix together.`);
    playSound('click');
}

function highlightSelectedColor(colorName) {
    // Add visual feedback to the selected color button
    const colorBtn = document.querySelector(`[data-color="${colorName}"]`);
    if (colorBtn) {
        colorBtn.classList.add('selected');
        setTimeout(() => {
            colorBtn.style.transform = 'scale(1.1)';
        }, 100);
    }
}

function updateSelectedColorsDisplay() {
    const selectedColorsList = document.getElementById('selectedColorsList');
    selectedColorsList.innerHTML = '';

    selectedColors.forEach((color, index) => {
        const colorChip = document.createElement('div');
        colorChip.className = 'selected-color-chip';
        colorChip.innerHTML = `
            <div class="color-chip" style="background-color: ${color.value};"></div>
            <span class="color-name">${color.name}</span>
            <button class="remove-color-btn" onclick="removeSelectedColor(${index})">×</button>
        `;
        selectedColorsList.appendChild(colorChip);
    });
}

function removeSelectedColor(index) {
    const removedColor = selectedColors[index];
    selectedColors.splice(index, 1);

    // Remove visual selection from button
    const colorBtn = document.querySelector(`[data-color="${removedColor.name}"]`);
    if (colorBtn) {
        colorBtn.classList.remove('selected');
        colorBtn.style.transform = '';
    }

    // Update displays
    updateSelectedColorsDisplay();
    updateMixingBowls();

    // Update mix button state
    document.getElementById('mixBtn').disabled = selectedColors.length < 2;

    speak(`Removed ${removedColor.name}!`);
    playSound('click');
}

function updateMixingBowls() {
    const mixingBowlsContainer = document.getElementById('mixingBowls');
    mixingBowlsContainer.innerHTML = '';

    selectedColors.forEach((color, index) => {
        const bowl = document.createElement('div');
        bowl.className = 'mixing-bowl';
        bowl.innerHTML = `
            <div class="bowl-content" style="background-color: ${color.value}; opacity: 1;" id="bowlContent${index}"></div>
            <div class="bowl-label">${color.name}</div>
        `;
        mixingBowlsContainer.appendChild(bowl);

        if (index < selectedColors.length - 1) {
            const plus = document.createElement('div');
            plus.className = 'mixing-plus';
            plus.textContent = '+';
            mixingBowlsContainer.appendChild(plus);
        }
    });

    if (selectedColors.length > 0) {
        const equals = document.createElement('div');
        equals.className = 'mixing-equals';
        equals.textContent = '=';
        mixingBowlsContainer.appendChild(equals);

        const resultBowl = document.createElement('div');
        resultBowl.className = 'mixing-bowl result-bowl';
        resultBowl.innerHTML = `
            <div class="bowl-content" id="resultContent" style="opacity: 0.3;"></div>
            <div class="bowl-label">New Color!</div>
        `;
        mixingBowlsContainer.appendChild(resultBowl);
    }
}

function mixColors() {
    if (selectedColors.length < 2) return;

    // Start mixing animation sequence
    startMixingAnimation();

    // Create mixed result using dynamic algorithm
    const result = createMixedColorResult(selectedColors);

    // Speak the mixing process
    const colorNames = selectedColors.map(c => c.name).join(', ');
    speak(`Let's mix ${colorNames} together! This is going to be amazing!`);

    // Simulate mixing process with realistic timing
    setTimeout(() => {
        // Phase 1: Start swirling after all colors are poured
        startSwirlingAnimation();
    }, selectedColors.length * 600 + 1000);

    setTimeout(() => {
        // Phase 2: Colors start blending in cauldron
        blendColorsAnimation();
    }, selectedColors.length * 600 + 2000);

    setTimeout(() => {
        // Phase 3: Final magical result
        showMixingResult(result);
    }, selectedColors.length * 600 + 4500);
}

function createMixedColorResult(colors) {
    // Try predefined combinations first for educational value
    if (colors.length === 2) {
        const combinationKey = `${colors[0].name}+${colors[1].name}`;
        const predefined = colorMixingData[combinationKey];
        if (predefined) {
            return predefined;
        }
    }

    // Dynamic color mixing algorithm
    const mixedRGB = averageColors(colors.map(c => c.value));
    const colorName = generateColorName(colors, mixedRGB);

    return {
        color: rgbToHex(mixedRGB.r, mixedRGB.g, mixedRGB.b),
        name: colorName
    };
}

function averageColors(hexColors) {
    let totalR = 0, totalG = 0, totalB = 0;

    hexColors.forEach(hex => {
        const rgb = hexToRgb(hex);
        totalR += rgb.r;
        totalG += rgb.g;
        totalB += rgb.b;
    });

    return {
        r: Math.round(totalR / hexColors.length),
        g: Math.round(totalG / hexColors.length),
        b: Math.round(totalB / hexColors.length)
    };
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 0, g: 0, b: 0};
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function generateColorName(colors, rgb) {
    // Special names for interesting combinations
    const colorNames = colors.map(c => c.name.toLowerCase());

    if (colors.length === 3) {
        if (colorNames.includes('red') && colorNames.includes('blue') && colorNames.includes('yellow')) {
            return 'Magic Rainbow Mix';
        }
        if (colorNames.includes('red') && colorNames.includes('green') && colorNames.includes('blue')) {
            return 'Super Power Color';
        }
        if (colorNames.some(name => name.includes('light')) && colorNames.length === 3) {
            return 'Dreamy Cloud Mix';
        }
    }

    if (colors.length === 4) {
        return 'Amazing Four-Color Wonder';
    }

    if (colors.length >= 5) {
        return 'Ultimate Rainbow Creation';
    }

    // Analyze the resulting color
    const { r, g, b } = rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // Determine dominant color with creative names
    if (r > g && r > b) {
        if (r > 200) return 'Fire Engine Red Mix';
        if (r > 150) return 'Cherry Red Blend';
        return 'Ruby Red Creation';
    } else if (g > r && g > b) {
        if (g > 200) return 'Lime Green Wonder';
        if (g > 150) return 'Grass Green Mix';
        return 'Forest Green Blend';
    } else if (b > r && b > g) {
        if (b > 200) return 'Ocean Blue Mix';
        if (b > 150) return 'Blueberry Blend';
        return 'Navy Blue Creation';
    }

    // Check for gray/brown tones
    const colorDiff = max - min;
    if (colorDiff < 30) {
        if (max > 180) return 'Silver Cloud';
        if (max > 100) return 'Elephant Gray';
        return 'Shadow Gray';
    }

    // Check for specific color ranges
    if (r > g && r > b && g > b) return 'Pumpkin Orange Mix';
    if (r > b && g > b && Math.abs(r - g) < 50) return 'Sunshine Yellow Mix';
    if (g > r && b > r && Math.abs(g - b) < 50) return 'Tropical Cyan Mix';
    if (r > g && b > g && Math.abs(r - b) < 50) return 'Unicorn Magenta Mix';

    return `Magical ${colors.length}-Color Creation`;
}

function startMixingAnimation() {
    const mixBtn = document.getElementById('mixBtn');
    const mixingBowls = document.querySelector('.mixing-bowls');
    const cauldronContent = document.querySelector('.cauldron-content');

    // Animate the mix button
    mixBtn.classList.add('mixing');
    mixBtn.textContent = '🪄 Pouring Colors...';
    mixBtn.disabled = true;

    // Start cauldron activation
    if (cauldronContent) {
        cauldronContent.classList.add('mixing-active');
    }

    // Start pouring animation for each color bowl
    selectedColors.forEach((color, index) => {
        setTimeout(() => {
            pourColorFromBowl(index, color);
        }, index * 600); // Stagger the pouring
    });
}

function pourColorFromBowl(bowlIndex, color) {
    const bowlContent = document.getElementById(`bowlContent${bowlIndex}`);
    const bowl = bowlContent?.parentElement;

    if (!bowl) return;

    // Tilt the bowl
    bowlContent.classList.add('pouring');

    // Play pouring sound
    playPouringSound();

    // Create color stream
    const stream = document.createElement('div');
    stream.className = 'color-stream';
    stream.style.setProperty('--stream-color', color.value);

    // Position the stream from bowl to cauldron
    const bowlRect = bowl.getBoundingClientRect();
    const cauldron = document.querySelector('.cauldron-content');
    const cauldronRect = cauldron?.getBoundingClientRect();

    if (cauldronRect) {
        // Calculate stream position
        const streamLeft = bowlRect.left + bowlRect.width/2 - 4; // Center stream
        const streamTop = bowlRect.bottom;

        stream.style.left = streamLeft + 'px';
        stream.style.top = streamTop + 'px';
        stream.style.position = 'fixed';

        document.body.appendChild(stream);

        // Start flowing animation
        setTimeout(() => {
            stream.classList.add('flowing');

            // Add color swirl to cauldron when stream reaches it
            setTimeout(() => {
                addColorSwirlToCauldron(color.value, bowlIndex);
            }, 800);

        }, 100);

        // Clean up stream
        setTimeout(() => {
            if (stream.parentNode) {
                stream.parentNode.removeChild(stream);
            }
        }, 2500);
    }

    // Reset bowl tilt after pouring
    setTimeout(() => {
        bowlContent.classList.remove('pouring');
    }, 2000);
}

function addColorSwirlToCauldron(colorValue, index) {
    const cauldronSurface = document.getElementById('cauldronSurface');
    if (!cauldronSurface) return;

    // Create a swirl element for this color
    const swirl = document.createElement('div');
    swirl.className = 'color-swirl';
    swirl.style.background = `radial-gradient(circle at ${30 + index * 20}% ${40 + index * 15}%, ${colorValue} 20%, transparent 60%)`;
    swirl.style.transform = `rotate(${index * 45}deg)`;

    cauldronSurface.appendChild(swirl);

    // Start swirling animation
    setTimeout(() => {
        swirl.classList.add('swirling');
    }, 100);

    // Update cauldron surface opacity
    cauldronSurface.style.opacity = '0.9';

    // Play magical swirl sound
    playMagicalSwirlSound();
}

function startSwirlingAnimation() {
    // This function now triggers after all colors are poured
    speak('Watch the colors swirl together in the magic pot!');

    // Create additional magical particles
    createMagicalParticles();
}

function createMagicalParticles() {
    const cauldron = document.querySelector('.cauldron-content');
    if (!cauldron) return;

    const rect = cauldron.getBoundingClientRect();

    // Create sparkle particles around the cauldron
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = selectedColors[i % selectedColors.length].value;
        particle.style.borderRadius = '50%';
        particle.style.left = rect.left + rect.width/2 + Math.random() * 100 - 50 + 'px';
        particle.style.top = rect.top + rect.height/2 + Math.random() * 100 - 50 + 'px';
        particle.style.animation = `magicalSparkle ${1.5 + Math.random()}s ease-out forwards`;
        particle.style.zIndex = '1000';
        particle.style.pointerEvents = 'none';

        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2500);
    }
}

function playPouringSound() {
    // Create pouring sound effect
    if (musicContext) {
        const oscillator = musicContext.createOscillator();
        const gainNode = musicContext.createGain();
        const filter = musicContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(musicContext.destination);

        // Liquid pouring sound
        oscillator.frequency.setValueAtTime(150, musicContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(80, musicContext.currentTime + 1.5);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, musicContext.currentTime);

        gainNode.gain.setValueAtTime(0.08, musicContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, musicContext.currentTime + 1.5);

        oscillator.type = 'sawtooth';
        oscillator.start(musicContext.currentTime);
        oscillator.stop(musicContext.currentTime + 1.5);
    }
}

function playMagicalSwirlSound() {
    // Create magical swirl sound
    if (musicContext) {
        const oscillator = musicContext.createOscillator();
        const gainNode = musicContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(musicContext.destination);

        // Magical swirling sound
        oscillator.frequency.setValueAtTime(300, musicContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, musicContext.currentTime + 0.5);
        oscillator.frequency.exponentialRampToValueAtTime(200, musicContext.currentTime + 1);

        gainNode.gain.setValueAtTime(0.05, musicContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, musicContext.currentTime + 1);

        oscillator.type = 'sine';
        oscillator.start(musicContext.currentTime);
        oscillator.stop(musicContext.currentTime + 1);
    }
}

function blendColorsAnimation() {
    const resultBowl = document.getElementById('resultContent');
    const cauldronSurface = document.getElementById('cauldronSurface');

    // Start cauldron bubbling animation
    startCauldronBubbling();

    // Animate progressive color blending
    let blendStep = 0;
    const totalSteps = 100;
    const blendInterval = setInterval(() => {
        blendStep += 5;

        // Create progressive blend of all selected colors
        const blendedColor = blendMultipleColors(selectedColors.map(c => c.value), blendStep / totalSteps);

        // Update both result bowl and cauldron
        if (resultBowl) {
            resultBowl.style.backgroundColor = blendedColor;
            resultBowl.style.opacity = Math.min(blendStep / totalSteps, 1);
        }

        if (cauldronSurface) {
            cauldronSurface.style.backgroundColor = blendedColor;
            cauldronSurface.style.opacity = Math.min(blendStep / totalSteps * 0.8, 0.8);
        }

        if (blendStep >= totalSteps) {
            clearInterval(blendInterval);
        }
    }, 40);
}

function blendMultipleColors(hexColors, ratio) {
    if (hexColors.length === 1) return hexColors[0];

    // Progressive blending: start with first color, gradually add others
    let currentColor = hexToRgb(hexColors[0]);

    for (let i = 1; i < hexColors.length; i++) {
        const nextColor = hexToRgb(hexColors[i]);
        const blendRatio = Math.min(ratio * hexColors.length - (i - 1), 1);

        if (blendRatio > 0) {
            currentColor = {
                r: Math.round(currentColor.r * (1 - blendRatio) + nextColor.r * blendRatio),
                g: Math.round(currentColor.g * (1 - blendRatio) + nextColor.g * blendRatio),
                b: Math.round(currentColor.b * (1 - blendRatio) + nextColor.b * blendRatio)
            };
        }
    }

    return rgbToHex(currentColor.r, currentColor.g, currentColor.b);
}

function startCauldronBubbling() {
    const bubblesContainer = document.getElementById('bubbles');
    if (!bubblesContainer) return;

    // Clear existing bubbles
    bubblesContainer.innerHTML = '';

    // Create animated bubbles
    const bubbleCount = 8 + selectedColors.length * 2; // More bubbles for more colors

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 80 + 10 + '%';
        bubble.style.animationDelay = Math.random() * 2 + 's';
        bubble.style.animationDuration = (2 + Math.random() * 3) + 's';
        bubblesContainer.appendChild(bubble);
    }

    // Add bubbling class for extra effects
    document.querySelector('.cauldron-content').classList.add('bubbling');
}

function showMixingResult(result) {
    mixedColor = result.color;

    // Clean up animations
    const cauldronContent = document.querySelector('.cauldron-content');
    if (cauldronContent) {
        cauldronContent.classList.remove('mixing-active', 'bubbling');
    }

    // Final cauldron color reveal
    const cauldronSurface = document.getElementById('cauldronSurface');
    if (cauldronSurface) {
        cauldronSurface.style.backgroundColor = result.color;
        cauldronSurface.style.opacity = '1';
        cauldronSurface.style.transform = 'scale(1.1)';

        setTimeout(() => {
            cauldronSurface.style.transform = 'scale(1)';
        }, 500);
    }

    // Show final result with dramatic effect
    const resultBowl = document.getElementById('resultContent');
    if (resultBowl) {
        resultBowl.style.backgroundColor = result.color;
        resultBowl.style.opacity = '1';
        resultBowl.style.transform = 'scale(1.3)';

        setTimeout(() => {
            resultBowl.style.transform = 'scale(1)';
        }, 500);
    }

    // Update result text with animation
    const resultText = document.getElementById('resultText');
    const colorsList = selectedColors.map(c => c.name).join(' + ');
    if (resultText) {
        resultText.innerHTML = `🎉 ${colorsList} = <strong>${result.name}!</strong>`;
        resultText.style.display = 'block';
        resultText.style.animation = 'resultSlideIn 0.5s ease-out';
    }

    // Show use color button
    const useColorBtn = document.getElementById('useColorBtn');
    if (useColorBtn) {
        useColorBtn.style.display = 'inline-block';
    }

    // Reset mix button
    const mixBtn = document.getElementById('mixBtn');
    mixBtn.classList.remove('mixing');
    mixBtn.textContent = '🌀 Mix Colors!';
    mixBtn.disabled = true; // Keep disabled until reset

    // Play celebration sound and speak result
    playCelebrationSound();
    const colorNames = selectedColors.map(c => c.name).join(' and ');
    speak(`Wow! ${colorNames} makes ${result.name}! That's amazing magic!`);

    // Show celebration
    setTimeout(() => {
        showCelebration(`You made ${result.name}!`);
    }, 1000);
}

function createColorParticles() {
    const mixingArea = document.querySelector('.mixing-area');

    // Create floating color particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = i % 2 === 0 ? selectedColors[0].value : selectedColors[1].value;
        particle.style.left = Math.random() * 300 + 'px';
        particle.style.top = Math.random() * 100 + 'px';
        particle.style.animation = `floatParticle ${2 + Math.random() * 2}s ease-out forwards`;
        particle.style.zIndex = '1000';

        mixingArea.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }
}

function createBlendedColor(color1, color2, ratio) {
    // Simple color blending - convert hex to RGB, blend, convert back
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');

    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);

    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);

    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);

    return `rgb(${r}, ${g}, ${b})`;
}

function playMixingSound() {
    // Create a mixing sound effect using Web Audio API
    if (musicContext) {
        const oscillator = musicContext.createOscillator();
        const gainNode = musicContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(musicContext.destination);

        // Create a "swirling" sound effect
        oscillator.frequency.setValueAtTime(200, musicContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, musicContext.currentTime + 1);
        oscillator.frequency.exponentialRampToValueAtTime(100, musicContext.currentTime + 2);

        gainNode.gain.setValueAtTime(0.1, musicContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, musicContext.currentTime + 2);

        oscillator.type = 'sine';
        oscillator.start(musicContext.currentTime);
        oscillator.stop(musicContext.currentTime + 2);
    }
}

function resetMixing() {
    selectedColors = [];
    mixedColor = null;

    // Clear selected colors display
    updateSelectedColorsDisplay();
    updateMixingBowls();

    // Clear cauldron
    const cauldronSurface = document.getElementById('cauldronSurface');
    const bubbles = document.getElementById('bubbles');
    if (cauldronSurface) {
        cauldronSurface.style.backgroundColor = 'transparent';
        cauldronSurface.style.opacity = '0';
    }
    if (bubbles) {
        bubbles.innerHTML = '';
    }

    // Remove bubbling effects
    const cauldronContent = document.querySelector('.cauldron-content');
    if (cauldronContent) {
        cauldronContent.classList.remove('bubbling');
    }

    // Hide result elements
    const resultText = document.getElementById('resultText');
    const useColorBtn = document.getElementById('useColorBtn');
    if (resultText) resultText.style.display = 'none';
    if (useColorBtn) useColorBtn.style.display = 'none';

    // Disable mix button
    document.getElementById('mixBtn').disabled = true;

    // Remove active states from all color buttons
    document.querySelectorAll('.primary-color-btn').forEach(btn => {
        btn.classList.remove('selected');
        btn.style.transform = '';
    });

    const modeText = mixingMode === 'simple' ? 'Choose 2 colors' : 'Choose 2 or more colors';
    speak(`${modeText} to mix together!`);
}

function useNewColor() {
    if (mixedColor) {
        currentColor = mixedColor;

        // Add the mixed color to the color palette
        addMixedColorToPalette(mixedColor, selectedColors);

        // Switch to free drawing mode
        setDrawingMode('free');

        speak('Great! Now you can draw with your new color!');
        playSound('click');
    }
}

function addMixedColorToPalette(color, colorInfo) {
    const colorPalette = document.getElementById('colorPalette');

    // Check if this color already exists
    const existingColor = Array.from(colorPalette.children).find(btn => 
        btn.style.backgroundColor === color
    );

    if (!existingColor) {
        const colorBtn = document.createElement('button');
        colorBtn.className = 'color-btn mixed-color';
        colorBtn.style.backgroundColor = color;
        colorBtn.onclick = () => selectColor(color, colorBtn);
        colorBtn.title = `Mixed ${colorInfo[0].name} + ${colorInfo[1].name}`;

        // Add a small indicator that this is a mixed color
        colorBtn.innerHTML = '<small>🌈</small>';

        colorPalette.appendChild(colorBtn);
    }
}

// Interactive Storybooks Functions
function initializeStorybooks() {
    const bookShelf = document.getElementById('bookShelf');
    if (!bookShelf) return;

    bookShelf.innerHTML = '';

    interactiveStories.forEach(story => {
        const bookCover = document.createElement('div');
        bookCover.className = 'book-cover';
        bookCover.onclick = () => openStory(story.id);

        bookCover.innerHTML = `
            <div class="book-spine">
                <div class="book-cover-emoji">${story.cover}</div>
                <div class="book-title">${story.title}</div>
                <div class="book-description">${story.description}</div>
            </div>
        `;

        bookShelf.appendChild(bookCover);
    });
}

function openStory(storyId) {
    currentStory = interactiveStories.find(story => story.id === storyId);
    if (!currentStory) return;

    currentPage = 0;
    isAutoReading = false;

    // Show story reader, hide library
    document.getElementById('storyLibrary').style.display = 'none';
    document.getElementById('storyReader').style.display = 'block';
    document.getElementById('storyCompletion').style.display = 'none';

    // Update header
    document.getElementById('currentStoryTitle').textContent = currentStory.title;

    // Load first page
    loadStoryPage();

    // Play opening sound
    playStorySound();
    speak(`Let's read ${currentStory.title} together!`);
}

function loadStoryPage() {
    if (!currentStory || currentPage >= currentStory.pages.length) return;

    const page = currentStory.pages[currentPage];

    // Update page counter
    document.getElementById('pageCounter').textContent = 
        `Page ${currentPage + 1} of ${currentStory.pages.length}`;

    // Update story text
    document.getElementById('storyText').textContent = page.text;

    // Render interactive scene
    renderStoryScene(page.scene);

    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentPage === 0;
    document.getElementById('nextBtn').disabled = currentPage === currentStory.pages.length - 1;

    // Update progress
    const progress = ((currentPage + 1) / currentStory.pages.length) * 100;
    document.getElementById('progressFillStory').style.width = progress + '%';

    // Page turn animation
    const storyPage = document.getElementById('storyPage');
    storyPage.style.animation = 'pageFlip 0.5s ease-in-out';
    setTimeout(() => {
        storyPage.style.animation = '';
    }, 500);
}

function renderStoryScene(scene) {
    const storyScene = document.getElementById('storyScene');
    storyScene.innerHTML = '';
    storyScene.style.backgroundColor = scene.background;

    scene.elements.forEach((element, index) => {
        const sceneElement = document.createElement('div');
        sceneElement.className = 'scene-element';
        sceneElement.style.left = element.x + '%';
        sceneElement.style.top = element.y + '%';
        sceneElement.style.fontSize = element.size + 'px';
        sceneElement.textContent = element.content;
        sceneElement.style.transform = 'translate(-50%, -50%)';
        sceneElement.style.position = 'absolute';
        sceneElement.style.cursor = element.clickable ? 'pointer' : 'default';
        sceneElement.style.userSelect = 'none';
        sceneElement.style.transition = 'all 0.3s ease';

        if (element.clickable) {
            sceneElement.onclick = () => playElementSound(element.sound);
            sceneElement.onmouseover = () => {
                sceneElement.style.transform = 'translate(-50%, -50%) scale(1.2)';
                sceneElement.style.filter = 'drop-shadow(0 0 10px rgba(255,255,0,0.8))';
            };
            sceneElement.onmouseout = () => {
                sceneElement.style.transform = 'translate(-50%, -50%) scale(1)';
                sceneElement.style.filter = 'none';
            };
        }

        // Animate elements appearing
        sceneElement.style.opacity = '0';
        sceneElement.style.transform += ' scale(0.1)';

        storyScene.appendChild(sceneElement);

        // Stagger animations
        setTimeout(() => {
            sceneElement.style.opacity = '1';
            sceneElement.style.transform = 'translate(-50%, -50%) scale(1)';
        }, index * 200);
    });
}

function playElementSound(soundText) {
    speak(soundText);
    playSound('ding');

    // Add sparkle effect
    createSparkleEffect(event.target);
}

function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + rect.width/2 + 'px';
        sparkle.style.top = rect.top + rect.height/2 + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10000';
        sparkle.style.animation = `sparkleFloat ${1 + Math.random()}s ease-out forwards`;

        document.body.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
}

function nextPage() {
    if (!currentStory || currentPage >= currentStory.pages.length - 1) return;

    currentPage++;
    loadStoryPage();
    playPageTurnSound();

    if (currentPage === currentStory.pages.length - 1) {
        setTimeout(() => {
            completeStory();
        }, 3000);
    }
}

function previousPage() {
    if (!currentStory || currentPage <= 0) return;

    currentPage--;
    loadStoryPage();
    playPageTurnSound();
}

function readCurrentPage() {
    if (!currentStory) return;

    const page = currentStory.pages[currentPage];
    speak(page.text);
    playStorySound();
}

function toggleAutoRead() {
    isAutoReading = !isAutoReading;
    const autoBtn = document.getElementById('autoBtn');

    if (isAutoReading) {
        autoBtn.innerHTML = '⏸️ Pause';
        startAutoReading();
    } else {
        autoBtn.innerHTML = '▶️ Auto Play';
        stopAutoReading();
    }
}

function startAutoReading() {
    if (!currentStory || !isAutoReading) return;

    readCurrentPage();

    // Auto advance after 8 seconds
    storyAutoTimer = setTimeout(() => {
        if (isAutoReading && currentPage < currentStory.pages.length - 1) {
            nextPage();
            startAutoReading();
        } else if (currentPage === currentStory.pages.length - 1) {
            completeStory();
        }
    }, 8000);
}

function stopAutoReading() {
    if (storyAutoTimer) {
        clearTimeout(storyAutoTimer);
        storyAutoTimer = null;
    }
}

function completeStory() {
    stopAutoReading();

    // Show completion screen
    document.getElementById('storyReader').style.display = 'none';
    document.getElementById('storyCompletion').style.display = 'block';

    // Update completion message
    document.getElementById('completionMessage').textContent = 
        `Wonderful! You finished reading "${currentStory.title}"! You're becoming a great reader!`;

    // Play celebration
    playCelebrationSound();
    speak(`Hooray! You finished the story! That was amazing reading!`);

    // Show celebration
    setTimeout(() => {
        showCelebration(`Story Complete! 📚`);
    }, 1000);
}

function restartStory() {
    currentPage = 0;
    isAutoReading = false;
    stopAutoReading();

    document.getElementById('storyCompletion').style.display = 'none';
    document.getElementById('storyReader').style.display = 'block';

    loadStoryPage();
    speak(`Let's read ${currentStory.title} again!`);
}

function backToLibrary() {
    stopAutoReading();
    currentStory = null;
    currentPage = 0;
    isAutoReading = false;

    document.getElementById('storyReader').style.display = 'none';
    document.getElementById('storyCompletion').style.display = 'none';
    document.getElementById('storyLibrary').style.display = 'block';

    speak('Choose another story to read!');
}

function playStorySound() {
    // Create gentle story reading sound
    if (musicContext) {
        const oscillator = musicContext.createOscillator();
        const gainNode = musicContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(musicContext.destination);

        oscillator.frequency.setValueAtTime(220, musicContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(330, musicContext.currentTime + 0.5);

        gainNode.gain.setValueAtTime(0.05, musicContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, musicContext.currentTime + 0.5);

        oscillator.type = 'sine';
        oscillator.start(musicContext.currentTime);
        oscillator.stop(musicContext.currentTime + 0.5);
    }
}

function playPageTurnSound() {
    // Create page turning sound effect
    if (musicContext) {
        const oscillator = musicContext.createOscillator();
        const gainNode = musicContext.createGain();
        const filter = musicContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(musicContext.destination);

        oscillator.frequency.setValueAtTime(800, musicContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, musicContext.currentTime + 0.3);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, musicContext.currentTime);

        gainNode.gain.setValueAtTime(0.08, musicContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, musicContext.currentTime + 0.3);

        oscillator.type = 'sawtooth';
        oscillator.start(musicContext.currentTime);
        oscillator.stop(musicContext.currentTime + 0.3);
    }
}
