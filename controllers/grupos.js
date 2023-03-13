const { response } = require('express');
const { Grupo } = require('../models');

// obtenerGrupos - paginado - total - populate
const obtenerGrupos = async (req = request, res = response) => {
  const query = { estado: true };

  const [total, grupos] = await Promise.all([
    Grupo.countDocuments(query),
    Grupo.find(query).populate('usuario', 'nombre'),
  ]);

  res.json({
    total,
    grupos,
  });
};

// obtenergrupo - populate {}

const obtenerGrupo = async (req, res = response) => {
  const { id } = req.params;

  const grupo = Grupo.find({ _id: id }) // busca todos los posts con una referencia al usuario
    .populate('usuario', 'nombre') // carga el documento de usuario relacionado
    .exec((err) => {
      if (err) {
        console.log(err);
      } else {
        res.json(grupo);
      }
    });
};

const crearGrupo = async (req, res) => {
  const { laboratorio, carrera, materia, alumnos, equipos, dia, hora } =
    req.body;

  const nombre = req.body.nombre.toUpperCase();

  const grupoDB = await Grupo.findOne({ nombre });

  if (grupoDB) {
    return res.status(400).json({
      msg: `El grupo ${grupoDB.nombre}, ya existe`,
    });
  }

  //Generar data a guardar
  const data = {
    nombre,
    laboratorio,
    carrera,
    materia,
    alumnos,
    equipos,
    dia,
    hora,
    usuario: req.usuario._id,
  };

  const grupo = new Grupo(data);

  //Guardar en DB
  await grupo.save();

  res.status(200).json(grupo);
};

const actualizarGrupo = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.usuario = req.usuario._id;

  const grupo = await Grupo.findByIdAndUpdate(id, data, { new: true });

  res.json(grupo);
};

const borrarGrupo = async (req, res = response) => {
  const { id } = req.params;

  const grupoBorrado = await Grupo.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(grupoBorrado);
};

module.exports = {
  obtenerGrupo,
  obtenerGrupos,
  crearGrupo,
  actualizarGrupo,
  borrarGrupo,
};
