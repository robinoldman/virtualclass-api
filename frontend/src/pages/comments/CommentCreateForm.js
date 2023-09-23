import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

/**
 * CommentCreateForm component represents a form for creating new comments on a post.*/

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  /**
   * Handles changes in the comment content input field.
   * @param {object} event - The event object representing the input change.
   */

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  /**
   * Handles the submission of a new comment.
   * Sends a POST request to create a new comment, updates the comment list, and resets the input field.
   * @param {object} event - The event object representing the form submission.
   */

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to create a new comment
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      // Update the list of comments by adding the newly created comment at the beginning
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      // Update the post data to reflect the increased comments count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* Link to the user's profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          {/* Textarea input for entering the comment content */}
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {/* Submit button for posting the comment */}
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;
