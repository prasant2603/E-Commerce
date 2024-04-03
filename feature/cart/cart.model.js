import userModel from '../user/user.model.js'
import { products } from '../product/product.model.js'

export default class CartModel{
    constructor(productId, userId, quantity, id) {
        this.productId=productId;
        this.userId=userId;
        this.quantity=quantity;
        this.id=id;
    }
    static addItem(productId, userId, quantity){
        const user = userModel.getAll().find(
            (u) => u.id==userId
        );
        if(!user)
            return 'User Not Found';
        const product = products.find(
            (p) => p.id==productId
        );
        if(!product)
            return 'Product Not Found';
        const cardItem = new CartModel(productId, userId, quantity);
        cardItem.id=cartItems.length+1;
        const itemIndex = cartItems.findIndex((c)=> c.userId==userId && c.productId==productId);
        if(itemIndex>=0)
        {
            cartItems[itemIndex]=cardItem;
        }
        else 
        {
            cartItems.push(cardItem);
        }
    }
    static getItem(userId) {
        return cartItems.filter((cartItem)=> cartItem.userId==userId);
    }
    static delete(cartItemId, userId) {
        const itemIndex = cartItems.findIndex((c)=> c.id=cartItemId && c.userId==userId);
        if(itemIndex==-1)
            return 'Item Not Found';
        else 
            cartItems.splice(itemIndex, 1);
    }
}
var cartItems = [
    new CartModel(1, 2, 1, 1),
    new CartModel(2, 2, 2, 2),
    new CartModel(1, 1, 3, 3),
    new CartModel(2, 1, 4, 4),
]