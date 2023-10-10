import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Dashboard from "./pages/DashboardScreen/Dashboard";
import CreateRecipeScreen from "./pages/CreateRecipeScreen/CreateRecipeScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import ForumScreen from "./pages/ForumScreen/ForumScreen";
import RecipeScreen from "./pages/RecipeScreen/RecipeScreen";
import SignupScreen from "./pages/SignupScreen/SignupScreen";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import OnlineUsers from "./components/OnlineUsers/OnlineUsers";
import StatisticScreen from "./pages/StatisticScreen/StatisticScreen";

import "./App.css";
import CookBookScreen from "./pages/CookBookScreen/CookBookScreen";
import ThreadScreen from "./pages/ForumScreen/ThreadScreen";
import PostThreadScreen from "./pages/PostThreadScreen/PostThreadScreen";
import Search from "./pages/Search/SearchRecipe";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {/* <MyComponent /> */}
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                exact
                path="/create-recipe"
                element={
                  user ? <CreateRecipeScreen /> : <Navigate to="/login" />
                }
              />
              <Route
                exact
                path="/search"
                element={user ? <Search /> : <Navigate to="/login" />}
              />
              <Route
                exact
                path="/post-thread"
                element={user ? <PostThreadScreen /> : <Navigate to="/login" />}
              />
              <Route
                exact
                path="/statistic"
                element={user ? <StatisticScreen /> : <Navigate to="/login" />}
              />
              <Route
                exact
                path="/welcome"
                element={user ? <WelcomePage /> : <Navigate to="/login" />}
              />
              <Route
                exact
                path="/login"
                element={
                  user ? (
                    user.uid === "MftKVFhHnTYyuNGqVwqnjV4FAHt2" ? (
                      <Navigate to="/" />
                    ) : (
                      <Navigate to="/welcome" />
                    )
                  ) : (
                    <LoginScreen />
                  )
                }
              />
              <Route
                exact
                path="/cook-book"
                element={user ? <CookBookScreen /> : <Navigate to="/login" />}
              />
              <Route
                exact
                path="/forum"
                element={user ? <ForumScreen /> : <Navigate to="/login" />}
              />
              <Route
                exact
                path="/forum/thread/:id"
                element={user ? <ThreadScreen /> : <Navigate to="/login" />}
              />
              <Route
                exact
                path="/recipes/:id"
                element={user ? <RecipeScreen /> : <Navigate to="/login" />}
              />
              <Route
                exact
                path="/signup"
                element={
                  user ? (
                    user.uid === "MftKVFhHnTYyuNGqVwqnjV4FAHt2" ? (
                      <Navigate to="/" />
                    ) : (
                      <Navigate to="/welcome" />
                    )
                  ) : (
                    <SignupScreen />
                  )
                }
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
