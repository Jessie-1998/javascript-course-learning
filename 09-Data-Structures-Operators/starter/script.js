'use strict';

// Data needed for a later exercise
// const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  // thu: {open: 0, close: 24}
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  // fri: {open: 11, close: 23}
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
  // thu: {open: 12, close: 22}
  // [`day-${2 + 5}`]: {
  //   open: 0, // Open 24 hours
  //   close: 11 + 13,
  // },
  // day-7: {open: 12, close: 22}
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 增强对象文字 —— 当变量名和对象的属性名一样时可以使用
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // 收到对象立即解构，并且设置默认值
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(`订单来啦! "${this.starterMenu[starterIndex]}" 和 "${this.mainMenu[mainIndex]}"将在${time}送到${address}`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`这是你的美味意大利面有${ing1}、${ing2}和${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIngredient) {
    console.log(mainIngredient); // 蘑菇
    console.log(otherIngredient); // ['洋葱', '橄榄', '菠菜']
  },
};



// P117、字符串方法练习
// String Methods Practice
// 将给定字符串转为给定的格式
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// me：
// const rows = flights.split("+"); // 将字符串根据 "+" 转为数组
// // 循环数组
// for (const row of rows) {
//   // 数组元素再根据 ";" 转为数组并解构
//   let [first, second, thrid, fourth] = row.split(";");
//   // 第一个元素判断是否有 "Delayed" ,有的话 "_" 转为 " "并且在前面拼接一个 "🔴",没有直接 "_" 转为 " "
//   first = first.includes("Delayed") ? "🔴" + first.replaceAll("_", " ") : first.replaceAll("_", " ");
//   // 第二个参数提取前三个字母并且大写
//   second = second.slice(0, 3).toUpperCase();
//   // 第三个参数提取前三个字母并且大写
//   thrid = thrid.slice(0, 3).toUpperCase();
//   // 第四个元素将 ":" 转为 "h"
//   fourth = fourth.replace(":", "h");
//   // 然后将四个元素拼接成字符串
//   const output = `${first} from ${second} to ${thrid}(${fourth})`;
//   // 最后在字符串前面填充空格
//   console.log(output.padStart(45, " "));
// }

// teacher：
const rows = flights.split("+"); // 将字符串根据 "+" 转为数组
const dealStr = str => str.slice(0, 3).toUpperCase();
// 循环将字符串根据 "+" 转的数组
for (const row of flights.split("+")) {
  // 数组元素再根据 ";" 转为数组并解构
  let [type, from, to, time] = row.split(";");
  // 第一个元素判断是否以 "_Delayed" 开头,是的话为 "🔴" ,不是为 "" ,然后拼接上 "_"转 " "
  // 第二个元素提取前三个字母并且大写
  // 第三个元素提取前三个字母并且大写
  // 第四个元素将 ":" 转为 "h"
  // 然后将四个元素拼接成字符串
  const output = `${type.startsWith("_Delayed") ? "🔴" : ""}${type.replaceAll("_", " ")} ${dealStr(from)} ${dealStr(to)}(${time.replace(":", "h")})`;
  // 最后在字符串前面填充空格
  console.log(output.padStart(36, " "));
}

/*
// P116、编码挑战#4
// 编写一个程序，接收以underscore_case书写的变量名列表，并将其转换为camelCase（驼峰写法）。
// 输入将来自插入到DOM中的文本区域(参见下面的代码)，转换将在按下按钮时发生。

// 这个测试数据(粘贴到文本区域)
// underscore_case
//  first_name
// Some_Variable 
//   calculate_AGE
// delayed_departure

// 应该产生以下输出(5个单独的console.log输出)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// 提示1:记住哪个字符定义了文本区域😉中的新行
// 提示2:解决方案只需要适用于由两个单词组成的变量，比如a_b
// 提示3:开始时不要担心✅。只有在变量名转换工作之后才能解决这个问题😉
// 提示4:这个挑战是有目的的，所以开始看解决方案，以防你卡住了。然后暂停并继续!
// 然后，用您自己的测试数据进行测试!

// 祝你好运😀

// me：
// document.body.append(document.createElement('textarea')); // 在网页中添加一个文本域
// document.body.append(document.createElement('button')); // 在网页中添加一个按钮
// // 点击按钮触发点击事件
// document.querySelector('button').addEventListener("click", function () {
//   // 获取文本域内容
//   const text = document.querySelector('textarea').value;
//   dealStr(text);
// })
// const dealStr = function (text) {
//   // 如果输入为空就不做处理
//   if (!text) return;
//   // 先转为数组
//   let strs = text.split("\n")
//   // 然后循环
//   for (const [i, s] of strs.entries()) {
//     // 去掉空格
//     let str = s.trim();
//     // 将数组单个元素再转数组处理
//     const arr = str.split("_");
//     // 循环
//     for (let i = 0; i < arr.length; i++) {
//       // 将所有的都小写
//       arr[i] = arr[i].toLowerCase()
//       if (i) {
//         // 将第二个元素首字母大写
//         arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1)
//       }
//     }
//     // 将每个元素数组转回字符串
//     str = arr.join("");
//     // 拼接规则内容
//     str = str.padEnd(20, " ") + "✅".repeat(i + 1)
//     console.log(str);
//   }
// }

// teacher:
document.body.append(document.createElement('textarea')); // 在网页中添加一个文本域
document.body.append(document.createElement('button')); // 在网页中添加一个按钮
// 点击按钮触发点击事件
document.querySelector('button').addEventListener("click", function () {
  // 获取文本域内容
  const text = document.querySelector('textarea').value;
  // 如果输入为空就不做处理
  if (!text) return;
  // 将文本域内容根据换行转义符转为数组
  const rows = text.split("\n");
  // 循环键值对数组
  for (const [i, row] of rows.entries()) {
    // 使用解构row转为的数组(字符串要先去掉空格这样的特殊符号并且转为全部小写再转为数组)获取下划线前后的内容
    const [first, second] = row.trim().toLowerCase().split("_");
    // 拼接下划线前后的内容,后面的内容使用替换的方式将首字母大写
    const output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;
    // 最后填充空格满20个字符并且重复题中符号再将所有拼接打印
    console.log(`${output.padEnd(20, " ")}${'✅'.repeat(i + 1)}`);
  }
})


// P115、使用字符串-第3部分
// 字符串转数组——将字符串通过“+”分割成字符串
console.log("a+very+nice+string".split("+")); // (4) ['a', 'very', 'nice', 'string']
console.log("Jessie Green".split(" ")); // (2) ['Jessie', 'Green']

// 同理分割一个人的名字
const [firstName, lastName] = "Jessie Green".split(" ");
console.log(firstName, lastName); // Jessie Green
// 使用slice也可以实现，不过会很麻烦，句子太长可能弄不出来

// split & join
const newName = ["mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName); // mr. Jessie GREEN

// 将人名单词的首字母大写
const capitalizeName = function (name) {
  const names = name.split(" "); // 先将字符串根据空格转为数组
  let upperName = []; // 新建一个数组
  // 循环处理数组
  for (const n of names) {
    // 方法一：将数组元素首字母大写，并且拼接上除了首字母的字符，再放进新数组
    // upperName.push(n[0].toUpperCase() + n.slice(1));
    // 方法二：使用替换的方式,将数组元素首字母小写替换成大写
    upperName.push(n.replace(n[0], n[0].toUpperCase()));
  }
  // 最后数组转为字符串并且使用空格分开
  console.log(upperName.join(" "));
};
capitalizeName("jessica ann smith davis"); // Jessica Ann Smith Davis
capitalizeName("jessie green"); // Jessie Green

// 填充字符串
const message = "我像只鱼儿在你的荷塘";
console.log(message.padStart(20, "+").padEnd(30, "+")); // ++++++++++我像只鱼儿在你的荷塘++++++++++
console.log("只为和你守候那皎白月光".padStart(20, "+").padEnd(30, "+")); // +++++++++ 只为和你守候那皎白月光++++++++++

// 举一个栗子：银行卡只显示后四位
const maskCreditCard = function (number) {
  // 将数字转字符串
  const str = number + "";
  // 获取后四位然后使用星号将前面填充完整
  return str.slice(-4).padStart(str.length, "*")
}
console.log(maskCreditCard(64637836)); // **** 7836
console.log(maskCreditCard(64637836789786887)); // ************* 6890
console.log(maskCreditCard("64637836789786887678686")); // ******************* 8686

// 再举一个栗子：手机号中间四位隐藏
const maskCreditNumber = function (number) {
  // 将数字转字符串
  const str = number + "";
  // 先获取前三位,然后拼接星号,在获取后四位
  return str.slice(0, 3).padEnd(str.length - 4, "*") + str.slice(-4);
}
console.log(maskCreditNumber(15635567890)); // 156 **** 7890
console.log(maskCreditNumber("13773278997")); // 137 **** 8997

// 重复：字符串重复方法
console.log("在小小的花园里面" + "挖呀".repeat(4)); // 在小小的花园里面挖呀挖呀挖呀挖呀

const planesInline = function (n) {
  console.log(`这里有${n}架飞机等待起飞：${'🛫'.repeat(n)}`);
}
planesInline(3); // 这里有3架飞机等待起飞：🛫🛫🛫
planesInline(6); // 这里有6架飞机等待起飞：🛫🛫🛫🛫🛫🛫
planesInline(15); // 这里有15架飞机等待起飞：🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫


// P114、使用字符串-第2部分
const airline = "TAP Air Portugal";
// 不需要任何参数
console.log(airline.toLowerCase()); // tap air portugal —— 转小写
console.log(airline.toUpperCase()); // TAP AIR PORTUGAL —— 转大写

// 将大明的英文名修改标准: Daming
const beforeName = "DaMiNG";
const lowerName = beforeName.toLowerCase(); // 第一步将单词转为小写
const correctName = lowerName[0].toUpperCase() + lowerName.slice(1); // 然后将首字母大写，获取首字母之后的字符串，拼接在一起
console.log(correctName); // Daming

// 举一个栗子: 检查用户输入的邮件 —— 比较邮件
const email = "hello@may.io";
const loginEmail = "   Hello@may.Io \n";
// const lowerEmail = loginEmail.toLowerCase(); // 字母转小写
// const trimEmail = lowerEmail.trim(); // 去掉空格和转义字符
// console.log(trimEmail); // hello@may.io
const correctEmail = loginEmail.toLowerCase().trim(); // 可以链式调用方法
console.log(email === correctEmail); // true ——对比正确的邮件地址一模一样

// 替换
// 单个字符替换
const priceGB = "888,88￡"; // 欧洲货币表示方式
const priceUS = priceGB.replace(',', '.').replace('￡', '$'); // 美国货币表示方式
console.log(priceUS); // 888.88$
// 多个字符替换
const noice = "All passengers come to boarding door 23. Boarding door 23!";
// 使用单个字符的方式不行
// console.log(noice.replace("door", "gate")); // All passengers come to boarding gate 23. Boarding door 23!
// 可以使用新的方法
console.log(noice.replaceAll("door", "gate")); // All passengers come to boarding gate 23. Boarding gate 23!
// 也可使用正则表达式 ,g代表全局，就是所有对应的字符
console.log(noice.replace(/door/g, "gate")); // All passengers come to boarding gate 23. Boarding gate 23!

// 判断
const plane = "A320neo";
// 字符串中是否包含给定子字符串
console.log(plane.includes("320")); // true
console.log(plane.includes("Boeing")); // false
// 字符串中是否以给定子字符串开头
console.log(plane.startsWith("Air")); // false
console.log(plane.startsWith("A")); // true
// 以“A”开头，以“neo”结尾打印
if (plane.startsWith("A") && plane.endsWith("neo")) {
  console.log("是我要搭的飞机"); // 是我要搭的飞机
}

// 练习: 检查某个乘客的行李是否被允许托运，是否被允许上飞机, 携带 knife 和 gun 不允许上飞机
const checkBaggage = function (item) {
  const baggage = item.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("你不准上飞机！");
  } else {
    console.log("欢迎光临！");
  }
}

checkBaggage('I have a laptop, some Food and a pocket Knife'); // 你不准上飞机！
checkBaggage('Socks and camera'); // 欢迎光临！
checkBaggage('Got some snacks and a gun for protection'); // 你不准上飞机！


// P113、使用字符串-第1部分
const airline = "TAP Air Portugal";
const plane = "A320";

// 获取字符串某个位置的字符
console.log(plane[0]); // A
console.log(plane[1]); // 3
console.log(plane[2]); // 2
console.log("C786"[0]); // C

// 获取字符串的长度
console.log(plane.length); // 4
console.log("C786".length); // 4

// 字符串方法（字符串方法和数组方法很类似）
// 获取某个字符的索引（同样从0开始），查找不到返回-1，区分大小写
console.log(airline.indexOf('r')); // 6 ——获取从左到右第一个出现字符的下标
console.log(airline.lastIndexOf('r')); // 6 ——获取从右到左第一个出现字符的下标
console.log(airline.lastIndexOf('Air')); // 4 ——获取从右到左第一个出现字符串（单词）的下标
console.log(airline.lastIndexOf('air')); // -1 ——获取从右到左第一个出现子字符串（单词）的下标，没获取到返回-1

// 用例是使用slice方法提取部分的字符串切片需要索引作为参数，并且不会改变元字符串
console.log(airline.slice(4)); // Air Portugal 4为开始参数 从第四截取到字符串最后
console.log(airline.slice(4, 7)); // Air 4为开始参数 7为结束参数，截取索引第四到第七的子字符串  Air的长度是结束参数减去开始参数

// 首先找出部分字符串的索引，然后提取它
// 获取第一个单词
console.log(airline.slice(0, airline.indexOf(" "))); // TAP
// 获取最后一个单词
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // Portugal，为什么要+1呢，因为lastIndexOf查找的是空格，而需要从最后一个空格后面开始

// 可以定义一个负数作为开始参数
console.log(airline.slice(-3)); // gal 将从最后开始计数，-1为倒数第一个
console.log(airline.slice(1, -1)); // AP Air Portuga  将截取下标为1到下标倒数第2个

// 判断是否在中间位置
const checkMiddleSeat = function (seat) {
  // 小型飞机六座，左三右三
  // B 和 E 是中间座位
  const s = seat.slice(-1); // 获取最后一个子字符
  if (s === "B" || s === "E") console.log("你在中间位置🤡");
  else console.log("你是幸运的🤓");
}
checkMiddleSeat("11B"); // 你在中间位置🤡
checkMiddleSeat("25C"); // 你是幸运的🤓
checkMiddleSeat("5E"); // 你在中间位置🤡

console.log(new String("Mark")); // String {'Mark'}
console.log(typeof new String("Mark")); // object
console.log(new String("Mark").slice(1)); // ark
console.log(typeof new String("Mark").slice(1)); // string


// P112、编程挑战#3
// Coding Challenge #3

// 让我们继续我们的足球博彩应用程序!
// Let's continue with our football betting app! 
// 这一次，我们有一个Map数据结构，上面记录了游戏中发生的事件。 
// This time, we have a map with a log of the events that happened during the game. 
// 值是事件本身，键是每个事件发生的分钟数(足球比赛有90分钟加上一些额外的时间)。
// The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽️ GOAL

// GOOD LUCK 😀
// 祝你好运😀


const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1. 创建一个包含不同游戏事件的“事件”数组(不能重复)
const events = [...new Set(gameEvents.values())];
// gameEvents.values()获取Map的值，
// Set创建唯一值数据结构，
// 最后使用扩展运算符（展开操作符）解包成数组
console.log(events); // (4) ['⚽️ GOAL', '🔁 Substitution', '🔶 Yellow card', '🔴 Red card']

// 2. 比赛结束后，裁判发现第64分钟的黄牌是不公平的。 所以从游戏事件日志中删除这个事件。
gameEvents.delete(64); // 调用delete()方法
console.log(gameEvents);

// 3. 将以下字符串打印到控制台:“An event happened, on average, every 9 minutes”(保持一场比赛有90分钟)
// Me：
// console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`); // 计算在这90分钟之内平均多少分钟发生一个事件，就是90除以时间个数
// Teacher：
const time = [...gameEvents.keys()].pop();
// 使用gameEvents.keys()获取到key值，
// 使用扩展运算符解包成数组，
// 然后使用数组方法pop删除数组最后一个元素并且得到删除的元素
// console.log(time);
console.log(`An event happened, on average, every ${time / gameEvents.size} minutes`); // 计算在这90分钟之内平均多少分钟发生一个事件，就是90除以时间个数

