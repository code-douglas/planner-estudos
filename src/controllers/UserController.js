const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

class UserController {
  static showRegister(req, res) {
    res.render('auth/register');
  }

  static showLogin(req, res) {
    res.render('auth/login');
  }

  static async createUser(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.render('auth/register', {
        error: 'As senhas não conferem.',
        name,
        email
      });
    }

    if (name.length < 5) {
      return res.render('auth/register', {
        error: 'O nome deve conter no mínimo 6 caracteres.',
        email,
        password,
        confirmPassword
      });
    }

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.render('auth/register', {
          error: 'Email já cadastrado!',
          name
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        email,
        password: hashedPassword
      });

      await user.save();
      res.redirect('/login');
    } catch (err) {
      console.error('Registration error:', err);
      res.render('auth/register', {
        error: 'Erro ao cadastrar usuário. Tente novamente.',
        name,
        email
      });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.render('auth/login', {
          error: 'Usuário não encontrado!',
          email
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {  // Fixed: was checking !password instead
        return res.render('auth/login', {
          error: 'Senha incorreta!',
          email
        });
      }

      const token = jwt.sign(
        {
          userId: user._id.toString(),
          name: user.name
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 2 * 60 * 60 * 1000
      });

      res.redirect('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      res.render('auth/login', {
        error: 'Erro durante o login. Tente novamente.',
        email
      });
    }
  }

  static async showDashboard(req, res) {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      res.render('user/dashboard', { user });
    } catch (err) {
      console.error('Dashboard error:', err);
      res.redirect('/login');
    }
  }

  static logoutUser(req, res) {
    res.clearCookie('token');
    res.redirect('/login');
  }
}

module.exports = UserController;
