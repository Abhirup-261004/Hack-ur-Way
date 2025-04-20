const form = document.getElementById('reminderForm');
const list = document.getElementById('reminderList');

let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

function saveReminders() {
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

function renderReminders() {
  list.innerHTML = '';
  reminders.forEach((reminder, index) => {
    const li = document.createElement('li');
    li.innerText = `${reminder.type}: ${reminder.title} at ${reminder.time}`;
    list.appendChild(li);
  });
}

function checkTimeMatch() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM
  reminders.forEach(reminder => {
    if (reminder.time === currentTime && !reminder.notified) {
      alert(`Reminder: ${reminder.type} - ${reminder.title}`);
      reminder.notified = true;
      saveReminders();
    }
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const type = document.getElementById('type').value;
  const title = document.getElementById('title').value;
  const time = document.getElementById('time').value;

  reminders.push({ type, title, time, notified: false });
  saveReminders();
  renderReminders();
  form.reset();
});

setInterval(checkTimeMatch, 60000); // Check every minute
renderReminders();

