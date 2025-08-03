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

function updateDisplay() {
    elements.money.textContent = '$' + formatNumber(gameState.money);
    elements.moneyPerSec.textContent = formatNumber(gameState.moneyPerSecond);
    elements.clickValue.textContent = formatNumber(gameState.moneyPerClick)
};