export interface Inventory {
	id:number;
	name:string;
	product_id:number;
	supplier_id:number;
    selling_price: number; 
    cost_price: number;
    quantity:number;
    total_quantity:number;
    created_at:Date;
}

export interface InventoryRecords{
	inventories:Inventory[];
}