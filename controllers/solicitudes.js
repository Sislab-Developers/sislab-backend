const Comment = require("../models/comment");
const solicitud = require("../models/solicitud");

const getPreviousMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
};

const getDateRange = (date) => {
  const lowerLimit = new Date(date).getTime();
  const upperLimit = new Date(
    new Date(date).setDate(new Date(date).getDate() + 1)
  ).getTime();

  return { lowerLimit, upperLimit };
};

const getWeekRange = (start, end) => {
  const lowerLimit = new Date(start).getTime();
  const upperLimit = new Date(end).getTime();

  return { lowerLimit, upperLimit };
};

const getRequests = async (req, res) => {
  const previousMonth = getPreviousMonth();

  try {
    const requests = await solicitud
      .find({ requestDate: { $gte: previousMonth } })
      .populate("profId")
      .populate("groupId")
      .populate("assignmentId")
      .populate("comments")
      .sort({ requestDate: 1 })
      .exec();

    res.status(200).json({
      requests,
      message: `${requests.length} solicitudes encontradas.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener las solicitudes.",
      error,
    });
  }
};

const getPendingRequests = async (req, res) => {
  const previousMonth = getPreviousMonth();

  try {
    const requests = await solicitud
      .find({ requestDate: { $gte: previousMonth } })
      .populate("profId")
      .populate("groupId")
      .populate("assignmentId")
      .populate("comments")
      .sort({ requestDate: 1 })
      .exec();

    res.status(200).json({
      requests,
      message: `${requests.length} solicitudes encontradas.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener las solicitudes.",
      error,
    });
  }
};

const getRequestsByProf = async (req, res) => {
  const previousMonth = getPreviousMonth();

  try {
    const requests = await solicitud
      .find({ requestDate: { $gte: previousMonth }, profId: req.query.profId })
      .populate("profId")
      .populate("groupId")
      .populate("assignmentId")
      .populate("comments")
      .sort({ requestDate: 1 })
      .exec();

    res.status(200).json({
      requests,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error al obtener las solicitudes.",
      error,
    });
  }
};

const getRequestsByProfAndDate = async (req, res) => {
  const { lowerLimit, upperLimit } = getDateRange(+req.query.date);

  try {
    const requests = await solicitud
      .find({
        requestDate: { $gte: lowerLimit, $lt: upperLimit },
        profId: req.query.profId,
      })
      .populate("profId")
      .populate("groupId")
      .populate("assignmentId")
      .populate("comments")
      .sort({ requestDate: 1 })
      .exec();

    res.status(200).json({
      requests,
      message: `${requests.length} solicitudes obtenidas correctamente.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener las solicitudes.",
      error,
    });
  }
};

const getRequestsByDate = async (req, res) => {
  const { lowerLimit, upperLimit } = getDateRange(+req.query.date);

  try {
    const requests = await solicitud
      .find({ requestDate: { $gte: lowerLimit, $lt: upperLimit } })
      .populate("profId")
      .populate("groupId")
      .populate("assignmentId")
      .populate("comments")
      .sort({ requestDate: 1 })
      .exec();

    requests.sort((a, b) => a.groupId.hora - b.groupId.hora);

    res.status(200).json({
      requests,
      message: `${requests.length} solicitudes obtenidas correctamente.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener las solicitudes.",
      error,
    });
  }
};

const getRequestsByDateRange = async (req, res) => {
  const { lowerLimit, upperLimit } = getWeekRange(
    +req.query.start,
    +req.query.end
  );

  try {
    const requests = await solicitud
      .find({ requestDate: { $gte: lowerLimit, $lt: upperLimit } })
      .populate("profId")
      .populate("groupId")
      .populate("assignmentId")
      .populate("comments")
      .exec();

    if (requests.length === 0) {
      return res.status(200).json({
        message: "No se encontraron solicitudes para este rango de fechas.",
        requests,
      });
    }

    requests.sort((a, b) => a.groupId.hora - b.groupId.hora);
    requests.sort((a, b) => a.requestDate - b.requestDate);

    res.status(200).json({
      requests,
      message: `${requests.length} solicitudes obtenidas correctamente.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener las solicitudes.",
      error,
    });
  }
};

const createRequest = async (req, res) => {
  const {
    profId,
    groupId,
    assignmentId,
    requestDate,
    customReagents,
    customEquipment,
    customWaste,
    omittedReagents,
    omittedEquipment,
    comment,
  } = req.body;

  try {
    let commentDoc;

    if (comment && comment !== "") {
      commentDoc = await Comment.create({
        userId: profId,
        content: comment,
      });
    }

    const request = await solicitud.create({
      profId,
      groupId,
      assignmentId,
      requestDate,
      customReagents,
      customEquipment,
      customWaste,
      omittedReagents,
      omittedEquipment,
      comments: [commentDoc?._id],
      createdAt: new Date().getTime(),
    });

    res.status(201).json({
      message: "Solicitud creada correctamente.",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al crear la solicitud.",
      error,
    });
  }
};

module.exports = {
  getRequests,
  getPendingRequests,
  getRequestsByProf,
  getRequestsByProfAndDate,
  getRequestsByDate,
  getRequestsByDateRange,
  createRequest,
};
