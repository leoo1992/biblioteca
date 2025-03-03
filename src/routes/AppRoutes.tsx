import { BrowserRouter, Routes, Route } from "react-router";
import Books from "../pages/Books";
import Authors from "../pages/Authors";
import Header from "../components/Header";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Books />} />
        <Route path="/authors" element={<Authors />} />
      </Routes>
    </BrowserRouter>
  );
}
