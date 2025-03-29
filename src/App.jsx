import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import AddRecipePage from "../pages/AddRecipePage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/add/Recipe" element={<AddRecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
