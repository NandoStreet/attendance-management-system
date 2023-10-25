import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getStudentsByRoomNo as action } from "../actions/studentActions";
import AttendanceTable from "../components/attendanceTable";

const AttendanceView = () => {
  const [roomNo, setRoomNo] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(action(roomNo));
  };

  const changeRoomNo = (e) => {
    setRoomNo(e.target.value);
  };
  return (
    <>
      <h2>Tomar asistencia</h2>
      <Form onSubmit={submitHandler} inline>        
        <Form.Control
          as="select"
          value={roomNo}
          name="roomNo"
          className="mr-sm-2 ml-sm-5"
          onChange={(e) => changeRoomNo(e)}
        >
          {["1ro de Primaria", "2do de Primaria", "3ro de Primaria",
                  "4to de Primaria", "5to de Primaria", "6to de Primaria",
                  "1ro de Secundaria","2do de Secundaria","3ro de Secundaria",
                  "4to de Secundaria","5to de Secundaria"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
        </Form.Control>
        <Button type="submit" onClick={submitHandler}>
          Obtener estudiantes
        </Button>
      </Form>
      <AttendanceTable roomNo={roomNo} />
    </>
  );
};

export default AttendanceView;
