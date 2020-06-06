import db from "../util/database.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const productsCollection = db.collection("products");

class Product {
  private name: string;
  private price: number;
  private description: string;

  constructor(
    name: string,
    price: number,
    description: string,
  ) {
    this.name = name;
    this.price = price;
    this.description = description;
  }

  async save() {
    return await productsCollection.insertOne({
      name: this.name,
      price: this.price,
      description: this.description,
    });
  }

  static async updateProduct(updatedProduct: any) {
    const newValues = {
      $set: {
        name: updatedProduct.name,
        price: updatedProduct.price,
        description: updatedProduct.description,
      },
    };

    return await productsCollection.updateOne(
      { _id: ObjectId(updatedProduct._id) },
      newValues,
    );
  }

  static async fetchAll() {
    return await productsCollection.find();
  }

  static async fetchOne(productId: string) {
    return await productsCollection.findOne({ _id: ObjectId(productId) });
  }

  static async deleteProduct(productId: string) {
    return await productsCollection.deleteOne({ _id: ObjectId(productId) });
  }
}

export default Product;
