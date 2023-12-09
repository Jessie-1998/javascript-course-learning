// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/*
// 使用Google、StackOverflow和MDN
const temperatures = ["error", 3, -2, -6, -1, 9, 13, 17, 15, 14, 9, 5];
// 计算温度振幅是最大温度减最小温度
// 先找到最大值，再找到最小值，然后相减
// 提示，算数计算必须都是number
const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== "number") continue;
    if (temps[i] > max) max = temps[i];
    if (temps[i] < min) min = temps[i];
  }
  console.log(max, min);
  return max - min;
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);
// 以上的程序不允许字符串在第一个，如果在第一个就会出问题
const calcTempAmplitude = function (t1, t2) {
  const temps = t1.concat(t2);
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== "number") continue;
    if (temps[i] > max) max = temps[i];
    if (temps[i] < min) min = temps[i];
  }
  console.log(max, min);
  return max - min;
};

const amplitude = calcTempAmplitude([2, 3, 4, 5], [32, 3, -4]);
console.log(amplitude);


// 使用控制台和断点进行调试
// 使用控制台
const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    // C.fix
    // value: Number(prompt("多少度：")),
    value: 10,
  };
  // B.find
  console.table(measurement);
  const kelvin = measurement.value + 273;
  return kelvin;
};
// A.identify
console.log(measureKelvin());
*/

// 编码挑战1
// 1、首先要明白问题

let temps = [17, 21, 23];
// temps = [12, 5, -5, 0, 4];
const printForecast = function (arr) {
  let str = "...";
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}ºC in ${i + 1} days...`;
  }
  return str;
};
const string = printForecast(temps);
console.log(string);
