import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import Product from "../model/Product.ts";

export const getProducts = async (context: RouterContext) => {
  const products = await Product.fetchAll();

  context.response.body = products;

  return;
};

export const insertProduct = async (context: RouterContext) => {
  if (!context.request.hasBody) {
    context.response.status = 400;
    context.response.body = {
      success: false,
      msg: "No data provided",
    };
    return;
  }

  try {
    const body = await (await context.request.body()).value;

    const { name, price, description } = body;

    const product = new Product(name, price, description);

    const savedProduct = await product.save();

    if (!savedProduct) {
      context.response.status = 400;
      context.response.body = {
        success: false,
        msg: "Failed",
      };
      return;
    }

    context.response.status = 201;
    context.response.body = {
      success: true,
      msg: "Product created",
      productId: savedProduct.$oid,
    };
  } catch (err) {
    context.response.status = 500;
    context.response.body = {
      success: false,
      msg: "Failed to save product",
    };
    return;
  }

  return;
};

export const updateProduct = async (context: RouterContext) => {
  if (!context.request.hasBody) {
    context.response.status = 400;
    context.response.body = {
      success: false,
      msg: "No data provided",
    };
    return;
  }

  try {
    const body = await (await context.request.body()).value;
    const { id, name, price, description } = body;

    const product = await Product.fetchOne(id);

    if (!product || product == null) {
      context.response.status = 404;
      context.response.body = {
        success: false,
        msg: "Product not found",
      };
      return;
    }

    const updatedProduct = {
      _id: product._id.$oid,
      name: name || product.name,
      price: price || product.price,
      description: description || product.description,
    };

    await Product.updateProduct(updatedProduct);
    context.response.status = 200;
    context.response.body = {
      success: true,
      msg: "Product updated",
    };
  } catch (err) {
    context.response.status = 500;
    context.response.body = {
      success: true,
      msg: "Failed to update product",
    };
    return;
  }
  return;
};

export const deleteProduct = async (context: RouterContext) => {
  const { id } = context.params;

  try {
    const product = await Product.fetchOne(id!);

    if (!product || product == null) {
      context.response.status = 404;
      context.response.body = {
        success: false,
        msg: "Product not found",
      };
      return;
    }

    await Product.deleteProduct(id!);

    context.response.status = 200;
    context.response.body = {
      success: true,
      msg: "Product deleted",
    };
  } catch (err) {
    context.response.status = 500;
    context.response.body = {
      success: true,
      msg: "Failed to delete product",
    };
  }
  return;
};
