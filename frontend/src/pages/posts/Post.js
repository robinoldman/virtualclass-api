import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { PostEditForm } from "../../pages/posts/PostEditForm";

/* Component to display a post. */
const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  /**
   * Event handler for editing the post.
   */

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  /**
   * Event handler for deleting the post.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Event handler for liking the post not funcional.
   */
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Event handler for unliking the post. not functional
   */
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            {/* Display the profile's avatar */}
            <Avatar src={profile_image} height={55} />
            <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            {/* Display the owner's username */}
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            {/* Display the post's last updated timestamp */}
            <span>{updated_at}</span>
            {is_owner && postPage}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        {/* Display the post's image with a link to its detail page */}
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {/* Display the post's title (if available) */}
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {/* Display the post's content (if available) */}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {/* Display like/unlike button and count */}

          {/* Link to the post's detail page with comment count */}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
