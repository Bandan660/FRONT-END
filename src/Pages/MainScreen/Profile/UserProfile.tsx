import React, { Fragment } from "react";
import { useUserdetailsQuery } from "../../../Redux/api/userAPI";
import { decryptCode } from "../../../Utils/util";
import Loader from "../../../Components/Loader";

const UserProfile = () => {
  const userid = localStorage.getItem("$I") || "";
  const id = decryptCode({ token: userid }).trim().replace(/\W/g, "");
  const { data, isLoading, isError } = useUserdetailsQuery(id);
  const userData = data.user;
  console.log(userData);

  if (isLoading) return <Loader />;
  return (
    <Fragment>
      <h2 className="text-center">My Profile</h2>
      <div className="container d-flex justify-content-center">
        <div className="profile-info border-black border-1 border p-4 ">
          <table className="">
            <tbody>
              <tr>
                <td className="profile-info-label">Full name</td>
                <td className="profile-info-value">{userData.fullname}</td>
              </tr>
              <tr>
                <td className="profile-info-label">Email</td>
                <td className="profile-info-value">{userData.email}</td>
              </tr>
              <tr>
                <td className="profile-info-label"> Mobile No</td>
                <td className="profile-info-value">{userData.mobile}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex  justify-content-center mt-4">
            <button className="btn btn-dark w-100">Edit Profile</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
