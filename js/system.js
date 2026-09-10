document.addEventListener('DOMContentLoaded', () => {
   const images = document.querySelectorAll('.style-img');
   images.forEach((image) => {
       let intervalId;
       image.addEventListener('mouseover', () => {
           intervalId = setInterval(() => {
               const randomAngle = (Math.random() - 0.5) * 4;  // -2度から2度のランダムな角度
               image.style.transform = `rotate(${randomAngle}deg)`;
           }, 50);  // 50ミリ秒ごとに角度を変更
       });
       image.addEventListener('mouseout', () => {
           clearInterval(intervalId);
           image.style.transform = 'rotate(0deg)';
       });
   });
});