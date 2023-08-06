// import { Navigate, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

const PrivateRoutes = ({ children }) => {
  // const navigate = useNavigate();
  // const isAuthenticate = useSelector((state) => state.global.isAuthenticate);

  // useEffect(() => {
  //   if (isAuthenticate === false) {
  //     navigate("/login");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticate]);

  // return (localStorage.getItem("token") === "" ? false : true) &&
  //   (localStorage.getItem("isAuth") === "0" ? false : true) ? (
  //   children
  // ) : (
  //   <Navigate to="/login" />
  // );
  return children;
};

export default PrivateRoutes;
