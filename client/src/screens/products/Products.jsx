import React, { useState, useEffect } from "react";
import "./Products.css";
import { axiosInstance } from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/products/categories").then((response) => {
      if ((response.status = 200 && response.data.length > 0)) {
        setCategories(response.data);
        setPage(0);
      }
    });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/products", { params: { page: page, category: selectedCategory } })
      .then((response) => {
        if ((response.status = 200)) {
          setProducts(response.data);
        }
      });
  }, [page, selectedCategory]);

  return (
    <div className="container">
      <div className="filter">
        <select
          value={selectedCategory}
          onChange={(event) => {
            console.log(event.target.value);
            setSelectedCategory(event.target.value);
          }}
        >
          <option value={"all"}>All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="products">
        {products.map((product, index) => (
          <div
            key={index}
            className="productCard"
            onClick={() => {
              navigate(`/products/${product._id}`);
            }}
          >
            <div className="productPicture">
              <img src={product.imageUrl}></img>
            </div>
            <div className="productName">{product.productName}</div>
            <div className="productCategory">{product.category}</div>
            <div className="productReviewAvg">
              {(
                product.reviews
                  .map((review) => review.value)
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue
                  ) / product.reviews.length
              ).toFixed(2)}
            </div>
            <div className="productPrice">{product.price}$</div>
            <div className="productDescription">{product.description}</div>
          </div>
        ))}
      </div>
      <div className="pages">
        <button
          className="previous"
          onClick={() => {
            if (page > 0) setPage(page - 1);
          }}
        >
          {"<"}
        </button>
        <span>{page + 1}</span>
        <button
          className="next"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Products;
