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
