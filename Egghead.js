//  turn on rule in config, add union type, add if statement

// Restrict null and undefined via Non-Nullable-Types
function trimAndLower(text: string | null | undefined) {
  if (typeof text === 'string') {
    return text.trim().toLowerCase();
  }
  return text;
}

console.log(trimAndLower(null));
console.log(trimAndLower(undefined));
console.log(trimAndLower('Learn TS'));

const container = document.getElementById("app-container")!
//  ! tells typescript compiler to assume that we will not get null or undefined
//  ! is an escape hatch and should be avoided
//  can't use container methods until we confirm that it is not null
if (container) {
  container.ATTRIBUTE_NODE
}


//  Control Flow / Flow Analysis
function trimAndLower(text: string | null | undefined) {
  return typeof text === 'string'
  ? text.trim().toLowerCase()
  : text;
}


// Define Custom Type Guard Functions

const numbers = [0, 1, 2, [3, 4], 5, [6], 7, 8, [9]];
function flatten<T>(array: (T | T[])[]): T[] {
  const flattened: T[] = [];
  for (const element of array) {
    if (Array.isArray(element)) {
      flattened.push(...element);
    } else {
      flattened.push(element);
    }
  }
  return flattened;
}

console.log(flatten(numbers));
 // Typeguard Function
function isFlat<T>(array: (T | T[])[]): array is T[] {
  return !array.some(Array.isArray);
}

if (isFlat(numbers)) {
  numbers;
}

// Make Properties and Index Signatures Readonly
interface User {
  readonly id: number;
  name: string;
}
const user: User = { id: 1, name: 'Michael' };
user.name = 'Checo';

class User {
  readonly id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
const user = new User(10, 'Michael')

const weekdays: ReadonlyArray<string> = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
// Represent Non-Primitive Types with TypeScript's object Type
type Primitive =
| boolean
| number
| string
| symbol
| null
| undefined

let obj: object;

Error 👇
obj = true
obj = 1

valid 👇
obj = {}
obj = []
obj = Math.random

/* Object is for built in methods that live on 
all objects while (object) is for scenarios shown above */

// Use TypeScript's never Type for exhaustiveness checking

const sing = function() {
  while (true) {
    console.log('Never')
    console.log('Gonna')
    console.log('Give')
    console.log('You')
    console.log('Up')
  }
}
const result = sing()

 // void because it implicitly returns undefined
const greet = function() {
  alert('Hi')
}
 // Never completes
const fail = function() {
  throw Error()
}

function trimAndLower(text: string | null) {
  if (typeof text === 'string') {
    return text.trim().toLowerCase()
  }
  if (text === null) {
    return null
  }
  return text  // <-- never because null/string have already been checked
}

enum ShirtSize {
  S,
  M,
  L,
  XL
}
function assertNever(value: never): never {
  throw Error(`Unexpected value ${value}`)
}
function prettyPrint(size: ShirtSize) {
  switch(size) {
    case ShirtSize.S: return 'small';
    case ShirtSize.M: return 'medium';
    case ShirtSize.L: return 'large';
    case ShirtSize.XL: return 'extra large';
    default: return assertNever(size)
  }
}

// Overload a Function with TypeScript's Overload Signatures
/**
* Reverses the given string
* @param string The string to reverse
*/
/**
* Reverses the given arrray
* @param array  The array to reverse
*/
function reverse(string: string): string
function reverse<T>(array: T[]): T[]
 function reverse(stringOrArray: string | any[]) {
   return typeof stringOrArray === 'string'
   ? [...stringOrArray].reverse().join('')
   : stringOrArray.slice().reverse()
 }

 const reversedString = reverse('TypeScript')
 const reversedArray = reverse([2,3,5])
const enum MediaTypes {
  JSON = 'application.json'
}

// Collect Related Strings in a String Enum in TypeScript

fetch('https:example.com/api/endpoint', {
  headers: {
    Accept: MediaTypes.JSON
  }
}).then(response => {
   ...
})

// Specify Exact Values with TypeScript's Literal Types
let autoComplete: 'on' | 'off' | 'ON' | 'OFF' = 'on'
autoComplete = 'off'
autoComplete = 'ON'

type NumberBase = 2 | 8 | 10 | 16

let base: NumberBase = 2
base = 8

type HTTPSuccessStatusCode = 
| 200
| 201
| 202
| 203
| 204
| 205
| 206
| 207
| 208
| 226;



let autoFocus= true
autoFocus = false


enum Protocols {
  HTTP,
  HTTPS,
  FTP
}

type HyperTextProtocol = Protocols.HTTP | Protocols.HTTPS;
let protocol: HyperTextProtocol;
protocol = Protocols.HTTP


type Result<T> = 
 | { success: true; value: T }
 | { success: false; error: string }

