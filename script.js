document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
  });

//   // simple contact alert
//   document.getElementById('contactBtn').addEventListener('click', () => {
//     alert('Thank you for reaching out! We will contact you shortly.');
//   });