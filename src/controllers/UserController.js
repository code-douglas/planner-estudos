const bcrypt = require('bcrypt');
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

  static async loginUser(req, res) {}
};

module.exports = UserController;
