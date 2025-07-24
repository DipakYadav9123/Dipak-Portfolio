// EmailJS integration for contact form
// Service ID: service_e6tenad
// Template ID: template_hpsnqci
// User ID: yDaPIGO2VRHV-IWfE

document.addEventListener('DOMContentLoaded', function() {
  var form = document.querySelector('.contact__form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.sendForm('service_e6tenad', 'template_hpsnqci', form, 'yDaPIGO2VRHV-IWfE')
      .then(function() {
        alert('Message sent successfully!');
        form.reset();
      }, function(error) {
        alert('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
      });
  });
});
// email.js - Email sending logic using EmailJS (example)
// You need to include EmailJS SDK in your HTML for this to work
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

// ...existing code...
