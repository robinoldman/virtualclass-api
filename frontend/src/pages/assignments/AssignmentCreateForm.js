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

//import PopularProfiles from "../profiles/PopularProfiles";

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

  {
    /* Form fields */
  }

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Display validation errors for the title field */}
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Display validation errors for the content field */}
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>assign to</Form.Label>
        <Form.Control
          as="select"
          name="assigned"
          value={assigned}
          onChange={handleChange}
        >
          <option value="Sue">Sue</option>
          <option value="Rachel">Rachel</option>
          <option value="Barry">Barry</option>
          <option value="John">John</option>
        </Form.Control>
      </Form.Group>
      {/* Display validation errors for the assigned field */}
      {errors?.difficulty_level?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Display validation errors for the estimated time field */}
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Estimated Time (HH:MM:SS)</Form.Label>
        <Form.Control
          type="time"
          name="estimated_time"
          value={estimated_time}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.estimated_time?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="datetime-local" // You can use a suitable input type for datetime
          name="due_date"
          value={due_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.due_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Cancel and create buttons */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default AssignmentCreateForm;
