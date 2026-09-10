// JavaScript Document
const target = document.querySelectorAll('.js-target');

//オプション設定
const options = {
  root: null,
  rootMargin: '-20% 0px',
  threshold: 0,
};

//Intersection Observerの呼び出し
const observer = new IntersectionObserver(callback, options);
target.forEach((tgt) => {
  observer.observe(tgt);
});

//要素が交差したときの指示
function callback(entries) {
  entries.forEach((entry) => {
    const target = entry.target;
    if (entry.isIntersecting) {
      target.classList.add('is-active');
    }
  });
}