'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// 所有用户信息
const accounts = [account1, account2, account3, account4];

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

// 显示资金流水方法
const displayMovements = function (movements, sort = false) {
  // 清理整个容器再添加新元素
  // Element.innerHTML 属性设置或获取 HTML 语法表示的元素的后代。
  containerMovements.innerHTML = '';
  // 当sort为true时，需要排序，为false不需要排序
  // 排序时先创建一个movements的拷贝然后在拷贝数组上面排序
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // 循环资金流水数组
  movs.forEach(function name(mov, i) {
    // 使用三元判断当前资金为存款还是取款
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1}${type} deposit</div>
        <div class="movements__value">${mov}€</div>
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

// 计算并显示余额
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0); // 余额相加
  labelBalance.textContent = `${account.balance}€`;
};

// 计算存款总额, 提款总额, 银行利息
const calcDisplaySummary = function (account) {
  // 存款总额
  const incomes = account.movements
    .filter(mov => mov > 0) // 筛选出大于 0 的数
    .reduce((acc, mov) => acc + mov, 0); // 将它们加起来
  labelSumIn.textContent = `${incomes}€`;
  // 提款总额
  const out = account.movements
    .filter(mov => mov < 0) // 筛选出小于 0 的数
    .reduce((acc, mov) => acc + mov, 0); // 将它们加起来
  labelSumOut.textContent = `${Math.abs(out)}€`;
  // 银行利息:利息是存款金额的 几%
  const interest = account.movements
    .filter(mov => mov > 0) // 筛选出大于 0 的数
    .map(deposit => (deposit * account.interestRate) / 100) // 计算利息乘以 每个人的利息值 除以 100
    .filter(int => int > 1) // 银行支付利息，如果该利息至少为 1 欧元或者任何其他货币
    .reduce((acc, int) => acc + int, 0); // 将它们加起来
  labelSumInterest.textContent = `${interest}€`;
};

// P141、计算用户名
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
  displayMovements(acc.movements);

  // 显示账户余额
  calcDisplayBalance(acc);

  // 显示汇总内容: 存款总额 提款总额 银行利息 —— 注意利息每个人的不同，并且在个人信息里面，所有要传整个个人信息对象
  calcDisplaySummary(acc);
}

// P148、实现登录功能
// 事件处理
let currentAccount; // 当前用户，定义在全局以便其他地方使用
btnLogin.addEventListener("click", function (e) {
  // 在HTML中的默认行为，当点击提交按钮时，是为了重新加载页面，需要阻止这种情况发生。
  // 使用preventDefault()方法阻止浏览器默认事件。
  e.preventDefault();
  // 首先根据登录的用户名查找用户
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
  // 根据密码判断用户登录信息是否正确 —— 因为输入是字符串，需要转为数值在比较判断
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log(currentAccount);
    // 登录成功用户名和密码清空并且失去焦点
    inputLoginUsername.value = inputLoginPin.value = '';  // 链式赋值，从右往左看，依次赋值
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // 显示UI界面和欢迎信息
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `welcome back, ${currentAccount.owner.split(' ')[0]}`; // 欢迎信息 —— 先将姓名转为数组，然后取第一个单词也就是名

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
  const amount = Number(inputTransferAmount.value);
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
    // 更新UI
    updateUI(currentAccount);
  } else {
    console.log("信息错误，无法转账");
  }
});

