import { Auth } from "../components/Auth";
import { Quete } from "../components/Quete";

export const Signin = () => {
  return (
    <div className="flex h-screen">
      {/* Left part: Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <Auth type="signin" />
      </div>
      {/* Right part: Testimonial */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <Quete />
      </div>
    </div>
  );
};
