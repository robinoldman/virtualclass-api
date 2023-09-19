import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios"; // Import Axios or your preferred HTTP library

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import appStyles from "../../App.module.css";
import Comment from "../comments/Comment";
import Lessons from "./Lessons";

function LessonPage() {
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const difficulty_level = currentUser?.difficulty_level;
  const [lesson, setLesson] = useState({ results: [] });

  useEffect(() => {
    const fetchLesson = async () => {
      try {
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
    //   try {
    //     const response = await axios.get(`/lessons/${id}`);
    //     const lessonData = response.data;
    //     setLesson({ ...lessonData, results: lessonData.results || [] });
    //     console.log("lessonData on LessonsPage: ", lessonData);
    //     console.log(lesson);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    fetchLesson();
  }, []);
  // }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {lesson.results.length ? (
          // {lesson ? (
          <>
            <h1>{lesson.results[0].title}</h1>
            <p>{lesson.results[0].content}</p>
            {/* <h1>{lesson.title}</h1>
            <p>{lesson.description}</p> */}
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
