import React from "react";
import AdminLogin from "../../pages/LogIn/AdminLogin";
import AdminRegister from "../../pages/SignIn/AdminRegister";
import "./AdminEnter.css";

const AdminEnter = () => {
  return (
    <div>
      <section className="AdminEnterSection">
        <div>
          <AdminLogin />
        </div>
        <div>
          <AdminRegister />
        </div>
      </section>
    </div>
  );
};

export default AdminEnter;
