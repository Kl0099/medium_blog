import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const AppBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-white py-4 px-8">
      <Link
        to={"/blogs"}
        className="sm:text-2xl text-xl  mr-2 font-bold"
      >
        Medium
      </Link>
      <div className="flex items-center lg:mr-10 space-x-6">
        {localStorage.getItem("token") === null ? (
          <>
            <Link
              to={"/signin"}
              className="text-black"
            >
              Sign in
            </Link>
            <button
              onClick={() => navigate("/signup")}
              className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            <div
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
                toast.success("logged out successfully");
              }}
              className="text-black hover:underline cursor-pointer "
            >
              Logout
            </div>
            <Link
              to={"/create"}
              className="text-black hover:underline cursor-pointer"
            >
              Write
            </Link>
            <Avatar />
          </>
        )}
      </div>
    </div>
  );
};

function Avatar() {
  const [name, setName] = useState("");
  useEffect(() => {
    const decodeTokken = async () => {
      const token = localStorage.getItem("token") || "";
      const decode = jwtDecode(token) || "";
      // console.log(decode);
      //@ts-ignore
      setName(decode.name);
    };
    decodeTokken();
  }, []);
  let firstName = name.split(" ")[0];
  let lastName = name.split(" ")[1];
  if (!firstName) {
    firstName = name;
  }
  if (!lastName) {
    lastName = " ";
  }
  const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`;

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
      <img
        src={userImage}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default AppBar;
