const Plan = require('../models/Plan');
const jwt = require('jsonwebtoken');

class PlanController {
  static showCreateForm(req, res) {
    res.render('plans/create');
  }

  static async createPlan(req, res) {
    const { title, description, date } = req.body;

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
        date,
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

  static async getDataPlanForEdit(req, res) {
    try {
      const plan = await Plan.findById(req.params.id).lean();
      res.render('plans/edit', { plan });
    } catch (err) {
      console.error(err);
      res.redirect('/dashboard');
    }
  }

  static async updatePlan (req, res) {
    try {
      const { title, description, date } = req.body;
      await Plan.findByIdAndUpdate(req.params.id, { title, description, date });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.redirect('/dashboard');
    }
  }

  static async deletePlan (req, res) {
    try {
      await Plan.findByIdAndDelete(req.params.id);
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.redirect('/dashboard');
    }
  }
}

module.exports = PlanController;
