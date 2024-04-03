import userModel from '../user/user.model.js'

export default class ProductModel {
    constructor(id, name, desc, imageUrl, category, price, sizes){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.imageUrl=imageUrl;
        this.category=category;
        this.price=price;
        this.sizes=sizes;
    }
    static filter(minPrice, maxPrice, category){
        const result = products.filter((product)=>{
            return (
                (!minPrice || product.price>=minPrice) 
                && (!maxPrice || product.price<=maxPrice) 
                && (!category || product.category==category));
        });
        return result;
    }
    static get(id){
        const product = products.find(
            (i) => i.id==id
        )
        return product;
    }
    static GetAll(){
        return products;
    }
    static add(product){
        product.id=products.length+1;
        products.push(product);
        return product;
    }
    static rateProduct(userId, productId, rating){
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
        if(!product.ratings)
        {
            product.ratings=[]
            product.ratings.push({
                userId: userId,
                rating: rating
            });
        }
        else {
            const existRatingIndex = product.ratings.findIndex(
                (r) => r.userId == userId
            );
            if(existRatingIndex>=0)
                product.ratings[existRatingIndex]={userId: userId, rating: rating};
            else 
            {
                product.ratings.push({
                    userId: userId,
                    rating: rating
                });
            }
        }
    }
}
export let products = [
    new ProductModel(
        1,
        "Product 1",
        "Desction of Product 1",
        "https://i.pinimg.com/564x/0a/06/60/0a06600cc3cedeb49280b54114c88ce6.jpg",
        "Amazon",
        200,
        ["M","L","XL"]
    ),
    new ProductModel(
        2,
        "Product 2",
        "Desction of Product 2",
        "https://i.pinimg.com/564x/aa/70/8d/aa708d1f97a04f6f5a208213f89e1e67.jpg",
        "Flipkart",
        150,
        ["S","M"]
    )
]