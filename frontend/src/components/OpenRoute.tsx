import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    return <Navigate to={"/blogs"} />;
  } else {
    toast.custom("login first");
    return <Navigate to={"/signin"} />;
  }
};

export default OpenRoute;
