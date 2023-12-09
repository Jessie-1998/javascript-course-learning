/*
'use strict';
// 在全局作用域定义——顶层代码
function calcAge(birthYear) {
    // 函数作用域：它的可变环境和执行上下文是等价的
    const age = 2037 - birthYear;
    function printAge() {
        // 函数作用域
        let output = `${firstName}，你${age}岁了，你出生在${birthYear}年`; // 使用全局作用域的变量，父作用域的变量和参数
        console.log(output); // May，你35岁了，你出生在2002年
        if (birthYear >= 2001) {
            // 块作用域
            var qianxinian = true;
            const firstName = "Amy"; // 新作用域定义变量
            const str = `你出生在千禧年，${firstName}`; // 因为当前作用域有需要的变量，直接使用
            console.log(str); // 你出生在千禧年，Amy

            // ES6块作用域当前作用域之外的作用域不可用
            // ES5函数作用域当前作用域之外的作用域可用
            function add(a, b) {
                return a + b;
            }

            output = "NEW OUTPUT"; // 修改父作用域的变量
        }
        // 当前作用域的子作用域的变量不可用
        // console.log(str); // ReferenceError: str is not defined
        // ES5变量
        console.log(qianxinian); // true
        // 如果是严格模式情况下,当前作用域的子作用域的方法不可用 ,ES6
        // 如果不是严格模式情况下,当前作用域的子作用域的方法可用 ,ES5
        // console.log(add(1, 2)); // ReferenceError: add is not defined
        // 代码从上到下一次执行，在此代码之前变量发生了改变
        console.log(output); // NEW OUTPUT
    }
    printAge();
    return age;
}
const firstName = 'May'; // 顶层代码
calcAge(2002);


// P88、实践中的变量提升
// 变量
// console.log(me); // undefined（变量提升）
// console.log(job); // ReferenceError:不能在初始化之前访问（暂时性死区：从声明代码行之前到当前代码行）
// console.log(year); // ReferenceError:不能在初始化之前访问（暂时性死区：从声明代码行之前到当前代码行）
var me = "May";
let job = "programmer";
const year = 1998;

// 函数
// console.log(addDecl(1, 2)); // 3
// console.log(addExpr(3, 4)); // ReferenceError:不能在初始化之前访问（暂时性死区：从声明代码行之前到当前代码行）
// console.log(addArrow(5, 6)); // ReferenceError:不能在初始化之前访问（暂时性死区：从声明代码行之前到当前代码行）
// 声明式函数（ES6）
function addDecl(a, b) {
    return a + b;
}
// 表达式函数
const addExpr = function (a, b) {
    return a + b;
}
// 箭头函数（ES6）
const addArrow = (a, b) => a + b;

// console.log(addExpr1); // undefined（变量提升）
// console.log(addArrow1); // undefined（变量提升）
// console.log(addExpr1(3, 4)); // TypeError:(函数名)不是一个函数（变量提升）
// console.log(addArrow1(5, 6)); // TypeError:(函数名)不是一个函数（变量提升）
// 表达式函数（ES5）
var addExpr1 = function (a, b) {
    return a + b;
}
// 箭头函数（ES5）
var addArrow1 = (a, b) => a + b;

// 例子
// console.log(num); // undefined（变量提升）
// if (!num) deleteShoppingCart(); // hhhhhhhhh
var num = 10;
function deleteShoppingCart(params) {
    console.log("hhhhhhhhh");
}

var x = 1; // 声明的变量挂载到window上的
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false


// P90、实践中的this关键词

// console.log(this); // window
const calcAge = function (birthYear) {
    console.log(2023 - birthYear);
    console.log(this); // undefined（严格模式下）
    console.log(this); // window（正常模式下）
}
// calcAge(1998)

const calcAgeArrow = birthYear => {
    console.log(2023 - birthYear);
    console.log(this); // window（父作用域）
}
// calcAgeArrow(1995)

const may = {
    year: 1998,
    calcAge: function () {
        console.log(this); // may对象
        console.log(2023 - this.year); // 25
    },
    calcAgeArrow: () => {
        console.log(this); // window（父作用域）
    },
}
// may.calcAge()
// may.calcAgeArrow()

// this关键字是动态的
const amy = {
    year: 1995
}
amy.calcAge = may.calcAge;
amy.calcAge(); // this指向amy，因为此时是amy调用


const fn = may.calcAge;
fn(); // TypeError：无法读到未定义的属性（year）（严格模式下）
fn(); // 正常模式就是window和NaN


// P91、常规函数与箭头函数
'use strict';

// this关键字
// // var firstName = "Amy"; // var其实是给window创建属性
// const may = {
//     firstName: "May",
//     // greet: () => console.log(`Hey ${this.firstName}`), // Hey undefined （使用var创建变量之前）
//     // greet: () => {
//     //     console.log(this); // windew （箭头函数this指向父作用域）
//     //     console.log(`Hey ${this.firstName}`); // Hey Amy （使用var创建变量之前后）
//     // }
//     greet: function () {
//         console.log(this); // windew （箭头函数this指向父作用域）
//         console.log(`Hey ${this.firstName}`); // Hey Amy （使用var创建变量之前后）
//     }
// }
// may.greet()
// // console.log(this.firstName); // undefined （当我们从对象上访问一个不存在的属性时，不会报错，会返回undefined）
// 总结：尽量不使用箭头函数定义对象的方法

const may = {
    firstName: "May",
    year: 1998,
    calcAge: function () {
        // console.log(this);
        console.log(2023 - this.year); //25 谁调用calcAge方法，this指向谁

        // // 方法一：使用一个变量将this赋值
        // const self = this; // self/that/_this
        // const isMillenial = function () {
        //     // console.log(this); // undefined
        //     // console.log(this.year > 2000); // 无法读到未定义的属性（year）
        //     console.log(self); // may对象
        //     console.log(self.year > 2000); // false
        // }
        // 方法二：使用箭头函数this指向父作用域的特性
        const isMillenial = () => {
            // console.log(this); // undefined
            // console.log(this.year > 2000); // 无法读到未定义的属性（year）
            console.log(this); // may对象
            console.log(this.year > 2000); // false
        }

        isMillenial(); // 此时是作为常规函数调用的，所以this指向undefined（严格模式下）

    },
}
// may.calcAge()

// arguments关键字：想要一个函数接收比我们指定的函数更多参数时
// 表达式函数
const addExpr = function (a, b) {
    console.log(arguments); // Arguments对象（包含所有实参），一个伪数组，有length能使用for遍历
    return a + b;
}
addExpr(2, 3)
addExpr(2, 3, 4, 5)
// 箭头函数（ES6）
const addArrow = (a, b) => {
    // console.log(arguments); // ReferenceError：arguments参数没有定义
    return a + b;
}
addArrow(2, 3, 4, 5)


// P92、原始类型（基本类型）和引用类型
let age = 25;
let oldAge = age;
age = 28; // 修改原来的变量
console.log(age); // 28 （原来变量修改了）
console.log(oldAge); // 25 （新变量没有修改）

const me = {
    name: "May",
    age: 25
}
const friend = me; // 将me对象复制给friend
friend.age = 28; // 修改friend的age属性
console.log(friend); // 修改后的friend
console.log(me); // me也跟着变了
*/

