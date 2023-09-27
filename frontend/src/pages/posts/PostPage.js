import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Comment from "../comments/Comment";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * Component for rendering a single post page with post details and comments.
 */

function PostPage() {
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();

  // State variables to store the post and its comments
  const [post, setPost] = useState({ results: [] });

  // Accessing the current user from the context
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  // Fetch the post and its comments when the component mounts
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetch the post and comments data using Axios
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);

        // Update the state with the fetched post and comments
        setPost({ results: [post] });
        setComments(comments);
        console.log(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Render the post details using the Post component */}
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            // Render the CommentCreateForm if the user is logged in
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            // Display "Comments" if comments exist and the user is not logged in
            "Comments"
          ) : null}

          {/* Render the comments or a message if there are no comments */}
          {comments.results.length ? (
            comments.results.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                setPost={setPost}
                setComments={setComments}
              />
            ))
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;
