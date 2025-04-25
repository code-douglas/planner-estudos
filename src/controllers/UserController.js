const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserController {
  static showRegister(req, res) {
    res.render('auth/register');
  }

  static showLogin(req, res) {
    res.render('auth/login');
  }

  static async createUser(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if(password != confirmPassword) {
      return res.render('auth/register', { error: 'As senhas não conferem.' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.render('auth/register', { error: 'Email já cadastrado!' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPasword
    });

    await user.save();
    res.redirect('/login');
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.render('auth/login', { error: 'Usuário não encontrado!' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!password) {
      return res.render('auth/login', { error: 'Senha incorreta!' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.SECRET,
      { expiresIn: '2h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    });

    res.redirect('/dashboard');
  }
};

module.exports = UserController;
