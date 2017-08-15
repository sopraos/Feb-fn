export default class Example {
	constructor(el) {
		this.el = el;
		console.log(el.textContent, '- Depuis le module d’exemple');
	}
}
