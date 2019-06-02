// js type

function annotate(commentary) {
   console.log(commentary);
}

let primitiveStr = 'primitive variable string',
    referenceObj = {description: 'reference object'};
const CONST_STRING = 'const string';

// primitive values -- Immutability
// null, undefined, true/false, NaN/-Infinity/+Infinity, 'string', Symbol
primitiveStr.substr(1);
primitiveStr.toLowerCase(1);
primitiveStr[0] = 1;
console.log(primitiveStr);  // primitive variable string

// reference value
// {}, function() {}, []
let obj1 = {name: 'reference'},
   obj2 = {age: 18},
   obj3 = function() {},
   obj4 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// copy
let primitiveStr2 = primitiveStr;
primitiveStr2 = 'new string';
console.log(primitiveStr); // primitive variable string

let referenceObj2 = referenceObj;
referenceObj2.name = 'new string';
console.log(referenceObj2.name); // new string

// compare -- ===
let primitiveStr3 = 'new string';
console.log(primitiveStr === primitiveStr3); // true

let referenceObj3 = {description: 'new reference object'}
console.log(referenceObj === referenceObj3); // false

// ECMAScript中所有的函数的参数都是按值传递的
annotate('ECMAScript中所有的函数的参数都是按值传递的');
function changeValue(name){
  name = 'new value';
}
changeValue(primitiveStr);
console.log(primitiveStr); // primitive variable string

changeValue(referenceObj);
console.log(referenceObj.name); // new value

function changeValue2(obj){
  obj.name = 'new value';
  obj = {name: 'new object value'};
}
changeValue2(referenceObj);
console.log(referenceObj.name); // new value

annotate('null -> 0; undefined -> NaN');

// -----------------------------------------------------------------------
// Symbol
let sym1 = Symbol();
let sym2 = Symbol('Symbol');
let sym3 = Symbol('Symbol');
let sym4 = Symbol({name:'Symbol'});
console.log(sym2 === sym3);  // false

// Uncaught TypeError: Cannot convert a Symbol value to a number
sym1 + 123

// Symbol.for
let sym5 = Symbol.for('Symbol');
let sym6 = Symbol.for('Symbol');
console.log(sym5 === sym6); // true

// Symbol.for
let objSymbol = {
  	name: 'Symbol',
  	[Symbol('new')]: 'new value'
}
console.log(Object.getOwnPropertyNames(objSymbol)); // ["name"]
Object.keys(objSymbol); // ["name"]
for (var i in objSymbol) {
   console.log(i); // Symbol
}
console.log(Object.getOwnPropertySymbols(objSymbol)); // [Symbol(new)]

// Symbol implement private properties
const privateField = Symbol();
class myClass {
  constructor(){
    this[privateField] = CONST_STRING;
  }
  getField(){
    return this[privateField];
  }
  setField(val){
    this[privateField] = val;
  }
}

// Symbol implement function call
Function.prototype.myCall = function (context) {
	if(typeof this !== 'function') {
		return undefined;
	}

	context = context || window;
	const fn = Symbol();
	context[fn] = this;
	const args = [...arguments].slice(1);
	const result = context[fn](...args);
	delete context[fn];
	return result;
}

// -----------------------------------------------------------------------
// Number 存储实现
// 0.1+0.2!==0.3
// double 64bit = 1 + 11 + 52  末尾 0舍1入
function judgeFloat(n, m) {
   const binaryN = n.toString(2);
   const binaryM = m.toString(2);
   console.log(`${n}的二进制是    ${binaryN}`);
   console.log(`${m}的二进制是    ${binaryM}`);
   const MN = m + n;
   const accuracyMN = (m * 100 + n * 100) / 100;
   const binaryMN = MN.toString(2);
   const accuracyBinaryMN = accuracyMN.toString(2);
   console.log(`${n}+${m}的二进制是${binaryMN}`);
   console.log(`${accuracyMN}的二进制是    ${accuracyBinaryMN}`);
   console.log(`${n}+${m}的二进制再转成十进制是${to10(binaryMN)}`);
   console.log(`${accuracyMN}的二进制是再转成十进制是${to10(accuracyBinaryMN)}`);
   console.log(`${n}+${m}在js中计算是${(to10(binaryMN) === to10(accuracyBinaryMN)) ? '' : '不'}准确的`);
 }

