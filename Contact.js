document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    emailjs.sendForm('service_r0aycc5', 'template_a518nfh', this)
      .then(function(response) {
        document.getElementById("status-message").innerText = "Message sent successfully!";
      }, function(error) {
        document.getElementById("status-message").innerText = "Failed to send message. Please try again.";
      });
  
    // Optionally reset form
    this.reset();
  });