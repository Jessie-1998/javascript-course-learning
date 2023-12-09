'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnOpenModal.length; i++)
  btnOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// 按键事件——按键按下
document.addEventListener('keydown', function (e) {
  // console.log(e, 333);
  // 如果当前按下ESC键并且“modal”类名中不包含“hidden”时，执行函数“closeModal”
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
