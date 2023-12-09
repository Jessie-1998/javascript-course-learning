'use strict';
// 选择元素
const score0El = document.querySelector('#score--0'); // 元素选择器，获取选择的第一个元素，需要选择所有可用：document.querySelectorAll
const score1El = document.getElementById('score--1'); // 获取id的方法，因为id的唯一性，所以不是数组
const current0El = document.getElementById('current--0'); // 获取id的方法，因为id的唯一性，所以不是数组
const current1El = document.getElementById('current--1'); // 获取id的方法，因为id的唯一性，所以不是数组
const player0EL = document.querySelector('.player--0'); // 获取id的方法，因为id的唯一性，所以不是数组
const player1EL = document.querySelector('.player--1'); // 获取id的方法，因为id的唯一性，所以不是数组

const diceEL = document.getElementsByClassName('dice')[0]; // 获取类名的方法，不过这获取到一个数组,取第一个子元素
const btnNew = document.querySelector('.btn--new'); // 新游戏按钮
const btnRoll = document.querySelector('.btn--roll'); // 骰子按钮
const btnHold = document.querySelector('.btn--hold'); // 切换玩家按钮

// 因为let是块级作用域，如果在函数内部定义只能在函数内部使用，所以在函数之前定义
let currentScore, scores, activePlay, playing;
let inputScore; // 输入的分数

// 初始化
let init = function () {
  inputScore =
    Number(
      prompt(
        `Rules of the game: 
        First of all, player 1 rolls the dice, if the roll point is not equal to 1, add the current dice point to the current score of player 1; If the roll is 1, it switches to player 2, whose current roll is 0. The same goes for Player 2. If the number of points is not 1, the player can save the current score in their total score.
        Now，Please enter a delimited score：`
      )
    ) || 100; // 输入分数时获取输入分数，没输入就默认为100
  currentScore = 0; // 当前分数
  scores = [0, 0]; // 分数数组，第一个代表第一个玩家，第二个代表第二个玩家
  activePlay = 0; // 活跃玩家为玩家1
  playing = true; // 是否能继续玩游戏

  score0El.textContent = 0; // 分数设为0
  score1El.textContent = 0; // 分数设为0
  current0El.textContent = 0; // 当前分数设为0
  current1El.textContent = 0; // 当前分数设为0

  diceEL.classList.add('hidden'); // 隐藏骰子
  player0EL.classList.remove('player--winner'); // 移除赢家背景色
  player1EL.classList.remove('player--winner'); // 移除赢家背景色
  player0EL.classList.add('player--active'); // 将活跃色给玩家1
  player1EL.classList.remove('player--active'); // 移除活跃色
};
// 开始条件
init();

// 切换玩家
const switchPlayer = function () {
  currentScore = 0; // 当前分数为0
  // 活跃玩家的当前分数为0
  document.getElementById(`current--${activePlay}`).textContent = currentScore;

  // 如果活跃玩家为玩家1就换为玩家2，反之亦然
  activePlay = activePlay === 0 ? 1 : 0;

  // 切换玩家的背景色（有就移除，没有就添加）
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// 掷骰子功能
btnRoll.addEventListener('click', function () {
  // 没有玩家胜出时，能继续玩游戏
  if (playing) {
    // 1.滚动到一个随机骰子
    const dice = Math.trunc(Math.random() * 6) + 1; // 生成一个随机数 [0,6) ，去掉小数保留整数，并且 + 1
    // 2.显示骰子
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`; // 隐藏骰子

    // 3.检查是否滚动到1
    if (dice !== 1) {
      // 不到1的时候添加当前骰子到当前分数中
      currentScore += dice;
      document.getElementById(`current--${activePlay}`).textContent =
        currentScore; // 活跃玩家的当前分数
    } else {
      // 下一个玩家（切换器）
      switchPlayer();
    }
  }
});

// 保存当前得分功能
btnHold.addEventListener('click', function () {
  // 没有玩家胜出时，能继续玩游戏
  if (playing) {
    // 将当前得分+分数数组的活跃玩家上
    scores[activePlay] += currentScore;
    // 1.将当前得分添加到活跃玩家分数中
    document.getElementById(`score--${activePlay}`).textContent =
      scores[activePlay];

    // 2.如果活跃玩家的分数>=100，就赢了
    if (scores[activePlay] >= inputScore) {
      playing = false;
      diceEL.classList.add('hidden'); // 隐藏骰子
      // 移除激活背景
      document
        .querySelector(`.player--${activePlay}`)
        .classList.remove('player--active');
      // 添加赢家背景
      document
        .querySelector(`.player--${activePlay}`)
        .classList.add('player--winner');
      console.log(activePlay ? 'PLAYER2赢啦！🎉' : 'PLAYER1赢啦！🎉');
    } else {
      // 否则下一个玩家
      switchPlayer();
    }
  }
});

// 新游戏
btnNew.addEventListener('click', init);

// const name = 'Jessie';
// const first = () => {
//   let a = 1;
//   const b = second(7, 9);
//   a = a + b;
//   return a;
// };

// function second(x, y) {
//   var c = 2;
//   return c;
// }
// const x = first();
