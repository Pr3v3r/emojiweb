const accessKey = '0f168b19fb5ec481712b016c35e6983de2dd3bce'; // Replace with your actual Emoji API key

let currentEmoji = '';

function setEmoji(emoji) {
    currentEmoji = emoji;
    document.getElementById('userPersona').textContent = emoji;
    
    document.querySelectorAll('.emoji-button').forEach(button => {
        button.classList.remove('selected');
        if (button.textContent === emoji) {
            button.classList.add('selected');
        }
    });
    
    localStorage.setItem('userEmoji', emoji);
    updateMoodTextAndTheme(emoji);
}

function updateMoodTextAndTheme(emoji) {
    let mood, primaryColor, secondaryColor, backgroundColor, textColor;

    switch(emoji) {
        case '😊':
            mood = 'Happy';
            primaryColor = '#FFD700';
            secondaryColor = '#FFF700';
            backgroundColor = '#FFFACD';
            textColor = '#333';
            break;
        case '😎':
            mood = 'Cool';
            primaryColor = '#4CAF50';
            secondaryColor = '#8BC34A';
            backgroundColor = '#E8F5E9';
            textColor = '#333';
            break;
        case '🤔':
            mood = 'Thoughtful';
            primaryColor = '#9C27B0';
            secondaryColor = '#BA68C8';
            backgroundColor = '#F3E5F5';
            textColor = '#333';
            break;
        case '😢':
            mood = 'Sad';
            primaryColor = '#2196F3';
            secondaryColor = '#64B5F6';
            backgroundColor = '#E3F2FD';
            textColor = '#333';
            break;
        case '😠':
            mood = 'Angry';
            primaryColor = '#F44336';
            secondaryColor = '#FF8A80';
            backgroundColor = '#FFEBEE';
            textColor = '#333';
            break;
        default:
            mood = 'Neutral';
            primaryColor = '#ff69b4';
            secondaryColor = '#ffb7c5';
            backgroundColor = '#fef6f6';
            textColor = '#333';
    }

    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--background-color', backgroundColor);
    document.documentElement.style.setProperty('--text-color', textColor);

    const moodText = document.querySelector('.mood-text') || document.createElement('p');
    moodText.className = 'mood-text';
    moodText.textContent = `Current Mood: ${mood}`;
    document.querySelector('.user-profile').appendChild(moodText);
}

async function convertToEmoji() {
    const textInput = document.getElementById('textInput').value;
    const emojiOutput = document.getElementById('emojiOutput');

    if (!textInput) {
        alert('Please enter some text to convert to emoji.');
        return;
    }

    try {
        const response = await fetch(`https://emoji-api.com/emojis?search=${encodeURIComponent(textInput)}&access_key=${accessKey}`);
        const data = await response.json();

        if (data.status && data.status === "error") {
            emojiOutput.textContent = "No emoji found for the given text.";
        } else if (data.length > 0) {
            emojiOutput.textContent = data[0].character;
        } else {
            emojiOutput.textContent = "No emoji found for the given text.";
        }
    } catch (error) {
        console.error('Error:', error);
        emojiOutput.textContent = "An error occurred while fetching data.";
    }
}

async function convertToText() {
    const emojiInput = document.getElementById('emojiInput').value;
    const textOutput = document.getElementById('textOutput');

    if (!emojiInput) {
        alert('Please enter an emoji to convert to text.');
        return;
    }

    try {
        const response = await fetch(`https://emoji-api.com/emojis?search=${encodeURIComponent(emojiInput)}&access_key=${accessKey}`);
        const data = await response.json();

        if (data.status && data.status === "error") {
            textOutput.textContent = "No text found for the given emoji.";
        } else if (data.length > 0) {
            textOutput.textContent = data[0].unicodeName;
        } else {
            textOutput.textContent = "No text found for the given emoji.";
        }
    } catch (error) {
        console.error('Error:', error);
        textOutput.textContent = "An error occurred while fetching data.";
    }
}

// Sakura animation
function createSakura() {
    const sakuraContainer = document.querySelector('.sakura-container');
    const sakura = document.createElement('div');
    sakura.classList.add('sakura');
    
    const size = Math.random() * 10 + 5;
    const startPositionLeft = Math.random() * window.innerWidth;
    const startOpacity = Math.random() * 0.5 + 0.3;
    const endPositionLeft = startPositionLeft + Math.random() * 200 - 100;
    const durationSeconds = Math.random() * 5 + 5;
    
    sakura.style.width = `${size}px`;
    sakura.style.height = `${size}px`;
    sakura.style.left = `${startPositionLeft}px`;
    sakura.style.opacity = startOpacity;
    sakura.style.animationDuration = `${durationSeconds}s`;
    
    sakuraContainer.appendChild(sakura);
    
    setTimeout(() => {
        sakura.remove();
    }, durationSeconds * 1000);
}

// Load saved emoji on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.emoji-button').forEach(button => {
        button.addEventListener('click', () => setEmoji(button.textContent));
    });

    const savedEmoji = localStorage.getItem('userEmoji');
    if (savedEmoji) {
        setEmoji(savedEmoji);
    }
});

setInterval(createSakura, 300);

// Helper function to select elements by text content
Element.prototype.contains = function(text) {
    return this.textContent.includes(text);
};

