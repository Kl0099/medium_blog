import { Auth } from "../components/Auth";
export const Signup = () => {
  return (
    <div className=" flex md:flex-1  border items-center justify-center">
      {/* //part1 div  */}
      <div className=" md:w-[50%] w-full border flex items-center justify-center">
        <Auth type="signup" />
      </div>
      <div className=" lg:block hidden">
        <p>
          "The Customer service i recieved was exceptional.The support team went
          above and beyond to address my concern"
        </p>
        <p>Jules Winnfield</p>
        <p>CEO, Acna inc</p>
      </div>
    </div>
  );
};
