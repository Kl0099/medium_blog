import { ChangeEvent, useState } from "react";
import { SignupInputes } from "common-zod-module";
import { Link, useNavigate } from "react-router-dom";
import { BACKENDURL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignupInputes>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKENDURL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        postInput
      );
      const { jwt } = response.data;
      console.log(jwt);
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>
        {type === "signup" ? (
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-black hover:underline"
            >
              Login
            </Link>
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-black hover:underline"
            >
              Signup
            </Link>
          </p>
        )}
      </div>

      {type === "signup" && (
        <LabelInput
          type="text"
          label="Name"
          placeholder="Enter your name"
          onChange={(e) => {
            setPostInput({ ...postInput, name: e.target.value });
          }}
        />
      )}
      <LabelInput
        type="email"
        label="Email"
        placeholder="Enter your email"
        onChange={(e) => {
          setPostInput({ ...postInput, email: e.target.value });
        }}
      />
      <LabelInput
        type="password"
        label="Password"
        placeholder="Enter your password"
        onChange={(e) => {
          setPostInput({ ...postInput, password: e.target.value });
        }}
      />
      <div>
        <button
          onClick={sendRequest}
          type="button"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelInput({
  type = "text",
  label,
  placeholder,
  onChange,
}: LabelInputType) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        required
      />
    </div>
  );
}
