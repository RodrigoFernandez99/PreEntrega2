import { Router } from 'express';
import userModel from '../models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const exists = await userModel.findOne({ email });

        if (exists) return res.status(400).send({ status: 'error', error: 'User already exists' });

        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        }

        await userModel.create(user);
        res.send({ status: 'success', message: 'User registered' })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
})

router.get('/fail-register', async (req, res) => {
    res.send({ status: 'error', message: 'Register failed' });
});

router.post('/login',  passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {
    try {
        const { email, password } = req.body;

         if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
             req.session.user = {
                name: '${user.first_name} ${user.last_name}',
                 email: user.email,
                 age: user.age,
                 role: 'admin',
                 password: createHash(password)
             }


        }

        const user = await userModel.findOne({ email, password });

        if (!user) return res.status(400).send({ status: 'error', error: 'Datos incorrectos' });

        req.session.user = {
            name: '${user.first_name} ${user.last_name}',
            email: user.email,
            age: user.age,
            role: 'user'
        }

        if(!isValidPassword(user, password)) return res.status(401).send({ status: 'error', error: 'Incorrect credentials' });

        req.session.user = user;

        res.send({ status: 'success', message: 'Login success' })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/github', passport.authenticate(
    'github', { scope: ['user:email'] }
), async (req, res) => {
    res.send({ status: "success", message: "User registered" })
});

router.get('/github-callback', passport.authenticate(
    'github', { failureRedirect: '/login' }
), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/')
})

router.get('/fail-login', async (req, res) => {
    res.send({ status: 'error', message: 'Login failed' });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({ status: 'error', error: 'Logout fail' });
        res.redirect('/login')
    })
});

export default router;