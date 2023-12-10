'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    // '2020-07-11T23:36:17.929Z',
    // '2020-07-12T10:51:36.790Z',
    '2023-12-06T23:36:17.929Z',
    '2023-12-09T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    // '2020-07-26T12:01:20.894Z',
    '2023-12-09T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

// 补零函数
const fillZero = function (date) {
  return `${date}`.padStart(2, 0);
}
// 获取计时器

/**
 * 获取天数
 * @param {* 当前时间} date1 
 * @param {* 之前的时间} date2 
 * @returns 
 */
const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

/**
 * 自写获取时间方法
 * @param {* 时间参数} calctDate 
 * @param {* 年月日是否显示} isDate 
 * @param {* 时分秒是否显示} isTime 
 * @param {* 星期是否显示} isWeek 
 * @returns 
 */
// const formatMovementDate = function (calctDate, isDate = true, isTime = false, isWeek = false) {
//   // 获取年月日 时分秒 星期
//   const year = calctDate.getFullYear();
//   const month = calctDate.getMonth() + 1;
//   const day = calctDate.getDate();
//   const hour = calctDate.getHours();
//   const min = calctDate.getMinutes();
//   const sec = calctDate.getSeconds();
//   const weeks = calctDate.getDay();
//   // 组合时间
//   const date = `${year}${isWeek ? '-' : '/'}${fillZero(month)}${isWeek ? '-' : '/'}${fillZero(day)}`; // 两种不同的组合方式根据时间判断
//   const time = `${fillZero(hour)}:${fillZero(min)}:${fillZero(sec)}`;
//   const week = `${weeks ? weeks : 7}`;
//   // 需要什么值返回什么值
//   if (isDate && isTime && isWeek) return `${date} ${time} ${week}`; // 返回年月日 时分秒 星期
//   if (isDate && isTime) return `${date} ${time}`; // 只返回年月日 时分秒

//   // 资金流水时间
//   // 获取当前时间
//   const now = new Date()
//   const daysPassed = calcDaysPassed(now, calctDate);
//   // 七天之前按照给定格式
//   if (!daysPassed) return 'Today'; // 等于 0 就是 今天
//   if (daysPassed === 1) return 'YesterDay'; // 等于 1 就是 昨天
//   if (daysPassed <= 7) return `${daysPassed} days ago`; // 小于等于 7 就是 某天前
//   // 七天之后显示年月日
//   if (isDate) return date; // 只返回年月日
// }

/**
 * 国际化获取时间方法
 * @param {* 当前用户} acc 
 * @param {* 当前时间} calctDate
 * @param {* 是否为单个时间} isDate
 * @returns 
 */
const intlFormatMovementDate = function (acc, calctDate, isDate = false) {
  // 多个时间
  let options1 = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }
  // 为单个时间的时候
  let options2 = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    // weekday: "long",
    hour12: false,
  }
  options2 = isDate && Object.assign(options2, options1)
  // 获取当前时间
  // 传了三个参数：本地ios国际化语言编码，时间格式，当前时间
  const date = new Intl.DateTimeFormat(acc.locale, isDate ? options2 : options1).format(calctDate);
  // 获取天数
  const now = new Date()
  const daysPassed = calcDaysPassed(now, calctDate);
  // 需要什么值返回什么值
  if (isDate) return date; // 单个时间
  // 七天之前按照给定格式
  if (!daysPassed) return 'Today'; // 等于 0 就是 今天
  if (daysPassed === 1) return 'YesterDay'; // 等于 1 就是 昨天
  if (daysPassed <= 7) return `${daysPassed} days ago`; // 小于等于 7 就是 某天前
  // 七天之后显示全部时间
  return date;
}

/**
 * 获取货币
 * @param {* 货币的值} value 
 * @param {* 某个地区的货币} lacale 
 * @param {* 货币的单位} currency 
 */
