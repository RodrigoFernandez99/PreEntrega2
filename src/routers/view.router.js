import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express();
const productManager = new ProductManager();



router.get('/', (req, res) => {
    res.render('index',{});
})

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getAll();
  res.render('realTimeProducts', { products })
});

router.get('/product', async (req, res)=> {
  const { page = 1, limit = 5 } = req.query;
  const{
    docs,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage
  } = await productModel.paginate({}, {limit, page, lean: true});
  const product = docs;

  res.render ('product', {
    product,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage
  });
});

export default router;