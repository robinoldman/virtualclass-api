import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

/**
 * Represents a component for editing a lesson.
 */

function LessonsEditForm() {
  const [errors, setErrors] = useState({});
  // State to manage lesson data
  const [LessonData, setLessonData] = useState({
    title: "",
    content: "",
    image: "",
    difficulty_level: "",
    course: "",
  });
  const { title, content, image, course, difficulty_level } = LessonData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    /**
     * Fetch lesson data when the component mounts.
     */
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/lessons/${id}/`);
        const { title, content, image, is_owner, course, difficulty_level } =
          data;

        is_owner
          ? setLessonData({ title, content, image, course, difficulty_level })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    // Update the lesson data state when form inputs change
    setLessonData({
      ...LessonData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    // Revoke the previous image URL and set a new one when a new image is selected
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
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
    formData.append("course", course);
    formData.append("difficulty_level", difficulty_level);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      // Send a PUT request to update the lesson data
      await axiosReq.put(`/lessons/${id}/`, formData);
      history.push(`/lessons/${id}`);
      // Redirect to the lesson page after successful update
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        // Set form errors if the request is not unauthorized
        setErrors(err.response?.data);
      }
    }
  };

  // JSX for form fields
  {
    /* Title input */
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
      {/* Cancel and Save buttons */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.push("/lessons")}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
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
              {/* Display the lesson's image */}
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

              {/* Input for changing the lesson's image */}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {/* Display image errors */}
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Display textFields on mobile */}
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

export default LessonsEditForm;
