let activityLog = [];
let clickCount = 0;
let clickTimer = null;

const logContainer = document.getElementById('logContainer');
const warningBox = document.getElementById('suspiciousWarning');
const captureZone = document.getElementById('captureZone');

// 1. Activity Logging Function
function logActivity(type, target, detail = "") {
    const timestamp = new Date().toLocaleTimeString();
    const entry = { timestamp, type, target, detail };
    
    activityLog.unshift(entry); // Add to beginning of array
    updateLogUI();
    
    // Check for "Suspicious" clicking (e.g., more than 5 clicks in 2 seconds)
    if (type === 'CLICK') {
        handleSpamDetection();
    }
}

// 2. UI Rendering
function updateLogUI() {
    if (activityLog.length === 0) {
        logContainer.innerHTML = '<p class="empty-msg">No activity recorded yet...</p>';
        return;
    }

    logContainer.innerHTML = activityLog.map(log => `
        <div class="log-entry">
            [${log.timestamp}] <strong>${log.type}</strong> on <em>${log.target}</em> ${log.detail}
        </div>
    `).join('');
}

// 3. Event Listeners (Bubbling vs Capturing)

// Capturing Phase: Listening on the wrapper (true as 3rd param)
captureZone.addEventListener('click', (e) => {
    console.log("Capturing phase: Action detected in zone.");
}, true);

// Bubbling Phase: Tracking specific events
document.addEventListener('click', (e) => {
    const targetDesc = `${e.target.tagName.toLowerCase()}${e.target.id ? '#' + e.target.id : ''}`;
    logActivity('CLICK', targetDesc);
});

document.addEventListener('keydown', (e) => {
    logActivity('KEYPRESS', 'document', `(Key: ${e.key})`);
});

// Tracking Focus (Focus events do not bubble, so we use capture: true)
document.addEventListener('focus', (e) => {
    const targetDesc = `${e.target.tagName.toLowerCase()}#${e.target.id}`;
    logActivity('FOCUS', targetDesc);
}, true);

// 4. Suspicious Activity Logic (Thresholds)
function handleSpamDetection() {
    clickCount++;
    
    // Reset counter every 2 seconds
    if (!clickTimer) {
        clickTimer = setTimeout(() => {
            if (clickCount > 10) {
                warningBox.classList.remove('hidden');
                setTimeout(() => warningBox.classList.add('hidden'), 3000);
            }
            clickCount = 0;
            clickTimer = null;
        }, 2000);
    }
}

// 5. Export and Reset
function exportLog() {
    if (activityLog.length === 0) return alert("Nothing to export!");
    
    const text = activityLog
        .map(l => `${l.timestamp} - ${l.type} - ${l.target} ${l.detail}`)
        .join('\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = 'activity_log.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
}

function resetLog() {
    activityLog = [];
    updateLogUI();
}