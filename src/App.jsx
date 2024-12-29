import React, { useContext } from "react";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import LogIn from "./pages/LogIn/LogIn";
import CreatePost from "./pages/CreatePost/CreatePost";
import ProductList from "./pages/AllProduct/ProductList";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import SearchComponent from "./pages/SearchResult/SearchComponent";
import SearchResultsPage from "./pages/SearchResult/SearchResultPage";
import CartComponent from "./pages/CartComponent/Cartcomponent";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import ForgetPassword from "./pages/PasswordReset/ForgetPassword";
import ResetPassword from "./pages/PasswordReset/ResetPassword";
import AdminEnter from "./pages/AdminPanel/AdminEnter";
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="*" element={<NotFoundPage />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<SignIn />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/upload-products" element={<CreatePost />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route exact path="/category/:category" element={<CategoryPage />} />
          <Route exact path="/search" element={<SearchComponent />} />
          <Route exact path="/product/search" element={<SearchResultsPage />} />
          <Route exact path="/cart" element={<CartComponent />} />
          <Route
            exact
            path="/user/profile/:userId"
            element={<UserDashboard />}
          />

          <Route exact path="/admin/sign-in" element={<AdminEnter />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/forgot-password" element={<ForgetPassword />} />
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
