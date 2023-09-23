import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Upload from "../../assets/upload.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

/**
 * Represents a form for creating assignments.
 */
function AssignmentCreateForm() {
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [AssignmentData, setAssignmentData] = useState({
    title: "",
    content: "",
    image: "",
    due_date: "",
    assigned: "",
    description: "",
  });
  const {
    title,
    content,
    image,
    due_date,
    description,
    estimated_time,
    assigned,
  } = AssignmentData;

  const imageInput = useRef(null);
  const history = useHistory();

  /**
   * Handles changes in the form fields.
   * @param {object} event - The event object.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAssignmentData({
      ...AssignmentData,
      [name]: value,
    });
  };

  /**
   * Handles changes in the uploaded image.
   * @param {object} event - The event object.
   */
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setAssignmentData({
        ...AssignmentData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  /**
   * Handles form submission.
   * @param {object} event - The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("description", description);

    formData.append("estimated_time", estimated_time);
    formData.append("due_date", due_date);
    formData.append("assigned", assigned);

    try {
      const { data } = await axiosReq.post("/assignments/", formData);
      history.push(`/assignments/${data.id}`);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = <div className="text-center">{/* Form fields */}</div>;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          {/* Image upload section */}
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          {/* Form fields section */}
        </Col>
      </Row>
    </Form>
  );
}

export default AssignmentCreateForm;