// 4. 循环遍历事件并将其记录到控制台上，标记它是在游戏的上半场还是下半场(45分钟后)，如下所示:
// [上半场]17:⚽️进球
// Me：
// for (const [key, value] of gameEvents) {
//   if (key < 45) {
//     console.log(`[FIRST HALF] ${key}: ${value}`);
//   } else if (key > 45) {
//     console.log(`[SECOND HALF] ${key}: ${value}`);
//   }
// }
// Teacher：
for (const [min, event] of gameEvents) {
  const helf = min <= 45 ? "FIRST" : "SECOND"; // 时间（分钟）小于等于45就是上半场（FIRST），否则是下半场（SECOND）
  console.log(`[${helf} HALF] ${min}: ${event}`); // 控制台打印例如：[FIRST HALF] 17: ⚽️ GOAL
}


// P110、Maps_迭代
// 二维数组创建Map
const question = new Map([
  ["问题", "什么编程语言是世界上最棒的？"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["回答", 3],
  [true, "正确🌺"],
  [false, "再猜"]
])
console.log(question); // {'问题' => '什么编程语言是世界上最棒的？', 1 => 'C', 2 => 'Java', 3 => 'JavaScript', '回答' => 3, …}

// 对象转Map（提示：entries）——创建Map小技巧
console.log(Object.entries(openingHours)); // [Array(2), Array(2), Array(2)]
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap); // Map(3) {'thu' => {…}, 'fri' => {…}, 'sat' => {…}}

