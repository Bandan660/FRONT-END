import React, { Fragment, useState } from "react";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  handler: () => void;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  description,
  handler,
}: ProductProps) => {
  const [value, setValue] = useState<number | null>(2);
  const navigate = useNavigate()

  return (
    <Fragment>
      <div className="productCard col-6 col-sm-4 col-md-3 col-xl-2 my-3 d-flex flex-column align-items-center"    >
        <div className="w-100 position-relative">
          <img
            src={photo}
            alt={name}
            className="productImg position-relative"
          />
          <button className="position-absolute top-0 wish-list">
            <FaRegHeart />
          </button>
          <button
            onClick={handler}
            className="position-ab
            solute add-to-cart"
          >
            Add to Bag
          </button>
        </div>
        <div className="product-details mt-3" onClick={() => navigate(`/product/${name}`)}>
          <h3 className="productName">{name}</h3>

          <p className="productPrice">₹ {price}</p>
          <Rating
            name="read-only"
            value={value}
            readOnly
            className="custom-rating"
          />

          <p className="productDescription">{description}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
