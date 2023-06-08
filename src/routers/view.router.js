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

const publicAccess = (req, res, next) => {
  if(req.session.user) return res.redirect('/products');
  next();
}

const privateAccess = (req, res, next) => {
  if(!req.session.user) return res.redirect('/login');
  next();
}

router.get('/register', publicAccess, (req, res) => {
  res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
  res.render('login');
});

router.get('/products', privateAccess, (req, res) => {
  res.render('products', {
      user: req.session.user
  });
});


export default router;