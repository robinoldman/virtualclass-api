import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios"; // Import Axios or your preferred HTTP library

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import Comment from "../comments/Comment";

function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`/lessons/${id}`);
        const lessonData = response.data;
        setLesson(lessonData);
        console.log(lessonData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLesson();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {lesson ? (
          <>
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>
          </>
        ) : (
          <p>Loading lesson...</p>
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2"></Col>
    </Row>
  );
}

export default LessonPage;
