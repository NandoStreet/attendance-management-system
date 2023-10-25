import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import Paginate from "../components/paginate";
import { listStudents } from "../actions/studentActions";
import { Link } from "react-router-dom";

const StudentsTableView = ({ keyword, pageNumber }) => {
  const dispatch = useDispatch();

  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students, page, pages } = studentsList;
  useEffect(() => {
    if (!students) {
      dispatch(listStudents(keyword, pageNumber));
    }
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Contacto del apoderado</th>
                <th>Grado</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>
                    <Link to={`/student/${student._id}`}>{student.name}</Link>
                  </td>
                  <td>{student.last_name}</td>
                  <td>
                    <a href={`tel:${student.fatherContact}`}>{student.fatherContact}</a>
                  </td>
                  <td>{student.roomNo}</td>
                  <td>{student.city}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default StudentsTableView;
