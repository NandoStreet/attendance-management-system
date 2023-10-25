import asyncHandler from "express-async-handler";
import Fingerprint from "../models/fingerprint.js";

/**const getFingerprintByRoomNo = asyncHandler(async (req, res) => {
  const date = req.body.date || new Date().getUTCDate() + "/" + new Date().getUTCMonth() + "/" + new Date().getUTCFullYear();
  const fingerprint = await Fingerprint.findOne({
    roomNo: { $in: [req.body.roomNo] },
    date: date,
  });
  if (fingerprint) {
    res.json(fingerprint);
  } else {
    res.status(404);
    throw new Error(
      ` No has tomado asistencia para ${req.params.roomId}`
    );
  }
});**/

const getFingerprintByRoomNo = asyncHandler(async (req, res) => {
  try {
    const { roomNo } = req.params;

    // Busca los estudiantes con el roomNo especificado
    const students = await Fingerprint.find({ roomNo });

    // Recopila los nombres de los estudiantes
    const studentNames = students.map(student => student.name);

    // Busca las huellas dactilares de los estudiantes en la lista
    const fingerprints = await Fingerprint.find({ name: { $in: studentNames } });

    // Devuelve la lista de huellas dactilares y estudiantes
    res.json({ students, fingerprints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de alumnos.' });
  }
});

const getFingerprint = asyncHandler(async (req, res) => {
  const fingerprint = await Fingerprint.findById(req.params.id);
  if (fingerprint) {
    res.json(fingerprint);
  } else {
    res.status(404);
    throw new Error("Registro no encontrado");
  }
});

const postFingerprint = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const time = new Date().toLocaleTimeString();
  const studentExist = await Fingerprint.findOne({ name: name, time: time});

  if (studentExist) {
    res.status(400);
    throw new Error("Esta asistencia ya existe");
  }

  const fingerprint = await Fingerprint.create({
    name,
    time
  });

  if (fingerprint) {
    res.status(201).json({
      _id: fingerprint._id,
      name : fingerprint.name,
      date : fingerprint.date,
      time: fingerprint.time,
    });
  } else {
    res.status(400);
    throw new Error("Datos inválidos del registro");
  }
});

const deleteFingerprintByDays = asyncHandler(async (req, res) => {
  const days = req.params.days;
  var date = new Date();
  var deletionDate = new Date(date.setDate(date.getDate() - days));
  await Fingerprint.deleteMany({
    createdAt: { $lt: deletionDate },
  });
  res.json({ message: `Registros eliminados de los últimos ${days} días` });
});

export {
  getFingerprintByRoomNo,
  postFingerprint,
  getFingerprint,
  deleteFingerprintByDays,
};
