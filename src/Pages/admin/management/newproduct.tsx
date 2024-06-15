import { FormEvent, useState } from "react";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import toast from "react-hot-toast";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAddProductMutation } from "../../../Redux/api/productAPI";

const NewProduct = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    sold: "",
    quantity: "",
    images: null as FileList | null,
    size: "",
    color: "",
  });
  const [addProduct] = useAddProductMutation();

  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setForm({ ...form, images: files });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("sold", form.sold);
    formData.append("quantity", form.quantity);
    formData.append("size", form.size);
    formData.append("color", form.color);

    if (form.images) {
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }
    }
    
    try {
      const res = await addProduct(formData);
      if ("data" in res) {
        toast.success("Address added successfully");
      } else {
        const error = res.error as FetchBaseQueryError;

        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }

    // Replace with your actual upload logic, e.g., a call to your backend API
    console.log(form);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-groups col-md-6">
              <label htmlFor="title">Title :</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-groups col-md-6">
              <label htmlFor="slug">Slug :</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="form-groups col-md-6">
              <label htmlFor="description">Description :</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-groups col-md-6">
              <label htmlFor="price">Price :</label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="form-groups col-md-6">
              <label htmlFor="category">Category :</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-groups col-md-6">
              <label htmlFor="brand">Brand :</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="form-groups col-md-6">
              <label htmlFor="sold">Sold :</label>
              <input
                type="text"
                name="sold"
                value={form.sold}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-groups col-md-6">
              <label htmlFor="quantity">Quantity :</label>
              <input
                type="text"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="form-groups col-md-6">
              <label htmlFor="size">Size :</label>
              <input
                type="text"
                name="size"
                value={form.size}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-groups col-md-6">
              <label htmlFor="color">Color :</label>
              <input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row mt-3">
            <label htmlFor="images">Images</label>
            <input
              type="file"
              name="images"
              className="form-control"
              required
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div>
            <button className="btn btn-dark float-end mt-3">Submit</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewProduct;
