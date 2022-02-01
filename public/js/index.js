"use strict";
const bAdd = document.querySelector('#bAdd');
const inputTitle = document.querySelector('#title');
const inputCost = document.querySelector('#cost');
const inputCurrency = document.querySelector('#currency');
const expenses = new Expenses('USD');
bAdd === null || bAdd === void 0 ? void 0 : bAdd.addEventListener('click', e => {
    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle.value;
        const cost = parseFloat(inputCost.value);
        const currency = (inputCurrency.value);
        expenses.add({ title: title, cost: { number: cost, currency: currency } });
        render();
    }
});
function render() {
    let html = '';
    expenses.getItems().forEach(item => {
        const { id, title, cost } = item;
        const { number, currency } = cost;
        html += `
			<div class="item">
				<div><span class="currency">${currency}</span>${number}</div>
				<div>${title}</div>
				<div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
			</div>
		`;
    });
}