// 测试
console.log(question.get("问题")); // 什么编程语言是世界上最棒的？
// Map遍历（数组解构重组）
for (const [key, value] of question) {
  // 只打印想要的数据，比如 key 为 Number 的
  if (typeof key === "number") console.log(`答案${key}：${value}`);
  // 答案1：C
  // 答案2：Java
  // 答案3：JavaScript
}
// let answer = Number(prompt("你的答案呢？"));
let answer = 3;
console.log(answer);
console.log(question.get(answer === question.get('回答'))); // 输入3才返回正确🌺否则都是再猜

// Map转对象——使用数组扩展运算符
console.log([...question]); // 二维数组：[['问题', '什么编程语言是世界上最棒的？'],…]
// Map也可使用数组的新方法：entries，keys，values，都可以使用数组扩展运算符转成数组
// console.log([...question.entries()]); // 和 [...question] 一样
// key数组
console.log([...question.keys()]); // (7) ['问题', 1, 2, 3, '回答', true, false]
// value数组
console.log([...question.values()]); // (7) ['什么编程语言是世界上最棒的？', 'C', 'Java', 'JavaScript', 3, '正确🌺', '再猜']


// P109、Maps_基本原理
// 使用构造函数创建一个Map
const rest = new Map(); // 最好是一个空的Map
// 添加一个新元素到数据结构中：可以使用任何想要的数据类型
rest.set("name", "Amy");
rest.set(1, "Sichuan China");
// 使用set方法不但更新Map，也返回Map
console.log(rest.set(2, "Mianyang")); // Map(3) {'name' => 'Amy', 1 => 'Sichuan China', 2 => 'Mianyang'}
// set也可以链式调用
rest.set("mainMenu", ['Pizza', 'Pasta', 'Risotto'])
  .set('open', 11)
  .set("close", 23)
  .set(true, "开门:D")
  .set(false, "打烊:(");
