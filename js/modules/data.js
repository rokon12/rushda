// Alphabet data
const alphabetData = {
    'A': 'Apple', 'B': 'Ball', 'C': 'Cat', 'D': 'Dog', 'E': 'Elephant',
    'F': 'Fish', 'G': 'Grapes', 'H': 'Hat', 'I': 'Ice cream', 'J': 'Jelly',
    'K': 'Kite', 'L': 'Lion', 'M': 'Moon', 'N': 'Nest', 'O': 'Orange',
    'P': 'Penguin', 'Q': 'Queen', 'R': 'Rainbow', 'S': 'Sun', 'T': 'Tree',
    'U': 'Umbrella', 'V': 'Violin', 'W': 'Watermelon', 'X': 'Xylophone', 
    'Y': 'Yacht', 'Z': 'Zebra'
};

// Phonics data
const phonicsData = {
    consonants: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
    vowels: {
        'a': { sound: 'ah', description: 'makes "ah" sound' },
        'e': { sound: 'eh', description: 'makes "eh" sound' },
        'i': { sound: 'ih', description: 'makes "ih" sound' },
        'o': { sound: 'oh', description: 'makes "oh" sound' },
        'u': { sound: 'uh', description: 'makes "uh" sound' }
    },
    consonantSounds: {
        'B': 'buh', 'C': 'kuh', 'D': 'duh', 'F': 'fuh', 'G': 'guh', 'H': 'huh',
        'J': 'juh', 'K': 'kuh', 'L': 'luh', 'M': 'muh', 'N': 'nuh', 'P': 'puh',
        'Q': 'kwuh', 'R': 'ruh', 'S': 'suh', 'T': 'tuh', 'V': 'vuh', 'W': 'wuh',
        'X': 'ksuh', 'Y': 'yuh', 'Z': 'zuh'
    }
};

// Phonics game variables
let currentVowel = 'a';
let currentConsonant = 'B';
let phonicsScore = 0;
let phonicsGameActive = false;