 // Model Alternatives with Discriminated Union Types

function tryParseInt(text: string): Result<number> {
 if (/^-?\d+$/.test(text)) {
   return {
     success: true,
     value: parseInt(text, 10)
   }
 }
 return {
   success: false,
   error: 'Invalid Number Format'
 }
}

const result = tryParseInt('42')

if (result.success) {
 result;
} else {
 result;
}


interface Cash {
 kind: 'cash'
}
interface PayPal {
 kind: 'paypal';
 email: string;
}
interface CreditCard {
 kind: 'creditcard';
 cardNumber: string;
 securityCode: string;
 
}

type PaymentMethod = Cash | PayPal | CreditCard;

function stringifyPaymentMethod(method: PaymentMethod): string {
 switch (method.kind) {
   case 'cash':
   return 'Cash'
   case 'paypal':
   return `PayPal ${method.email}`
   case 'creditcard':
   return 'Credit Card'
 }
}

// Infer Types for Rest and Spread Properties in TypeScript

const person = {
 fullName: 'Michael Checo',
 blog: 'https:michaelcheco.com',
 twitter: '@michaelcheco1'
}

const { fullName, ...SocialMedia } = person
SocialMedia.blog

const defaultStyles = {
 fontFamily: 'Arial, sans-serif',
 fontWeight: 'normal'
}
const userStyles = {
 color: '#111111',
 fontWeight: 800
}

const styles = {
 ...defaultStatus,
 ...userStyles
}

const { color, ...remainingProps } = styles


const todo = {
  text: 'Mow the lawn',
  completed: false,
  tags: ['garden']
}

const shallowCopy = { ...todo }
shallowCopy.text = 'Buy Milk'
shallowCopy.tags.push('kitchen')  <-- will modify original array


// Query Properties with keyof and Lookup Types in TypeScript
interface Todo {
 id: number;
 text: string;
 completed: boolean;
}

const todo: Todo = {
 id: 1,
 text: 'Buy Milk',
 completed: false
}
keyof === 'id' | 'text' | 'completed'
function prop<T, K extends keyof T>(obj: T, key: K ): T[K] {
 return obj[key]
}

type TodoId = Todo['id']
type TodoTextOrCompleted = Todo['text' | 'completed']
const id = prop(todo, 'id')


// Transform Existing Types Using Mapped Types in TypeScript
interface Point {
 x: number;
 y: number;
}

const origins = Object.freeze<Point>({ x: 0, y: 0})

type ReadOnlyPoint = {
 readonly x: number
 readonly y: number
}

let point: Partial<Point>

point = { x: 0, y: 0}
point = { x: 0 }

type Nullable<T> = {
 [P in keyof T]: T[P] | null
}

type Stringify<T> = {
 [P in keyof T]: string;
}

type PartialNullablePoint = Partial<Nullable<Point>>
let point1: PartialNullablePoint
point1 = { x: 0, y: 0}
point1 = { x: null, y: 0}

// 2nd course ============================================

// making large numbers readable
const africaPop = 1_324_203_462

class AmountInput {
 private static MAX_ALLOWED = 99_999_99;

 amount: number = 0;

 showToolTip() {
   setTimeout(() => {}, 2_500)
 }

 formatMillion() {
   return this.amount / 1_000_000 + 'M'
 }
}

// Make TypeScript Class Usage Safer with Strict Property Initialization

class Library {
 titles: string[] = [
   'What if?',
   'Flow'
 ]
 isPublic: boolean;
 constructor() {this.isPublic = true}
}

const library = new Library()

// sometime later & elsewhere in our codebase

 const shortTitles = library.titles.filter(title => title.length < 5)

 // Use the JavaScript “in” operator for automatic type inference in TypeScript

 interface Admin {
   id: string;
   role: string;
 }

 interface User {
   email: string;
 }

