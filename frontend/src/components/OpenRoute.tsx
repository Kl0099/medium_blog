import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
//@ts-ignore
const OpenRoute = ({ childern }: any) => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    return <Navigate to={"/blogs"} />;
  } else {
    toast.error("login first");
    return <Navigate to={"/signin"} />;
  }
};

export default OpenRoute;
