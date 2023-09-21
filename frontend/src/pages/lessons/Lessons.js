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

  // Add console.log statements to check the values

  const currentUser = useCurrentUser();

  const is_owner = currentUser?.username === owner;
  const profile_image = currentUser?.profile_image;

  const history = useHistory();

  console.log("profile_image:", profile_image);
  console.log("owner:", owner);

  const handleEdit = () => {
    history.push(`/lessons/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/lessons/${id}/`);
      history.push("/lessons");
    } catch (err) {
      console.log(err);
    }
  };

  // ... rest of your component code

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
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
      <Link to={`/lessons/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        {content && <Card.Text>{difficulty_level}</Card.Text>}
        {content && <Card.Text>{course}</Card.Text>}
      </Card.Body>
    </Card>
  );
};
export default Lessons;