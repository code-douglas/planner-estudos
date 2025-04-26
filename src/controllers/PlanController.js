const Plan = require('../models/Plan');
const jwt = require('jsonwebtoken');

class PlanController {
  static showCreateForm(req, res) {
    res.render('plans/create');
  }

  static async createPlan(req, res) {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.render('plans/create', { error: 'Preencha todos os campos.' });
    }

    try {
      const token = req.cookies.token;

      if (!token) {
        return res.redirect('/login');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      const plan = new Plan({
        title,
        description,
        user: userId,
      });

      await plan.save();
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.name === 'JsonWebTokenError') {
        return res.redirect('/login');
      }
      res.render('plans/create', { error: 'Ocorreu um erro ao criar o plano.' });
    }
  }
}

module.exports = PlanController;
