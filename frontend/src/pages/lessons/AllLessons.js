import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Lesson from "./Lessons";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

/**
 * Represents a page that displays a list of lessons.
 * @param {string} message - A message to display.
 * @param {string} filter - A filter for the lessons.
 */

function AllLessonsPage({ message, filter = "" }) {
  // State for storing lessons and loading status
  const [lessons, setLessons] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  // State for the search query
  const [query, setQuery] = useState("");

  // Fetch lessons when component mounts or when filter or query changes
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data } = await axiosReq.get(
          `/lessons/?${filter}&search=${query}`
        );
        setLessons(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    // Reset loading status and fetch lessons
    setHasLoaded(false);
    fetchLessons();
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.Searchbar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>

        {hasLoaded ? (
          <>
            {lessons.results.length ? (
              // Render lessons using InfiniteScroll
              <InfiniteScroll
                children={lessons.results.map((lesson) => (
                  <Lesson key={lesson.id} {...lesson} setLessons={setLessons} />
                ))}
                dataLength={lessons.results.length}
                loader={<Asset spinner />}
                hasMore={!!lessons.next}
                next={() => {}}
              />
            ) : (
              // Render a message when there are no lessons
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          // Render a loading spinner while data is being fetched
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default AllLessonsPage;