// Bangla alphabet data with proper Bengali letter names
const banglaAlphabet = {
    vowels: {
        'অ': { 
            pronunciation: 'o', 
            letterName: 'অ', 
            word: 'অজগর', 
            meaning: 'Ojgor (Python)', 
            english: 'A' 
        },
        'আ': { 
            pronunciation: 'aa', 
            letterName: 'আ', 
            word: 'আম', 
            meaning: 'Aam (Mango)', 
            english: 'Aa' 
        },
        'ই': { 
            pronunciation: 'i', 
            letterName: 'ই', 
            word: 'ইঁদুর', 
            meaning: 'Indur (Mouse)', 
            english: 'I' 
        },
        'ঈ': { 
            pronunciation: 'ii', 
            letterName: 'ঈ', 
            word: 'ঈগল', 
            meaning: 'Igol (Eagle)', 
            english: 'Ee' 
        },
        'উ': { 
            pronunciation: 'u', 
            letterName: 'উ', 
            word: 'উট', 
            meaning: 'Ut (Camel)', 
            english: 'U' 
        },
        'ঊ': { 
            pronunciation: 'uu', 
            letterName: 'ঊ', 
            word: 'ঊর্ণা', 
            meaning: 'Urna (Wool)', 
            english: 'Oo' 
        },
        'ঋ': { 
            pronunciation: 'ri', 
            letterName: 'ঋ', 
            word: 'ঋতু', 
            meaning: 'Ritu (Season)', 
            english: 'Ri' 
        },
        'এ': { 
            pronunciation: 'e', 
            letterName: 'এ', 
            word: 'এলাচ', 
            meaning: 'Elach (Cardamom)', 
            english: 'E' 
        },
        'ঐ': { 
            pronunciation: 'oi', 
            letterName: 'ঐ', 
            word: 'ঐরাবত', 
            meaning: 'Oirabat (Airavata)', 
            english: 'Oi' 
        },
        'ও': { 
            pronunciation: 'o', 
            letterName: 'ও', 
            word: 'ওল', 
            meaning: 'Ol (Yam)', 
            english: 'O' 
        },
        'ঔ': { 
            pronunciation: 'ou', 
            letterName: 'ঔ', 
            word: 'ঔষধ', 
            meaning: 'Oushod (Medicine)', 
            english: 'Ou' 
        }
    },
    consonants: {
        'ক': { 
            pronunciation: 'ko', 
            letterName: 'ক', 
            word: 'কলা', 
            meaning: 'Kola (Banana)', 
            english: 'K' 
        },
        'খ': { 
            pronunciation: 'kho', 
            letterName: 'খ', 
            word: 'খরগোশ', 
            meaning: 'Khorgosh (Rabbit)', 
            english: 'Kh' 
        },
        'গ': { 
            pronunciation: 'go', 
            letterName: 'গ', 
            word: 'গরু', 
            meaning: 'Goru (Cow)', 
            english: 'G' 
        },
        'ঘ': { 
            pronunciation: 'gho', 
            letterName: 'ঘ', 
            word: 'ঘর', 
            meaning: 'Ghor (House)', 
            english: 'Gh' 
        },
        'ঙ': { 
            pronunciation: 'umo', 
            letterName: 'ঙ', 
            word: 'আঙ্গুর',
            meaning: 'Angur (Grapes)',
            english: 'Ng' 
        },
        'চ': { 
            pronunciation: 'cho', 
            letterName: 'চ', 
            word: 'চাঁদ', 
            meaning: 'Chand (Moon)', 
            english: 'Ch' 
        },
        'ছ': { 
            pronunciation: 'chho', 
            letterName: 'ছ', 
            word: 'ছাগল', 
            meaning: 'Chagol (Goat)', 
            english: 'Chh' 
        },
        'জ': { 
            pronunciation: 'jo', 
            letterName: 'জ', 
            word: 'জল', 
            meaning: 'Jol (Water)', 
            english: 'J' 
        },
        'ঝ': { 
            pronunciation: 'jho', 
            letterName: 'ঝ', 
            word: 'ঝরনা', 
            meaning: 'Jhorna (Waterfall)', 
            english: 'Jh' 
        },
        'ঞ': { 
            pronunciation: 'ino', 
            letterName: 'ঞ', 
            word: 'গঞ্জ', 
            meaning: 'Gonj (Market)', 
            english: 'Ny' 
        },
        'ট': { 
            pronunciation: 'to', 
            letterName: 'ট', 
            word: 'টমেটো', 
            meaning: 'Tomato', 
            english: 'T' 
        },
        'ঠ': { 
            pronunciation: 'tho', 
            letterName: 'ঠ', 
            word: 'ঠেলা', 
            meaning: 'Thela', 
            english: 'Th' 
        },
        'ড': { 
            pronunciation: 'do', 
            letterName: 'ড', 
            word: 'ডিম', 
            meaning: 'Dim (Egg)', 
            english: 'D' 
        },
        'ঢ': { 
            pronunciation: 'dho', 
            letterName: 'ঢ', 
            word: 'ঢাক', 
            meaning: 'Dhak (Drum)', 
            english: 'Dh' 
        },
        'ণ': { 
            pronunciation: 'no', 
            letterName: 'ণ', 
            word: 'বাণী', 
            meaning: 'Bani (Speech)', 
            english: 'N' 
        },
        'ত': { 
            pronunciation: 'to', 
            letterName: 'ত', 
            word: 'তারা', 
            meaning: 'Tara (Star)', 
            english: 'T' 
        },
        'থ': { 
            pronunciation: 'tho', 
            letterName: 'থ', 
            word: 'থালা', 
            meaning: 'Thala (Plate)', 
            english: 'Th' 
        },
        'দ': { 
            pronunciation: 'do', 
            letterName: 'দ', 
            word: 'দাঁত', 
            meaning: 'Dant (Teeth)', 
            english: 'D' 
        },
        'ধ': { 
            pronunciation: 'dho', 
            letterName: 'ধ', 
            word: 'ধান', 
            meaning: 'Dhan (Rice)', 
            english: 'Dh' 
        },
        'ন': { 
            pronunciation: 'no', 
            letterName: 'ন', 
            word: 'নৌকা', 
            meaning: 'Nouka (Boat)', 
            english: 'N' 
        },
        'প': { 
            pronunciation: 'po', 
            letterName: 'প', 
            word: 'পাখি', 
            meaning: 'Pakhi (Bird)', 
            english: 'P' 
        },
        'ফ': { 
            pronunciation: 'pho', 
            letterName: 'ফ', 
            word: 'ফুল', 
            meaning: 'Phul (Flower)', 
            english: 'Ph' 
        },
        'ব': { 
            pronunciation: 'bo', 
            letterName: 'ব', 
            word: 'বই', 
            meaning: 'Boi (Book)', 
            english: 'B' 
        },
        'ভ': { 
            pronunciation: 'bho', 
            letterName: 'ভ', 
            word: 'ভালুক', 
            meaning: 'Bhaluk (Bear)', 
            english: 'Bh' 
        },
        'ম': { 
            pronunciation: 'mo', 
            letterName: 'ম', 
            word: 'মাছ', 
            meaning: 'Mach (Fish)', 
            english: 'M' 
        },
        'য': { 
            pronunciation: 'jo', 
            letterName: 'য', 
            word: 'যন্ত্র', 
            meaning: 'Jontro (Machine)', 
            english: 'Y' 
        },
        'র': { 
            pronunciation: 'ro', 
            letterName: 'র', 
            word: 'রং', 
            meaning: 'Rong (Color)', 
            english: 'R' 
        },
        'ল': { 
            pronunciation: 'lo', 
            letterName: 'ল', 
            word: 'লাল', 
            meaning: 'Lal (Red)', 
            english: 'L' 
        },
        'শ': { 
            pronunciation: 'sho', 
            letterName: 'শ', 
            word: 'শাক', 
            meaning: 'Shak (Vegetables)', 
            english: 'Sh' 
        },
        'ষ': { 
            pronunciation: 'sho', 
            letterName: 'ষ', 
            word: 'ষাঁড়', 
            meaning: 'Shar (Bull)', 
            english: 'Sh' 
        },
        'স': { 
            pronunciation: 'so', 
            letterName: 'স', 
            word: 'সূর্য', 
            meaning: 'Surjo (Sun)', 
            english: 'S' 
        },
        'হ': { 
            pronunciation: 'ho', 
            letterName: 'হ', 
            word: 'হাতি', 
            meaning: 'Hathi (Elephant)', 
            english: 'H' 
        }
    }
};

