const createError = require("http-errors");
const { v4: uuid } = require("uuid");

const airlineModel = require("../../model/admin/airline.model");

const airlineController = {
  insertAirline: async (req, res, next) => {
    try {
      const id = uuid();
      const logo = req.file.filename;
      const { name } = req.body;

      await airlineModel.insertAirline(id, logo, name);

      return res.json({
        msg: "new airline added",
        data: { id, logo, name },
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getAllAirline: async (req, res, next) => {
    try {
      const data = await airlineModel.getAllAirline();

      return res.json({
        msg: "get all airlines",
        data: data.rows,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getAirlineDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await airlineModel.getAirlineDetail(id);

      return res.json({
        msg: `get airline with id : ${id}`,
        data: data.rows[0],
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateAirline: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const data = await airlineModel.getAirlineDetail(id);
      const oldName = data.rows[0].name;

      await airlineModel.updateAirline(id, name);

      return res.json({
        msg: `${oldName} airline updated to ${name}`,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  removeAirline: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await airlineModel.getAirlineDetail(id);
      const name = data.rows[0].name;

      await airlineModel.removeAirline(id);

      return res.json({
        msg: `${name} airline removed from system`,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = airlineController;