// 可以调用get方法从Map读取数据
console.log(rest.get(1)); // Sichuan China
console.log(rest.get(true)); // 真的
console.log(rest.get("true")); // undefined

// 小栗子：
const time = 24;
const status = rest.get(time > rest.get('open') && time < rest.get('close'));
console.log(status); // 打烊:(

// 检查Map是否包含某个键
console.log(rest.has("mainMenu")); // true
// 从Map中删除元素——基于键名
rest.delete(2)
console.log(rest); // Map中无 2 及映射
// size属性获取Map元素个数
console.log(rest.size); // 7
// clear删除Map中的所有元素
rest.clear()
console.log(rest); // Map(0) {size: 0}
// 可以用数组或者对象作用键名，但是需要注意js底层工作方式，键名是否为一个对象
// 错误演示
rest.set([1, 2], "Array")
console.log(rest.get([1, 2])); // undefined
// 正确演示
let arr = [1, 2];
rest.set(arr, "Array")
console.log(rest.get(arr)); // Array
// 还可以用元素对象来作为map的键名
rest.set(document.querySelector("h1"), "heading");
// 将鼠标移到 h1 key上，页面元素会显示高光
console.log(rest); // Map(3) {Array(2) => 'Array', Array(2) => 'Array', h1 => 'heading'}


