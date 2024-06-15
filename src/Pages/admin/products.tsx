import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminSidebar from "../../Components/admin/AdminSidebar";
import { useGetProductsQuery } from "../../Redux/api/productAPI";
import { Skeleton } from "@mui/material";
import { Product } from "../../Types/types";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

const Products = () => {
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useGetProductsQuery({});
  const data = product?.product;
  console.log(data);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {isError && <p>Something went wrong</p>}
        {data && (
          <table className="table  ">
            <thead className="thead table-dark">
              <tr>
                <th>image</th>

                <th>Title</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Description</th>
                <th>Edit</th>
              </tr>
            </thead>

            {data.map((product: Product) => (
              <tbody>
                <tr>
                  <td>
                    <img src={product.thumbnail} alt="" />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      className="badge bg-dark "
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        )}
      </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
