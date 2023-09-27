import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

/**
 * Represents a component for displaying assignment posts.
 *
 * @param {object} props - The assignment post data.
 */

const Assignments = (props) => {
  const {
    id,
    owner,
    profile_id,
    difficulty_level,
    course,
    estimated_time,

    due_date,
    attachments,
    assigned,

    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    lessonsPage,
    postPage,
    setPosts,
  } = props;

  // Retrieve the current user from the context
  const currentUser = useCurrentUser();

  // Check if the current user is the owner of this assignment
  const is_owner = currentUser?.username === owner;

  // Get the profile image of the current user
  const profile_image = currentUser?.profile_image;

  // Access the history object for navigation
  const history = useHistory();

  // Log information for debugging purposes
  console.log("profile_image:", profile_image);
  console.log("owner:", owner);
  console.log("image:", image);

  /**
   * Handles the edit action for the assignment not functional.
   */

  const handleEdit = () => {
    history.push(`/assignments/${id}/edit`);
  };

  /**
   * Handles the delete action for the assignment not functional.
   */

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/assignments/${id}/`);
      history.push("/assignments");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          {/* Display the avatar of the assignment owner */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {/* Display a dropdown for edit and delete actions */}

            {/* Display the owner's username */}
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            {/* Display the post's last updated date */}
            <span>{updated_at}</span>
            {/* Display edit and delete dropdown for the owner */}
            {is_owner && lessonsPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/assignments/${id}`}>
        {/* Display the image of the assignment */}
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {/* Display the title, content, due date, estimated time, and assigned field */}
        {title && (
          <Card.Title className="text-center">Title : {title}</Card.Title>
        )}
        {content && <Card.Text>Content: {content}</Card.Text>}
        {due_date && <Card.Text>Due date: {due_date}</Card.Text>}
        {estimated_time && (
          <Card.Text>Estimated time: {estimated_time}</Card.Text>
        )}
        {assigned && <Card.Text>Assigned to : {assigned}</Card.Text>}
      </Card.Body>
    </Card>
  );
};
export default Assignments;