// P93、实践中的原始类型（基本类型）和引用类型
'use strict';
// 原始类型
let lastName = "Brown";
let oldLastName = lastName;
lastName = "Green";
// console.log(lastName, oldLastName); // Green Brown

// 引用类型
const may = {
    firstName: "May",
    lastName: "Brown",
    age: 25
}
const marriedMay = may; // 改变堆里的东西与let和const声明无关
marriedMay.lastName = "Green"
// 内容被修改是因为两个变量都指向到堆中完全相同的内存地址，因为在堆中它们拥有相同的内存地址引用
// console.log("before marriage:", may); // {firstName: 'May', lastName: 'Green', age: 25}
// console.log("afer marriage:", marriedMay); // {firstName: 'May', lastName: 'Green', age: 25}  
// marriedMay = {}; // TypeError: 给常量变量赋值  （所以给变量marriedMay分配一个对象与简单的而更改属性完全不同）

// 复制对象
const may2 = {
    firstName: "May",
    lastName: "Brown",
    age: 25,
    family: ["Amy", "Tom"] // 深度嵌套对象
}
// 这里实际在堆里创建了一个新的对象并且mayCopy指向该对象，所以它引用了该新对象。但是没有将深度嵌套对象复制到新对象中
const mayCopy = Object.assign({}, may2); // 浅拷贝
mayCopy.lastName = "Green";
mayCopy.family.push("Mary");
mayCopy.family.push("Bob");
console.log("before marriage:", may2); // {firstName: 'May', lastName: 'Brown', age: 25, family: Array(4)}
console.log("afer marriage:", mayCopy); // {firstName: 'May', lastName: 'Brown', age: 25, family: Array(4)}

