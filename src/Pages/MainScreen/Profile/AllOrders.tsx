import { Fragment, fragment } from "react";
import { useMemo } from "react";
import { decryptCode } from "../../../Utils/util";
import { useAllOrderQuery } from "../../../Redux/api/orderAPI";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import Loader from "../../../Components/Loader";

const AllOrders = () => {
  const userid = localStorage.getItem("$I") || "";
  const id = decryptCode({ token: userid }).trim().replace(/\W/g, "");
  const {data, isLoading, isError } = useAllOrderQuery(id);
  const orderdata=data?.order || []
console.log(orderdata);




  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "_id",
      },
      {
        accessorKey: "cartItems",
        header: "Quantity",
        accessorFn: (row) => row.cartItems.length,

      },
      {
        accessorKey: "status",
        header: "Order status",
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment status",
      },
      {
        accessorKey: "total",
        header: "total",
      },
      {
        accessorKey: "createdAt",
        header: "Order Date",
        accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),

      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: orderdata , // Pass orderData to the MantineReactTable component
  });

  if (isLoading) {
    return <Loader />; // Render a loading spinner or component
  }
  if (isError) {
    return <div>Error fetching orders</div>; // Render an error message
  }

  return (
    <Fragment>
      <div className="container-fluid">
        <h2 className="text-center">My Orders</h2>
        <div className="container d-flex justify-content-center mt-4">
          <MantineReactTable table={table} />;
        </div>
      </div>
    </Fragment>
  );
};

export default AllOrders;
