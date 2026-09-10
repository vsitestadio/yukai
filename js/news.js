// JavaScript Document
document.addEventListener('DOMContentLoaded', function() {
   const fadeInElements = document.querySelectorAll('news-text');
   document.querySelectorAll('more-text');
   const observer = new IntersectionObserver(entries => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.classList.add('show');
           }
       });
   });
   fadeInElements.forEach(element => {
       observer.observe(element);
   });
});