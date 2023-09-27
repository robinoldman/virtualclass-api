import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

/**
 * Component for rendering a page that displays a list of posts.
 *
 * @param {string} message - Message to display when there are no posts.
 * @param {string} filter - Filter for fetching specific posts (optional).
 */

function PostsPage({ message, filter = "" }) {
  // State variables to store posts data and loading status
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  // Get the current pathname using react-router's useLocation
  const { pathname } = useLocation();

  useEffect(() => {
    // Function to fetch posts based on the filter
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    // Set loading status to false and fetch posts when the component mounts
    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathname]);

  return (
    <Row className="h-100 justify-content-center align-items-center">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              // Render an InfiniteScroll component for posts
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => {}}
              />
            ) : (
              // Display a message with an image when there are no posts
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          // Display a spinner while loading posts
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default PostsPage;