const formatCur = function (value, lacale, currency) {
  return new Intl.NumberFormat(lacale, {
    style: 'currency',
    currency: currency,
  }).format(value)
}

/**
 * 显示资金流水方法
 * @param {* 当前用户} acc 
 * @param {* 是否排序} sort 
 */
const displayMovements = function (acc, sort = false) {
  // 清理整个容器再添加新元素
  // Element.innerHTML 属性设置或获取 HTML 语法表示的元素的后代。
  containerMovements.innerHTML = '';
  // 当sort为true时，需要排序，为false不需要排序
  // 排序时先创建一个movements的拷贝然后在拷贝数组上面排序
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  // 循环资金流水数组
  movs.forEach(function name(mov, i) {
    // 使用三元判断当前资金为存款还是取款
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // 显示日期
    const date = new Date(acc.movementsDates[i]);
    // const displayDatte = formatMovementDate(date);
    const displayDatte = intlFormatMovementDate(acc, date); // 国际化时间
    // 货币获取
    const formattedMov = formatCur(mov, acc.locale, acc.currency);
    // 更新ui
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1}${type} deposit</div>
        <div class="movements__date">${displayDatte}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>    
    `
    // insertAdjacentHTML() 方法将指定的文本解析为 Element 元素，并将结果节点插入到 DOM 树中的指定位置。
    // 它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。
    // 这避免了额外的序列化步骤，使其比直接使用 innerHTML 操作更快。

    // 第一个参数是需要插入的位置，当前为插入元素内部的第一个子节点之前，这样就能使数组的最后一个元素到最前面去了
    // 第二个参数是需要插入的内容
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

/**
 * 计算并显示余额
 * @param {* 当前用户} account 
 */
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0); // 余额相加
  labelBalance.textContent = formatCur(account.balance, account.locale, account.currency); // 货币
};

// 计算存款总额, 提款总额, 银行利息
const calcDisplaySummary = function (account) {
  // 存款总额
  const incomes = account.movements
    .filter(mov => mov > 0) // 筛选出大于 0 的数
    .reduce((acc, mov) => acc + mov, 0); // 将它们加起来
  labelSumIn.textContent = formatCur(incomes, account.locale, account.currency);

  // 提款总额
  const out = account.movements
    .filter(mov => mov < 0) // 筛选出小于 0 的数
    .reduce((acc, mov) => acc + mov, 0); // 将它们加起来
  labelSumOut.textContent = formatCur(out, account.locale, account.currency);
  // 银行利息:利息是存款金额的 几%
  const interest = account.movements
    .filter(mov => mov > 0) // 筛选出大于 0 的数
    .map(deposit => (deposit * account.interestRate) / 100) // 计算利息乘以 每个人的利息值 除以 100
    .filter(int => int > 1) // 银行支付利息，如果该利息至少为 1 欧元或者任何其他货币
    .reduce((acc, int) => acc + int, 0); // 将它们加起来
  labelSumInterest.textContent = formatCur(interest, account.locale, account.currency);
};

// P141、计算用户名
/**
 * 获取用户名：就是登录名
 * @param {* 当前用户} accs 
 */
const createUserName = function (accs) {
  // 修改原对象数组——将每个对象新增一个userName属性
  accs.forEach(function (acc) {
    // 使用链式调用: 
    acc.userName = acc.owner
      .toLowerCase() // 先将字符串转小写
      .split(" ") // 然后字符串根据空格转数组
      .map(v => v[0]) // 循环数组提取第一个字母返回新数组
      .join(""); // 最后将数组转字符串
    // console.log(acc.userName);
    // js
    // jd
    // stw
    // ss
  })
};
createUserName(accounts);

// 更新UI
const updateUI = function (acc) {
  // 显示资金流水
  displayMovements(acc);

  // 显示账户余额
  calcDisplayBalance(acc);

  // 显示汇总内容: 存款总额 提款总额 银行利息 —— 注意利息每个人的不同，并且在个人信息里面，所有要传整个个人信息对象
  calcDisplaySummary(acc);
}

// P148、实现登录功能
// 事件处理
let currentAccount; // 当前用户，定义在全局以便其他地方使用

// 冒充登录
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
// 设置当前余额截止时间
// params:时间参数, isDate:是否显示, isTime:是否显示, isWeek:是否显示
const date = new Date(2023, 12, 6, 19, 0, 34);
// labelDate.textContent = intlFormatMovementDate(currentAccount, date, true)
// // P167、国际化日期(国际)
// // 使用国际化时间
// const options = {
//   year: "numeric",
//   month: "numeric",
//   day: "numeric",
//   hour: "numeric",
//   minute: "numeric",
//   second: "numeric",
//   weekday: "long",
//   hour12: false,
// }
// 传了三个参数：本地ios国际化语言编码，时间格式，当前时间
// // labelDate.textContent = new Intl.DateTimeFormat('en-GB', options).format(date)
// labelDate.textContent = new Intl.DateTimeFormat('zh-Hans-CN', options).format(date)


// 现在的时间
const now = new Date();

// 登录
btnLogin.addEventListener("click", function (e) {
  // 在HTML中的默认行为，当点击提交按钮时，是为了重新加载页面，需要阻止这种情况发生。
  // 使用preventDefault()方法阻止浏览器默认事件。
  e.preventDefault();
  // 首先根据登录的用户名查找用户
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
  // 根据密码判断用户登录信息是否正确 —— 因为输入是字符串，需要转为数值在比较判断
  if (currentAccount?.pin === +inputLoginPin.value) {
    console.log(currentAccount);
    // 登录成功用户名和密码清空并且失去焦点
    inputLoginUsername.value = inputLoginPin.value = '';  // 链式赋值，从右往左看，依次赋值
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // 显示UI界面和欢迎信息
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `welcome back, ${currentAccount.owner.split(' ')[0]}`; // 欢迎信息 —— 先将姓名转为数组，然后取第一个单词也就是名

    // 设置当前余额截止时间
    // params:时间参数, isDate:是否显示, isTime:是否显示, isWeek:是否显示
    // labelDate.textContent = formatMovementDate(now, true, true, true)
    labelDate.textContent = intlFormatMovementDate(currentAccount, now, true); // 国际化时间

    // 更新UI
    updateUI(currentAccount);
  } else {
    console.log("用户名或者密码错误");
  }
});

// P149、实现转账功能
btnTransfer.addEventListener("click", function (e) {
  // 在HTML中的默认行为，当点击提交按钮时，是为了重新加载页面，需要阻止这种情况发生。
  // 使用preventDefault()方法阻止浏览器默认事件。
  e.preventDefault();
  // 转账金额获取
  const amount = +inputTransferAmount.value;
  // 根据接收人用户名查找接收人信息
  const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);
  // 清楚输入框内容
  inputTransferTo.value = inputTransferAmount.value = "";
  // 根据转账金额判断能否转账
  // 转账金额不能小于等于 0,转账金额不能大于当前用户账户余额, 转账人不能为自己
  if (amount > 0
    && amount <= currentAccount.balance
    && receiverAcc
    && receiverAcc.userName !== currentAccount.userName) {
    // 在转账人和当前用户资金流水中分别添加一条转账记录
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // 接收人和转账人都要获取一个时间参数
    currentAccount.movementsDates.push(now.toISOString());
    receiverAcc.movementsDates.push(now.toISOString());

    // 更新UI
    updateUI(currentAccount);
  } else {
    console.log("信息错误，无法转账");
  }
});

// 向银行申请贷款
btnLoan.addEventListener("click", function (e) {
  e.preventDefault()
  const amount = Math.floor(inputLoanAmount.value); // 直接向下取整
  // 判断输入的内容大于0并且是资金流水中某一金额的10倍
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // 贷款资金流水加一条记录
    currentAccount.movements.push(amount);
    // 顺便加一个时间
    currentAccount.movementsDates.push(new Date().toISOString());
    // 更新UI
    updateUI(currentAccount);
  } else {
    console.log("输入有误");
  }
  // 清空输入框
  inputLoanAmount.value = "";
});

// P150、findIndex方法
// 关闭账户功能——删除账户数组中的账户对象。
btnClose.addEventListener("click", function (e) {
  e.preventDefault()
  if (inputCloseUsername.value === currentAccount.userName && +inputClosePin.value === currentAccount.pin) {
    // 通过findIndex找到当前账户在账户数组中的索引
    const index = accounts.findIndex(acc => acc.userName === inputCloseUsername.value);
    // 然后删除当前账户
    accounts.splice(index, 1);
    // 隐藏UI
    containerApp.style.opacity = 0;
  } else {
    console.log("信息错误");
  }
  // 清空输入框
  inputCloseUsername.value = inputClosePin.value = "";
});

// 实现排序功能
let sorted = false
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


/*
// P159、转换和检查数字
console.log(23 === 23.0); // true

// 十进制 —— 1 - 9   1/10 = 0.1  3/10 = 3.3333...
// 二进制 —— 0 1
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
// 转换
console.log(Number('23')); // 23
console.log(+'23'); // 23

// 解析 —— 字符串必须以数字开头(不包括空格，解析到空格会直接跳到开头的值)，否则会转成NaN
// 全局函数
// 解析整数
console.log(Number.parseInt("30rpx")); // 30
console.log(Number.parseInt("a23")); // NaN
// 解析浮点数
console.log(Number.parseInt("  30.5rpx ")); // 30
console.log(Number.parseFloat("  30.5rpx  ")); // 30.5

// 检查是否是NaN
// Number.isNaN() 函数用来确定一个值是否为 NaN 。跟Number转数字有点联系
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20px')); // true
console.log(Number.isNaN(23 / 0)); // false

// 检查是否是数值
// Number.isFinite() 它检查给定值是一个数字，且该数字既不是正的 Infinity，也不是负的 Infinity 或 NaN。跟Number转数字有点联系
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20px')); // false
console.log(Number.isFinite(23 / 0)); // false

// 检查整型
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false


// P160、数学和四舍五入
// 以下方法都可以强转: 使用这些方法的时候，因为原始类型没有方法，所以在幕后会将原始类型做包装对象操作，然后再转回原始类型
// 平方根
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
// 立方根
console.log(8 ** (1 / 3)); // 2

// 最大值
console.log(Math.max(3, 14, 25, 12, 1)); // 25
console.log(Math.max(3, 14, "25", 12, 1)); // 25 —— 强转
console.log(Math.max(3, 14, "25px", 12, 1)); // NaN
// 最小值
console.log(Math.min(3, 14, 25, 12, 1)); // 1

// 常数 圆的面积 Π r的平方
console.log(Math.PI * Number.parseInt("10px") ** 2); // 314.1592653589793

// 随机数 Math.random()  0...1
console.log(Math.trunc(Math.random() * 6) + 1); // 1到6直接的随机数
// 0...1 -> 0...(max-min) -> min...max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(4, 10)); // 随机生成 5到 10之间的数
console.log("————————————————————————————————————————————");

// 四舍五入
console.log(Math.round(25.3)); // 25 —— 四舍
console.log(Math.round(25.9)); // 26 —— 五入
// 向上取整
console.log(Math.ceil(25.3)); // 26 —— 向上取整
console.log(Math.ceil(25.9)); // 26 —— 向上取整
// 向下取整
console.log(Math.floor(25.3)); // 25 —— 向下取整
console.log(Math.floor(25.9)); // 25 —— 向下取整
// 舍入整数
console.log(Math.trunc(25.5)); // 25 —— 直接删除小数部分
// 数值为正数的时候 floor 和 trunc 方法使用一样
// 为负数时不一样
console.log(Math.trunc(-25.5)); // -25 —— 直接删除小数部分
console.log(Math.floor(-25.5)); // -26 —— 向下取整

// 小数 —— 这里操作之后是字符串
// 字符串
console.log((2.5).toFixed(0)); // 3
console.log((2.5).toFixed(2)); // 2.50
console.log((2.345).toFixed(2)); // 2.35
// 数值
console.log(+(2.345).toFixed(2)); // 2.35


// P161、余数运算符
console.log(5 % 2); // 1
console.log(5 / 2); // 2 * 2 + 1 = 5
console.log(8 % 3); // 2
console.log(8 / 3); // 2 * 2 + 1 = 5
console.log(6 % 2); // 0
console.log(6 / 2); // 2 * 3 = 6
console.log(7 % 2); // 1
console.log(7 / 2); // 2 * 3 + 1 = 7
const isEven = n => n % 2 === 0;
console.log(isEven(6)); // true
console.log(isEven(57)); // false
console.log(isEven(6878)); // true

// 点击按钮颜色改变
labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach((row, i) => {
    // 0, 2, 4, 6, 8...
    if (i % 2 === 0) {
      row.style.backgroundColor = "pink"; // 粉色
    }
    // 0, 3, 6, 9...
    if (i % 3 === 0) {
      row.style.backgroundColor = "skyblue"; // 天蓝色
    }
  })
})


// P162、数字分隔符
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter); // 287460000000

const price = 345_99;
console.log(price); // 34599

console.log(15_00); // 1500
console.log(1_500); // 1500

const PI = 3.1415;
console.log(PI); // 3.1415

console.log(Number("230_000")); // NaN
console.log(Number.parseInt("230_000")); // 230


// P163、使用BigInt（2020）
console.log(2 ** 53 - 2); // 9007199254740990
// 最大的安全整数
console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// 以下为不安全的数字
console.log(2 ** 53); // 9007199254740992
console.log(2 ** 53 + 1); // 9007199254740992
console.log(2 ** 53 + 2); // 9007199254740994
console.log(2 ** 53 + 3); // 9007199254740996
console.log(2 ** 53 + 4); // 9007199254740996

// 使用BigInt的整数可以无限大
// 超大数字正确使用
console.log(759834757435734758943758435745743n); // 759834757435734758943758435745743n
// 错误使用
console.log(759834757435734758943758435745743); // 7.598347574357347e+32
// 可以看出来，使用BigInt时是先像以上一样再转为BigInt就会出错
console.log(BigInt(759834757435734758943758435745743)); // 759834757435734688697869018333184n
// 只有使用安全整数才不会出错
console.log(BigInt(759834757435734)); // 759834757435734n

// 算数运算
console.log(1000n + 2000n); // 3000n
console.log(58375437589347589734857857348n * 100000000n); // 5837543758934758973485785734800000000n
// console.log(Math.sqrt(16n)); // 报错，Math方法只能用于number
// console.log(Math.max(12n, 1n, 3n)); // 报错
const huge = 7593584735734579834758758n;
const num = 100;
console.log(huge * BigInt(num)); // 759358473573457983475875800n

// 比较运算
console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(typeof 20n); // bigint
console.log(20n == 20); // true
console.log(20n == '20'); // true

// 使用字符串
console.log(huge + " is REALLY big!!!"); // 7593584735734579834758758 is REALLY big!!!

// 除法只会去掉小数部分
console.log(11n / 3n); // 3n
console.log(11 / 3); // 3.6666666666666665
// console.log(BigInt(22.3)); // 报错，BigInt只能用于整数


// P164、创建日期
// const now = new Date()
// console.log(now); // 当前年月日时分秒，如：Sat Dec 09 2023 18:41:40 GMT+0800 (中国标准时间)

// console.log(new Date('Sat Dec 09 2023 18:41:40')); // Sat Dec 09 2023 18:41:40 GMT+0800 (中国标准时间)
// console.log(new Date('December 24, 1998')); // Thu Dec 24 1998 00:00:00 GMT+0800 (中国标准时间)
// // "2019-11-18T21:31:17.178Z"
// console.log(new Date(account1.movementsDates[0])); // Tue Nov 19 2019 05:31:17 GMT+0800 (中国标准时间)
// console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT+0800 (中国标准时间)
// console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 00:00:00 GMT+0800 (中国标准时间)
// console.log(new Date('2037', '10', '31')); // Tue Dec 01 2037 00:00:00 GMT+0800 (中国标准时间)
// console.log(new Date(0)); // Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
// console.log(new Date(7 * 24 * 60 * 60 * 1000)); // Thu Jan 08 1970 08:00:00 GMT+0800 (中国标准时间)
// console.log(new Date(1702120286804)); // Sat Dec 09 2023 19:11:26 GMT+0800 (中国标准时间)
// console.log(new Date("1998-11-11")); // Fri Nov 11 1998 08:00:00 GMT+0800 (中国标准时间)
// console.log(new Date("1998/11/11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// console.log(new Date("1998 11 11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// console.log(new Date("1998.11.11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// console.log(new Date("1998,11,11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // 以下某些可用但没意义
// // console.log(new Date("1998+11+11")); // Invalid Date
// // console.log(new Date("1998*11*11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998%11%11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998^11^11")); // Invalid Date
// // console.log(new Date("1998=11=11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998_11_11")); // Invalid Date
// // console.log(new Date("1998&11&11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998#11#11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998!11!11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998?11?11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998;11;11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998'11'11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998>11>11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998<11<11")); // Fri Nov 11 1998 00:00:00 GMT+0800 (中国标准时间)
// // console.log(new Date("1998:11:11")); // Thu Jan 01 1998 11:11:00 GMT+0800 (中国标准时间)

// 使用日期工作
const future = new Date(2037, 10, 19, 15, 23, 45);
// 以下为字符串
console.log(future); // Thu Nov 19 2037 15:23:45 GMT+0800 (中国标准时间)
// 国际标准IOS时间
console.log(future.toISOString()); // 2037-11-19T07:23:45.000Z

// 以下全是Number型
// 年, 月, 日, 星期, 时, 分, 秒
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 45
// 时间戳
console.log(future.getTime()); // 2142228225000
// 获取现在的时间戳
console.log(Date.now()); // 1702121096458

// 设置时间
future.setFullYear(1998) // 设置年, 还可以设置 月, 日, 星期, 时, 分, 秒 ,相应的 get 改为 set
console.log(future); // Thu Nov 19 1998 15:23:45 GMT+0800 (中国标准时间)


// P166、带日期的操作
// 通过计算的方式将时间转为时间戳
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future)); // 2142228180000
console.log(+future); // 2142228180000

// 获取两个时间之间间隔的天数（年月日）
// 1000 * 60 * 60 * 24 一天的时间戳
const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const day1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(day1); // 10


// P168、国际化数字（Intl）
const num = 4232423.25;
const options = {
  style: "currency", // 货币
  // unit: 'celsius', // 单位摄氏度
  currency: 'CNY', // 货币: 人民币
}

console.log("US：", new Intl.NumberFormat('en-US', options).format(num)); // US： CN¥4,232,423.25
console.log("Grmany：", new Intl.NumberFormat('de-DE', options).format(num)); // Grmany： 4.232.423,25 CN¥
console.log("Syria：", new Intl.NumberFormat('ar-SY', options).format(num)); // Syria： ٤٬٢٣٢٬٤٢٣٫٢٥ CN¥
console.log("China：", new Intl.NumberFormat('zh-Hans-CN', options).format(num)); // China： ¥4,232,423.25
console.log(navigator.language, new Intl.NumberFormat(navigator.language, options).format(num)); // zh-CN ¥4,232,423.25
*/

