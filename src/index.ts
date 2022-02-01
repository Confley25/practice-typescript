const bAdd 			= document.querySelector('#bAdd') as HTMLButtonElement;
const inputTitle 	= document.querySelector('#title') as HTMLInputElement;
const inputCost 	= <HTMLInputElement>document.querySelector('#cost');
const inputCurrency:HTMLInputElement = <HTMLInputElement>document.querySelector('#currency');


const expenses = new Expenses('USD');

bAdd?.addEventListener('click',e => {
	if (inputTitle!.value != '' && inputCost!.value != '' && !isNaN(parseFloat(inputCost.value)) ) {
		const title = inputTitle!.value;
		const cost:number = parseFloat(inputCost!.value);
		const currency:Currency = <Currency>(inputCurrency!.value);

		expenses.add({title:title, cost:{number:cost, currency:currency}});
		render();
	}
} );

function render(){
	let html = '';

	expenses.getItems().forEach(item => {
		const {id, title, cost} = item;
		const {number, currency} = cost;


		html += `
			<div class="item">
				<div><span class="currency">${currency}</span>${number}</div>
				<div>${title}</div>
				<div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
			</div>
		`;
	});



}