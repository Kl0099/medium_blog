import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Home } from "./pages/Home";
import Blogs from "./pages/Blogs";
import AppBar from "./components/AppBar";
import AddBlog from "./pages/AddBlog";
import { RecoilRoot } from "recoil";
import OpenRoute from "./components/OpenRoute";
function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          {location.pathname === "signin" ||
          location.pathname === "signup" ? null : (
            <AppBar />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <OpenRoute>
                  <Home />
                </OpenRoute>
              }
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/signin"
              element={<Signin />}
            />
            <Route
              path="/blog/:id"
              element={<Blog />}
            />
            <Route
              path="/blogs"
              element={<Blogs />}
            />
            <Route
              path="/create"
              element={<AddBlog />}
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
