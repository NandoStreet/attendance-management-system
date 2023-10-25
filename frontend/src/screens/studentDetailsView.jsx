import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Loading from "../components/loader";
import Message from "../components/message";
import {
  getStudentDetails,
  updateStudent,
  deleteStudent,
} from "../actions/studentActions";
import { STUDENT_UPDATE_RESET } from "../constants/studentConstant";
const StudentDetailsView = ({ match, history }) => {
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const studentDetails = useSelector((state) => state.studentDetails);
  const { loading, error, student } = studentDetails;
  const studentUpdate = useSelector((state) => state.studentUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = studentUpdate;
  const studentDelete = useSelector((state) => state.studentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = studentDelete;

  useEffect(() => {
    if (successDelete) {
      history.push("/");
    }
    if (successUpdate) {
      dispatch({ type: STUDENT_UPDATE_RESET });
    }
    if (!student || !student._id || student._id !== match.params.id) {
      dispatch(getStudentDetails(match.params.id));
    }
    if (student && student._id && !status) {
      setStatus(student.status);
    }
  }, [dispatch, match, successUpdate, successDelete]);

  const navigateToEdit = () => {
    history.push({
      pathname: `/student/edit/${student._id}`,
      state: { studentProps: student },
    });
  };
  const updateStatus = () => {
    student.status = status;
    dispatch(updateStudent(student));
  };

  const deleteStuden = () => {
    if (window.confirm("Estás seguro?")) {
      dispatch(deleteStudent(student._id));
    }
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Regresar
      </Link>
      {loading || loadingUpdate || loadingDelete ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {student && (
            <Row>
              <Col md={3}>
                <Image src={student.image} alt={student.name} fluid />
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{student.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Row>
                        <Col>Apellidos:</Col>
                        <Col> {student.last_name}</Col>
                      </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Row>
                        <Col>Contacto del apoderado:</Col>
                        <Col> {student.fatherContact}</Col>
                      </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Row>
                        <Col>Ciudad:</Col>
                        <Col> {student.city}</Col>
                      </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Row>
                        <Col>Grado:</Col>
                        <Col> {student.roomNo}</Col>
                      </Row>
                    </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                </Col>     
              <Col>
                <ListGroup variant="flush">
                  <Row>
                    <ListGroup.Item variant="secondary">
                      <Button onClick={navigateToEdit}>
                        <i className="fas fa-edit"></i>
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button variant="danger" onClick={deleteStuden}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </ListGroup.Item>
                  </Row>
                </ListGroup>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default StudentDetailsView;