 function redirect(usr: Admin | User) {
   // in is useful for checking if certain properties exist on objects
   if("role" in usr) {
     routeToAdminPage(usr.role)
   } else {
     routeToHomePage(usr.email)

   }
 }

// Automatically infer TypeScript types in switch statements

interface Action {
 type: string;
}
interface ITodoState {
 todos: string[]
}
// type is the discriminant, can have any name just has to be shared
class Add implements Action {
 readonly type = 'Add'
 constructor(public payload: string) {}
}
class RemoveAll implements Action {
 readonly type = 'Remove All'
 
}
class RemoveOne implements Action {
 readonly type = 'Remove One'
 constructor(public payload: number) {}
}
type TodoActions = Add | RemoveAll | RemoveOne
function todoReducer(state: ITodoState = { todos: []}, action: TodoActions): ITodoState {
 switch (action.type) {
   case 'Add': {
     return {
       todos: [...state.todos, action.payload]
     }
   }
   case 'Remove All': {
     return {
       todos: []
     }
   }
   case 'Remove One': {
     return {
       todos: state.todos.slice().splice(action.payload, 1)
     }
   }
   default: {
     const x: never = action
   }
 }
}
//Create Explicit and Readable Type Declarations with TypeScript mapped Type Modifiers

interface IPet {
 name: string;
 age: number;
 favoritePark?: string;
}

type ReadonlyPet = {
 readonly [K in keyof IPet]-?: IPet[K]
}

const pet:IPet = {name: 'Luna', age: 1, favoritePark: 'Central'}
const readonlyPet: ReadonlyPet = { name: 'Luna', age: 1, favoritePark: 'Central'}
pet.age = 2
readonlyPet.age = 2 

 

//Use Types vs. Interfaces

type Pet = IDog | ICat;

interface IAnimal {
 age: number;
 eat(): void;
 speak(): string;
}

function feedAnimal(animal: IAnimal) {
 animal.eat()
}
class Animal implements IAnimal {
 age = 0

}


// Build self-referencing type alisases in TypeScript

interface Action {
 type: string;
}

interface ListNode<T> {
 value: T;
 next: ListNode<T>
 prev: ListNode<T>
}
let action1 = { type: 'LOGIN '}
let action2 = { type: 'LOAD_POSTS '}

let actionNode1: ListNode<Action> = {
 value: action1,
 next: null,
 prev: null
}

let actionNode2: ListNode<Action> = {
 value: action2,
 next: null,
 prev: actionNode1
}

actionNode1.next = actionNode2
let currentNode = actionNode2
do {
 console.log(currentNode.value)
 currentNode = currentNode.prev
} while(currentNode)


// Use the "unkwon" type to avoid runtime errors 


// Dynamically Allocate Function Types with Conditional Types in TypeScript
interface StringContainer {
 value: string;
 format(): string;
 split(): string[];
}
interface NumberContainer {
 value: number;
 nearestPrime: number;
 round(): number;
}

type Item<T> = {
 id: T,
 container: T extends string ? StringContainer : NumberContainer
}

let item: Item<string> = {
 id: 'a23d',
 container: null, 
}

type ArrayFilter<T> = T extends any[] ? T : never

type StringorNumbers = ArrayFilter<string | number | string[] | number[]>

/*
1. distribute -> never | never | string[] | number[]
2. "never is ignored" -> string[] | number[]
*/

interface Book {
 id: string;
 tableOfContents: string[]
}
interface TV {
 id: number;
 diagonal: number;
}

interface IItemService {
 getItem<T extends string | number>(id: T): T extends string ? Book : TV
}
let itemService: IItemService

// Use Conditional types to create a reusable Flatten type

const numbers = [2,1]
const someObject = {
 id: 21,
 name: 'Michael'
}

const someBoolean = true;

type FlattenArray<T extends any[]> = T[number]
type FlattenObject<T extends object> =T[keyof T];
type FlattenBoolean<T> = T
type Flatten<T> = T extends any[] ? T[number] :
 T extends object ? T[keyof T] :
 T;
// keyof T --> "id" | "name"
// T["id" | "name"] --> T["id"] | T["name"] --> number | string
type NumbersArrayFlattened = Flatten<typeof numbers>;
type SomeObjectFlattened = Flatten<typeof someObject>
type SomeVooleanFlattened = Flatten<typeof someBoolean>

// Infer the Return Type of a Generic Function Type Parameter 

function generateId(seed: number) {
 return seed + 5
}
type AReturnType<T> = T extends (...args: any[]) => infer R ? R : any
type Id = AReturnType<typeof generateId>

type UnpackPromise<T> = T extends Promise<infer K>[] ? K : any;
const arr = [Promise.resolve(true)]

type ExpectedBoolean = UnpackPromise<typeof arr>;

// Deeply mark all the properties of a type as read-only in TypeScript


