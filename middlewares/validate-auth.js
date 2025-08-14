const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");
const { response } = require("express");
const { clerkMiddleware } = require("@clerk/express");

const validateAuth = clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  onError: (error) =>
    response.status(401).json({ message: "Acceso no autorizado", error }),
});

module.exports = { validateAuth };
