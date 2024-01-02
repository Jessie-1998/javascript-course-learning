'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


/*
// P174、选择、创建和删除元素
// 选择元素
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections); // NodeList(4) 节点集合

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // HTMLCollection(9) 元素集合

console.log(document.getElementsByClassName('btn')); // HTMLCollection(5)

// 创建和插入元素
const message = document.createElement('div'); // 创建一个div元素
message.classList.add("cookie-message");// 添加一个类名
// message.textContent = 'We use cookied for improved functionality and analytics'; // 添加文本内容
message.innerHTML = 'We use cookied for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>'; // 添加html文本内容

// 将创建好的元素插入页面
// header.prepend(message); // 插到header子元素最前面
header.append(message); // 插到header子元素最后面
// header.append(message.cloneNode(true)); // 克隆一个message插到header子元素最后面

// header.before(message); // 插到header元素前面
// header.after(message); // 插到header元素后面

// 删除元素
document.querySelector('.btn--close-cookie').addEventListener('click', function (e) {
  e.preventDefault;
  // message.remove();
  // 等同于
  message.parentElement.removeChild(message);
})


// P175、样式、属性和类
// 样式（style: 内联样式）
message.style.backgroundColor = '#37383d'; // 背景色
message.style.width = '120%'; // 宽度

// 因为没设置内联样式的以下内容所以没有
console.log(message.style.color); // 无
console.log(message.style.height); // 无

// 获取style标签或者文件中的的样式
// console.log(getComputedStyle(message)); // 当前元素的所有样式
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 47.5px

// 将获取到的元素高度提取数字并且加40
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'

// 修改文档样式：style文件中的root
document.documentElement.style.setProperty('--color-primary', 'orangered');

// 属性
// 获取属性值
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // Bankist logo
console.log(logo.className); // nav__logo

// 非标准的属性
console.log(logo.designer); // undefined
console.log(logo.getAttribute('designer')); // xiaojiu
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/index.html?#
console.log(link.getAttribute('href')); // #

// 数据属性(以data开头的属性名)
console.log(logo.dataset.versionNumber); // 3.0

// 类
logo.classList.add('x', 'j'); // 添加
logo.classList.remove('x', 'j'); // 删除
logo.classList.toggle('x'); // 有就删除, 没有就添加
logo.classList.contains('x'); // 不包含

// 不要使用, 因为只创建一个类名
// logo.className = 'xiaojiu'; // 会覆盖之前的类名
*/

/*
// P176、实现平滑滚动
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect(); // section1元素的大小及相对视口的位置
  console.log(s1Coords);
  console.log(e.target.getBoundingClientRect()); // 点击事件元素的大小及相对视口的位置
  console.log(window.pageXOffset, window.pageYOffset); // 页面水平垂直滚动的像素
  console.log(document.documentElement.clientHeight, document.documentElement.clientWidth); // 当前窗口的高度和宽度

  // window.scrollTo(s1Coords.left, s1Coords.top); // 页面滚动到某个位置（此时只用了section1距离窗口顶部的距离）
  // window.scrollTo(s1Coords.left + window.pageXOffset, s1Coords.top + window.pageYOffset); // 页面滚动到某个位置
  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // }); // 页面平滑滚动到某个位置

  section1.scrollIntoView({ behavior: 'smooth' }); // 滚动元素的父容器，使被调用的元素对用户可见
});


// P177、事件类型和事件处理程序
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert("addEventListener: 你正在读标题！");
  h1.removeEventListener('mouseenter', alertH1); // 移除事件
}
// 方式一: addEventListener
h1.addEventListener('mouseenter', alertH1); // 设置事件

// 三秒后移除事件
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1); // 移除事件
// }, 3000);

// 方式二: onmouseenter
// h1.onmouseenter = function (e) {
//   alert("onmouseenter: 你正在读标题！")
// }
*/
