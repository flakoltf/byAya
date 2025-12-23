// routes/shop.js
const express = require('express');
const router = express.Router();

// Page d'accueil
router.get('/', (req, res) => {
    res.render('home');
});

// Page des produits
router.get('/products', (req, res) => {
    res.render('products');
});

// Ajouter au panier
router.post('/add-to-cart', (req, res) => {
    const productId = parseInt(req.body.productId);
    // On récupère le produit dans notre liste simulée
    const product = res.locals.products.find(p => p.id === productId);

    if (!req.session.cart) req.session.cart = [];
    req.session.cart.push(product);

    res.redirect('/cart'); // Redirige vers le panier après l'ajout
});

// Page panier
router.get('/cart', (req, res) => {
    let total = 0;
    if (req.session.cart) {
        total = req.session.cart.reduce((sum, item) => sum + item.price, 0);
    }
    res.render('cart', { total });
});

// Supprimer du panier
router.post('/remove-from-cart', (req, res) => {
    const index = req.body.index;
    if (req.session.cart) {
        req.session.cart.splice(index, 1); // Retire l'élément à l'index donné
    }
    res.redirect('/cart');
});

module.exports = router;