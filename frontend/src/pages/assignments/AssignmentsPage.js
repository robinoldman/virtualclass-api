import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import appStyles from "../../App.module.css";
import Comment from "../comments/Comment";
import Assignments from "./assignments";

/**
 * Represents a component for displaying a single assignment.
 */
function AssignmentPage() {
  // Extract the 'id' parameter from the URL using react-router
  const { id } = useParams();
  // Access the current user's data from the context
  const currentUser = useCurrentUser();

  // Retrieve the current user's profile image and difficulty level
  const profile_image = currentUser?.profile_image;
  const difficulty_level = currentUser?.difficulty_level;
  const [assignment, setAssignment] = useState({ results: [] });

  useEffect(() => {
    /**
     * Fetch assignment data from the server.
     */
    const fetchAssignment = async () => {
      try {
        // Send a GET request to retrieve assignment data by its ID
        const response = await axios.get(`/assignments/`);
        // Extract assignment data from the response
        const assignmentData = response.data;
        // Update the state with the retrieved assignment data
        setAssignment(assignmentData);
        // Log assignment data and profile image for debugging
        console.log("assignmentData on AssignmentPage: ", assignmentData);
        console.log(profile_image);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAssignment();
  }, []);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Conditional rendering based on assignment data */}
        {assignment.results.length ? (
          <>{<Assignments {...assignment.results[0]} />}</>
        ) : (
          <p>Loading assignment...</p>
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2"></Col>
    </Row>
  );
}

export default AssignmentPage;
