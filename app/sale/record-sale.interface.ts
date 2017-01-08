export interface RecordSaleData {
	customer_id:number;
    product: number; 
    quantity: number;
    price:number;
}

export interface RecordSaleDatas {
    sales: RecordSaleData[];
}
