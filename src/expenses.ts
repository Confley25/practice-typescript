type Currency = 'COP' | 'USD';

interface Price{
	number:number,
	currency:Currency
}

interface ExpensesItem{
	id?:number,
	title:string,
	cost:Price
}

interface IExpenses{
	expenses:ArrayList<ExpensesItem>,
	finalCurrency: Currency,
	add(item:ExpensesItem):boolean,
	get(index:number):ExpensesItem|null,
	getTotal():string,
	remove(id:number):boolean
}


class ArrayList<T>{
	private items:T[];

	constructor(){
		this.items = [];
	}

	add(item:T):void{
		this.items.push(item)
	}


	get(index:number):T | null{
		const item:T[] = this.items.filter((x:T, i:number) => {
			return i === index;
		});

		if (item.length === 0) {
			return null;
		}else{
			return item[0];
		}
	}

	createFerom(value:T[]):void{
		this.items = [... value];
	}

	getAll():T[]{
		return this.items;
	}
}

class Expenses implements IExpenses {
	
	

	expenses:ArrayList<ExpensesItem>;
	finalCurrency: Currency;

	constructor(currency:Currency){
		this.finalCurrency = currency;
		this.expenses = new ArrayList<ExpensesItem>()
	}

	private count = 0;

	add(item:ExpensesItem): boolean{
		item.id = this.count;
		this.count++;
		this.expenses.add(item);
		return true;
	}
	get(index:number):ExpensesItem | null {
		return this.expenses.get(index);
	}

	getItems():ExpensesItem[]{
		return this.expenses.getAll();
	}

	getTotal():string{
		const total = this.expenses.getAll().reduce((acc , item) =>{
			return acc += this.convertCurrency(item, this.finalCurrency);
		}, 0);

		return `${this.finalCurrency} $${total.toFixed(2).toString()}`;
	}

	remove(id:number):boolean{
		throw new Error("Method not implemented.");
	}

	 private convertCurrency(item:ExpensesItem, currency:Currency):number{
	 	switch(item.cost.currency){
	 		case 'USD':
	 			switch(currency){
	 				case 'COP':
	 					return item.cost.number * 3,958.01;
	 				break;

	 				default:
	 					return item.cost.number;
	 			}
	 			break;

	 			case 'COP':
	 				switch(currency){
	 				case 'USD':
	 					return item.cost.number / 3,958.01;
	 				break;

	 				default:
	 					return item.cost.number;
	 			}
	 			break;

	 			default:
	 				return 0;
	 	}
	}

}