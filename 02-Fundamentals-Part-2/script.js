'use strict';

/*
// 激活严格模式
let hasDriversLicence = false;
const passTest = true;
// 严格模式下报错——引用错误: hasDriverLicence没有定义；否则不会报错。
// 因为在写变量的时候可以不用声明
// if (passTest) hasDriverLicence = true;
if (passTest) hasDriversLicence = true;
if (hasDriversLicence) console.log("我可以开车！");

// const interface = 'audio'; // 语法错误：以外的保留字：interface
// const private = 123; // 语法错误：以外的保留字：private
// const if = 'audio'; // 语法错误：以外的标记：if


// 函数
function logger() {
    console.log("我叫马克");
}
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    const juice = `果汁由${apples}个苹果和${oranges}个橘子组成`
    return juice;
}
const appleJuice = fruitProcessor(2, 0)
console.log(appleJuice);
const appleOrangeJuice = fruitProcessor(2, 2)
console.log(appleOrangeJuice);

const num = Number('23')


// 声明式函数
function calcAge1(birthYear) {
    return 2037 - birthYear;
}
const age1 = calcAge1(1998);
console.log(age1);

// 表达式式函数
// const age2 = calcAge2(1998); // 引用错误：不能在初始化之前调用
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}
const age2 = calcAge2(1998);
console.log(age2);


// 箭头函数
// 单行箭头函数
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1998);
console.log(age3);
// 多行箭头函数
const yearUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return `${firstName}还有${retirement}年退休！`
}
console.log(yearUntilRetirement(1998, "马克"));
console.log(yearUntilRetirement(1988, "鲍勃"));


// 函数调用其他函数
function cutFruitPieces(fruit) {
    return fruit * 4;
}
function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);
    const juice = `果汁由${applePieces}半苹果和${orangePieces}半橘子组成`
    return juice;
}
console.log(fruitProcessor(2, 3));


// 函数回顾
// 函数、函数中调用函数、if...else语句
const calcAge = function (birthYear) {
    return 2037 - birthYear
}
const yearUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;
    if (retirement > 0) {
        console.log(`${firstName}还有${retirement}年退休！`);
        return retirement;
    } else {
        console.log(`${firstName}已经退休啦！`);
        return -1;
    }
}
console.log(yearUntilRetirement(1998, "马克"));
console.log(yearUntilRetirement(1970, "鲍勃"));


// 编码挑战1
const calcAverage = (a, b, c) => (a + b + c) / 3;

// 测试数据1：
let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreKoalas, scoreDolphins);

const checkWinner = function (avgKoalas, avgDolphins) {
    if (avgKoalas >= avgDolphins * 2) {
        console.log(`考拉赢了（${avgKoalas}比${avgDolphins}）！`);
    } else if (avgDolphins >= avgKoalas * 2) {
        console.log(`海豚赢了（${avgDolphins}比${avgKoalas}）！`);
    } else {
        console.log(`都没有赢...`);
    }
}
checkWinner(scoreKoalas, scoreDolphins);

// 测试数据2：
scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreKoalas, scoreDolphins);
checkWinner(scoreKoalas, scoreDolphins);


// 数组介绍
const friend1 = 'May';
const friend2 = 'Amy';
const friend3 = 'Tom';

// 字面量方式
const friends = ['John', 'Amy', 'Tom']
console.log(friends); // 获取数组

// 函数方式
const Y = new Array(1998, 1995, 2022);
console.log(Y);

// 数组名[可以是任何有意义的表达式]
console.log(friends[0]); // 获取数组第一个元素
console.log(friends[2]); // 获取数组第三个元素
console.log(friends.length); // 获取数组的长度，length是一个属性
// 获取数组的最后一个元素，因为数组下标从0开始，所以需要-1
console.log(friends[friends.length - 1]);

// const声明的变量不能更改？const定义的原始值不能更改，friends不是原始值。
// 因为js的数据类型存储方式不同
friends[2] = 'Jay';
// friends = ['Bob', 'John'] // 这样就会报错，因为修改了原始值

// 数组可存储的数据类型
const firstName = 'Amy';
let amy = [firstName, 'yangtze', 2037 - 1998, 'programmer', friends];
console.log(amy);

// 练习：数组和函数
const years = [1995, 1998, 1980, 2022, 2008];
const calcAge = function (birthYear) {
    return 2023 - birthYear;
}
// console.log(calcAge(years)); // NaN

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);


// 基本数组操作（方法）
const friends = ['John', 'Amy', 'Tom'];
console.log(friends);

// 添加元素
let newLength = friends.push('Bob');
console.log(friends);
console.log(newLength);
newLength = friends.unshift('May');
console.log(friends);
console.log(newLength);

// 删除元素
let delEle = friends.pop(); // last
console.log(delEle);
console.log(friends);
delEle = friends.shift(); // first
console.log(delEle);
console.log(friends);

// 查找元素
console.log(friends.indexOf('Tom'));
console.log(friends.indexOf('Bob'));
console.log(friends.includes('Tom'));
console.log(friends.includes('Bob'));

if (friends.includes('Amy')) {
    console.log("你有一个叫Amy的朋友");
}


// 编码挑战2
const calcTip = (bill) => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(calcTip(100));
const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];
console.log(bills, tips, total);


// 对象介绍
let arr = [
    "Yangtze",
    "Zheng",
    2037 - 1998,
    "programmer",
    ['Bob', 'Lili', 'Amy', 'Tom']
]
// 数组存储数据没法命名
let obj = {
    firstName: "Yangtze",
    lastName: "Zheng",
    age: 2037 - 1998,
    job: "programmer",
    friends: ['Bob', 'Lili', 'Amy', 'Tom']
}


// 圆点与方括号表示法
let obj = {
    firstName: "Yangtze",
    lastName: "Zheng",
    age: 2037 - 1998,
    job: "programmer",
    friends: ['Bob', 'Lili', 'Amy', 'Tom']
};
console.log(obj);
console.log(obj.age);
console.log(obj['age']);

// 圆点和方括号的区别
const nameKey = 'Name';
console.log(obj['first' + nameKey]);
console.log(obj['last' + nameKey]);

const interestedIn = prompt('你想知道Yangtze的什么？firstName，lastName，age，job 还是 friends')
// 如果输入的值不在弹出框中，就不会打印，并且会提示
if (obj[interestedIn]) {
    console.log(obj[interestedIn]);
} else {
    console.log("你输入内容的不在firstName，lastName，age，job 和 friends中");
}

// 添加键值对
obj.location = 'China';
obj['QQ'] = 12345;
console.log(obj);

// 小测试
console.log(`${obj.firstName}有${obj.friends.length}个朋友，最好的朋友是${obj['friends'][0]}`);


对象方法
let obj = {
    firstName: "Yangtze",
    lastName: "Zheng",
    birthYear: 1998,
    job: "programmer",
    friends: ['Bob', 'Lili', 'Amy', 'Tom'],
    hasDriversLicence: true,
    // calcAge: function (birthYear) {
    //     return 2037 - birthYear
    // },
    // calcAge: function () {
    //     console.log(this);
    //     return 2037 - this.birthYear
    // },
    calcAge: function () {
        this.age = 2037 - this.birthYear
        return this.age
    },
    getSummary: function () {
        return `${this.firstName}是一个${this.calcAge()}的${this.job}，他${this.hasDriversLicence ? '有' : '没有'}驾照`
    }
};
// console.log(obj.calcAge(1998));
// console.log(obj.calcAge());
console.log(obj.calcAge());
console.log(obj.getSummary());


编码挑战3
const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    fullName: 'Mark Miller',
    weight: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = this.weight / this.height ** 2;
        return this.bmi;
    }
};
const john = {
    firstName: 'John',
    lastName: 'Smith',
    fullName: 'John Smith',
    weight: 92,
    height: 1.95,
    calcBMI: function () {
        this.bmi = this.weight / (this.height * this.height);
        return this.bmi;
    }
};

mark.calcBMI();
john.calcBMI();

if (mark.bmi > john.bmi) {
    console.log(`${mark.fullName}得BMI（${mark.bmi}）高于${john.fullName}的（${john.bmi}）`);
} else if (john.bmi > mark.bmi) {
    console.log(`${john.fullName}得BMI（${john.bmi}）高于${mark.fullName}的（${mark.bmi}）`);
} else {
    console.log(`${john.fullName}得BMI（${john.bmi}）和${mark.fullName}的（${mark.bmi}）一样`);
}


// for循环
for (let rep=1; rep <= 10; rep++) {
    console.log(`举重${rep}次🏋️‍♀️`);
}


// 对数组进行循环、中断和继续
let arr = [
    'Mark',
    'Brown',
    2037 - 1998,
    'programmer',
    ['Amy', 'May', 'Tom'],
    true
]

// 将数组的类型放在新数组中
const types = [];
for (let i = 0; i < arr.length; i++) {
    // 打印数组类型
    console.log(arr[i], typeof arr[i]);
    // 将数组类型放进新的数组中
    types[i] = typeof arr[i]
    // types.push(typeof arr[i])
}
console.log(types);

// 根据年份数组计算出年龄放到新数组中
const years = [1998, 1995, 1973, 2018];
const age = [];
for (let i = 0; i < years.length; i++) {
    age.push(2037 - years[i])
}
console.log(age);

console.log('==============================================================================');
// continue和break
for (let i = 0; i < arr.length; i++) {
    // 打印字符串类型
    if (typeof arr[i] !== 'string') continue; // 后面的代码不执行，执行下一个迭代
    console.log(arr[i], typeof arr[i]);
}
console.log('==============================================================================');
for (let i = 0; i < arr.length; i++) {
    // 打印数值前面的类型
    if (typeof arr[i] == 'number') break; // 后面的代码不执行，执行下一个迭代
    console.log(arr[i], typeof arr[i]);
}


// 向后循环和循环中循环
// 向后循环
let arr = [
    'Mark',
    'Brown',
    2037 - 1998,
    'programmer',
    ['Amy', 'May', 'Tom'],
    true
]
for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
}

// 循环中循环
for (let i = 1; i < 4; i++) {
    console.log(`--------------------------第${i}节锻炼`);
    for (let rep = 1; rep < 6; rep++){
        console.log(`第${i}节锻炼：第${rep}次举重🏋️‍`);
    }
}


// while循环
for (let rep = 1; rep <= 10; rep++) {
    console.log(`举重${rep}次🏋️‍♀️`);
}
let rep = 1;
while (rep <= 10) {
    console.log(`举重${rep}次🏋️‍♀️`);
    rep++;
}

// 掷色子：掷到6终止程序运行；没掷到继续运行
let dice = Math.trunc(Math.random() * 6) + 1; // trunc去掉小数部分得到 0-5，+1就是1-6
if (dice === 6) console.log('掷到6点，不进入循环');
while (dice !== 6) {
    console.log(`有一个点数为${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log("掷到6点，中止循环");
}
*/

// 编码挑战4
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];
const calcTip = (bill) => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
for (let i = 0; i < bills.length; i++) {
    const tip = calcTip(bills[i]);
    tips.push(tip)
    totals.push(bills[i] + tip)
}
console.log(bills, tips, totals);
function calcverage(arr) {
    if (arr.length) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum / arr.length;
    }
}
console.log(calcverage(totals));