// P108、Sets——集合中的值是唯一的
const playerSet = new Set(["Amy", "Bob", "Bob", "Tom", "Bob", "May"]);
// 顺序与集合中的元素无关
console.log(playerSet); // Set(4) {'Amy', 'Bob', 'Tom', 'May'}
// 字符串也可以迭代的
console.log(new Set("Jessie")); // Set(4) {'J', 'e', 's', 'i'}
// 集合的数量——集合使用size，数组使用length
console.log(playerSet.size); // 4
// 检查某个元素是否在集合中
console.log(playerSet.has("May")); // true
console.log(playerSet.has("Linda")); // false
// 将新元素添加到集合中
playerSet.add("John");
playerSet.add("John"); // 被忽略了
console.log(playerSet); // Set(5) {'Amy', 'Bob', 'Tom', 'May', 'John'}
// 删除集合元素
// playerSet.delete("Bob")
// console.log(playerSet); // Set(5) {'Amy', 'Tom', 'May', 'John'}
// 删除所有元素
// playerSet.clear()
// console.log(playerSet); // Set(0) {size: 0}
// 遍历集合
for (const player of playerSet) {
  console.log(player);
  // Amy
  // Bob
  // Tom
  // May
  // John
}

// 集合的主要用例是删除数组的重复值——去重
const numArr = [12, 13, 12, 34, 23, 12, 32, 12];
console.log(numArr); // [12, 13, 12, 34, 23, 12, 32, 12]
const newNumber = [...new Set(numArr)]; // 因为集合可迭代，所以也可以使用扩展运算符转成数组
console.log(newNumber); // [12, 13, 34, 23, 32]
console.log(new Set("zhangdaming")); // Set(8) {"z","h","a","n","g","d","m","i"}


// P107、编程挑战#2
// 让我们继续我们的足球博彩应用程序!

// 1. 循环game.scored数组，并将每个球员的名字连同进球号码打印到控制台(例如:“Goal 1: Lewandowski”)
// 2. 使用循环计算平均奇数并将其记录到控制台(我们已经学习了如何计算平均值，如果您不记得，可以去检查)。
// 3. 将3个概率打印到控制台，但是以一种很好的格式打印，就像这样:
// Bayern Munich的胜率:拜仁:1.33
// 平局:3.25
// Borrussia Dortmund的胜率:6.5
// 直接从游戏对象中获取团队名称，不要硬编码它们(除了“平局”)。提示:注意概率和游戏对象如何具有相同的属性名称😉

// 附加:创建一个名为“scorers”的对象，其中包含得分的球员的名字作为属性，以及进球的数量作为值。在这个游戏中，它看起来是这样的:
// {
//   Gnarby: 1,
//   Hummels: 1,
//   Lewandowski: 2
// }

// 祝你好运😀
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
// 1.循环game.scored数组，并将每个球员的名字连同进球号码打印到控制台(例如:“Goal 1: Lewandowski”)
// me:
// for (const [goal, player] of Object.entries(game.scored)) {
//   console.log(goal, player);
//   console.log(`Goal ${+goal + 1}: ${player}`);
// }
// teacher:
// 需要数组的key和value，用数组方法：Array.prototype.entries()
for (const [i, player] of game.scored.entries()) {
  // console.log(i, player);
  console.log(`Goal ${+i + 1}: ${player}`);
}

// 2.使用循环计算平均奇数并将其记录到控制台(我们已经学习了如何计算平均值，如果您不记得，可以去检查)。
// me:完全没有理解题意
// let players = [];
// let sum = 0;
// for (const player of game.scored) {
//   sum++
//   if (players.findIndex((element) => element === player) != -1) {
//     continue;
//   }
//   players.push(player)
// }
// console.log(sum / players.length);
// teacher:老师写完自己重新写一次
// 获取分数的平均分，只关心value即可
const odds = Object.values(game.odds); // 循环games.odds
let avg = 0;
for (const odd of odds) avg += odd;
avg /= odds.length; // 平均分等于总分除以个数
console.log(avg); // 3.6933333333333334

