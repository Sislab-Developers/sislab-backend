const { response, request } = require("express");

const Carrera = require("../models/carrera");

const carrerasGet = async (req = request, res = response) => {
  try {
    const [total, carreras] = await Promise.all([
      Carrera.countDocuments(),
      Carrera.find().sort({ carrera: 1 }),
    ]);

    const other = carreras.find(
      (career) =>
        career.carrera === "Otra" &&
        career._id.toString() === "64d6f266fbfe12bd2c84af3e"
    );

    carreras.splice(carreras.indexOf(other), 1);
    carreras.push(other);

    return res.status(200).json({
      total,
      carreras,
      message: "Carreras obtenidas correctamente.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrió un error al obtener las carreras disponibles.",
      error,
    });
  }
};

module.exports = carrerasGet;
