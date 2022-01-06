import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { generateAxiosInstance } from "./axiosInstance";
import Products from "./screens/products/Products";
import Product from "./screens/product/Product";

generateAxiosInstance();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/products" exact element={<Products />} />
          <Route path="/products/:id" exact element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