// 3.将3个概率打印到控制台，但是以一种很好的格式打印，就像这样:
// Bayern Munich的胜率:拜仁:1.33
// 平局:3.25
// Borrussia Dortmund的胜率:6.5
// 直接从游戏对象中获取团队名称，不要硬编码它们(除了“平局”)。提示:注意概率和游戏对象如何具有相同的属性名称😉
// me:
// for (const [key, value] of Object.entries(game.odds)) {
//   console.log(game[key], value);
//   console.log(`${game?.[key] ?? "平局"}的概率：${value}`);
// }
// teacher:
// 既要队伍名字又要分数，使用对象方法Object.entries()
for (const [team, odd] of Object.entries(game.odds)) {
  // console.log(team, odd);
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`
  console.log(`Odd of ${teamStr}：${odd}`);
  // Odd of victory Bayern Munich: 1.33
  // Odd of draw: 3.25
  // Odd of victory Borrussia Dortmund: 6.5
}

// 附加:创建一个名为“scorers”的对象，其中包含得分的球员的名字作为属性，以及进球的数量作为值。在这个游戏中，它看起来是这样的:
// {
//   Gnarby: 1,
//   Hummels: 1,
//   Lewandowski: 2
// }
// me:
// let scorers = new Object()
// for (const player of game.scored) {
//   // console.log(player);
//   if (scorers?.[player]) {
//     scorers[player]++
//     continue;
//   }
//   scorers[player] = 1;
// }
// teacher:
// 循环数组，只需要value，可能有的人进多个球，这种情况需要自加
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : scorers[player] = 1;
}
console.log(scorers);


// P106、循环对象_对象键、值和项
// 循环对象属性名
const keys = Object.keys(openingHours); // 获取对象key值
// console.log(keys); // ['thu', 'fri', 'sat']
let open = `我们营业${keys.length}天，分别是：`
for (const day of keys) {
  open += `${day} `
}
// console.log(open); // 我们营业3天，分别是：thu fri sat 

// 对象属性值
const values = Object.values(openingHours);
console.log(values); // [{open: 12, close: 22},{open: 11, close: 23},{open: 0, close: 24}]

// 遍历整个对象并且获取key和value
const entries = Object.entries(openingHours)
// console.log(entries); // [["thu",{open: 12, close: 22}],...]
// 数组结构 + 对象结构
for (const [day, { open, close }] of entries) {
  console.log(`${day}，我们在${open}点营业，在${close}点打烊`);
  // thu，我们在12点营业，在22点打烊
  // fri，我们在11点营业，在23点打烊
  // sat，我们在0点营业，在24点打烊
}


// P105、可选链运算符（?.）
// 在不知道是否有星期一的属性下获取星期一——判断对象某个属性是否存储
// console.log(restaurant.openingHours.mon.open); // TypeError:无法读取未定义的属性(读取'open')
// 之前的方法
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open); // 此时不打印，因为没有mon属性
}
// ES2020 可选链运算符：在引用为空 (nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined
// console.log(restaurant.openingHours.mon?.open); // 因为没有mon属性会立即返回 undefined
// console.log(restaurant.openingHours?.mon?.open); // 还可以判断openingHours是否存在

// 举例：打印到控制台，餐厅每天关门还是开门
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  // console.log(day);
  // 判断某一天在对象中是否存在，存在返回开店时间，不存在返回undefined，，又有空值运算符会closeed
  const open = restaurant.openingHours[day]?.open ?? 'closeed'; // 可选链接运算符 & 空值运算符
  console.log(`On ${day},we open at ${open}`);
  // On mon,we open at closeed
  // On tue,we open at closeed
  // On wed,we open at closeed
  // On thu,we open at 12
  // On fri,we open at 11
  // On sat,we open at 0
  // On sun,we open at closeed
}

// 关于方法——判断方法是否存在
console.log(restaurant.order?.(1, 2) ?? "方法不存在"); // ['Bruschetta', 'Risotto']
console.log(restaurant.orderRisotto?.(1, 2) ?? "方法不存在"); // 方法不存在

// 关于数组——判断数组是否为空
let users = [{ name: "Amy", email: "hello@Amy.io" }]; // 模拟数组
// users = []; // 打印之后必定为 ”方法不存在“
// 以前的方法——代码太繁琐了
if (users.length) console.log(users[0].name);
else console.log("数组为空"); // Amy
// 现代方法——一句代码搞定
console.log(users[0]?.name ?? "数组为空"); // Amy


// P104、增强对象字面量
console.log(restaurant);

// P103、循环数组——for-of循环
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);
for (const item of menu) console.log(item); // 打印数组每个元素,但是没有索引
// 补充:
// for (const item of menu.entries()) { // menu.entries() ——一个迭代器
//   console.log(item); // 因为item是一个数组可以使用数组解构得到索引和当前项
// }
for (const [i, el] of menu.entries()) {
  console.log(i, el); // 因为item是一个数组可以使用数组解构得到索引和当前项
}


// 编码挑战 #1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. 为每支球队创建一个球员数组(变量'players1'和'players2')
// me:
// const players1 = game.players[0];
// const players2 = game.players[1];

// teacher：
const [players1, players2] = game.players; // 数组解构
console.log("1.", players1, players2);

// 2. 任何球员阵中的第一个球员是守门员，其他球员是场上球员。对于拜仁慕尼黑(球队1)，创建一个包含守门员姓名的变量('gk')和一个包含所有剩余10名场上球员的数组('fieldPlayers')
// me：
// const gk = players1.shift();
// const fieldPlayers = players1;
// teacher:
const [gk, ...fieldPlayers] = players1; // 数组解构 + 剩余参数
console.log("2.", gk, fieldPlayers);

// 3.创建一个数组'allPlayers'，包含两队的所有球员(22名球员)
const allPlayers = [...players1, ...players2]; // 数组扩展运算符
console.log("3.", allPlayers);

// 4. 在比赛中，拜仁慕尼黑(一队)使用了3名替补球员。因此，创建一个新的数组('players1Final')，包含所有最初的team1球员加上'Thiago'，'Coutinho'和'Perisic'。
// me:
// const players1Final = [gk, ...fieldPlayers];
// players1Final.push('Thiago', 'Coutinho', 'Perisic');
// teacher:
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']; // 扩展运算符合并数组
console.log("4.", players1Final);

// 5. 基于游戏。Odds对象，为每个奇数创建一个变量(称为'team1'， 'draw'和'team2')
// me:
// const { team1, x: draw, team2 } = game.odds;
// teacher:
const { odds: { team1, x: draw, team2 } } = game; // 对象解构 : 嵌套对象 + 重命名方式
console.log("5.", team1, draw, team2);

// 6. 编写一个函数('printGoals')，接收任意数量的球员名字(不是数组)，并将每个名字连同得分的总数(传入的球员名字的数量)一起打印到控制台。
// 6人测试数据:使用球员'Davies', 'Muller', 'Lewandowski' and 'Kimmich'。然后，使用game. scores中的玩家再次调用该函数
// me:
// const printGoals = function (...names) {
//   console.log("6.", names, names.length);
// }
// printGoals(...game.scored, 'Davies', 'Muller', 'Lewandowski', 'Kimmich');
// teacher:
const printGoals = function (...player) {
  console.log(player);
  console.log(`共${player.length}个进球`);
}
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');
printGoals(...game.scored); // 扩展运算符

// 7. 奇数较低的队伍更有可能获胜。在不使用if/else语句或三元操作符的情况下，将哪个队更有可能获胜打印到控制台。
// me:
// console.log("7.", team1 < team2 && game.team1);
// teacher:
team1 < team2 && console.log(`${game.team1} 更有可能获胜`); // 逻辑AND运算,前面为真返回后面的
team1 > team2 && console.log(`${game.team2} 更有可能获胜`); // 逻辑AND运算,前面为真返回后面的


// P101、逻辑赋值运算符
const rest1 = {
  name: "Capri",
  // numGuests: 20,
  numGuests: 0,
}
const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi"
}

// 逻辑或（OR）赋值运算符
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// 如果rest1.numGuests 为0，rest1.numGuests ||= 10答案为0，因为0是假值
// rest1.numGuests ||= 10; // 20
// rest2.numGuests ||= 10; // 10

// 逻辑空赋值运算符，只包括null和undefined，不包括0和''
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// 逻辑或（OR）赋值运算符
// 如果rest1.owner 为没有，rest1.owner = rest1.owner && '<ANONYMOUS>'答案为 {name: 'Capri', numGuests: 0, owner: undefined}
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
// 使用下面的逻辑就不会出现 {name: 'Capri', numGuests: 0, owner: undefined}了
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
console.log(rest1); // 0
console.log(rest2); // 10


// P100、空值合并运算符（??）
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); // 10
// 空值指的是null和undefined，而不是0或""
const guestsCorrent = restaurant.numGuests ?? 10;
console.log(guestsCorrent); // 0


// P99、短路（&& 和 || ）
console.log("------------OR------------");
console.log(3 || "Amy"); // 3
console.log("" || "Amy"); // Amy
console.log(true || 0); // true
console.log(undefined || null); // null
console.log(undefined || "" || "Hello" || 23 || null); // "Hello"

restaurant.numGuests = 34;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 34

const guests2 = restaurant.numGuests || 10;
console.log(guests2); // 34

console.log("------------AND------------");
console.log(0 && "Amy"); // 0
console.log(7 && "Amy"); // "Amy"
console.log(7 && "Amy" && null && "Hello"); // null

if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinachs");
  // mushrooms
  // ['spinachs']
}
restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinachs");
// mushrooms
// ['spinachs']


// P98、Rest模式和剩余参数
// 1） 解构
// 展开，因为在赋值运算符的右侧
const arr = [1, 2, ...[3, 4]];
// rest参数，在赋值运算符左侧
const [a, b, ...others] = [1, 2, 3, 4];
// console.log(a, b, others); // 1 2 [3, 4]

// rest模式不包含任何跳过的元素，rest参数也只能是数组最后一个
const [pizza, , risotto, ...othersFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(pizza, risotto, othersFood); // Pizza Risotto ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// 对象
// 剩余元素会被收集到一个新的对象中
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // {thu: {…}, fri: {…}}

// 2）函数：传递多个参数同时进入一个函数
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
}
// add(2, 3); // 5
// add(2, 3, 4, 5, 6); // 20
// add(9, 8, 7, 6, 5, 4, 3); // 42

// （使用扩展运算符将数组元素单个传入）
const x = [12, 3, 4];
// add(...x); // 19

// 披萨的成分
restaurant.orderPizza("蘑菇", "洋葱", "橄榄", "菠菜")


// P97、扩展运算符(…)
const arr = [5, 6, 7];
const badNewArr = [1, 2, 3, arr[0], arr[1], arr[2]];
// console.log(badNewArr); // [1, 2, 3, 5, 6, 7]

// 第一种情况将一个数组的元素全部放进弄一个数组
const newArr = [1, 2, 3, ...arr]; // 从arr取出所有的值然后分别写出来。
// console.log(newArr); // [1, 2, 3, 5, 6, 7]
const newMenu = [...restaurant.mainMenu, "Gnocci"]
// console.log(newMenu);  // ['Pizza', 'Pasta', 'Risotto', 'Gnocci']

// 第二个情况将参数传递给函数时
// console.log(...newArr); // 1 2 3 5 6 7
// console.log(1, 2, 3, 5, 6, 7); // 1 2 3 5 6 7

// 数组浅拷贝
const mainMenuCopy = [...restaurant.mainMenu]
// console.log(mainMenuCopy); //  ['Pizza', 'Pasta', 'Risotto']
// 合并数组
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]
// console.log(menu); // ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad', 'Pizza', 'Pasta', 'Risotto']

// JavaScript中的可迭代对象是所有数组、字符串、映射或集合之类的东西，但对象不是。
const str = "Brown";
const letters = [...str, "", "G."];
// console.log(letters); // ['B', 'r', 'o', 'w', 'n', '', 'G.']
// console.log(...str); // B r o w n
// console.log(`${...str}`); // 这里不能使用扩展运算符

// 函数参数——将数组元素分别传入
// const ingredients = [
//   prompt("让我们一起做意大利面吧，成分1？"),
//   prompt("成分2？"),
//   prompt("成分3？")
// ];
// console.log(ingredients);
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

// 对象扩展运算符——浅拷贝
const newRestautant = { foundedIn: 1998, ...restaurant, founder: "Guiseppe" };
console.log(newRestautant);
// 使用浅拷贝，然后修改新对象的某个属性，查看原对象是否也修改了——没有修改
const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy.name); // Ristorante Roma
console.log(restaurant.name); // Classico Italiano


// P96、解构对象
// 将对象作为参数传给函数（全部属性都有）
restaurant.orderDelivery({
  time: "22:30",
  address: "清水路宛一组团",
  starterIndex: 2,
  mainIndex: 2
}); // 订单来啦! "Garlic Bread" 和 "Garlic Bread"将在22:30送到清水路宛一组团

// 将对象作为参数传给函数（部分属性）
restaurant.orderDelivery({
  address: "清水路宛一组团",
  starterIndex: 1,
}); // 订单来啦! "Bruschetta" 和 "Pizza"将在20:00送到清水路宛一组团

// 默认方式
const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories); // Classico Italiano {thu: {…}, fri: {…}, sat: {…}} ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']
// 重命名方式
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
// console.log(restaurantName, hours, tags); // Classico Italiano {thu: {…}, fri: {…}, sat: {…}} ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']
// 设置默认值方式
const { menu = [], starterMenu: starter = [] } = restaurant;
// console.log(menu, starter); // [] ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']
// 改变变量
let a = 1;
let b = 2;
const obj = { a: 12, b: 13, c: 14 };
({ a, b } = obj); // 解构赋值需要将整个代码块用小括号包起来，不然会报错
// console.log(a, b); // 12 13
// 嵌套对象
// const { fri } = openingHours;
// console.log(fri); // {open: 11, close: 23}
// const { fri: { open, close } } = openingHours;
// console.log(open, close); // 11 23
// const { fri: { open: o, close: c } } = openingHours;
// console.log(o, c); // 11 23


// P95、解构数组
const arr = [1, 2, 3];
const a = arr[0];
const b = arr[1];
const c = arr[2];
const [x, y, z] = arr;
// console.log(x, y, z);

// // 取出第一个和第二个数组元素
// const [first, second] = restaurant.categories;
// console.log(first, second); // Italian Pizzeria

// // 取出第一个和第三个数组元素
// const [first, , third] = restaurant.categories;
// console.log(first, third); // Italian Vegetarian

// 取出第一个和第三个数组元素，并且切换这两个变量
let [main, , secondary] = restaurant.categories;
// console.log(main, secondary); // Italian Vegetarian

// 切换变量
// // 方案一：新建一个临时变量来存
// let temp = main;
// main = secondary;
// secondary = temp
// console.log(main, secondary); // Vegetarian Italian

// 方案二：解构
[main, secondary] = [secondary, main];
// console.log(main, secondary); // Vegetarian Italian

// 接收一个函数的两个值
const [starter, mainCourse] = restaurant.order(2, 0); // ['Garlic Bread', 'Focaccia']
// console.log(starter, mainCourse); // Garlic Bread Focaccia

// 嵌套解构
const nested = [1, 2, [3, 4]];
// const [i, , j] = nested;
// console.log(i, j); // 1 [3, 4]
const [i, , [j, k]] = nested;
console.log(i, j, k); // 1 3 4

// 默认值
const [p = 1, q = 8, r = 7] = [8, 9];
console.log(p, q, r); // 8 9 7
*/






