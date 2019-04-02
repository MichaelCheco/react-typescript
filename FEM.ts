import { invoke } from 'q';

// Frontend Masters TypeScript Fundamentals

// A tuple is an array of a fixed length that comes with a convention

let bb: [number, string, string, number] = [
	123,
	'Fake Street',
	'Nowhere, USA',
	10110,
];

// Think of an Interface as a name for a structure that we are creating, works well object types

export interface HasPhoneNumber {
	name: string;
	phone: number;
}
export interface HasEmail {
	name: string;
	email: string;
}

// Intersection And Union Operators & - |
let contactInfo: HasEmail | HasPhoneNumber =
	Math.random() > 0.5
		? {
				// we can assign it to a HasPhoneNumber
				name: 'Mike',
				phone: 312413423,
		  }
		: {
				// or a HasEmail
				name: 'Mike',
				email: 'email@email.com',
		  };

contactInfo.name; // NOTE: We can only access the .name property

// Union Types

let otherContactInfo: HasEmail & HasPhoneNumber = {
	// we must initialize it with all needed values
	name: 'Mike',
	email: 'email@email.com',
	phone: 21321433,
};

otherContactInfo.name; // NOTE: We can access anything on _either
otherContactInfo.email;
otherContactInfo.phone;

// Wider vs Narrower
// Describes: relative differences in range of a type's allowable values

// Wide ---> Narrrow 👇
/**
 * ANYTHING any
 * ARRAY any[]
 * array of strings string[]
 * ARRAY OF 3 [string, string, string]
 * ... ["abc", 'def, string]
 * NOTHING never
 */

// FUNCTIONS

// (1) Function arguments and return values can have type annotations

function sendEmail(to: HasEmail): { recipient: string; body: string } {
	return {
		recipient: `${to.name} <${to.email}>`,
		body: "You're pre-qualified for a loan",
	};
}

// (2) arrow-function variant
const sendTextMessage = (
	to: HasPhoneNumber
): { recipient: string; body: string } => {
	return {
		recipient: `${to.name} <${to.phone}>`,
		body: "You're pre-qualified for a loan",
	};
};

// (3) Return types can almost always be inferred

function getNameParts(contact: { name: string }) {
	const parts = contact.name.split(/\s/g); // split @ whitespace
	if (parts.length < 2) {
		throw new Error(`Can't calculate name parts from name ${contact.name}`);
	}
	return {
		first: parts[0],
		middle:
			parts.length === 2
				? undefined
				: //everything except first and last
				  parts.slice(1, parts.length - 2).join(' '),
		last: parts[parts.length - 1],
	};
}

// (4) rest params work just as you'd think, Type must be array-ish
const sum = (...vals: number[]) => vals.reduce((sum, x) => sum + x, 0);

// (5) We can even provide multiple function signatures
// 'overload signatures'

function contactPeople(method: 'email', ...people: HasEmail[]): void;
function contactPeople(method: 'phone', ...people: HasPhoneNumber[]): void;

// IMPLEMENTATION
function contactPeople(
	method: 'email' | 'phone',
	...people: (HasEmail | HasPhoneNumber)[]
): void {
	if (method === 'email') {
		(people as HasEmail[]).forEach(sendEmail);
	} else {
		(people as HasPhoneNumber[]).forEach(sendTextMessage);
	}
}

// ✅ email works
contactPeople('email', { name: 'foo', email: 'd' });
// ✅ phone works
contactPeople('phone', { name: 'foo', phone: 2222222 });
// ❌ mixing does not work
contactPeople('email', { name: 'foo', phone: 2222222 });

// (6) The lexical scope (this of a function is part of its signature

function sendMessage(
	this: HasEmail & HasPhoneNumber,
	prefferedMethod: 'phone' | 'email'
) {
	if (prefferedMethod === 'email') {
		console.log('send email');
		sendEmail(this);
	} else {
		console.log('text message');
		sendTextMessage(this);
	}
}

const c = { name: 'Mike', phone: 123421412, email: 'email@email.com' };

function invokeSoon(cb: () => any, timeout: number) {
	setTimeout(() => cb.call(null, timeout));
}
// ❌ this is not satisfied
invokeSoon(() => sendMessage('email', 500));

// ✅ creating a bound function is one solution
const bound = sendMessage.bind(c, ' email');
invokeSoon(() => bound(), 500);

// ✅ call/apply work as well
invokeSoon(() => sendMessage.apply(c, ['phone']), 500);

// Interfaces & Type Aliases

// TYPE ALIASES

// (1) Type aliases allow us to give a type a name

type StringOrNumber = string | number;

// this is the ONLY time you'll see a type on the Right Hand Side fo Assignment
type hasName = { name: string };

// ❌ self-referencing types don't work!
type NumVal = 1 | 2 | 3 | NumArr;
type NumArr = NumVal[];

// (2) Interfaces can extend from other interfaces

export interface HasInternationalPhoneNumber extends HasPhoneNumber {
	countryCode: string;
}

// (3) They can also be used to describe call signatures

interface ContactMessenger1 {
	(contact: HasEmail | HasPhoneNumber, message: string): void;
}
type ContactMessenger2 = (
	contact: HasEmail | HasPhoneNumber,
	message: string
) => void;

// // NOTE: we don't need any type annotations for contact or message
const emailer: ContactMessenger1 = (_contact, _message) => {
	/** ...  */
};

// Dictionary Objects & Index Signatures

interface PhoneNumberDict {
	// arr[0], foo['myProp']
	[numberName: string]:
		| undefined
		| {
				areaCode: number;
				num: number;
		  };
}

const phoneDict: PhoneNumberDict = {
	office: { areaCode: 321, num: 55512121 },
	home: { areaCode: 123, num: 34324234234 },
};

// augment the existing PhoneNumberDict

interface PhoneNumberDict {
	home: {
		areaCode: number;
		num: number;
	};
	office: {
		areaCode: number;
		num: number;
	};
}

/**
 * Type Aliases are eager, Interfaces are lazy
 * Type Aliases are extremely flexible, Interfaces are things you would want to use for things that are objects, including functions/arrays
 */

// CLASSES

export class Contact implements HasEmail {
	email: string;
	name: string;
	constructor(name: string, email: string) {
		this.email = email;
		this.name = name;
	}
}

class ParamPropContact implements HasEmail {
	constructor(public name: string, public email: string = 'no email') {}
}
