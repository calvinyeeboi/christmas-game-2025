import { Router } from "express";
import globals from "../globals.js";
import CONSTANTS from "../constants.js";
const route = Router();

export default (app) => {
  app.use(`/${CONSTANTS.API_ROUTES.ADMIN.ROUTE}`, route);

  route.post(`/${CONSTANTS.API_ROUTES.ADMIN.TOAST}`, (req, res) => {
    const response = globals.websocketController.formatResponse({
      route: `${CONSTANTS.API_ROUTES.ADMIN.ROUTE}/${CONSTANTS.API_ROUTES.ADMIN.TOAST}`,
      data: {
        msg: req.body.msg,
      },
    });
    globals.websocketController.sendToClients(response);
    return res.send(true);
  });
};