function to10(n) {
   const pre = (n.split('.')[0] - 0).toString(2);
   const arr = n.split('.')[1].split('');
   let i = 0;
   let result = 0;
   while (i < arr.length) {
     result += arr[i] * Math.pow(2, -(i + 1));
     i++;
   }
   return result;
}

judgeFloat(0.1, 0.2);
judgeFloat(0.6, 0.7);

// Number.MAX_VALUE 011111...  Number.MAX_SAFE_INTEGER  52bit 否则会有精度损失

// -----------------------------------------------------------------------
// 引用类型 Array Date RegExp Function 和包装类型 Boolan Number String
true === new Boolean(true); // false
123 === new Number(123); // false
CONST_STRING === new String(CONST_STRING); // false
console.log(typeof new String(CONST_STRING)); // object
console.log(typeof CONST_STRING); // string

// 基本类型只存在于一行代码的执行瞬间，然后立即被销毁，引用和包装的生命周期存在于其作用域
primitiveStr.color = 'red';
console.log(primitiveStr.color); // undefined

// 装箱 把基本类型转换为对应的包装类型； 拆箱 把引用类型转换为基本类型
// 引用类型转换为Number类型，先调用valueOf，再调用toString
// 引用类型转换为String类型，先调用toString，再调用valueOf
const unboxing = {
  valueOf: () => { console.log('valueOf'); return 123; },
  toString: () => { console.log('toString'); return CONST_STRING; },
};
console.log(unboxing - 1);   // valueOf   122
console.log(`${unboxing}` + `${CONST_STRING}`); // toString  const stringconst string

const unboxing2 = {
  [Symbol.toPrimitive]: () => { console.log('toPrimitive'); return 123; },
};
console.log(unboxing2 - 1);   // valueOf   122

const unboxing3 = {
  valueOf: () => { console.log('valueOf'); return {}; },
  toString: () => { console.log('toString'); return {}; },
};
console.log(unboxing3 - 1);
// valueOf  
// toString
// TypeError

// -----------------------------------------------------------------------
// 类型转换
// if 判断中false
// null, undefined, '', NaN, 0, false

// 数字运算符
1 - true // 0
1 - null //  1
1 * undefined //  NaN
2 * ['5'] //  10

// + 规则 优先转换为String运算 (引用类型 / String) > Number
// 1.当一侧为String类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型。
// 2.当一侧为Number类型，另一侧为原始类型，则将原始类型转换为Number类型。
// 3.当一侧为Number类型，另一侧为引用类型，将引用类型和Number类型转换成字符串后拼接。

123 + '123' // 123123   （规则1）
123 + null  // 123    （规则2）
123 + true // 124    （规则2）
123 + {}  // 123[object Object]    （规则3）

// == 优先转为Number比较  ToPrimitive > Boolean > String 
// 0.NaN和其他任何类型比较永远返回false(包括和他自己)
// 1.Boolean和其他任何类型比较，Boolean首先被转换为Number类型
true == 1  // true 
true == '2'  // false
true == ['1']  // true
true == ['2']  // false
// 2.String和Number比较，先将String转换为Number类型
123 == '123' // true
'' == 0 // true
// 3.null == undefined比较结果是true，除此之外，null、undefined和其他任何结果的比较值都为false
null == undefined // true
null == '' // false
null == 0 // false
null == false // false
undefined == '' // false
undefined == 0 // false
undefined == false // false
// 4.当原始类型和引用类型做比较时，对象类型会依照ToPrimitive规则转换为原始类型
'[object Object]' == {} // true
'1,2,3' == [1, 2, 3] // true
[] == ![] // true
[null] == false // true
[undefined] == false // true

// a == 1 && a == 2 && a == 3
const a = {
   value:[3,2,1],
   valueOf: function () {return this.value.pop(); },
} 

// -----------------------------------------------------------------------
// 判断JavaScript数据类型的方式
// typeof 适用非object的原始类型；
// instanceof 只能用来引用类型的检测；
// toString Object.prototype.toString.call
Object.prototype.toString.call(true); // [Object Boolean]
Object.prototype.toString.call(123); // [Object Number]
Object.prototype.toString.call([]); // [Object Array]

// https://juejin.im/post/5cec1bcff265da1b8f1aa08f