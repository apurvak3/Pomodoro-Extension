let seconds = 25 * 60;
let isRunning = false;

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
    createContextMenus();
    resetTimer();
});

function createContextMenus() {
    chrome.contextMenus.create({
        id: "start-timer",
        title: "Start Timer",
        contexts: ['all']
    });

    chrome.contextMenus.create({
        id: "reset-timer",
        title: "Reset Timer",
        contexts: ['all']
    });
}

function createAlarm(name) {
    chrome.alarms.create(name, {
        periodInMinutes: 1/60  // Run every second
    });
}

function clearAlarm(name) {
    chrome.alarms.clear(name, (wasCleared) => {
        console.log(`Alarm ${name} cleared:`, wasCleared);
    });
}

function createNotification(message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/circle-16.png',
        title: 'Pomodoro Timer',
        message: message,
        priority: 2
    });
}

function updateBadge() {
    const minutes = Math.floor(seconds / 60);
    const text = minutes.toString() + 'm';
    
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ 
        color: seconds > 60 ? '#FFA500' : '#FF0000' 
    });
}

function resetTimer() {
    seconds = 25 * 60;
    isRunning = false;
    updateBadge();
    chrome.action.setBadgeText({ text: '25m' });
    chrome.action.setBadgeBackgroundColor({ color: '#FFA500' });
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        createAlarm('pomodoro-timer');
        updateBadge();
    }
}

function stopTimer() {
    isRunning = false;
    clearAlarm('pomodoro-timer');
    resetTimer();
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "start-timer":
            startTimer();
            break;
        case "reset-timer":
            stopTimer();
            break;
    }
});

// Handle alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'pomodoro-timer' && isRunning) {
        seconds--;
        updateBadge();
        
        if (seconds <= 0) {
            stopTimer();
            createNotification('Time is up! Take a break.');
        }
    }
});