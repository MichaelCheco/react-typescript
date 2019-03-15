// import { Person } from './Interfaces'
const isOpen: boolean = false;
const myName: string = 'Mike';
const myAge: number = 21;
const list: number[] = [0, 1, 2];

const me: [string, number, boolean] = ['Mike', 21, false];

enum Job {
	webDev,
	WebDesigner,
	PM,
}
const job: Job = Job.webDev;
const phone: any = 'Pixel';
const tablet: any = 3;

// Function in TS
// ? for optional params
// const sayWord = (word?: string): string => {
//   console.log(word);
//   return word;
// };
// sayWord('Mike');

// Default params
// Rest params work as expected
const sayWord = (word = 'Hello', ...rest: string[]): string => {
	console.log(word);
	return word;
};
sayWord('Mike', 's');

// Implicit Types
// Type Information comes from initial declaration
// let newName = 'Ryan';
// newName = 'Shawn'
// newName = 4 (error)

// let newNameTwo = newName
// newNameTwo = 5 (error)

// Union Types with |
// let newName: string | number = 'Ryan';
// newName = 'Shawn'
// newName = 4

// let newNameTwo = newName
// newNameTwo = 5

// Union Types with |
const makeMargin = (x: string | number): string => {
	return `margin: ${x}px`;
};

// Null Types
// Null types are automatically added to standard types
let dog: string;
dog = null;
dog = 'Luna';

// Interface Types
// Interfaces allow for type checking of data that has a certain shape

interface Person {
	name: string;
	age: number;
}

const sayName = ({ name, age }: Person) => {
	console.log(name);
	return name;
};
sayName({ name: 'Mike', age: 21 });
sayName({ age: 21, name: 'Mike' });

// Enums
// a set of named constants, only options available

// Numeric enum
// enum Type {
//   Video, // 0
//   BlogPost, // 1
//   Quiz, // 2
// }

// String enum
enum Type {
	Video = 'VIDEO',
	BlogPost = 'BLOG_POST',
	Quiz = 'QUIZ',
}

const createContent = (contentType: Type) => {};
// Not going to work 👇
// createContext('QUIZ')
createContent(Type.Video);
console.log('Type Quiz', Type.Quiz);

// Classes

class Team {
	teamName: string;
	// public teamName: string; this is same as above
	// private teamName: string; prevents outside usage
	// readonly teamName: string; prevents from being changed
	constructor(teamName) {
		this.teamName = teamName;
	}
	score() {
		console.log('goal');
	}
}
const redWings = new Team('Red Wings');
redWings.score();
redWings.teamName;

const outputInput = <T>(arg: T): T => {
	return arg;
};

// Duck Typing

class Dancer implements Person {
	name: string;
	age: number;
}

let aDancer: Person = new Dancer();

const fake = {
	name: 'Mike',
	age: 21,
};

aDancer = fake;
