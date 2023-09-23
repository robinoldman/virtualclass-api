import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CommentCreateEditForm.module.css";

/* Component for editing a comment.*/
function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  // State to track the edited content of the comment
  const [formContent, setFormContent] = useState(content);

  /**
   * Event handler for input change.
   *
   * @param {Object} event - The input change event.
   */
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  /**
   * Event handler for form submission.
   *
   * @param {Object} event - The form submission event.
   */

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a PUT request to update the comment
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      // Update the comments list with the edited comment content
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      // Hide the edit form
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        {/* Textarea input for editing the comment content */}
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        {/* Cancel button to exit edit mode */}
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        {/* Save button to update the comment */}
        <button
          className={styles.Button}
          disabled={!content.trim()} // Disable if the content is empty or whitespace
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