// 向银行申请贷款
btnLoan.addEventListener("click", function (e) {
  e.preventDefault()
  const amount = Number(inputLoanAmount.value);
  // 判断输入的内容大于0并且是资金流水中某一金额的10倍
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
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
  if (inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin) {
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
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted
});



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
// P132、简单数组方法
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log("截取 ——————————————————————————————");
// SLICE: 提取任意的数组一部分，但不改变原数组
// 第一个和第二个参数为自然数就是从左往右开始数下标；第一个参数为负数从右往左开始数下标，显示还是按顺序显示，第二个参数为负数，就是排除
console.log(arr.slice(2)); // (3) ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // (2) ['c', 'd']
console.log(arr.slice(-2)); // (2) ['d', 'e']
console.log(arr.slice(-1)); // (1) ['e']
console.log(arr.slice(2, -1)); // (2) ['c', 'd']

// slice方法可以简单的创建任何数组的浅拷贝——不需要任何参数
console.log(arr.slice()); // (5) ['a', 'b', 'c', 'd', 'e']
// 扩展运算符也可以创建任何数组的浅拷贝
console.log([...arr]); // (5) ['a', 'b', 'c', 'd', 'e']

console.log("删除数组元素 ——————————————————————————————");
// SPLICE: 截取数组任意一部分，但改变数组——删除了截取的那一部分
// 此方法主要关注对数组元素的删除，替换，增加，第一个参数开始索引，第二个参数从第一个参数开始删除的元素个数，剩余的参数为要添加或者替换的元素
// console.log(arr.splice(2)); // (3) ['c', 'd', 'e']
arr.splice(-1); // 删除最后一个元素
console.log(arr); // (4) ['a', 'b', 'c', 'd']
// arr.splice(1, 2); // 删除第二个第三个元素
// console.log(arr); // (2) ['a', 'd']
arr.splice(1, 2, 'f', 'g'); // 将第二个第三个替换为 “f” 和 “g”
console.log(arr); // (4) ['a', 'f', 'g', 'd']

console.log("反转数组 ——————————————————————————————");
// REVERSE: 反转数组的顺序，第一个元素到最后一个，最后一个元素到第一个，并且改变原数组。
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse()); // (5) ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // (5) ['f', 'g', 'h', 'i', 'j']

console.log("拼接数组 ——————————————————————————————");
// CONCAT: 用于连接两个数组，不改变原数组，返回拼接后的数组
let letters = arr.concat(arr2);
console.log(letters); // (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// 扩展运算符可以拼接两个数组
console.log([...arr, ...arr2]); // (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

console.log("数组转字符串 ——————————————————————————————");
// JOIN: 将数组转为字符串，不改变原数组
console.log(letters.join("_")); // a_b_c_d_e_f_g_h_i_j

// 还有之前学过的 push onshift pop shift indexOf includes


// P133、at 方法
const arr = [25, 11, 28];
// 获取第一个元素
console.log(arr[0]); // 25
console.log(arr.at(0)); // 25

// 获取最后一个元素
console.log(arr[arr.length - 1]); // 28
console.log(arr.slice(-1)[0]); // 28
console.log(arr.at(-1)); // 28

// 字符串使用at方法
console.log("Jessie".at(0)); // J
console.log("Jessie".at(-1)); // e


// P134、循环数组forEach
console.log("FOR OF ————————————————————————————");
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements) {
for (const [i, mov] of movements.entries()) {
  console.log(`资金流动${i + 1}: ` + (mov > 0 ? `存款${mov}` : `取款${Math.abs(mov)}`));
}
// 资金流动1: 存款200
// 资金流动2: 存款450
// 资金流动3: 取款400
// 资金流动4: 存款3000
// 资金流动5: 取款650
// 资金流动6: 取款130
// 资金流动7: 存款70
// 资金流动8: 存款1300

console.log("FOREACH ————————————————————————————");
movements.forEach(function (mov, i, arr) {
  console.log(`资金流动${i + 1}: ` + (mov > 0 ? `存款${mov}` : `取款${Math.abs(mov)}`));
})

// 0: function(200)
// 1: function(450)
// 2: function(-400)
// ...


// P135、forEach 与 Maps 和 Sets
// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
})
// USD:United States dollar
// EUR:Euro
// GBP:Pound sterling

