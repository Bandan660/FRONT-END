import { Fragment, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useGetAddressQuery,
} from "../../../Redux/api/addressAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { AddressResponse } from "../../../Types/api_types";
import { decryptCode } from "../../../Utils/util";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Address, AddressFormValues } from "../../../Types/types";
import Loader from "../../../Components/Loader";
import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from "../../../Redux/api/orderAPI";
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: 0,
  address: "",
  city: "",
  state: "",
  country: "",
  zip: 0,
};

// validation for form value

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Number should be 10 digits")
    .required("Mobile number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  zip: Yup.string()
    .matches(/^\d{6}$/, "Zip should be 5 digits")
    .required("Zip is required"),
});

const Shipping = () => {
  const RAZORPAY_KEY_ID = import.meta.env.RAZORPAY_KEY_ID;

  const [Address] = useCreateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [isloading, setloading] = useState(false);
  const [orderloading, setOrderloading] = useState(false);
  const [addressId, setAddressId] = useState<string>();
  const navigate = useNavigate();

  // get the user and decoding the user id
  const userid = localStorage.getItem("$I") || "";
  const id = decryptCode({ token: userid }).trim().replace(/\W/g, "");

  const { data, isLoading, isError, refetch } = useGetAddressQuery(id);
  const alladdress = data?.address || [];
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const cartItems = localStorage.getItem("cart");
  const cart = JSON.parse(cartItems);
  console.log(cart);

  const productid = [];
  const data2 = productid.push(cart.productId);
  console.log(data2);
  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  console.log(totalPrice);

  //handle form submit for creating address

  const handleSubmit = async (
    values: AddressFormValues,
    { resetForm }: any
  ) => {
    setloading(true);
    try {
      const {
        firstname,
        lastname,
        email,
        phone,
        address,
        city,
        state,
        country,
        zip,
      } = values;

      const res = await Address({
        firstname,
        lastname,
        email,
        phone,
        address,
        city,
        state,
        country,
        zip,
        Id: id,
      });

      if ("data" in res) {
        setloading(false);

        toast.success("Address added successfully");
        resetForm();
        window.location.reload();
      } else {
        setloading(false);

        const error = res.error as FetchBaseQueryError;
        const message = error.data as AddressResponse;
        toast.error(message.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle delete address
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteAddress({ id: id });
      if ("data" in res) {
        toast.success("Address deleted successfully");
        refetch();
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = error.data as AddressResponse;
        toast.error(message.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle order api

  const handleOrder = async () => {
    if(!addressId){
      toast.error("Please select a address");
      setOrderloading(false)


    }

    try {
      setOrderloading(true)

      // Create an order on your backend
      const orderData = {
        amount: totalPrice,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          note1: "This is a test order",
        },
        userId: id,
        shippingInfo: addressId,
        cartItems: cart,
      };


      const orderResponse = await createOrder(orderData);
      const { total, razorpayOrderId } = orderResponse.data.order;
     

      setOrderloading(false)

      // Razorpay options
      const options = {
        key: "rzp_test_40xWXMi2i2v7Xo",
        amount: total,
        currency: "INR",
        order_id: razorpayOrderId,
        name: "Sayanaworldverse",
        description: "Test Transaction",
        image: "https://sayanaworldverse.com/assets/logo-mN3UHO78.webp",
        handler: async (response) => {
          const paymentData = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const verificationResponse = await verifyPayment(paymentData);

          toast.success("payment successfull");
          setOrderloading(false)
        },
        prefill: {
          name: "Bandan Pradhan",
          email: "bandan472000@gmail.com",
          contact: "7077407660",
        },
        notes: {
          address: "Hyderabad",
        },
        theme: {
          color: "#212529",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      setOrderloading(false)

    }
  };

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      <section className="shipping info">
        <div className="container">
          {alladdress.length >= 1 ? (
            <div className="row mt-5">
              <div className="d-flex col-md-12 justify-content-between align-items-center mb-4">
                <h2 className="address-title">Shipping Address</h2>
                <button
                  className="btn btn-dark"
                  onClick={() => navigate("/addaddress")}
                >
                  Add New Address
                </button>
              </div>
              <div className="row d-flex">
                {alladdress.map((data: Address) => (
                  <div
                    className={`col-md-4 mb-3  `}
                    key={data._id}
                    onClick={() => setAddressId(data._id)}
                    
                  >
                    <div className={`card  ${addressId === data._id ? "border-1 border-black" : ""}`}>
                      <div className="card-body ">
                        <button
                          className="btn btn-dark position-absolute end-0 mx-3 edit "
                          onClick={() => navigate(`/editaddress/${data._id}`)}
                        >
                          <FaPen />
                        </button>
                        <button
                          className="btn btn-dark position-absolute end-0  mx-5 edit"
                          onClick={() => handleDelete(data._id)}
                        >
                          <FaTrash />
                        </button>
                        <p className="card-title">
                          Full Name : {data.firstname} {data.lastname}
                        </p>
                        <p className="card-text">
                          Address: {data.address}, {data.city}, {data.state},{" "}
                          {data.country}-{data.zip}{" "}
                        </p>

                        <p className="card-text">Phone: {data.phone}</p>
                        <p className="card-text">Email: {data.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row p-0">
                <div className="p-0 ">
                  <button
                    className="btn btn-dark float-end "
                    onClick={handleOrder}
                  >
                    {orderloading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </>
                    ) : (
                      <>Proceed To Payment</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <Field
                            type="text"
                            name="firstname"
                            className="form-control"
                            placeholder="Enter first name"
                          />
                          <ErrorMessage
                            name="firstname"
                            className="text-danger"
                            component="p"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <Field
                            type="text"
                            name="lastname"
                            className="form-control"
                            placeholder="Enter last name"
                          />
                          <ErrorMessage
                            name="lastname"
                            className=" text-danger"
                            component="p"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email</label>
                          <Field
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                          />
                          <ErrorMessage
                            name="email"
                            className=" text-danger"
                            component="p"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Mobile Number</label>
                          <Field
                            type="number"
                            name="phone"
                            className="form-control"
                            placeholder="Enter mobile number"
                          />
                          <ErrorMessage
                            name="phone"
                            className=" text-danger"
                            component="p"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Address</label>
                          <Field
                            type="text"
                            name="address"
                            className="form-control"
                            placeholder="Enter address"
                          />
                          <ErrorMessage
                            name="address"
                            className=" text-danger"
                            component="p"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>City</label>
                          <Field
                            type="text"
                            name="city"
                            className="form-control"
                            placeholder="Enter city name"
                          />
                          <ErrorMessage
                            name="address"
                            className=" text-danger"
                            component="p"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>State</label>
                          <Field
                            type="text"
                            name="state"
                            className="form-control"
                            placeholder="Enter state name"
                          />
                          <ErrorMessage
                            name="state"
                            className=" text-danger"
                            component="p"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Country</label>
                          <Field
                            type="text"
                            name="country"
                            className="form-control"
                            placeholder="Enter country name"
                          />
                          <ErrorMessage
                            name="country"
                            className=" text-danger"
                            component="p"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Pincode: </label>
                          <Field
                            type="text"
                            name="zip"
                            className="form-control"
                            placeholder="Enter Pincode"
                          />
                          <ErrorMessage
                            name="zip"
                            className=" text-danger"
                            component="p"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div>
                        <button
                          type="submit"
                          className="btn btn-dark  py-8  mb-4 rounded-2 float-end"
                        >
                          {isloading ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            "Add Address"
                          )}
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Shipping;
