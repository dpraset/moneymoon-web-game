// Game State
let gameState = {
    money: 0,
    moneyPerClick: 1,
    moneyPerSecond: 0,

    // Timer for moon reveal (5 minutes = 300 seconds)
    gameStartTime: Date.now(),
    moonRevealed: false
};

// Money Elements
const elements = {
    money: document.getElementById('money'),
    moneyPerSec: document.getElementById('moneyPerSec'),
    clickValue: document.getElementById('clickValue'),
    clickMoney: document.getElementById('clickMoney')
};

// Format number after reaching thousand / million etc.
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return Math.floor(num).toString();
}

function updateDisplay() {
    elements.money.textContent = '$' + formatNumber(gameState.money);
    elements.moneyPerSec.textContent = formatNumber(gameState.moneyPerSecond);
    elements.clickValue.textContent = formatNumber(gameState.moneyPerClick)
};

function showFloatingMoney(element, amount) {
    const rect = element.getBoundingClientRect();
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-money';
    floatingText.textContent = '+$' + formatNumber(amount);
    floatingText.style.left = (rect.left + rect.width / 2 - 20) + 'px';
    floatingText.style.top = rect.top + 'px';
    document.body.appendChild(floatingText);
    
    setTimeout(() => {
        if (document.body.contains(floatingText)) {
            document.body.removeChild(floatingText);
        }
    }, 1000);
}

// Game Actions
elements.clickMoney.addEventListener('click', () => {
    gameState.money += gameState.moneyPerClick;
    showFloatingMoney(elements.clickMoney, gameState.moneyPerClick);
    updateDisplay();
});

// Game Loop
function gameLoop() {
    // Generate passive income
    gameState.money += gameState.moneyPerSecond;
    
    // Reveal the moon
    const gameTime = (Date.now() - gameState.gameStartTime) / 1000;
    if (!gameState.moonRevealed && gameTime >= 300) { // 5 minutes
        revealMoonThreat();
    }
    
    updateDisplay();
}

// Start the game
updateDisplay();
setInterval(gameLoop, 1000); // Run every second