// Arabic alphabet data
const arabicAlphabet = {
    'أ': { pronunciation: 'alif', letterName: 'أ', word: 'أسد', meaning: 'Asad (Lion)', english: 'A' },
    'ب': { pronunciation: 'ba', letterName: 'ب', word: 'بطة', meaning: 'Batta (Duck)', english: 'B' },
    'ت': { pronunciation: 'ta', letterName: 'ت', word: 'تفاحة', meaning: 'Tuffaha (Apple)', english: 'T' },
    'ث': { pronunciation: 'tha', letterName: 'ث', word: 'ثعلب', meaning: 'Thalab (Fox)', english: 'Th' },
    'ج': { pronunciation: 'jeem', letterName: 'ج', word: 'جمل', meaning: 'Jamal (Camel)', english: 'J' },
    'ح': { pronunciation: 'ha', letterName: 'ح', word: 'حصان', meaning: 'Hisan (Horse)', english: 'H' },
    'خ': { pronunciation: 'kha', letterName: 'خ', word: 'خروف', meaning: 'Kharuf (Sheep)', english: 'Kh' },
    'د': { pronunciation: 'dal', letterName: 'د', word: 'دجاجة', meaning: 'Dajaja (Chicken)', english: 'D' },
    'ذ': { pronunciation: 'thal', letterName: 'ذ', word: 'ذئب', meaning: 'Thib (Wolf)', english: 'Th' },
    'ر': { pronunciation: 'ra', letterName: 'ر', word: 'رمان', meaning: 'Rumman (Pomegranate)', english: 'R' },
    'ز': { pronunciation: 'zay', letterName: 'ز', word: 'زرافة', meaning: 'Zarafa (Giraffe)', english: 'Z' },
    'س': { pronunciation: 'seen', letterName: 'س', word: 'سمك', meaning: 'Samak (Fish)', english: 'S' },
    'ش': { pronunciation: 'sheen', letterName: 'ش', word: 'شمس', meaning: 'Shams (Sun)', english: 'Sh' },
    'ص': { pronunciation: 'sad', letterName: 'ص', word: 'صقر', meaning: 'Saqr (Falcon)', english: 'S' },
    'ض': { pronunciation: 'dad', letterName: 'ض', word: 'ضفدع', meaning: 'Difda (Frog)', english: 'D' },
    'ط': { pronunciation: 'ta', letterName: 'ط', word: 'طائر', meaning: 'Tair (Bird)', english: 'T' },
    'ظ': { pronunciation: 'za', letterName: 'ظ', word: 'ظبي', meaning: 'Zabi (Deer)', english: 'Z' },
    'ع': { pronunciation: 'ain', letterName: 'ع', word: 'عنب', meaning: 'Inab (Grapes)', english: 'A' },
    'غ': { pronunciation: 'ghain', letterName: 'غ', word: 'غراب', meaning: 'Ghurab (Crow)', english: 'Gh' },
    'ف': { pronunciation: 'fa', letterName: 'ف', word: 'فيل', meaning: 'Feel (Elephant)', english: 'F' },
    'ق': { pronunciation: 'qaf', letterName: 'ق', word: 'قطة', meaning: 'Qitta (Cat)', english: 'Q' },
    'ك': { pronunciation: 'kaf', letterName: 'ك', word: 'كلب', meaning: 'Kalb (Dog)', english: 'K' },
    'ل': { pronunciation: 'lam', letterName: 'ل', word: 'ليمون', meaning: 'Limun (Lemon)', english: 'L' },
    'م': { pronunciation: 'meem', letterName: 'م', word: 'موز', meaning: 'Muz (Banana)', english: 'M' },
    'ن': { pronunciation: 'nun', letterName: 'ن', word: 'نجمة', meaning: 'Najma (Star)', english: 'N' },
    'ه': { pronunciation: 'ha', letterName: 'ه', word: 'هدهد', meaning: 'Hudhud (Hoopoe)', english: 'H' },
    'و': { pronunciation: 'waw', letterName: 'و', word: 'وردة', meaning: 'Warda (Rose)', english: 'W' },
    'ي': { pronunciation: 'ya', letterName: 'ي', word: 'يد', meaning: 'Yad (Hand)', english: 'Y' }
};

// Bangla game variables
let currentBanglaCategory = 'vowels';
let currentBanglaLetter = 'অ';
let banglaScore = 0;
let banglaGameActive = false;

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

