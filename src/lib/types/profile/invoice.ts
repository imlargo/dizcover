export type Invoice = {
    image: string;
    name: string;
    type: 'Cover' | 'Cupon de consumo';
    quantity: number;
    total: number;
    payment_method: 'Efectivo' | 'Tarjeta' | 'Transferencia';
    date: string;
};