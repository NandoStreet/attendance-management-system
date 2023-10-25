import asyncHandler from "express-async-handler";
import Student from "../models/student.js";
import Attendance from "../models/attendance.js";

const addStudent = asyncHandler(async (req, res) => {
  const {
    name,
    last_name,
    roomNo,          
    city,
    fatherContact,
    image,        
  } = req.body;

  const studentExist = await Student.findOne({ name: name });

  if (studentExist) {
    res.status(400);
    throw new Error("Este estudiante ya existe");
  }

  const student = await Student.create({
    name,
    last_name,
    roomNo,          
    city,
    fatherContact,
    image,
  });

  if (student) {
    res.status(201).json({
      _id: student._id,
      name: student.name,
      last_name: student.last_name,
      roomNo: student.roomNo,
      city: student.city,
      fatherContact: student.fatherContact,
      image: student.image,
    });
  } else {
    res.status(400);
    throw new Error("Datos inválidos del estudiante");
  }
});
const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.body._id);

  if (student) {
    student.name = req.body.name || student.name;
    student.last_name = req.body.last_name || student.last_name;
    student.roomNo = req.body.roomNo || student.roomNo;
    student.city = req.body.city || student.city;
    student.fatherContact = req.body.fatherContact || student.fatherContact;
    student.image = req.body.image || student.image;    
    const updatedStudent = await student.save();

    res.json({
      _id: updatedStudent._id,
      name: updatedStudent.name,
      last_name: updatedStudent.last_name,
      roomNo: updatedStudent.roomNo,
      city: updatedStudent.city,
      fatherContact: updatedStudent.fatherContact,
      image: updatedStudent.image,
    });
  } else {
    res.status(404);
    throw new Error("Estudiante no encontrado");
  }
});
const getAllStudents = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Student.countDocuments({ ...keyword });
  const students = await Student.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (students && students.length != 0) {
    res.json({ students, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("No Students Found");
  }
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await student.remove();
    res.json({ message: "Student removed" });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("Students not found");
  }
});

const getStudentByRoomNo = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findOne({
    date: Date().toString().substring(0, 15),
    roomNo: { $in: [req.params.roomId] },
  });
  const students = await Student.find({ roomNo: req.params.roomId });
  if (students) {
    attendance
      ? res.json({ students: students, attendance: attendance })
      : res.json({ students: students });
  } else {
    res.status(404);
    throw new Error("Students not found");
  }
});

export {
  addStudent,
  updateStudentProfile,
  getAllStudents,
  deleteStudent,
  getStudentById,
  getStudentByRoomNo,
};
