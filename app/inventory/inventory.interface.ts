export interface Inventory {
	id:number;
	name:string;
	product_id:number;
	supplier_id:number;
    current_selling_price: number; 
    current_cost_price: number;
    quantity:number;
    total_quantity:number;
}

export interface InventoryRecords{
	inventories:Inventory[];
}