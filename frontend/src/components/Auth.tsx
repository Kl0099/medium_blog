import { ChangeEvent, useState } from "react";
import { SignupInputes } from "common-zod-module";
import { Link } from "react-router-dom";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInput] = useState<SignupInputes>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className=" h-screen flex justify-center flex-col">
      <div className=" flex  flex-col justify-center">
        <div className=" mb-11">
          <h2 className=" text-3xl font-extrabold">Create an Account</h2>
          {type === "signup" ? (
            <p className=" text-sm mt-5 text-slate-500">
              Already have an account ?{" "}
              <Link
                to={"/signin"}
                className=" pl-2 underline"
              >
                Login
              </Link>
            </p>
          ) : (
            <p className=" text-sm mt-5 text-slate-500">
              Don't have an account ?{" "}
              <Link
                to={"/signup"}
                className=" pl-2 underline"
              >
                Signup
              </Link>
            </p>
          )}
        </div>
        {/* { all labels } */}
        <div className=" flex flex-col w-full ">
          {type === "signup" && (
            <LableInput
              type="text"
              label="Name"
              placeholder="Enter your name"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  name: e.target.value,
                });
              }}
            />
          )}
          <LableInput
            type="email"
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => {
              setPostInput({
                ...postInput,
                email: e.target.value,
              });
            }}
          />
          <LableInput
            type="password"
            label="password"
            placeholder=""
            onChange={(e) => {
              setPostInput({
                ...postInput,
                password: e.target.value,
              });
            }}
          />

          <button
            type="button"
            className=" hover:scale-90 rounded-md mt-5 bg-black w-full sm:w-[120%] p-2 text-white"
          >
            {type}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LableInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LableInput({ type, label, placeholder, onChange }: LableInputType) {
  return (
    <div className=" w-full  sm:w-[120%]  mb-4">
      <label
        htmlFor={label}
        className="   block mb-2 text-sm font-medium text-black"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id="first_name"
        className="bg-grey-50 border w-full p-2 rounded-md "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
