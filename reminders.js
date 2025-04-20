const form = document.getElementById('reminderForm');
const list = document.getElementById('reminderList');

let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

function saveReminders() {
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

function renderReminders() {
  list.innerHTML = '';
  reminders.forEach(reminder => {
    const li = document.createElement('li');
    li.innerText = `${reminder.type}: ${reminder.title} at ${reminder.time}`;
    list.appendChild(li);
  });
}

function checkTimeMatch() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  reminders.forEach(reminder => {
    if (reminder.time === currentTime && !reminder.notified) {
      triggerReminder(reminder);
      reminder.notified = true;
    }
  });

  saveReminders();
}

function triggerReminder(reminder) {
  const audio = new Audio('alarm.mp3');
  audio.loop = true;
  audio.play();

  if (Notification.permission === 'granted') {
    new Notification(`Reminder: ${reminder.title}`, {
      body: `${reminder.type} at ${reminder.time}`,
      icon: 'CareEase-removebg-preview.png'
    });
  }

  if ('vibrate' in navigator) {
    navigator.vibrate([300, 100, 300]);
  }

  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.top = '20%';
  popup.style.left = '50%';
  popup.style.transform = 'translateX(-50%)';
  popup.style.background = '#fff';
  popup.style.border = '2px solid #50BCD5';
  popup.style.padding = '20px';
  popup.style.zIndex = '9999';
  popup.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
  popup.style.borderRadius = '10px';
  popup.innerHTML = `
    <h3>Reminder Alert</h3>
    <p><strong>${reminder.type}</strong>: ${reminder.title}</p>
    <p>Time: ${reminder.time}</p>
    <button id="okBtn">OK</button>
  `;
  document.body.appendChild(popup);

  const popupTimeout = setTimeout(() => {
    if (document.body.contains(popup)) {
      audio.pause();
      popup.remove();
      storeMissedReminder(reminder);
    }
  }, 30000);

  document.getElementById('okBtn').onclick = () => {
    clearTimeout(popupTimeout);
    audio.pause();
    popup.remove();
  };
}

function storeMissedReminder(reminder) {
  const missed = JSON.parse(localStorage.getItem('missedReminders')) || [];
  const missedReminder = {
    ...reminder,
    missedDate: new Date().toISOString().slice(0, 10),
    completed: false
  };
  missed.push(missedReminder);
  localStorage.setItem('missedReminders', JSON.stringify(missed));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const type = document.getElementById('type').value;
  const title = document.getElementById('title').value;
  const time = document.getElementById('time').value;

  reminders.push({
    type,
    title,
    time,
    notified: false
  });

  saveReminders();
  renderReminders();
  form.reset();
});

if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

setInterval(checkTimeMatch, 60000);
renderReminders();
