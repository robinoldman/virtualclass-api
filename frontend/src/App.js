import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import LessonsPage from "./pages/lessons/LessonsPage";
import AssignmentsPage from "./pages/assignments/assignments";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import AllLessonsPage from "./pages/lessons/AllLessons";
import LessonsEditForm from "./pages/lessons/LessonsEditForm";
import LessonCreateForm from "./pages/lessons/LessonCreateForm";
import AssignmentCreateForm from "./pages/assignments/AssignmentCreateForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/lessons/:id/edit"
            render={() => <LessonsEditForm />}
          />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route
            exact
            path="/assignments/create"
            render={() => <AssignmentCreateForm />}
          />
          <Route
            exact
            path="/lessons/create"
            render={() => <LessonCreateForm />}
          />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/lessons/:id" render={() => <LessonsPage />} />
          <Route exact path="/lessons" render={() => <AllLessonsPage />} />
          <Route
            exact
            path="/assignments/:id"
            render={() => <AssignmentsPage />}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
