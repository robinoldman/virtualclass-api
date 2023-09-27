import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Lessons = (props) => {
  const {
    id,
    owner,
    profile_id,
    difficulty_level,
    course,

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

  // Access the current user's data from the context

  const currentUser = useCurrentUser();
  // Check if the current user is the owner of the lesson
  const is_owner = currentUser?.username === owner;

  // Get the current user's profile image
  const profile_image = currentUser?.profile_image;

  // Access the router history
  const history = useHistory();

  // Log profile_image and owner for debugging
  console.log("profile_image:", profile_image);
  console.log("owner:", owner);

  const handleEdit = () => {
    // Redirect to the lesson edit page
    history.push(`/lessons/${id}/edit`);
  };

  // Send a DELETE request to delete the lesson
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/lessons/${id}/`);
      // Redirect to the lessons page
      history.push("/lessons");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        {/* Media section for user and lesson details */}
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            {/* Link to the owner's profile */}
            <Avatar src={profile_image} height={55} />
            {/* Dropdown menu for more options (edit, delete) */}
            <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            {/* Display the last update date */}
            <span>{updated_at}</span>
            {is_owner && lessonsPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      {/* Link to the individual lesson */}
      <Link to={`/lessons/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {/* Display the lesson's title if available */}
        {title && (
          <div>
            <span className="font-weight-bold">Title:</span> {title}
          </div>
        )}
        {/* Display the lesson's content if available */}
        {content && (
          <div>
            <span className="font-weight-bold">Content:</span> {content}
          </div>
        )}
        {/* Display the course if available */}
        {course && (
          <div>
            <span className="font-weight-bold">Course:</span> {course}
          </div>
        )}
        {/* Display the difficulty level if available */}
        {difficulty_level && (
          <div>
            <span className="font-weight-bold">Difficulty Level:</span>{" "}
            {difficulty_level}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
export default Lessons;
