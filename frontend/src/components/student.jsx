import React from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
const Student = ({ stuentDetails: student }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/student/${student._id}`}>
        <Image src={student.image} rounded fluid />
      </Link>
      <Card.Body>
        <Link to={`/student/${student._id}`}>
          <Card.Title as="div">
            <strong>{`${student.name} ${student.last_name}`}</strong>
          </Card.Title>
        </Link>
        <Row>
          <Col>Grado: {student.roomNo}</Col>
        </Row>
        <Row>
          <Col>Ciudad: {student.city}</Col>
        </Row>
        <Card.Text>
          Contacto del apoderado:
          <a href={`tel:${student.fatherContact}`}>{student.fatherContact}</a>
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
};

export default Student;
