import  CartModel  from '../models/CartModel.js';

export default class carts {
    constructor() {
        console.log('Working carts with DB')
    }

  async save(cart) {
    const result = await CartModel.create(cart);
    if (this.carts.length === 0) {
      cart.id = 1;
    } else {
      cart.id = this.carts[this.carts.length - 1].id + 1;
    }

    this.carts.push(cart);
    await CartModel(
      JSON.stringify(this.carts, null, "\t")
    );
    return result;
  }

  async getById(id) {
    const cart = this.carts.find((cart) => cart.id === id);
    return cart;
  }

  async updateCart (cart) {
    const result = await CartModel.updateOne({ _id: id }, cart);
    if (cartIndex === -1) {
        return "Product not found";
    } else {
        this.products.splice(productIndex,1);
        this.products.push(product)
        await CartModel(
            JSON.stringify(this.products, null, "\t")
        );
        return result;
    }
  }
  getAll = async () => {
    const courses = await courseModel.find().lean();
    return courses;
  }

  async deleteProductCart (id) {
    const productIndex = this.cart.product.findIndex((product) => product.id === id);
    if (productIndex === -1) {
        return "Product not found";
    } else {
        this.cart.product.splice(productIndex,1);
        await CartModel(
            JSON.stringify(this.cart.product, null, "\t")
        );
    }
  }
}