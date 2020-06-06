import { Router, RouterContext } from "https://deno.land/x/oak/mod.ts";

import {
  getProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
} from "../controller/ProductController.ts";

const router = new Router();

router.get("/", (context: RouterContext) => {
  context.response.status = 200;
  context.response.body = {
    message: "OK, Deno Works",
  };
  return;
});

router.get("/products", getProducts);

router.put("/products", insertProduct);

router.patch("/products", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
