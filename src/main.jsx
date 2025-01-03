import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AuthLayout from "./AuthLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import Protected from "./components/layout/Protected.jsx";
import AddPostPage from "./pages/AddPostPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ErrorPage from "./components/common/ErrorPage.jsx";
import EditPost from "./pages/EditPost.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="post/:id"
          element={
            // <Protected authentication={false}>
            <PostPage />
            // </Protected>
          }
        />
        <Route
          path="add-post"
          element={
            <Protected authentication={true}>
              <AddPostPage />
            </Protected>
          }
        />
        <Route
          path="profile/:id"
          element={
            <Protected authentication={true}>
              <ProfilePage />
            </Protected>
          }
        />
        <Route
          path="edit-post/:id"
          element={
            <Protected authentication={true}>
              <EditPost />
            </Protected>
          }
        />
        <Route path="*" element={<ErrorPage code={404} />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route
          path="login"
          element={
            <Protected authentication={false}>
              <LoginPage />
            </Protected>
          }
        />
        <Route
          path="signup"
          element={
            <Protected authentication={false}>
              <SignupPage />
            </Protected>
          }
        />
        <Route path="*" element={<ErrorPage code={404} />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