// Set
const currenciesUnique = new Set(['USD', 'CNY', 'CNY', 'EUR', 'USD'])
console.log(currenciesUnique); // Set(3) {'USD', 'CNY', 'EUR'}
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}:${value}`);
})
// USD:USD
// CNY:CNY
// EUR:EUR


// P138、编码挑战#1

// 朱莉娅和凯特正在做一项关于狗的研究。因此，他们每人询问了5位狗主人他们的狗的年龄，并将数据存储到一个数组中(每个数组一个)。
// 目前，他们只是想知道狗是成年狗还是小狗。至少3岁的狗就是成年狗，不到3岁的狗就是小狗。

// 创建一个函数'checkDogs'，它接受两个狗的年龄数组('dogsJulia'和'dogsKate')，并做以下事情:

// 1. 朱莉娅发现第一和最后两只狗的主人实际上养的是猫，而不是狗!因此，创建Julia数组的浅拷贝，并从复制的数组中删除cat age(因为改变函数参数是一种不好的做法)。
// 2. 创建一个包含Julia(更正)和Kate数据的数组
// 3.对于剩下的每只狗，记录到控制台它是成年狗(“1号狗是成年狗，5岁”)还是小狗(“2号狗仍然是小狗🐶”)。
// 4. 对两个测试数据集运行该函数

// 提示:使用本节迄今为止所有讲座中的工具😉

// 测试数据1:Julia的数据[3,5,2,12,7]，Kate的数据[4,1,15,8,3]
// 测试数据2:Julia的数据[9,16,6,8,3]，Kate的数据[10,5,6,1,4]

// 祝你好运😀

// me：
const checkDogs = function (dogsJulia, dogsKate) {
  // 1. 朱莉娅发现第一和最后两只狗的主人实际上养的是猫，而不是狗!因此，创建Julia数组的浅拷贝，并从复制的数组中删除cat age(因为改变函数参数是一种不好的做法)。
  const dogsJuliaCorrected = dogsJulia.slice(); // 浅拷贝
  dogsJuliaCorrected.splice(0, 1);  // 删除第一个
  dogsJuliaCorrected.splice(-2); // 删除第二个
  // 2. 创建一个包含Julia(更正)和Kate数据的数组
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  dogs.forEach(function (age, i) {
    // 3.对于剩下的每只狗，记录到控制台它是成年狗(“1号狗是成年狗，5岁”)还是小狗(“2号狗仍然是小狗🐶”)。
    // 至少3岁的狗就是成年狗，不到3岁的狗就是小狗。
    age >= 3 ? console.log(`${i + 1}号狗是成年狗，${age}岁`) : console.log(`${i + 1}号狗仍然是小狗🐶`);
  })
}
// 4. 对两个测试数据集运行该函数
// checkDogs([3, 5, 2, 12, 7], [9, 16, 6, 8, 3]);
// 1号狗是成年狗，5岁
// 2号狗仍然是小狗🐶
// 3号狗是成年狗，9岁
// 4号狗是成年狗，16岁
// 5号狗是成年狗，6岁
// 6号狗是成年狗，8岁
// 7号狗是成年狗，3岁
// checkDogs([4, 1, 15, 8, 3], [10, 5, 6, 1, 4]);
// 1号狗仍然是小狗🐶
// 2号狗是成年狗，15岁
// 3号狗是成年狗，10岁
// 4号狗是成年狗，5岁
// 5号狗是成年狗，6岁
// 6号狗仍然是小狗🐶
// 7号狗是成年狗，4岁

// teacher：
const checkDogs1 = function (dogsJulia, dogsKate) {
  // 1. 朱莉娅发现第一和最后两只狗的主人实际上养的是猫，而不是狗!因此，创建Julia数组的浅拷贝，并从复制的数组中删除cat age(因为改变函数参数是一种不好的做法)。
  const dogsJuliaCorrected = dogsJulia.slice(); // 浅拷贝
  dogsJuliaCorrected.splice(0, 1);  // 删除第一个
  dogsJuliaCorrected.splice(-2); // 删除第二个
  // 2. 创建一个包含Julia(更正)和Kate数据的数组
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  dogs.forEach(function (age, i) {
    // 3.对于剩下的每只狗，记录到控制台它是成年狗(“1号狗是成年狗，5岁”)还是小狗(“2号狗仍然是小狗🐶”)。
    // 至少3岁的狗就是成年狗，不到3岁的狗就是小狗。
    if (age >= 3) {
      console.log(`${i + 1}号狗是成年狗，${age}岁`);
    } else {
      console.log(`${i + 1}号狗仍然是小狗🐶`);
    }
  })
}
// checkDogs1([3, 5, 2, 12, 7], [9, 16, 6, 8, 3]);
checkDogs1([4, 1, 15, 8, 3], [10, 5, 6, 1, 4]);
*/

/*
// P139、数据转换：map、filter、reduce
const arr = [3, 1, 4, 3, 2];

// 将数组每个元素乘2
const mapArr = arr.map(v => v * 2);
console.log(mapArr); // (5) [6, 2, 8, 6, 4]

// 筛选出大于2的元素
const filterArr = arr.filter(v => v > 2);
console.log(filterArr); // (3) [3, 4, 3]

// 累加
const reduceArr = arr.reduce((a, c) => a + c, 0);
console.log(reduceArr); // 13


// P140、map方法
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// 欧元兑换美元的转换率为: 1.1
const eurToUsd = 1.1;
// 普通函数
let movementUSD = movements.map(function (mov) {
  return mov * eurToUsd;
})
// 箭头函数
movementUSD = movements.map(mov => mov * eurToUsd);
console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movementUSD); // (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// 循环方式
let movementUSDForOf = []
for (const mov of movements) movementUSDForOf.push(mov * eurToUsd);
console.log(movementUSDForOf); // (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

const movementsDesc = movements.map((mov, i) => `资金流动${i + 1}: ${mov > 0 ? '存款' : '取款'}${Math.abs(mov)}`)
console.log(movementsDesc); // (8) ['资金流动1: 存款200', '资金流动2: 存款450', '资金流动3: 取款400', '资金流动4: 存款3000', '资金流动5: 取款650', '资金流动6: 取款130', '资金流动7: 存款70', '资金流动8: 存款1300']


// P142、filter 方法
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// 创建一个存款数组(使用普通函数)
const deposits = movements.filter(function (mov) {
  return mov > 0
})
console.log(deposits); // (5) [200, 450, 3000, 70, 1300]

// 使用循环方法
let depositsForOf = [];
for (const mov of movements) if (mov > 0) depositsForOf.push(mov);
console.log(depositsForOf); // (5) [200, 450, 3000, 70, 1300]

// 创建一个提款数组(使用箭头函数)
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); // (3) [-400, -650, -130]


// P143、reduce 方法
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// 将存款和提款加起来算出总金额——普通函数
let balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur;
}, 0);

// 箭头函数
balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance); // 3840

// 循环方式
let balance1 = 0;
for (const mov of movements) balance1 += mov;
console.log(balance1); // 3840

// 得到最大值——将累加器 acc 当作目前最大值 然后依次去比较数组每项元素
// 普通函数
let max = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc
  else return mov;
}, movements[0]);

// 箭头函数
max = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements[0]);
console.log(max); // 3000
const max1 = Math.max.apply(null, movements);
console.log(max1, "999");


// P144、编码挑战#2
// 让我们回到朱莉娅和凯特关于狗的研究。// Let's go back to Julia and Kate's study about dogs.
// 这一次，他们想把狗的年龄转换成人类的年龄，并计算出研究中狗的平均年龄。 // This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// 创建一个函数' calaveragehumanage '，它接受狗的年龄数组('ages')，并按顺序执行以下操作:  // Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
//    1. 用以下公式计算狗的年龄(人年):如果狗<= 2岁，则humanAge = 2 * dogAge。 // Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge.
//       如果狗是 > 2岁，humanAge = 16 + dogAge * 4。 //  If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
//    2. 排除所有小于人类年龄18岁的狗(这与饲养至少18岁的狗是一样的) // Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
//    3. 计算所有成年狗的平均年龄(你应该已经从其他挑战中知道我们是如何计算平均值的😉) //  Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
//    4. 对两个测试数据集运行该函数 //  Run the function for both test datasets
// 试验数据1:[5,2,4,1,15,8,3] // TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// 试验数据2:[16,6,10,5,6,1,4] // TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
// 祝你好运😀GOOD LUCK 😀

// me：
let calcAverageHumanAge = function (ages) {
  // 1. 用以下公式计算狗的年龄(人年):如果狗<= 2岁，则humanAge = 2 * dogAge。如果狗是 > 2岁，humanAge = 16 + dogAge * 4。
  // 2. 排除所有小于人类年龄18岁的狗(这与饲养至少18岁的狗是一样的)
  const humanAges = ages.map((age) => age <= 2 ? 2 * age : 16 + age * 4).filter(v => v >= 18);
  console.log(humanAges);
  // (5) [36, 32, 76, 48, 28]
  // (6) [80, 40, 56, 36, 40, 32]
  // 3. 计算所有成年狗的平均年龄(你应该已经从其他挑战中知道我们是如何计算平均值的😉)
  // 计算总和然后除以元素个数——模板: (1+2+3+4)/4
  return humanAges.reduce((acc, cur) => acc + cur, 0) / humanAges.length;
}
// 4. 对两个测试数据集运行该函数
const avgAge1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avgAge2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avgAge1); // 44
console.log(avgAge2); // 47.66666666666667

console.log("-------------------------------------------");

// teacher:
calcAverageHumanAge = function (ages) {
  // 1. 用以下公式计算狗的年龄(人年):如果狗<= 2岁，则humanAge = 2 * dogAge。如果狗是 > 2岁，humanAge = 16 + dogAge * 4。
  const humanAges = ages.map((age) => age <= 2 ? 2 * age : 16 + age * 4);
  // 2. 排除所有小于人类年龄18岁的狗(这与饲养至少18岁的狗是一样的)
  const adults = humanAges.filter(v => v >= 18);
  // console.log(humanAges);
  console.log(adults);
  // (5) [36, 32, 76, 48, 28]
  // (6) [80, 40, 56, 36, 40, 32]
  // 3. 计算所有成年狗的平均年龄(你应该已经从其他挑战中知道我们是如何计算平均值的😉)
  // 计算总和然后除以元素个数——模板: (1+2+3+4)/4
  let avgAge = humanAges.reduce((acc, cur) => acc + cur, 0) / adults.length;
  // 每个元素除以元素个数然后再加起来——模板: 1/4 + 2/4 + 3/4 + 4/4
  avgAge = humanAges.reduce((acc, cur) => acc + cur / adults.length, 0);
  return avgAge;
}
// 4. 对两个测试数据集运行该函数
const age1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const age2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(age1); // 44
console.log(age2); // 47.66666666666667


// P145、链式方法的魔力
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
// 管道
const totalDepositsUSD = movements
  // 筛选出正数
  .filter(mov => mov > 0)
  // 当感觉管道最后的值不对时，可以在任何地方检查错误
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd
  })
  // 将所有正数乘以换算率
  // .map(mov => mov * eurToUsd)
  // 最后计算总额
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD); // 5522.000000000001


// P146、编码挑战#3
// 重写上一个挑战中的"calcAverageHumanAge"函数，但这次作为一个箭头函数，并使用链接!
// 试验数据1:[5,2,4,1,15,8,3]
// 试验数据2:[16,6,10,5,6,1,4]
// 祝你好运😀

// me：
// teacher：
const calcAverageHumanAge = (ages) => ages
  // 1. 用以下公式计算狗的年龄(人年):如果狗<= 2岁，则humanAge = 2 * dogAge。如果狗是 > 2岁，humanAge = 16 + dogAge * 4。
  .map(age => age <= 2 ? 2 * age : 16 + age * 4)
  // 2. 排除所有小于人类年龄18岁的狗(这与饲养至少18岁的狗是一样的)
  .filter(age => age >= 18)
  // 3. 计算所有成年狗的平均年龄(你应该已经从其他挑战中知道我们是如何计算平均值的😉)
  .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
const avgAge1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avgAge2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avgAge1, avgAge2); // 44 47.333333333333336
*/

/*
// P147、find方法
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
console.log(firstWithdrawal); // -400

// 查找对象数组的某个对象
// console.log(accounts);
const account = accounts.find(acc => acc.owner === "Jonas Schmedtmann");
console.log(account); // {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, userName: 'js'}

// 循环方式
const acc1 = null;
for (const acc of accounts) if (acc.owner === "Jonas Schmedtmann") console.log(acc);// {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, userName: 'js'}


// P151、some和every
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movements.includes(-130)); // true

// some：
// includes和some功能类似，只是some可以输入查询条件，比includes功能强大一点
console.log(movements.some(mov => mov > 5000)); // false
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); // true

// every：
console.log(movements.every(mov => mov > 0)); // false
console.log(account4.movements.every(mov => mov > 0)); // true

// 单独的回调
const callback = (mov) => mov > 0;
console.log(movements.some(callback)); // true
console.log(movements.every(callback)); // false
console.log(movements.filter(callback)); // (5) [200, 450, 3000, 70, 1300]


// P152、flat和flatMap

// flat
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // (8) [1, 2, 3, 4, 5, 6, 7, 8]
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // (8) [1, 2, 3, 4, 5, 6, 7, 8]
const overalBalance = accounts
  // 取出账户数组中的资金数组组成新的数组
  .map(item => item.movements)
  // 将资金数组推平成一维数组
  .flat()
  // 然后将数组中的各个资金相加
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance); // 17840

// flatMap
const overalBalance1 = accounts
  // 取出账户数组中的资金数组组成新的数组
  // 将资金数组推平成一维数组
  .flatMap(item => item.movements)
  // 然后将数组中的各个资金相加
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance); // 17840


// P153、排序数组（sort）
// string：字符串排序
const owners = ["Mark", "July", "Tom", "Zach", "Amy"];
console.log(owners.sort()); // (5) ['Amy', 'July', 'Mark', 'Tom', 'Zach']

// number：数字排序
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movements.sort()); // (8) [-130, -400, -650, 1300, 200, 3000, 450, 70]

// return < 0, a, b —— 返回小于0，a在b前面
// return > 0, b, a —— 返回大于0，b在a前面

// 升序 —— 首先返回正数
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// })
movements.sort((a, b) => a - b);
console.log(movements); //  [-650, -400, -130, 70, 200, 450, 1300, 3000]

// 降序 —— 首先返回负数
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// })
movements.sort((a, b) => b - a);
console.log(movements); //  [3000, 1300, 450, 200, 70, -130, -400, -650]


// P154、创建和填充数组的更多方法
console.log([1, 2, 3, 4, 5, 6, 7]); // 字面量创建数组
console.log(new Array(1, 2, 3, 4, 5, 6, 7)); // 构造函数创建
// (7) [1, 2, 3, 4, 5, 6, 7]

// 构造函数 + fill创建数组
const x = new Array(7); // 空元素，没有内容，只有length，一些数组操作方法也不能使用
console.log(x); // (7) [空属性 × 7]
// 可以使用填充方法填充元素
x.fill(1); // 覆盖原数组元素
console.log(x); // (7) [1, 1, 1, 1, 1, 1, 1]
x.fill(2, 2, 5); // 第一个参数为填充内容，第二个参数为起始填充下标，第三个参数为终止填充下标
console.log(x); // (7) [1, 1, 2, 2, 2, 1, 1]

// Array.from创建数组
const y = Array.from({ length: 7 }, () => 1)
console.log(y); // (7) [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // (7) [1, 2, 3, 4, 5, 6, 7]

// 获取资金流水元素并且获取资金转为数字
labelBalance.addEventListener("click", function (e) {
  e.preventDefault();
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    el => Number(el.textContent.replace("€", "")))
    ;
  console.log(movementsUI); // (8) [1300, 70, -130, -650, 3000, -400, 450, 200]
  const movementsUI1 = [...document.querySelectorAll(".movements__value")];
  console.log(movementsUI1); // (8) [div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value]
})


// P156、数组方法练习
// 1. 将所有用户的资金流水放在一起，并且求出大于0的总和
const bankDepositSum = accounts
  .flatMap(acc => acc.movements) // 获取到每个用户的资金然后合在一起
  .filter(mov => mov > 0) // 得到大于0的资金
  .reduce((acc, mov) => acc + mov, 0); // 求和
console.log(bankDepositSum); // 25180

// 2. 获取所有用户资金流水大于1000的个数
// 方法一：
let numDeposits1000 = accounts
  .flatMap((acc) => acc.movements) // 获取到每个用户的资金然后合在一起
  .filter(mov => mov >= 1000).length; // 求个数
// 方法二：
numDeposits1000 = accounts
  .flatMap((acc) => acc.movements) // 获取到每个用户的资金然后合在一起
  // .reduce((count, mov) => mov >= 1000 ? count + 1 : count, 0);
  .reduce((count, mov) => mov >= 1000 ? ++count : count, 0); // 求个数 : 需要返回加一之后的值
console.log(numDeposits1000); // 6

let a = 10;
// console.log(a++); // 10 —— 返回加一之前的值
// console.log(a + 1); // 11
console.log(++a); // 11 —— 返回加一之后的值

// 3. 计算所有用户的存款总和和提款总和
const { deposits, widthdrawals } = accounts
  .flatMap((acc) => acc.movements) // 获取到每个用户的资金然后合在一起
  .reduce((sums, cur) => {
    // cur > 0 ? sums.deposits += cur : sums.widthdrawals += cur;
    sums[cur > 0 ? 'deposits' : 'widthdrawals'] += cur; // 计算存款或者提款
    return sums; // reduce始终会返回累加器(sums)
  }, { deposits: 0, widthdrawals: 0 })
console.log(deposits, widthdrawals); // 25180 -7340

// 4. this is a nice title -> This Is a Nice Title
const converTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1)
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase() // 先將字符串全部转为小写
    .split(" ") // 然后將字符串转为数组
    .map(word => exceptions.includes(word) ? word : capitzalize(word)) // 判断如果当前元素包含在 exceptions 中，返回当前，否则首字母转大写
    .join(" "); // 
  return capitzalize(titleCase); // 整个句子首字母转大写
}
console.log(converTitleCase('this is a nice title')); // This Is a Nice Title
console.log(converTitleCase('this is a LONG title but not too long')); // This Is a Long Title but Not Too Long
console.log(converTitleCase('and here is another title with an EXAMPLE')); // And Here Is Another Title with an Example
*/

// P157、编程挑战#4
// 朱莉娅和凯特仍然在研究狗，这次他们研究的是狗是吃得太多还是太少。 // Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// 吃得太多意味着狗目前的食物份量大于建议的份量，而吃得太少则相反。 // Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// 适量进食意味着狗目前的食物量在推荐量的10%以上和10%以下的范围内(见提示)。 // Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// 1. 循环遍历包含狗对象的数组，对于每只狗，计算推荐的食物分量，并将其作为新属性添加到对象中。 // Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
//    不要创建一个新的数组，只是循环遍历数组。 // Do NOT create a new array, simply loop over the array.
//    公式: 推荐食物 = 体重 ** 0.75 * 28。 // Forumla: recommendedFood = weight ** 0.75 * 28.(结果以克食物为单位，重量需以公斤为单位) (The result is in grams of food, and the weight needs to be in kg)
// 2. 找到Sarah的狗，并记录到控制台它是否吃得太多或太少。//  Find Sarah's dog and log to the console whether it's eating too much or too little.
//    提示: 有些狗有多个主人，所以你首先需要在主人数组中找到Sarah，所以这个有点棘手(故意的)🤓 // HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. 创建一个包含所有吃得太多的狗的主人的数组('ownersEatTooMuch')和一个包含所有吃得太少的狗的主人的数组(' ownerseattoollittle ')。 //  Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. 将3中创建的每个数组的字符串记录到控制台。 // Log a string to the console for each array created in 3.，
//    比如:“玛蒂尔达、爱丽丝和鲍勃的狗吃得太多了!”以及“萨拉、约翰和迈克尔的狗吃得太少了!” //  , like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. 记录到控制台是否有任何狗吃了推荐的食物量(只是真或假) //  Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. 记录到控制台是否有任何狗吃了一定量的食物(只是真或假) //  Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. 创建一个包含吃一定量食物的狗的数组(尝试重复使用第6节中的条件)。 //  Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. 创建一个狗数组的浅拷贝，并按推荐的食物分量按升序排序(记住，分量在数组的对象中) //  Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// 提示1: 使用许多不同的工具来解决这些挑战，你可以使用总结讲座来选择它们😉 // HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// 提示2: 在推荐部分以上和以下10 % 的范围内意味着: 电流 > (推荐 * 0.90) && 电流 < (推荐 * 1.10)。 // HINT 2: Being within a range 10 % above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10).
//        基本上，当前的摄入量应该在推荐摄入量的90 % 到110 % 之间。 // Basically, the current portion should be between 90% and 110% of the recommended portion.

// 测试数据: // TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

// 祝你好运😀 // GOOD LUCK 😀
// me：
// // 1. 循环遍历包含狗对象的数组，对于每只狗，计算推荐的食物分量，并将其作为新属性添加到对象中。 不要创建一个新的数组，只是循环遍历数组。
// //    公式: 推荐食物 = 体重 ** 0.75 * 28。(结果以克食物为单位，重量需以公斤为单位) 
// dogs.forEach(dog => {
//   dog.recommendedFood = dog.weight ** 0.75 * 28;
//   // 2. 找到Sarah的狗，并记录到控制台它是否吃得太多或太少。
//   //    提示: 有些狗有多个主人，所以你首先需要在主人数组中找到Sarah，所以这个有点棘手(故意的)🤓 
//   dog.owners.includes("Sarah") && console.log(`Sarah的狗吃的${dog.curFood > dog.recommendedFood ? "太多" : "太少"}`);
//   // Sarah的狗吃的太多
// });
// console.log(dogs); // (284,133,191,376)
// // 3. 创建一个包含所有吃得太多的狗的主人的数组('ownersEatTooMuch')和一个包含所有吃得太少的狗的主人的数组(' ownerseattoollittle ')。
// const ownersEatTooMuch = dogs
//   .filter((dog) => dog.curFood > dog.recommendedFood)
//   .flatMap(dog => dog.owners); // 吃的多
// const ownerseattoollittle = dogs
//   .filter((dog) => dog.curFood < dog.recommendedFood)
//   .flatMap(dog => dog.owners); // 吃的少
// console.log(ownersEatTooMuch, ownerseattoollittle); // (3) ['Matilda', 'Sarah', 'John'] ['Alice', 'Bob', 'Michael']
// // 4. 将3中创建的每个数组的字符串记录到控制台。 
// //    比如:“玛蒂尔达、爱丽丝和鲍勃的狗吃得太多了!”以及“萨拉、约翰和迈克尔的狗吃得太少了!”
// const owners1 = ownersEatTooMuch.join(" ");
// console.log(`${owners1}的狗吃的太多了！`); // Matilda Sarah John的狗吃的太多了！
// const owners2 = ownerseattoollittle.join(" ");
// console.log(`${owners2}的狗吃的太少了！`); // Alice Bob Michael的狗吃的太少了！
// // 5. 记录到控制台是否有任何狗吃了推荐的食物量(只是真或假) 
// const flag = dogs.some((dog) => dog.curFood == dog.recommendedFood);
// console.log(flag); // false
// // 6. 记录到控制台是否有任何狗吃了一定量的食物(只是真或假)，基本上，当前的摄入量应该在推荐摄入量的90 % 到110 % 之间。
// // current > (recommended * 0.90) && current < (recommended * 1.10)
// const flag1 = dogs.some((dog) => dog.curFood > dog.recommendedFood * 0.90 && dog.curFood > dog.recommendedFood * 1.10);
// console.log(flag1); // true
// // 7. 创建一个包含吃一定量食物的狗的数组(尝试重复使用第6节中的条件)。
// const eatFood = dogs.filter((dog) => dog.curFood > dog.recommendedFood * 0.90 && dog.curFood > dog.recommendedFood * 1.10);
// console.log(eatFood); // (8,13)
// // 8. 创建一个狗数组的浅拷贝，并按推荐的食物分量按升序排序(记住，分量在数组的对象中) 
// const newDogs = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood);
// console.log(newDogs); // 8 13 22 32 

// teacher：
// 1. 循环遍历包含狗对象的数组，对于每只狗，计算推荐的食物分量，并将其作为新属性添加到对象中。 不要创建一个新的数组，只是循环遍历数组。
//    公式: 推荐食物 = 体重 ** 0.75 * 28。(结果以克食物为单位，重量需以公斤为单位) 
dogs.forEach(dog => dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)); // 创建推荐食量属性并且省略小数
console.log(dogs);
// 2. 找到 Sarah 的狗，并记录到控制台它是否吃得太多或太少。
//    提示: 有些狗有多个主人，所以你首先需要在主人数组中找到Sarah，所以这个有点棘手(故意的)🤓
const sarahDog = dogs.find(dog => dog.owners.includes("Sarah")); // 找到包含Sarah的狗，并且判断它吃的多还是少
console.log(`Sarah's dog is eating too ${sarahDog.curFood > sarahDog.recFood ? 'much' : 'little'}!`); // Sarah's dog is eating too much!
// 3. 创建一个包含所有吃得太多的狗的主人的数组('ownersEatTooMuch')和一个包含所有吃得太少的狗的主人的数组(' ownerseattoollittle ')。
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood) // 筛选出吃的多的狗
  .flatMap(dog => dog.owners); // 获取狗主人
