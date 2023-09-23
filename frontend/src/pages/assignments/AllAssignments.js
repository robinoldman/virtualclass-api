import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Assignments from "./assignments";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

/**
 * Represents a page displaying all assignments.
 *
 * @param {object} props - The props passed to the component.
 * @param {string} props.message - A message to be displayed.
 * @param {string} props.filter - A filter for assignments (optional).
 */
function AllAssignmentsPage({ message, filter = "" }) {
  const [assignments, setAssignments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    /**
     * Fetch assignments from the server.
     */
    const fetchAssignments = async () => {
      try {
        const { data } = await axiosReq.get(
          `/assignments/?${filter} search=${query}`
        );
        setAssignments(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchAssignments();
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
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
            {/* Display assignments when loaded */}
            {assignments.results.length ? (
              <InfiniteScroll
                children={assignments.results.map((assignment) => (
                  <Assignments
                    key={assignment.id}
                    {...assignment}
                    setAssignments={setAssignments}
                  />
                ))}
                dataLength={assignments.results.length}
                loader={<Asset spinner />}
                hasMore={!!assignments.next}
                next={() => {}}
              />
            ) : (
              // Display message when no assignments are found
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          // Display a loading spinner while loading assignments
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default AllAssignmentsPage;
