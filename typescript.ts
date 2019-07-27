// Basic Types
// boolean
let isDone: boolean = false;

// number
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// string
let name: string = "bob";
name = "smith";

let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.
I'll be ${ age + 1 } years old next month.`;

// array
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

// tuple
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

???
x[3] = 'world'; // Error, Property '3' does not exist on type '[string, number]'.
console.log(x[5].toString()); // Error, Property '5' does not exist on type '[string, number]'.
x[6] = true; // Error, 布尔不是(string | number)类型

// *** enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// By default, enums begin numbering their members starting at 0
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

// any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// vs object
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

// void
function warnUser(): void {
    console.log("This is my warning message");
}

// null undefined
// --strictNullChecks  void and self

???
// never
never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

// object
// non-primitive type
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error

// type assertions
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// recommend use as
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;