console.log(ownersEatTooMuch); // (3) ['Matilda', 'Sarah', 'John']
const ownerseattoollittle = dogs
  .filter(dog => dog.curFood < dog.recFood) // 筛选出吃的少的狗
  .flatMap(dog => dog.owners); // 获取狗主人
console.log(ownerseattoollittle); // (3) ['Alice', 'Bob', 'Michael']
// 4. 将3中创建的每个数组的字符串记录到控制台。比如:“玛蒂尔达、爱丽丝和鲍勃的狗吃得太多了!”以及“萨拉、约翰和迈克尔的狗吃得太少了!”
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`); // Matilda and Sarah and John's dogs eat too much!
console.log(`${ownerseattoollittle.join(" and ")}'s dogs eat too little!`); // Alice and Bob and Michael's dogs eat too little!
// 5. 记录到控制台是否有任何狗吃了推荐的食物量(只是真或假) 
console.log(dogs.some(dog => dog.curFood === dog.recFood)); // false
// current > (recommended * 0.90) && current < (recommended * 1.10)
// 6. 记录到控制台是否有任何狗吃了一定量的食物(只是真或假)，基本上，当前的摄入量应该在推荐摄入量的90 % 到110 % 之间。
const checkEatingOkay = dog => dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 1.10); // 
console.log(dogs.some(checkEatingOkay)); // true
// 7. 创建一个包含吃一定量食物的狗的数组(尝试重复使用第6节中的条件)。
console.log(dogs.filter(checkEatingOkay)); // Michael's dog
// 8. 创建一个狗数组的浅拷贝，并按推荐的食物分量按升序排序(记住，分量在数组的对象中) 
const dogSorted = dogs
  .slice() // 拷贝数组
  .sort((a, b) => a.recFood - b.recFood); // 数组按照推荐食量升序排序
console.log(dogSorted); // 体重(8,13,22,32)


