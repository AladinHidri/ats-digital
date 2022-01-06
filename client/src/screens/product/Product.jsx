import React, { useState, useEffect } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/products/${id}`).then((response) => {
      if ((response.status = 200)) {
        setProduct(response.data);
      }
    });
  }, []);

  return product == null ? (
    <React.Fragment></React.Fragment>
  ) : (
    <div className="container">
      <div className="header">
        <div className="productPicture">
          <img src={product.imageUrl}></img>
        </div>
        <div className="content">
          <div className="productName">Name :&nbsp;{product.productName}</div>
          <div className="productCategory">
            Category :&nbsp;{product.category}
          </div>
          <div className="productReviewAvg">
            Reviews Average :&nbsp;
            {(
              product.reviews
                .map((el) => el.value)
                .reduce(
                  (previousValue, currentValue) => previousValue + currentValue
                ) / product.reviews.length
            ).toFixed(2)}
          </div>
          <div className="productPrice">Price :&nbsp;{product.price}$</div>
          <div className="productAllDescription">
            Description :&nbsp;{product.description}
          </div>
        </div>
      </div>
      <div className="reviews">
        {product.reviews.map((review, index) => (
          <div key={index} className="review">
            <div>Review :&nbsp; {review.value}</div>
            <div>Comment :&nbsp; {review.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
