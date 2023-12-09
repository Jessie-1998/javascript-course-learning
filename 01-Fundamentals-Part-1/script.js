/*
初识js
let js = 'amazing';
if (js === 'amazing') alert('JavaScript is FUN!');
40 + 8 + 23 - 10;
console.log(40 + 8 + 23 - 10);
let score = 98.5;
let firstName = "Bob";
let flag = true;
let children;


// 定义变量
let age = 30;
age = 31;

// const birthYear = 1991;
// birthYear = 1990;
// const job;

var job = 'prgrammer';
job = 'teacher';


// 运算符
// 算数运算符（加减乘除等和数学有关的）
const now = 2037;
const ageYangtze = now - 1998;
const ageBob = now - 2016;
console.log(ageYangtze, ageBob); // 39 21
console.log(ageYangtze * 2, ageYangtze / 10, 4 ** 2); // 78 3.9 16
const firstName = 'Da';
const lastName = 'Ming';
console.log(firstName + ' ' + lastName); // Da Ming

// 赋值运算符（主要和单等号有关）
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1 = 101
x--; // x = x - 1 = 100
x--; // x = x - 1 = 99
console.log(x);

// 比较运算符（大于小于等于相关，得到的值是布尔值）
console.log(ageYangtze > ageBob); // true
console.log(ageBob >= 18); // true
let isFullAge = ageBob >= 18
console.log(isFullAge); // true
console.log(now - 1998 > now - 2016); // true


// 运算符的优先级
const now = 2037;
const ageYangtze = now - 1998;
const ageBob = now - 2016;
console.log(now - 1998 > now - 2016); // true

let x, y;
x = y = 25 - 10 - 5; // x=y=10,x=10
console.log(x, y); // 10 10

const averageAge = (ageYangtze + ageBob) / 2;
console.log(ageYangtze, ageBob, averageAge); // 39 21 30


// 编码挑战 1
let massJohn = 92, heightJohn = 1.95; // 约翰
let massMark = 78, heightMark = 1.69; // 马克
massMark = 95, heightMark = 1.88; // 马克
massJohn = 85, heightJohn = 1.76; // 约翰
// BMI
const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log("BMIMark", BMIMark);
console.log("BMIJohn", BMIJohn);
const markHigherBMI = BMIMark > BMIJohn;
console.log("markHigherBMI", markHigherBMI);


// 字符串和模板字符串
const firstName = "马克";
const job = "前端工程师";
const birthYear = 1998;
const year = 2037;
const mark = "我叫" + firstName + "，一个" + (year - birthYear) + "岁的" + job + "！";
console.log(mark)
const markNew = `我叫${firstName}，一个${year - birthYear}岁的${job}！`;
console.log(markNew)

console.log("马克\n\
前端工程师\n\
1998");

console.log(`马克
前端工程师
1998
`);


// 条件语句
const age = 14;
// const isOldEnough = age >= 18;
// if (isOldEnough) {
if (age >= 18) {
    console.log("成年啦！💑");
} else {
    const yearsLeft = 18 - age
    console.log(`太年轻了，还差${yearsLeft}成年 :)`);
}

let birthYear = 2001;
let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century + "世纪");


// 编码挑战 2
let massJohn = 92, heightJohn = 1.95; // 约翰
let massMark = 78, heightMark = 1.69; // 马克
// massMark = 95, heightMark = 1.88; // 马克
// massJohn = 85, heightJohn = 1.76; // 约翰
// BMI
const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);
let templateStr;
if (BMIMark > BMIJohn) {
    console.log("Mark's BMI is higher than John's!");
    templateStr = `Mark's BMI (${BMIMark.toFixed(1)}) is higher than John's (${BMIJohn.toFixed(1)}) !`
} else {
    console.log("John's BMI is higher than Mark's!");
    templateStr = `John's BMI (${BMIJohn.toFixed(1)}) is higher than Mark's (${BMIMark.toFixed(1)}) !`
}
console.log(templateStr);


// type conversion 类型转换
const inputYear = '1998';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number('Mark'));
console.log(typeof NaN);
console.log(String(23), 23);

// type coercion 类型强制
console.log("我" + 25 + "岁了");
console.log("23" - "10" - 3);
console.log("23" / 2);

let n = "1" + 1;
n = n - 1;
console.log(n);


// 真值与假值
// 5个假值：0，''，undefined，null，NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("undefined"));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 10;
if (money) {
    console.log("不要花光了");
} else {
    console.log("该找工作了");
}

let height = 0; // 注意场景需要，对照类型强制为假值的五个值
if (height) {
    console.log("YAY! Height is defined");
} else {
    console.log("Height is UNDEFINED");
}


// 相等运算符 == vs ===
let age = '18';
// age = 18;
if (age === 18) console.log("你成年啦！(严格的)");
if (age == 18) console.log("你成年啦！(不严格的)");

const favourite = Number(prompt("你最喜欢的数字是多少？"));
console.log(favourite);
console.log(typeof favourite);
if (favourite === 25) {
    console.log("哇哦！是25欸！");
} else if (favourite === 7) {
    console.log("哇哦！是7欸！");
} else if (favourite === 9) {
    console.log("哇哦！是9欸！");
} else {
    console.log("不是23或者7或者9");
}
if (favourite !== 25) console.log("为什么不是23");


// 布尔逻辑
// 1.逻辑与：两个都为true时，结果为true；
// 2.逻辑或：两个都为false时，结果为false；
// 3.逻辑非：（一个）不为true就为false



// 逻辑运算符
let hasDriversLicense = true; // A
let hasGoodVision = true; // B
// hasDriversLicense = true
// hasGoodVision = false

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

// if (hasDriversLicense && hasGoodVision) {
//     console.log("可以开车");
// } else {
//     console.log("暂时不能开车");
// }

let isTired = true; // C
console.log(hasDriversLicense || hasGoodVision || isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log("可以开车");
} else {
    console.log("暂时不能开车");
}


// 编码挑战3
// const scoreDolphins = (96 + 108 + 89) / 3
// const scoreKoalas = (88 + 91 + 110) / 3
// console.log(scoreDolphins, scoreKoalas);
// if (scoreDolphins > scoreKoalas) {
//     console.log("海豚队赢得奖杯！🏆");
// } else if (scoreKoalas > scoreDolphins) {
//     console.log("考拉队赢得奖杯！🏆");
// } else if (scoreKoalas === scoreDolphins) {
//     console.log("两队到奖杯！");
// }

// BONUS 1:
// const scoreDolphins = (97 + 112 + 101) / 3
// const scoreKoalas = (109 + 95 + 123) / 3
// console.log(scoreDolphins, scoreKoalas);
// if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
//     console.log("海豚队赢得奖杯！🏆");
// } else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
//     console.log("考拉队赢得奖杯！🏆");
// } else if (scoreKoalas === scoreDolphins) {
//     console.log("两队到奖杯！");
// }

// BONUS 2:
const scoreDolphins = (97 + 112 + 101) / 3
const scoreKoalas = (109 + 95 + 106) / 3
console.log(scoreDolphins, scoreKoalas);
if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
    console.log("海豚队赢得奖杯！🏆");
} else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
    console.log("考拉队赢得奖杯！🏆");
} else if (scoreKoalas === scoreDolphins && scoreKoalas >= 100 && scoreDolphins >= 100) {
    console.log("两队到奖杯！");
} else {
    console.log("没人得到奖杯！😭");
}


// switch 语句（严格相等运算符）
const weekDay = 6;
switch (weekDay) {
    case 1: // weekDay === 1
        console.log("星期一");
        break; // 跳出switch语句
    case 2:
        console.log("星期二");
        break;
    case 3:
        console.log("星期三");
        break;
    case 4:
        console.log("星期四");
        break;
    case 5:
        console.log("星期五");
        break;
    case 6:
    case 0:
        console.log("周末愉快！");
        break;
    default:
        console.log("输入错误");
}

if (weekDay === 1) {
    console.log("星期一");
} else if (weekDay === 2) {
    console.log("星期二");
} else if (weekDay === 3) {
    console.log("星期三");
} else if (weekDay === 4) {
    console.log("星期四");
} else if (weekDay === 5) {
    console.log("星期五");
} else if (weekDay === 6 || weekDay === 0) {
    console.log("周末愉快！");
} else {
    console.log("输入错误");
}


// 语句和表达式

// 表达式
3 + 4
1991
true && false && !false
// 语句
if (23 > 10) {
    const str = "23大";
}
// 表达式
let me = "Mark";
console.log(`我叫${me}，今年${2037 - 1998}岁了`);


// 条件运算符——三目运算
const age = 22;
let str = age >= 18 ? "我可以喝酒🥂啦！" : "我得喝果汁🧃。"
console.log(str);
if (age >= 18) {
    console.log("酒🥂");
} else {
    console.log("果汁🧃");
}
console.log(`我喜欢喝${age >= 18 ? "酒🥂" : "果汁🧃"}`);


// 编码挑战4
let bill = 275;
// bill = 40;
// bill = 430;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(`账单是${bill}，小费是${tip}，总值是${bill + tip}`);
*/
