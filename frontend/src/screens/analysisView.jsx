import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {
  deleteAttendanceByDate,
  getAnalysisByDate,
} from "../actions/attendanceActions";
import AnalysisComponent from "../components/analysisComponent";
import Loading from "../components/loader";
import Message from "../components/message";

const AnalysisView = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [days, setDays] = useState(0);
  const [idList, setIdList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const attendanceAnalysis = useSelector((state) => state.attendanceAnalysis);
  const { attendance } = attendanceAnalysis;
  const attendanceDelete = useSelector((state) => state.attendanceDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = attendanceDelete;
  useEffect(() => {
    if (attendance) {
      var temp = idList;
      Object.entries(attendance.details).map((at) => {
        temp.push(at[0]);
      });

      setIdList(temp);
    } else {
      dispatch(getAnalysisByDate(startDate.toString().substring(0, 15)));
    }
  }, [attendance, dispatch]);

  const changeDate = (date) => {
    dispatch(getAnalysisByDate(date.toString().substring(0, 15)));
    setStartDate(date);
  };
  const showModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const startDelete = () => {
    setModal(false);
    dispatch(deleteAttendanceByDate(days));
  };

  return (
    <>
      <Row className="flex justify-content-between">
        <Link to="/" className="btn btn-light my-3">
          Regresar
        </Link>
        <div style={{ height: "40px", display: "flex" }}>
          <Button variant="outline-danger" size="sm" onClick={showModal}>
            Eliminar asistencia
          </Button>
        </div>
      </Row>
      {loadingDelete && <Loading />}
      {errorDelete && <Message variant="success">{errorDelete}</Message>}
      {successDelete && <Message variant="success">Asistencia eliminada</Message>}

      <Col>
        <Row>
          <Col>
            <Row>
              Reporte de: <strong> {startDate.toISOString().toString().substring(0, 10)}</strong>.
            </Row>
          </Col>
          <Col>
            <DatePicker
              selected={startDate}
              onChange={(date) => changeDate(date)}
            />
          </Col>
        </Row>
        <Modal show={modal} animation={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Ingresar número de días antes de eliminar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="days">
                <Form.Label>Ingresar número de días</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter days"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="outline-danger" onClick={startDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
        {<AnalysisComponent />}
      </Col>
    </>
  );
};

export default AnalysisView;
