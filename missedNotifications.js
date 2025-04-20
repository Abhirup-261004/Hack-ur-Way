const container = document.getElementById('missedContainer');
let missedReminders = JSON.parse(localStorage.getItem('missedReminders')) || [];

function saveMissed() {
  localStorage.setItem('missedReminders', JSON.stringify(missedReminders));
}

function groupByDate(reminders) {
  const grouped = {};
  reminders.forEach(reminder => {
    const date = reminder.missedDate || "Unknown Date";
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(reminder);
  });
  return grouped;
}

function renderMissed() {
  container.innerHTML = '';
  const grouped = groupByDate(missedReminders);

  Object.keys(grouped).forEach(date => {
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    heading.textContent = date;
    section.appendChild(heading);

    const ul = document.createElement('ul');
    grouped[date].forEach((reminder, index) => {
      const li = document.createElement('li');
      const label = document.createElement('label');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = reminder.completed;
      checkbox.onchange = () => {
        reminder.completed = checkbox.checked;
        saveMissed();
        renderMissed();
      };

      const span = document.createElement('span');
      span.textContent = `${reminder.type}: ${reminder.title} (Missed at ${reminder.time})`;
      if (reminder.completed) {
        span.classList.add('completed');
      }

      label.appendChild(checkbox);
      label.appendChild(span);

      const retryBtn = document.createElement('button');
      retryBtn.textContent = 'Retry';
      retryBtn.className = 'retry-btn';
      retryBtn.onclick = () => {
        addToTodayReminders(reminder);
        alert("Reminder added to today's list!");
      };

      li.appendChild(label);
      li.appendChild(retryBtn);
      ul.appendChild(li);
    });

    section.appendChild(ul);
    container.appendChild(section);
  });
}

function clearMissed() {
  if (confirm("Are you sure you want to clear all missed reminders?")) {
    localStorage.removeItem('missedReminders');
    missedReminders = [];
    renderMissed();
  }
}

function addToTodayReminders(reminder) {
  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  reminders.push({
    type: reminder.type,
    title: reminder.title + ' (Retry)',
    time: currentTime,
    notified: false
  });

  localStorage.setItem('reminders', JSON.stringify(reminders));
}

renderMissed();