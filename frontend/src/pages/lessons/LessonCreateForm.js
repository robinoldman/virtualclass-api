import React, { useState, useRef } from "react";

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
 * Represents a form for creating a new lesson.
 */

function LessonCreateForm() {
  // State for storing form errors
  const [errors, setErrors] = useState({});

  // State for lesson data
  const [LessonData, setLessonData] = useState({
    title: "",
    content: "",
    image: "",
    difficulty_level: "",
    course: "",
  });
  const { title, content, image, course, difficulty_level } = LessonData;
  // Ref for file input
  const imageInput = useRef(null);

  // Access to the router history
  const history = useHistory();

  const handleChange = (event) => {
    // Update LessonData with form field values
    setLessonData({
      ...LessonData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      // Revoke the previous object URL to prevent memory leaks
      URL.revokeObjectURL(image);
      // Update LessonData with the newly selected image
      setLessonData({
        ...LessonData,
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

    try {
      // Send a POST request to create a new lesson
      const { data } = await axiosReq.post("/lessons/", formData);
      // Redirect to the newly created lesson
      history.push(`/lessons/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        // Set errors if there are any
        setErrors(err.response?.data);
      }
    }
  };

  // JSX for the form fields
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
      {/* Display title errors */}
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Content textarea */}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
        {/* Display content errors */}
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        {/* Difficulty level select */}
        <Form.Label>difficulty level</Form.Label>
        <Form.Control
          as="select"
          name="difficulty_level"
          value={difficulty_level}
          onChange={handleChange}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </Form.Control>
      </Form.Group>
      {/* Display difficulty level errors */}
      {errors?.difficulty_level?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        {/* Course select */}
        <Form.Label>Course</Form.Label>
        <Form.Control
          as="select"
          name="course"
          value={course}
          onChange={handleChange}
        >
          <option value="Maths">Maths</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
        </Form.Control>
      </Form.Group>
      {errors?.course?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* 'Cancel' and 'Create' buttons */}
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
            {/* Render the textFields component for smaller screens */}
            <div className="d-md-none">{textFields}</div>

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

              {/* File input for image upload */}
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
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          {/* Render the textFields component for larger screens */}
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default LessonCreateForm;
