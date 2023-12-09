'use strict';

/*
// P119、默认参数
const bookings = [];
// ES6
const creatBooking = function (flightNum = "LH123", numPassengers = 1, price = 199 * numPassengers) {
    // ES5
    // flightNum = flightNum || "LH123"
    // numPassengers = numPassengers || 1
    // price = price || 199

    const booking = { flightNum, numPassengers, price }
    console.log(booking);
    bookings.push(booking)
};

creatBooking("LH123"); // {flightNum: 'LH123', numPassengers: 1, price: 199}
creatBooking("LH123", 2, 800); // {flightNum: 'LH123', numPassengers: 2, price: 800}
creatBooking("LH123", 2); // {flightNum: 'LH123', numPassengers: 2, price: 398}
creatBooking("LH123", 5); // {flightNum: 'LH123', numPassengers: 5, price: 995}
// creatBooking("LH123", 1000); // {flightNum: 'LH123', numPassengers: 1000, price: 199000}
creatBooking("LH123", undefined, 1000); // {flightNum: 'LH123', numPassengers: 1, price: 1000}


// P120、传递参数的工作原理
const flight = "LH234";
const john = {
    name: "John Brown",
    passport: 2124783947887
}
// 修改参数
const checkIn = function (flightNum, passager) {
    flightNum = "LH999"; // 原始类型修改不会影响实参
    passager.name = "Mr. " + passager.name; // 引用类型修改会影响实参
    if (passager.passport === 2124783947887) {
        alert("Checked in!")
    } else {
        alert("Wrong passport!")
    }
}
// checkIn(flight, john); // Checked in!
// console.log(flight); // LH234
// console.log(john); // {name: 'Mr. John Brown', passport: 2124783947887}
// // 和之前的原始类型和引用类型底层一样
// const flightNum = flight; // 值得拷贝
// const passager = john; // 引用地址的拷贝

const newPassPort = function (person) {
    person.passport = Math.trunc(Math.random() * 1000000000000); // 引用类型修改会影响实参
}
newPassPort(john)
checkIn(flight, john); // Wrong passport!

// 总结，尽量别修改参数,也别使用引用参数


// P122、接受回调函数的函数
// 替换一个单词中的所有空格
const oneWord = function (str) {
    return str.replace(/ /g, "").toLowerCase(); // 替换方法和转小写
}
// 将简单的转换第一个单词输入字符串的大小写为大写
const upperFirstWord = function (str) {
    const [first, ...other] = str.split(' '); // 解构、字符串转数组
    return [first.toUpperCase(), ...other].join(" "); // 数组扩展运算符合并转字符串
}
// 高阶函数——回调函数
const transformer = function (str, fn) {
    console.log("字符串:", str);
    console.log("字符串调用函数:", fn(str)); // 调用回调函数
    console.log("函数:", fn.name);
}
transformer("JavaScript is the best!", oneWord)
// 字符串: JavaScript is the best!
// 字符串调用函数: javascriptisthebest!
// 函数: oneWord
transformer("JavaScript is the best!", upperFirstWord)
// 字符串: JavaScript is the best!
// 字符串调用函数: JAVASCRIPT is the best!
// 函数: upperFirstWord

// 事件监听——回调函数
const high5 = function () {
    console.log("😏😏🙄");
}
document.body.addEventListener("click", high5); // 😏😏🙄(点几次屏幕就有几次打印)

// 数组方法——回调函数
[1, 2, 3].forEach(high5); // 循环数组每个元素打印一次
// 😏😏🙄
// 😏😏🙄
// 😏😏🙄


// P123、返回函数的函数——闭包
// ES5
const greet = function (greeting) {
    // 返回一个新函数
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}
// 写法一：
const greeterHey = greet("Hey")
greeterHey("May"); // Hey May
greeterHey("Tom"); // Hey Tom
// 写法二：
greet("Hello")("Jessica"); // Hello Jessica

// ES6——箭头函数
const greetConcise = (greeting) => (name) => console.log(`${greeting} ${name}`);
greetConcise("Hi")("Jessica"); // Hi Jessica


// P124、call和apply方法
// 创建一个对象
const lufthansa = {
    airLine: "Lufthansa",
    iataCode: "LH",
    booking: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airLine} flight ${this.iataCode}${flightNum}`);
        this.booking.push({ flightNum: `${this.iataCode}${flightNum}`, name })
    }
}
// lufthansa调用book方法，book方法的this指向lufthansa对象
lufthansa.book(643, "May Smith"); // May Smith booked a seat on Lufthansa flight LH643
lufthansa.book(261, "John Green"); // John Green booked a seat on Lufthansa flight LH261
console.log(lufthansa); // {airLine: 'Lufthansa', iataCode: 'LH', booking: Array(2), book: ƒ}

// 新的对象
const eurowings = {
    airLine: "Eurowing",
    iataCode: "EW",
    booking: [],
}

// 将lufthansa的book方法用变量book保存起来
const book = lufthansa.book;
// 因为在严格模式下，book直接全局调用会报错（如果不在严格模式下，this指向undefined）
// book(632, "May Smith"); // 报错：TypeError: Cannot read properties of undefined (reading 'airLine')

// call传递数列
// 使用call方法改变this指向，将this指向eurowings，第一个参数是this要指向的内容，后面的参数就是传递给该方法的参数
book.call(eurowings, 324, "Jessie"); // Jessie booked a seat on Eurowing flight EW324
console.log(eurowings); // {airLine: 'Eurowing', iataCode: 'EW', booking: Array(1)}

book.call(lufthansa, 354, "Jessie"); // Jessie booked a seat on Lufthansa flight LH354
console.log(lufthansa); // {airLine: 'Lufthansa', iataCode: 'LH', booking: Array(3), book: ƒ}

// 新的对象
const swiss = {
    airLine: "Swiss Air Lines",
    iataCode: "LX",
    booking: [],
}

// 可以使用任何同结构对象上
book.call(swiss, 354, "Jessie"); // Jessie booked a seat on Swiss Air Lines flight LX354
console.log(swiss); // {airLine: 'Swiss Air Lines', iataCode: 'LX', booking: Array(1)}

// apply方法参数传递数组
const flightData = [133, "Jessica"]
book.apply(swiss, flightData); // Jessica booked a seat on Swiss Air Lines flight LX133
// 可以使用call代替apply——可以用到扩展运算符
book.call(swiss, ...flightData); // Jessica booked a seat on Swiss Air Lines flight LX133


// P125、bind方法
// bind方法调用
// book.call(eurowings, 324, "Jessie"); // Jessie booked a seat on Eurowing flight EW324
// 使用bind方法创建一个新函数
const bookEW = book.bind(eurowings); // 此时bind方法不会像apply和call那样直接调用book方法，而是生成了一个指定好this关键字的新函数
const bookLH = book.bind(lufthansa); // 此时bind方法不会像apply和call那样直接调用book方法，而是生成了一个指定好this关键字的新函数
const bookLX = book.bind(swiss); // 此时bind方法不会像apply和call那样直接调用book方法，而是生成了一个指定好this关键字的新函数
// 调用新的函数
bookEW(23, "Amy"); // Amy booked a seat on Eurowing flight EW23

// 预设参数
const bookEW23 = book.bind(eurowings, 54); // 返回一个ths指定好的新函数
bookEW23("Tom"); // Tom booked a seat on Eurowing flight EW54
bookEW23("Sushan"); // Sushan booked a seat on Eurowing flight EW54

// 结合事件监听函数
lufthansa.planes = 200; // 新建一些属性
// 新建方法
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
}
// lufthansa.buyPlane()
// {airLine: 'Lufthansa', iataCode: 'LH', booking: Array(3), planes: 200, book: ƒ, …}
// 201

// 在元素的事件监听函数中，this关键字总是指向元素
// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);
// button
// NaN
document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));
// {airLine: 'Lufthansa', iataCode: 'LH', booking: Array(3), planes: 200, book: ƒ, …}
// 201

// 部分应用——预设参数：此时甚至不需要关心this关键字，只是拿来特定某些参数
// 和默认参数类似，但这里的表示更加具体的功能
const addTax = (rate, value) => value + value * rate; // 增税值
console.log(addTax(0.1, 100)); // 110
const addVAT = addTax.bind(null, 0.23);
// 相当于 const addVAT = (value) => value + value * 0.23
console.log(addVAT(100)); // 124
console.log(addVAT(20)); // 24.6

// 使用闭包完成预设参数
const addTaxFn = function (rate) {
    return function (value) {
        return value + value * rate;
    }
}
const addVAT23 = addTaxFn(0.23);
console.log(addVAT23(100)); // 123
console.log(addVAT23(30)); // 36.9


// P126、编码挑战#1
// 让我们构建一个简单的投票应用程序!
// 民意调查有一个问题，一个可供人们选择的选项数组，以及一个包含每个选项回复数的数组。该数据存储在下面的starter对象中。
// 以下是你的任务:
// 1. 在'poll'对象上创建一个名为'registerNewAnswer'的方法。这个方法做两件事:
//     1.1. 显示一个提示窗口，供用户输入所选选项的编号。提示符应该是这样的:
//         你最喜欢的编程语言是什么?
//             0: JavaScript
//             1: Python
//             2: Rust
//             3: c++
//             (写选项号)

//     1.2. 根据输入的数字，更新答案数组。例如，如果选项为3，则将数组的AT POSITION 3的值增加1。确保检查输入是否是一个数字，这个数字是否有意义(例如，答案52不会有意义，对吧?)
// 2. 每当用户单击“Answer poll”按钮时调用此方法。
// 3.创建一个方法'displayResults'来显示投票结果。该方法接受一个字符串作为输入(称为'type')，可以是'string'或'array'。如果type为'array'，只需使用console.log()按原样显示结果数组。
//   这应该是默认选项。如果type为'string'，则显示类似"Poll results are 13, 2, 4, 1"的字符串。
// 4. 在每个'registerNewAnswer'方法调用结束时运行'displayResults'方法。

// 提示:使用您在本节和上一节😉中学到的许多工具
// 附加:使用'displayResults'方法显示测试数据中的2个数组。同时使用'array'和'string'选项。不要将数组放在poll对象中!那么在这种情况下，这个this应该是什么样子呢?
// 附加试验数据1:[5,2,3]
// 附加测试数据2:[1,5,3,9,6,1]

// 祝你好运😀
// me：
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    // 1. 登记答案方法
    registerNewAnswer() {
        let answer = prompt(`${this.question}\n${this.options.join("\n")}\n(Write option number)`); // 显示提示框
        answer = answer != '' ? Number(answer) : NaN; // 收集用户输入内容
        // 判断是否为大于等于0小于三的数字
        if (answer <= 3 && answer >= 0) {
            // 符合条件answers数组对应元素加一
            this.answers[answer]++;
            // 4. 调用显示结果方法
            this.displayResults();
            this.displayResults('string');
        } else {
            console.log("Wrong!🤡");
        }
    },

    // 3. 显示答案方法——默认输入answer数组
    displayResults(type = 'array') {
        // 判断参数是否为数组
        if (type === 'array') console.log(this.answers); // 为数组直接打印
        else if (type == "string") console.log(`Poll results are ${this.answers.join(", ")}`); // 为字符串打印题目中格式
    }
};
// 2. 点击按钮调用poll中的登记答案方法
document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll));
// 输入 0 测试

// 附加题：分别使用两种方式测试
poll.displayResults.call({ answers: [5, 2, 3] })
poll.displayResults.call({ answers: [5, 2, 3] }, "string")
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] })
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string")

// teacher：
const poll1 = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    // 1. 登记答案方法
    registerNewAnswer() {
        let answer = Number(prompt(`${this.question}\n${this.options.join("\n")}\n(Write option number)`)); // 显示提示框
        // 判断是否为大于等于0小于三的数字，符合条件answers数组对应元素加一
        typeof answer === "number" && answer < this.answers.length && this.answers[answer]++;
        // 4. 调用显示结果方法
        this.displayResults(); // [0, 1, 0, 0]
        this.displayResults('string'); // Poll results are 0, 1, 0, 0
    },

    // 3. 显示答案方法——默认输入answer数组
    displayResults(type = 'array') {
        // 判断参数是否为数组
        if (type === 'array') {
            console.log(this.answers); // 为数组直接打印
        } else if (type == "string") {
            console.log(`Poll results are ${this.answers.join(", ")}`); // 为字符串打印题目中格式
        }
    }
};
// 2. 点击按钮调用poll中的登记答案方法
// document.querySelector(".poll").addEventListener("click", poll1.registerNewAnswer.bind(poll1));
// 输入 0 测试

// 分别使用两种方式测试
// poll1.displayResults.call({ answers: [5, 2, 3] });
// poll1.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll1.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// poll1.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');


// P127、立即调用函数表达式——IIFE
const againFn = function () {
    console.log("会再次执行");
}
againFn(); // 会再次执行
againFn(); // 会再次执行

{
    const isPrivate = 23;
    var notPrivate = 23;
}
// // console.log(isPrivate); // 访问不到 isPrivate 变量并且会报错：ReferenceError: isPrivate is not defined
console.log(notPrivate); // 23 能访问到
notPrivate = 21; // 变量污染
console.log(notPrivate); // 23 能访问到并且还能修改

// 匿名函数
(function () {
    console.log("只执行一次"); // 只执行一次
    const isPrivate = 23;
    var isPrivate1 = 23;
})();
// console.log(isPrivate); // 访问不到 isPrivate 变量并且会报错：ReferenceError: isPrivate is not defined
// console.log(isPrivate1); // 访问不到 isPrivate1 变量并且会报错：ReferenceError: isPrivate1 is not defined

// 箭头函数（匿名）
(() => console.log("只执行一次"))(); // 只执行一次


// P128、闭包
// 全局作用域
// 全局执行上下文
const secureBooking = function () {
    // secureBooking 的执行上下文
    // 闭包
    let passengerCount = 0;
    // 返回新的函数 —— 这个新函数被变量 booker 接收到了
    return function () { // booker
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}
// booker 还是在全局执行上下文
const booker = secureBooking(); // 此时 secureBooking 完成执行并且消失了

// 虽然父作用域被销毁了，但是闭包使父作用域的变量保留了下来
// 创建了新的执行上下文
booker(); // 当前函数执行完毕也会被销毁
booker();

console.dir(booker);
// 可以看到一个作用域的东西
// [[Scopes]]: Scopes[3] —— 双括号代码内部属性，无法从代码中访问
// 0: Closure (secureBooking) {passengerCount: 2} —— 闭包
// 1: Script {secureBooking: ƒ, booker: ƒ}
// 2: Global {window: Window, self: Window, document: document, name: '', location: Location, …} —— 全局


// P129、更多闭包示例
// 示例一
let f;

const g = function (params) {
    const a = 25;
    f = function () {
        console.log(a * 2);
    }
}
g(); // g 调用完就会被销毁了，但是因为闭包使变量 a 留了下来
f(); // 50
console.dir(f); // ... Closure (g) {a: 25}

const h = function (params) {
    const b = 125;
    f = function () {
        console.log(b * 2);
    }
}
h(); // h 调用完就会被销毁了，但是因为闭包使变量 b 留了下来
f(); // 250
console.dir(f); // ... Closure (h) {b: 125}
// 总结: g 函数中的 f 函数和 h 函数中的 f 函数不一样，因为闭包可以重新分配变量。

// 示例二
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;
    setTimeout(function () {
        console.log(`有${n}乘客正在登机`);
        console.log(`有三组，每组${perGroup}个乘客`);
    }, wait * 1000);
    console.log(`将在${wait}秒后开始登机`);
}
const perGroup = 1000;
boardPassengers(180, 3); // boardPassengers 调用完就会被销毁了，但是因为闭包使 boardPassengers 中变量和参数留了下来
// 总结: 闭包具有优先权
*/

// P130、编程挑战#2
// 这与其说是编码挑战，不如说是思维挑战🤓
// 以下面的IIFE为例，在函数的末尾，附加一个事件侦听器，每次单击BODY元素时，将所选h1元素('header')的颜色更改为蓝色。不要再次选择h1元素!
// 现在向你自己(或你周围的人)解释为什么这是有效的!你需要多少时间都行。考虑回调函数到底何时执行，以及这对本例中涉及的变量意味着什么。
// 祝你好运😀

(function () {
    const header = document.querySelector("h1");
    header.style.color = "red";
    // 虽然下面是事件监听的回调函数,不过也是IIFE的子函数,所以此处也是有闭包的.
    // IIFE执行完毕被销毁了, 闭包使header变量留了下来,事件监听可以继续使用 
    document.body.addEventListener("click", function () {
        header.style.color = "blue";
    })
})();
