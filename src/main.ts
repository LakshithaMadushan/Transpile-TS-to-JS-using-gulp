import { sayHello } from './greet';

export class myClass {
	constructor() {
		this.hello('TypeScript');
	}

	hello(compiler: string) {
		console.log(`Hello from ${compiler}`);
	}
}

let myObj = new myClass();

function showHello(divName: string, name: string) {
	const elt = document.getElementById(divName);
	elt.innerText = sayHello(name);
}
showHello('greeting', 'TypeScript');
