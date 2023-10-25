import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "../actions/studentActions";
import Loading from "../components/loader.jsx";
import Message from "../components/message.jsx";
import { STUDENT_UPDATE_RESET } from "../constants/studentConstant";
import Loader from "../components/loader";

const AddStudentView = () => {
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [city, setCity] = useState("");
  const [fatherContact, setFatherContact] = useState("");
  const [image, setImage] = useState("");
  
  const dispatch = useDispatch();
  const studentAdd = useSelector((state) => state.studentAdd);
  const { loading, error, success } = studentAdd;
  const studentUpdate = useSelector((state) => state.studentUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = studentUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STUDENT_UPDATE_RESET });
      history.push("/");
    }
    if (history.location.state && history.location.state.studentProps) {
      setIsEdit(true);
      const student = history.location.state.studentProps;
      setName(student.name);
      setLastName(student.last_name);
      setRoomNo(student.roomNo);
      setCity(student.city);
      setFatherContact(student.fatherContact);
      setImage(student.image);      
    }
    if (success) {
      history.push("/");
    }
  }, [dispatch, history, success, successUpdate]);

  const submitHandler = () => {
    if (isEdit === true) {
      const _id = history.location.state.studentProps._id;
      dispatch(
        updateStudent({
          _id,
          name,
          last_name,
          roomNo,          
          city,
          fatherContact,
          image,
        })
      );
    } else {
      dispatch(
        addStudent({
          name,
          last_name,
          roomNo,          
          city,
          fatherContact,
          image,
        })
      );
    }
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Regresar
      </Link>

      {loading || loadingUpdate ? (
        <Loader />
      ) : (
        <>
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          <FormContainer>
            <h1>{isEdit ? "Editar Estudiante" : "Añadir Estudiante"}</h1>
            {loading && <Loading />}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}></Form>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="name"
                placeholder="Ingresar nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="adress">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar apellidos"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="roomNo">
              <Form.Label>Grado</Form.Label>
              <Form.Control
                as="select"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
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
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>            
            <Form.Group controlId="fatherContact">
              <Form.Label>Contacto del apoderado</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresar número telefónico"
                value={fatherContact}
                onChange={(e) => setFatherContact(e.target.value)}
              ></Form.Control>
            </Form.Group>            
            <Form.Group controlId="image">
              <Form.Label>URL de la foto del estudiante</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>            
            <Button type="submit" variant="primary" onClick={submitHandler}>
              {isEdit ? "Actualizar" : "Añadir estudiante"}
            </Button>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default AddStudentView;
