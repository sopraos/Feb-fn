console.log("Fichier Libs1");
console.log("Fichier CoreJS");
console.log("Fichier Components1");
(function (window, document, undefined) {
	'use strict';
	var input = document.querySelector('[data-select]');
	var select = function () {
		this.select();
	};
	input.addEventListener('click', select);
})(window, document);