// Nursery rhymes data
const nurseryRhymes = [
    {
        title: "ABC Song",
        icon: "🔤",
        lyrics: [
            { text: "A", timing: 0 }, { text: "B", timing: 0.5 }, { text: "C", timing: 1 }, { text: "D", timing: 1.5 },
            { text: "E", timing: 2 }, { text: "F", timing: 2.5 }, { text: "G", timing: 3 },
            { text: "H", timing: 4 }, { text: "I", timing: 4.5 }, { text: "J", timing: 5 }, { text: "K", timing: 5.5 },
            { text: "L", timing: 6 }, { text: "M", timing: 6.5 }, { text: "N", timing: 7 }, { text: "O", timing: 7.5 }, { text: "P", timing: 8 },
            { text: "Q", timing: 9 }, { text: "R", timing: 9.5 }, { text: "S", timing: 10 }, { text: "T", timing: 10.5 }, { text: "U", timing: 11 }, { text: "V", timing: 11.5 },
            { text: "W", timing: 12.5 }, { text: "X", timing: 13 }, { text: "Y", timing: 13.5 }, { text: "and", timing: 14 }, { text: "Z", timing: 14.5 },
            { text: "Now", timing: 16 }, { text: "I", timing: 16.5 }, { text: "know", timing: 17 }, { text: "my", timing: 17.5 }, { text: "ABC's", timing: 18 },
            { text: "Next", timing: 19.5 }, { text: "time", timing: 20 }, { text: "won't", timing: 20.5 }, { text: "you", timing: 21 }, { text: "sing", timing: 21.5 }, { text: "with", timing: 22 }, { text: "me?", timing: 22.5 }
        ],
        animations: ["🔤", "📚", "✏️", "🎵"],
        duration: 24,
        key: "C",
        tempo: 120,
        chords: [
            { chord: [261.63, 329.63, 392.00], timing: 0, duration: 4 }, // C major
            { chord: [293.66, 369.99, 440.00], timing: 4, duration: 4 }, // D minor
            { chord: [329.63, 415.30, 493.88], timing: 8, duration: 4 }, // E minor
            { chord: [261.63, 329.63, 392.00], timing: 12, duration: 4 }, // C major
            { chord: [349.23, 440.00, 523.25], timing: 16, duration: 4 }, // F major
            { chord: [261.63, 329.63, 392.00], timing: 20, duration: 4 }  // C major
        ],
        melody: [
            { note: 261.63, timing: 0, duration: 0.4 }, // C
            { note: 261.63, timing: 0.5, duration: 0.4 }, // C
            { note: 392.00, timing: 1, duration: 0.4 }, // G
            { note: 392.00, timing: 1.5, duration: 0.4 }, // G
            { note: 440.00, timing: 2, duration: 0.4 }, // A
            { note: 440.00, timing: 2.5, duration: 0.4 }, // A
            { note: 392.00, timing: 3, duration: 0.8 }   // G
        ]
    },
    {
        title: "Twinkle Twinkle",
        icon: "⭐",
        lyrics: [
            { text: "Twinkle", timing: 0 }, { text: "twinkle", timing: 0.8 }, { text: "little", timing: 1.6 }, { text: "star", timing: 2.4 },
            { text: "How", timing: 3.5 }, { text: "I", timing: 4 }, { text: "wonder", timing: 4.5 }, { text: "what", timing: 5.2 }, { text: "you", timing: 5.8 }, { text: "are", timing: 6.4 },
            { text: "Up", timing: 7.5 }, { text: "above", timing: 8 }, { text: "the", timing: 8.6 }, { text: "world", timing: 9.2 }, { text: "so", timing: 9.8 }, { text: "high", timing: 10.4 },
            { text: "Like", timing: 11.5 }, { text: "a", timing: 12 }, { text: "diamond", timing: 12.5 }, { text: "in", timing: 13.2 }, { text: "the", timing: 13.7 }, { text: "sky", timing: 14.3 },
            { text: "Twinkle", timing: 15.5 }, { text: "twinkle", timing: 16.3 }, { text: "little", timing: 17.1 }, { text: "star", timing: 17.9 },
            { text: "How", timing: 19 }, { text: "I", timing: 19.5 }, { text: "wonder", timing: 20 }, { text: "what", timing: 20.7 }, { text: "you", timing: 21.3 }, { text: "are", timing: 21.9 }
        ],
        animations: ["⭐", "🌙", "✨", "🌟"],
        duration: 23,
        key: "C",
        tempo: 100,
        chords: [
            { chord: [261.63, 329.63, 392.00], timing: 0, duration: 4 }, // C major
            { chord: [349.23, 440.00, 523.25], timing: 4, duration: 4 }, // F major
            { chord: [261.63, 329.63, 392.00], timing: 8, duration: 4 }, // C major
            { chord: [392.00, 493.88, 587.33], timing: 12, duration: 4 }, // G major
            { chord: [261.63, 329.63, 392.00], timing: 16, duration: 4 }, // C major
            { chord: [349.23, 440.00, 523.25], timing: 20, duration: 3 }  // F major
        ],
        melody: [
            { note: 261.63, timing: 0, duration: 0.7 },    // Twinkle
            { note: 261.63, timing: 0.8, duration: 0.7 },  // twinkle
            { note: 392.00, timing: 1.6, duration: 0.7 },  // little
            { note: 392.00, timing: 2.4, duration: 1.0 }   // star
        ]
    },
    {
        title: "Old MacDonald",
        icon: "🚜",
        lyrics: [
            { text: "Old", timing: 0 }, { text: "MacDonald", timing: 0.6 }, { text: "had", timing: 1.4 }, { text: "a", timing: 1.8 }, { text: "farm", timing: 2.2 },
            { text: "E-I-E-I-O", timing: 3.5 },
            { text: "And", timing: 5 }, { text: "on", timing: 5.4 }, { text: "his", timing: 5.8 }, { text: "farm", timing: 6.2 }, { text: "he", timing: 6.8 }, { text: "had", timing: 7.2 }, { text: "a", timing: 7.6 }, { text: "cow", timing: 8 },
            { text: "E-I-E-I-O", timing: 9.5 },
            { text: "With", timing: 11 }, { text: "a", timing: 11.4 }, { text: "moo", timing: 11.8 }, { text: "moo", timing: 12.4 }, { text: "here", timing: 13 },
            { text: "And", timing: 13.8 }, { text: "a", timing: 14.2 }, { text: "moo", timing: 14.6 }, { text: "moo", timing: 15.2 }, { text: "there", timing: 15.8 },
            { text: "Here", timing: 16.8 }, { text: "a", timing: 17.2 }, { text: "moo", timing: 17.5 }, { text: "there", timing: 18 }, { text: "a", timing: 18.4 }, { text: "moo", timing: 18.7 },
            { text: "Everywhere", timing: 19.2 }, { text: "a", timing: 20 }, { text: "moo", timing: 20.3 }, { text: "moo", timing: 20.8 },
            { text: "Old", timing: 21.8 }, { text: "MacDonald", timing: 22.4 }, { text: "had", timing: 23.2 }, { text: "a", timing: 23.6 }, { text: "farm", timing: 24 },
            { text: "E-I-E-I-O", timing: 25.5 }
        ],
        animations: ["🚜", "🐄", "🐷", "🐔"],
        duration: 27
    },
    {
        title: "Baa Baa Black Sheep",
        icon: "🐑",
        lyrics: [
            { text: "Baa", timing: 0 }, { text: "baa", timing: 0.6 }, { text: "black", timing: 1.2 }, { text: "sheep", timing: 1.8 },
            { text: "Have", timing: 2.8 }, { text: "you", timing: 3.2 }, { text: "any", timing: 3.6 }, { text: "wool?", timing: 4.2 },
            { text: "Yes", timing: 5.5 }, { text: "sir", timing: 6 }, { text: "yes", timing: 6.5 }, { text: "sir", timing: 7 },
            { text: "Three", timing: 7.8 }, { text: "bags", timing: 8.4 }, { text: "full", timing: 9 },
            { text: "One", timing: 10.5 }, { text: "for", timing: 11 }, { text: "my", timing: 11.4 }, { text: "master", timing: 11.8 },
            { text: "One", timing: 13 }, { text: "for", timing: 13.4 }, { text: "my", timing: 13.8 }, { text: "dame", timing: 14.2 },
            { text: "And", timing: 15.5 }, { text: "one", timing: 16 }, { text: "for", timing: 16.4 }, { text: "the", timing: 16.8 }, { text: "little", timing: 17.2 }, { text: "boy", timing: 17.8 },
            { text: "Who", timing: 18.8 }, { text: "lives", timing: 19.2 }, { text: "down", timing: 19.6 }, { text: "the", timing: 20 }, { text: "lane", timing: 20.4 }
        ],
        animations: ["🐑", "🧶", "👨‍🌾", "🏠"],
        duration: 22
    },
    {
        title: "If You're Happy",
        icon: "😊",
        lyrics: [
            { text: "If", timing: 0 }, { text: "you're", timing: 0.4 }, { text: "happy", timing: 0.8 }, { text: "and", timing: 1.4 }, { text: "you", timing: 1.7 }, { text: "know", timing: 2 }, { text: "it", timing: 2.4 },
            { text: "clap", timing: 2.8 }, { text: "your", timing: 3.2 }, { text: "hands", timing: 3.6 },
            { text: "👏", timing: 4.2 }, { text: "👏", timing: 4.6 },
            { text: "If", timing: 5.5 }, { text: "you're", timing: 5.9 }, { text: "happy", timing: 6.3 }, { text: "and", timing: 6.9 }, { text: "you", timing: 7.2 }, { text: "know", timing: 7.5 }, { text: "it", timing: 7.9 },
            { text: "clap", timing: 8.3 }, { text: "your", timing: 8.7 }, { text: "hands", timing: 9.1 },
            { text: "👏", timing: 9.7 }, { text: "👏", timing: 10.1 },
            { text: "If", timing: 11 }, { text: "you're", timing: 11.4 }, { text: "happy", timing: 11.8 }, { text: "and", timing: 12.4 }, { text: "you", timing: 12.7 }, { text: "know", timing: 13 }, { text: "it", timing: 13.4 },
            { text: "then", timing: 14 }, { text: "your", timing: 14.4 }, { text: "face", timing: 14.8 }, { text: "will", timing: 15.4 }, { text: "surely", timing: 15.8 }, { text: "show", timing: 16.4 }, { text: "it", timing: 16.9 },
            { text: "If", timing: 17.8 }, { text: "you're", timing: 18.2 }, { text: "happy", timing: 18.6 }, { text: "and", timing: 19.2 }, { text: "you", timing: 19.5 }, { text: "know", timing: 19.8 }, { text: "it", timing: 20.2 },
            { text: "clap", timing: 20.6 }, { text: "your", timing: 21 }, { text: "hands", timing: 21.4 },
            { text: "👏", timing: 22 }, { text: "👏", timing: 22.4 }
        ],
        animations: ["😊", "👏", "🎉", "😄"],
        duration: 24
    },
    {
        title: "Row Row Row Your Boat",
        icon: "🚣",
        lyrics: [
            { text: "Row", timing: 0 }, { text: "row", timing: 0.6 }, { text: "row", timing: 1.2 }, { text: "your", timing: 1.8 }, { text: "boat", timing: 2.4 },
            { text: "Gently", timing: 3.5 }, { text: "down", timing: 4.1 }, { text: "the", timing: 4.7 }, { text: "stream", timing: 5.3 },
            { text: "Merrily", timing: 6.8 }, { text: "merrily", timing: 7.6 }, { text: "merrily", timing: 8.4 }, { text: "merrily", timing: 9.2 },
            { text: "Life", timing: 10.2 }, { text: "is", timing: 10.6 }, { text: "but", timing: 11 }, { text: "a", timing: 11.4 }, { text: "dream", timing: 11.8 },
            { text: "Row", timing: 13.5 }, { text: "row", timing: 14.1 }, { text: "row", timing: 14.7 }, { text: "your", timing: 15.3 }, { text: "boat", timing: 15.9 },
            { text: "Gently", timing: 17 }, { text: "down", timing: 17.6 }, { text: "the", timing: 18.2 }, { text: "stream", timing: 18.8 },
            { text: "Merrily", timing: 20.3 }, { text: "merrily", timing: 21.1 }, { text: "merrily", timing: 21.9 }, { text: "merrily", timing: 22.7 },
            { text: "Life", timing: 23.7 }, { text: "is", timing: 24.1 }, { text: "but", timing: 24.5 }, { text: "a", timing: 24.9 }, { text: "dream", timing: 25.3 }
        ],
        animations: ["🚣", "🌊", "⛵", "🌈"],
        duration: 27,
        key: "C",
        tempo: 90,
        chords: [
            { chord: [261.63, 329.63, 392.00], timing: 0, duration: 6 }, // C major
            { chord: [392.00, 493.88, 587.33], timing: 6, duration: 6 }, // G major
            { chord: [261.63, 329.63, 392.00], timing: 12, duration: 6 }, // C major
            { chord: [349.23, 440.00, 523.25], timing: 18, duration: 4 }, // F major
            { chord: [261.63, 329.63, 392.00], timing: 22, duration: 5 }  // C major
        ],
        melody: [
            { note: 261.63, timing: 0, duration: 0.5 },    // Row
            { note: 293.66, timing: 0.6, duration: 0.5 },  // row
            { note: 329.63, timing: 1.2, duration: 0.5 },  // row
            { note: 349.23, timing: 1.8, duration: 0.5 },  // your
            { note: 392.00, timing: 2.4, duration: 1.0 },  // boat
            { note: 392.00, timing: 3.5, duration: 0.5 },  // Gently
            { note: 349.23, timing: 4.1, duration: 0.5 },  // down
            { note: 329.63, timing: 4.7, duration: 0.5 },  // the
            { note: 293.66, timing: 5.3, duration: 1.4 }   // stream
        ]
    }
];

