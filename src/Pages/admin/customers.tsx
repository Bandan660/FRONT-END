import AdminSidebar from "../../Components/admin/AdminSidebar";
import { useAlluserQuery } from "../../Redux/api/userAPI";

const Customers = () => {
  const { data, isLoading, isError } = useAlluserQuery({});
  console.log(data);
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Cust id</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => {
                return (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.fullname}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.role}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Customers;
