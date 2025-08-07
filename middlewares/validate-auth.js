const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");
const { response } = require("express");
const { requireAuth } = require("@clerk/express");

const validateAuth = requireAuth({
  onError: (error) =>
    response.status(401).json({ message: "Acceso no autorizado", error }),
});

module.exports = { validateAuth };