// Drawing templates and coloring pages data
const drawingTemplates = {
    letters: [
        { name: 'Letter A', data: 'A' },
        { name: 'Letter B', data: 'B' },
        { name: 'Letter C', data: 'C' },
        { name: 'Letter D', data: 'D' },
        { name: 'Letter E', data: 'E' }
    ],
    numbers: [
        { name: 'Number 1', data: '1' },
        { name: 'Number 2', data: '2' },
        { name: 'Number 3', data: '3' },
        { name: 'Number 4', data: '4' },
        { name: 'Number 5', data: '5' }
    ],
    shapes: [
        { name: 'Circle', shape: 'circle' },
        { name: 'Square', shape: 'square' },
        { name: 'Triangle', shape: 'triangle' },
        { name: 'Star', shape: 'star' },
        { name: 'Heart', shape: 'heart' }
    ]
};

const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3',
    '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#10ac84', '#ee5a6f',
    '#2c2c54', '#40407a', '#706fd3', '#f0932b', '#eb4d4b', '#6ab04c'
];

const stickers = ['🌟', '⭐', '🎈', '🎉', '❤️', '💙', '💚', '💛', '🦋', '🌈', '☀️', '🌙', '⚽', '🎨', '🎵', '🍎'];

// Interactive Storybooks data
const interactiveStories = [
    {
        id: 'three-bears',
        title: 'Goldilocks and the Three Bears',
        cover: '🐻',
        description: 'A curious little girl discovers a house in the woods',
        pages: [
            {
                text: "Once upon a time, there was a little girl named Goldilocks. She had beautiful golden hair and loved to explore.",
                scene: {
                    background: '#87CEEB',
                    elements: [
                        { type: 'emoji', content: '👧', x: 40, y: 60, size: 60, clickable: true, sound: 'Hello! I\'m Goldilocks!' },
                        { type: 'emoji', content: '🌳', x: 20, y: 70, size: 40, clickable: true, sound: 'What a beautiful forest!' },
                        { type: 'emoji', content: '🌳', x: 80, y: 65, size: 45, clickable: true, sound: 'So many trees to explore!' },
                        { type: 'emoji', content: '🌸', x: 60, y: 80, size: 25, clickable: true, sound: 'Pretty flowers!' }
                    ]
                }
            },
            {
                text: "While walking through the forest, Goldilocks found a cozy little house. She knocked on the door, but nobody answered.",
                scene: {
                    background: '#90EE90',
                    elements: [
                        { type: 'emoji', content: '🏠', x: 50, y: 45, size: 80, clickable: true, sound: 'What a lovely house!' },
                        { type: 'emoji', content: '👧', x: 25, y: 65, size: 50, clickable: true, sound: 'Hello? Is anyone home?' },
                        { type: 'emoji', content: '🚪', x: 50, y: 60, size: 30, clickable: true, sound: 'Knock knock!' },
                        { type: 'emoji', content: '🌲', x: 15, y: 75, size: 35, clickable: true, sound: 'Tall pine trees!' },
                        { type: 'emoji', content: '🌲', x: 85, y: 70, size: 40, clickable: true, sound: 'Forest sounds!' }
                    ]
                }
            },
            {
                text: "Inside, Goldilocks saw three bowls of porridge on the table. One big bowl, one medium bowl, and one small bowl.",
                scene: {
                    background: '#F5DEB3',
                    elements: [
                        { type: 'emoji', content: '🥣', x: 25, y: 50, size: 60, clickable: true, sound: 'Papa Bear\'s big bowl!' },
                        { type: 'emoji', content: '🥣', x: 50, y: 50, size: 45, clickable: true, sound: 'Mama Bear\'s medium bowl!' },
                        { type: 'emoji', content: '🥣', x: 75, y: 50, size: 30, clickable: true, sound: 'Baby Bear\'s small bowl!' },
                        { type: 'emoji', content: '👧', x: 50, y: 75, size: 50, clickable: true, sound: 'Mmm, this porridge smells good!' },
                        { type: 'emoji', content: '🪑', x: 25, y: 70, size: 35, clickable: true, sound: 'A big chair!' },
                        { type: 'emoji', content: '🪑', x: 75, y: 70, size: 25, clickable: true, sound: 'A small chair!' }
                    ]
                }
            },
            {
                text: "After eating, Goldilocks felt sleepy. She found three beds upstairs. The small bed was just right!",
                scene: {
                    background: '#E6E6FA',
                    elements: [
                        { type: 'emoji', content: '🛏️', x: 25, y: 40, size: 60, clickable: true, sound: 'Papa Bear\'s big bed!' },
                        { type: 'emoji', content: '🛏️', x: 50, y: 45, size: 45, clickable: true, sound: 'Mama Bear\'s medium bed!' },
                        { type: 'emoji', content: '🛏️', x: 75, y: 50, size: 30, clickable: true, sound: 'Baby Bear\'s cozy bed!' },
                        { type: 'emoji', content: '👧', x: 75, y: 65, size: 40, clickable: true, sound: 'Zzz... so comfortable!' },
                        { type: 'emoji', content: '🌙', x: 15, y: 20, size: 35, clickable: true, sound: 'Sleepy time!' },
                        { type: 'emoji', content: '⭐', x: 85, y: 25, size: 25, clickable: true, sound: 'Twinkle twinkle!' }
                    ]
                }
            },
            {
                text: "Suddenly, the three bears came home! Goldilocks woke up and saw them. She jumped out of bed and ran home safely. The end!",
                scene: {
                    background: '#FFB6C1',
                    elements: [
                        { type: 'emoji', content: '🐻', x: 20, y: 60, size: 60, clickable: true, sound: 'Papa Bear says: Someone\'s been here!' },
                        { type: 'emoji', content: '🐻', x: 50, y: 65, size: 45, clickable: true, sound: 'Mama Bear says: Who ate our porridge?' },
                        { type: 'emoji', content: '🐻', x: 80, y: 70, size: 30, clickable: true, sound: 'Baby Bear says: Someone slept in my bed!' },
                        { type: 'emoji', content: '👧', x: 15, y: 40, size: 40, clickable: true, sound: 'Oh my! I better go home!' },
                        { type: 'emoji', content: '🏃‍♀️', x: 85, y: 40, size: 35, clickable: true, sound: 'Running home safely!' },
                        { type: 'emoji', content: '🏠', x: 85, y: 15, size: 30, clickable: true, sound: 'Home sweet home!' }
                    ]
                }
            }
        ]
    },
    {
        id: 'little-duck',
        title: 'The Little Yellow Duck',
        cover: '🦆',
        description: 'A little duck goes on an adventure at the pond',
        pages: [
            {
                text: "Once there was a little yellow duck who lived by a beautiful blue pond with her family.",
                scene: {
                    background: '#ADD8E6',
                    elements: [
                        { type: 'emoji', content: '🦆', x: 50, y: 60, size: 50, clickable: true, sound: 'Quack quack! I\'m a little duck!' },
                        { type: 'emoji', content: '🦆', x: 30, y: 65, size: 40, clickable: true, sound: 'Mama Duck says hello!' },
                        { type: 'emoji', content: '🦆', x: 70, y: 65, size: 40, clickable: true, sound: 'Papa Duck says quack!' },
                        { type: 'emoji', content: '💧', x: 25, y: 80, size: 25, clickable: true, sound: 'Splash splash!' },
                        { type: 'emoji', content: '💧', x: 75, y: 80, size: 25, clickable: true, sound: 'Water drops!' },
                        { type: 'emoji', content: '🌊', x: 50, y: 85, size: 60, clickable: true, sound: 'Gentle waves!' }
                    ]
                }
            },
            {
                text: "The little duck loved to swim and play in the water. She splashed and paddled all around the pond.",
                scene: {
                    background: '#87CEEB',
                    elements: [
                        { type: 'emoji', content: '🦆', x: 45, y: 50, size: 55, clickable: true, sound: 'Swimming is so much fun!' },
                        { type: 'emoji', content: '💦', x: 30, y: 60, size: 30, clickable: true, sound: 'Splash!' },
                        { type: 'emoji', content: '💦', x: 70, y: 60, size: 30, clickable: true, sound: 'Splish!' },
                        { type: 'emoji', content: '🐸', x: 20, y: 70, size: 35, clickable: true, sound: 'Ribbit! Hello duck!' },
                        { type: 'emoji', content: '🐟', x: 80, y: 75, size: 30, clickable: true, sound: 'Blub blub! I\'m a fish!' },
                        { type: 'emoji', content: '🌸', x: 15, y: 40, size: 25, clickable: true, sound: 'Pretty pond flowers!' }
                    ]
                }
            },
            {
                text: "One day, the little duck saw a beautiful butterfly. She followed it around the garden, curious and excited.",
                scene: {
                    background: '#98FB98',
                    elements: [
                        { type: 'emoji', content: '🦆', x: 40, y: 65, size: 50, clickable: true, sound: 'Where is that butterfly going?' },
                        { type: 'emoji', content: '🦋', x: 65, y: 35, size: 40, clickable: true, sound: 'Flutter flutter! Follow me!' },
                        { type: 'emoji', content: '🌷', x: 25, y: 75, size: 35, clickable: true, sound: 'Beautiful tulips!' },
                        { type: 'emoji', content: '🌼', x: 75, y: 70, size: 30, clickable: true, sound: 'Daisy flowers!' },
                        { type: 'emoji', content: '🌿', x: 15, y: 60, size: 25, clickable: true, sound: 'Green grass!' },
                        { type: 'emoji', content: '🐛', x: 85, y: 80, size: 20, clickable: true, sound: 'A little caterpillar!' }
                    ]
                }
            },
            {
                text: "The duck made new friends! She met a friendly frog, a colorful fish, and a busy bee. They all played together.",
                scene: {
                    background: '#F0E68C',
                    elements: [
                        { type: 'emoji', content: '🦆', x: 50, y: 50, size: 50, clickable: true, sound: 'I love having friends!' },
                        { type: 'emoji', content: '🐸', x: 30, y: 65, size: 40, clickable: true, sound: 'Ribbit! Let\'s be friends!' },
                        { type: 'emoji', content: '🐟', x: 70, y: 70, size: 35, clickable: true, sound: 'Swimming is fun together!' },
                        { type: 'emoji', content: '🐝', x: 60, y: 30, size: 30, clickable: true, sound: 'Buzz buzz! Happy bee!' },
                        { type: 'emoji', content: '🌻', x: 20, y: 40, size: 40, clickable: true, sound: 'Sunny sunflower!' },
                        { type: 'emoji', content: '🎵', x: 80, y: 45, size: 25, clickable: true, sound: 'Music and fun!' }
                    ]
                }
            },
            {
                text: "When the sun began to set, the little duck swam back to her family. She was happy and tired after her big adventure!",
                scene: {
                    background: '#FFA07A',
                    elements: [
                        { type: 'emoji', content: '🦆', x: 45, y: 60, size: 50, clickable: true, sound: 'Home with my family!' },
                        { type: 'emoji', content: '🦆', x: 25, y: 65, size: 40, clickable: true, sound: 'Welcome home, little one!' },
                        { type: 'emoji', content: '🦆', x: 65, y: 65, size: 40, clickable: true, sound: 'We missed you!' },
                        { type: 'emoji', content: '🌅', x: 50, y: 25, size: 60, clickable: true, sound: 'Beautiful sunset!' },
                        { type: 'emoji', content: '💤', x: 70, y: 40, size: 30, clickable: true, sound: 'Time for sleepy duck!' },
                        { type: 'emoji', content: '❤️', x: 30, y: 40, size: 25, clickable: true, sound: 'Love and family!' }
                    ]
                }
            }
        ]
    },
    {
        id: 'rainbow-day',
        title: 'The Rainbow Day',
        cover: '🌈',
        description: 'A magical day when colors come to life',
        pages: [
            {
                text: "It was a rainy morning, but then something magical happened! A beautiful rainbow appeared in the sky.",
                scene: {
                    background: '#E0E0E0',
                    elements: [
                        { type: 'emoji', content: '🌈', x: 50, y: 30, size: 80, clickable: true, sound: 'Look at all the beautiful colors!' },
                        { type: 'emoji', content: '🌧️', x: 20, y: 60, size: 40, clickable: true, sound: 'Pitter patter rain!' },
                        { type: 'emoji', content: '☀️', x: 80, y: 60, size: 45, clickable: true, sound: 'Sunshine after rain!' },
                        { type: 'emoji', content: '👧', x: 45, y: 75, size: 40, clickable: true, sound: 'Wow! A rainbow!' },
                        { type: 'emoji', content: '💧', x: 15, y: 80, size: 20, clickable: true, sound: 'Drip drop!' },
                        { type: 'emoji', content: '🌤️', x: 30, y: 45, size: 35, clickable: true, sound: 'Partly cloudy!' }
                    ]
                }
            },
            {
                text: "The red color jumped down from the rainbow and became a shiny red apple and a fire truck!",
                scene: {
                    background: '#FFE4E1',
                    elements: [
                        { type: 'emoji', content: '🍎', x: 35, y: 50, size: 50, clickable: true, sound: 'I\'m a red apple! Crunch crunch!' },
                        { type: 'emoji', content: '🚒', x: 65, y: 60, size: 45, clickable: true, sound: 'Fire truck coming through!' },
                        { type: 'emoji', content: '❤️', x: 50, y: 30, size: 40, clickable: true, sound: 'Red is the color of love!' },
                        { type: 'emoji', content: '🌹', x: 20, y: 70, size: 35, clickable: true, sound: 'Beautiful red rose!' },
                        { type: 'emoji', content: '🎈', x: 80, y: 35, size: 30, clickable: true, sound: 'Red balloon floating!' },
                        { type: 'emoji', content: '🍓', x: 15, y: 45, size: 25, clickable: true, sound: 'Sweet strawberry!' }
                    ]
                }
            },
            {
                text: "Then the blue color came down and turned into the ocean, blueberries, and a beautiful blue bird!",
                scene: {
                    background: '#E6F3FF',
                    elements: [
                        { type: 'emoji', content: '🌊', x: 50, y: 70, size: 70, clickable: true, sound: 'Blue ocean waves!' },
                        { type: 'emoji', content: '🫐', x: 30, y: 45, size: 40, clickable: true, sound: 'Tasty blueberries!' },
                        { type: 'emoji', content: '🐦', x: 70, y: 40, size: 45, clickable: true, sound: 'Tweet tweet! Blue bird singing!' },
                        { type: 'emoji', content: '💎', x: 25, y: 25, size: 35, clickable: true, sound: 'Sparkling blue gem!' },
                        { type: 'emoji', content: '🦋', x: 75, y: 25, size: 30, clickable: true, sound: 'Blue butterfly dancing!' },
                        { type: 'emoji', content: '🐋', x: 45, y: 60, size: 40, clickable: true, sound: 'Blue whale swimming!' }
                    ]
                }
            },
            {
                text: "The yellow color bounced down and became the bright sun, a happy banana, and golden stars!",
                scene: {
                    background: '#FFFACD',
                    elements: [
                        { type: 'emoji', content: '☀️', x: 50, y: 30, size: 60, clickable: true, sound: 'Bright yellow sunshine!' },
                        { type: 'emoji', content: '🍌', x: 30, y: 60, size: 45, clickable: true, sound: 'Yummy yellow banana!' },
                        { type: 'emoji', content: '⭐', x: 70, y: 50, size: 40, clickable: true, sound: 'Twinkling yellow star!' },
                        { type: 'emoji', content: '🌻', x: 20, y: 40, size: 50, clickable: true, sound: 'Happy sunflower!' },
                        { type: 'emoji', content: '🐤', x: 75, y: 70, size: 35, clickable: true, sound: 'Little yellow chick!' },
                        { type: 'emoji', content: '🧀', x: 15, y: 75, size: 30, clickable: true, sound: 'Yellow cheese!' }
                    ]
                }
            },
            {
                text: "All the colors danced together and created the most beautiful day ever! The little girl smiled and played with all the colorful friends.",
                scene: {
                    background: '#F0F8FF',
                    elements: [
                        { type: 'emoji', content: '👧', x: 50, y: 60, size: 50, clickable: true, sound: 'This is the best day ever!' },
                        { type: 'emoji', content: '🌈', x: 50, y: 25, size: 70, clickable: true, sound: 'Rainbow magic everywhere!' },
                        { type: 'emoji', content: '🎨', x: 25, y: 50, size: 40, clickable: true, sound: 'Colors are amazing!' },
                        { type: 'emoji', content: '🦋', x: 75, y: 45, size: 35, clickable: true, sound: 'Dancing with colors!' },
                        { type: 'emoji', content: '🌸', x: 30, y: 75, size: 30, clickable: true, sound: 'Colorful flowers blooming!' },
                        { type: 'emoji', content: '✨', x: 70, y: 75, size: 25, clickable: true, sound: 'Magical sparkles!' }
                    ]
                }
            }
        ]
    }
];

