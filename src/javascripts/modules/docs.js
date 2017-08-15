
function docs() {
	let input = document.querySelector('[data-select]');
	let select = function () {
		this.select();
	};
	input.addEventListener('click', select);
}

export default docs;
