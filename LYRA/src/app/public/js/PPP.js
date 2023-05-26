window.addEventListener("message", (event) => {
    const message = event.data;
    if (message.sidebarIsClosed) {
      const iframe = document.querySelector(".frame");
      iframe.style.width = "88px";
    } else {
      const iframe = document.querySelector(".frame");
      iframe.style.width = "250px";
    }
  });


  document.addEventListener("DOMContentLoaded", function() {
    const textareas = document.querySelectorAll('textarea.agrandable');
    textareas.forEach(textarea => {
      textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
      });
  
      textarea.addEventListener('input', function() {
        if (this.value === '') {
          this.style.height = '23px';
        } else {
          this.style.height = 'auto';
          this.style.height = this.scrollHeight + 'px';
        }
      });
  
      textarea.style.width = textarea.scrollWidth + 'px';
    });
  });