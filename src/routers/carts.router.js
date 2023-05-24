import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();

const cartManager = new CartManager();



router.post('/', async (req, res) => {
    const cart = {
        products: []
    };
    const result = await cartManager.save(cart);
    res.send({ status: 'success', result });
})

router.get('/:id', async (req, res) => {
    const cartId = Number(req.params.id);
    const cart = await cartManager.getById(cartId);
    if (!cart) {
        return res.status(404).send({ error: 'cart not found' })
    }
    res.send({ status: 'success', cart });
});

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartManager.findById(cid.populate('products'));
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(productsInCart);
  });
  
    router.post('/:cid/product/:pid', async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity || 1;

        try {
            let cart = await cartManager.getById(cid);
            if (!cart) {
                cart = {
                    id: cid,
                    products: []
                };
            }
            for (let i = 0; i < quantity; i++) {
                cart.products.push(pid);
            }
            await cartManager.save(cart);
            res.send({ message: 'Product added to cart', cart: cart });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error adding product to cart' });
        }
    });

    router.delete('/:cid/products/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
  
    const cart = carts.find(cart => cart.id === cartId);
  
    if (!cart) {
      return res.status(404).json({ error: 'El carrito no existe' });
    }

    const productIndex = cart.products.indexOf(productId);
    if (productIndex === -1) {
      return res.status(404).json({ error: 'El producto no existe en el carrito' });
    }

    cart.products.splice(productIndex, 1);
  
    return res.status(200).json({ error: 'El producto se elimino correctamente' });
  });


    router.put('/:pid', async (req, res) => {
            const productCart = req.body;
            productCart.id = Number(req.query.pid)
            
                await CartManager.updateCart(productCart);
                res.send({status: 'success'})
    
    });

    router.put('/carts/:cid', (req, res) => {
        const cartId = req.params.cid;
        const products = req.body.products;
      
        if (!carts[cartId]) {
          res.status(404).send('El carrito no existe');
          return;
        }
      
        carts[cartId].products = products;
      
        res.send('Carrito actualizado correctamente');
      });
      
    router.put('/carts/:cid/products/:pid', (req, res) => {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
      
        if (!carts[cartId]) {
          res.status(404).send('El carrito no existe');
          return;
        }
      
      
        const product = carts[cartId].products.find((p) => p.id === productId);
        if (!product) {
          res.status(404).send('El producto no existe en el carrito');
          return;
        }
        product.quantity = quantity;

  res.send('Cantidad de unidades actualizada');
});


//eliminar todos los productos del carrito 

router.delete('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cartIndex = carts.findIndex(cart => cart.id === cartId);

    if (cartIndex === -1) {
    return res.status(404).send({ error: 'Carrito no existente' });
    }
    carts[cartIndex].products = [];
})

// Ultimo 

router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const products = carts[cartId]; 

  res.render('Productos del carrito', { products });
});

export default router;