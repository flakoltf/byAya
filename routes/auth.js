// routes/auth.js
const express = require('express');
const router = express.Router();

// Afficher la page de connexion
router.get('/login', (req, res) => {
    res.render('login');
});

// Traiter la connexion
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Tentative de connexion : ${email}`);
    // Ici, on pourrait vérifier si l'utilisateur existe
    res.redirect('/'); // Redirection vers l'accueil pour simuler le succès
});

// Afficher la page d'inscription
router.get('/register', (req, res) => {
    res.render('register');
});

// Traiter l'inscription
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Nouvel inscrit : ${name} (${email})`);
    res.redirect('/auth/login'); // Redirige vers la connexion après inscription
});

module.exports = router;