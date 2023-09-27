import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import appStyles from "../../App.module.css";
import Comment from "../comments/Comment";
import Lessons from "./Lessons";

/**
 * Component for rendering a single lesson page.
 */
function LessonPage() {
  // Get the lesson ID from the route parameters
  const { id } = useParams();
  // Get the current user data from the context
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const difficulty_level = currentUser?.difficulty_level;
  // State to hold the lesson data
  const [lesson, setLesson] = useState({ results: [] });

  useEffect(() => {
    // Fetch lesson data when the component mounts
    const fetchLesson = async () => {
      try {
        // Send a request to retrieve lesson data
        const response = await axios.get(`/lessons/`);
        const lessonData = response.data;
        setLesson(lessonData);
        console.log("lessonData on LessonsPage: ", lessonData);
        console.log(profile_image);
      } catch (err) {
        console.error(err);
      }
    };
    // const fetchLesson = async () => {

    fetchLesson();
  }, []);

  // Call the fetchLesson function
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {lesson.results.length ? (
          <>
            {/* Render lesson title and content */}
            <h1>Lesson Title:{lesson.results[0].title}</h1>
            <p>Lesson Content:{lesson.results[0].content}</p>
            {/* Render child component Lessons with lesson data */}
            {<Lessons {...lesson.results[0]} />}
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
