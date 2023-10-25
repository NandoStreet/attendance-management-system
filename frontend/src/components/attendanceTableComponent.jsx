import React, { useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postAttendance } from "../actions/attendanceActions";
import { Link } from "react-router-dom";
const AttendanceTableComponent = ({
  students,
  attendanceMap,
  setAttendanceMap,
  attendance,
  roomNo,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch, attendanceMap]);
  const updateAttendance = () => {
    if (attendance) {
      if (!attendance.roomNo.includes(roomNo)) {
        attendance.roomNo.push(roomNo);
      }
    }
    const roomData = attendance ? attendance.roomNo : roomNo;
    const dataData = attendanceMap;
    const detailsData = attendance ? attendance.details : {};
    students.map((student) => {
      detailsData[student._id] = {
        name: student.name,
        last_name: student.last_name,
        fatherContact: student.fatherContact,
        roomNo: student.roomNo,
      };
    });

    dispatch(
      postAttendance({
        roomNo: roomData,
        details: detailsData,
        data: dataData,
      })
    );
  };
  return (
    <>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Asistencia</th>
            <th>Contacto del apoderado</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student) => (
              <>
                <tr key={student._id}>
                  <td>
                    <Link to={`/student/${student._id}`}>{student.name}</Link>
                  </td>
                  <td>{student.last_name}</td>                    
                  <td>
                    <Form>
                      <Form.Group controlId="status">
                        <Form.Control
                          as="select"
                          size="sm"
                          defaultValue={attendanceMap[student._id]}
                          onChange={(e) => {
                            var tempMap = attendanceMap;
                            tempMap[student._id] = e.target.value;
                            setAttendanceMap(tempMap);
                          }}
                        >
                          <option>Presente</option>
                          <option>Tardanza</option>
                          <option>Falta</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </td>
                  <td>
                    <a href={`tel:${student.fatherContact}`}>{student.fatherContact}</a>
                  </td>
                  <td>{student.city}</td>
                </tr>
              </>
            ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={updateAttendance}>
        Registrar Asistencia
      </Button>
    </>
  );
};

export default AttendanceTableComponent;
