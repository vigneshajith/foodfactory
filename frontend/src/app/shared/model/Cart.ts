import { CartItem } from "./CartsItem";

export class Cart{
    items: CartItem[] = [];
    totalPrice = 0;
    totalCount = 0;
}