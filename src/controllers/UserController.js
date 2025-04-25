const User = require('../models/User');

class UserController {
  static showRegister(req, res) {
    res.render('auth/register');
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

    const user = new User({ name, email, password });


    await user.save();
    res.redirect('/login');

  }

  static showLogin(req, res) {
    res.render('auth/login');
  }

  static async loginUser(req, res) {}
};

module.exports = UserController;
