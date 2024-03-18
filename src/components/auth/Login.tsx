import { useLogin } from "../../queryHooks/useLogin";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginType } from "../../types/types";
import { HiOutlineUser } from "react-icons/hi2";
import { Button } from "@nextui-org/button";
import { Input, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useGetUserContext } from "../../context/useGetUserContext";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { account } from "../../appwriteConfig/appwrite";

export default function Login() {
  const { register, handleSubmit, reset } = useForm<LoginType>();
  const { loginUser, isPending } = useLogin();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setIsAuthenticated } = useGetUserContext();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    console.log(data);
    if (!data.email || !data.password) {
      toast.error("Please fill all the fields");
      return;
    }

    await loginUser(data, {
      onSuccess: () => {
        setIsAuthenticated(true);
      },
    });
    reset();
  };

  const handleNavigate = (value: string) => {
    searchParams.set("auth-type", value);
    setSearchParams(searchParams);
  };

  const handleGoogleAuth = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    account.createOAuth2Session(
      "google",
      "http://localhost:5173",
      "http://localhost:5173/auth"
    );
  };
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl w-full flex justify-center items-center flex-col gap-2 bg-black border-[1px] border-gray-700 py-4 px-6 rounded-lg"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl text-white">Login</h1>

        <div className="w-full px-4 sm:px-8 py-2">
          <Input
            size="lg"
            placeholder="Email"
            type="email"
            startContent={<HiOutlineUser />}
            {...register("email", {
              required: "This Field Is Required",
            })}
          />
        </div>

        <div className="w-full px-4 sm:px-8 py-2">
          <Input
            size="lg"
            type="password"
            placeholder="Password"
            startContent={<HiOutlineUser />}
            {...register("password", {
              required: "This Field Is Required",
            })}
          />
        </div>
        <div className="w-full flex justify-end items-center px-4 sm:px-8">
          <Button
            type="submit"
            disabled={isPending}
            variant="shadow"
            color="default"
          >
            {isPending ? <Spinner size="sm" /> : "Login"}
          </Button>
        </div>
        <div className="w-full flex flex-col justify-end items-end gap-1">
          <button
            className="w-full text-white text-sm text-end px-4 sm:px-8 py-1"
            onClick={() => handleNavigate("signup")}
          >
            You don't have an account?{" "}
            <span className="font-bold">Sign up</span>
          </button>
          <button
            className="w-full text-white text-sm text-end px-4 sm:px-8 py-1"
            onClick={() => handleNavigate("forgot")}
          >
            Forget Password? <span className="font-bold">Click here</span>
          </button>
        </div>
        <p className="text-center text-white text-xl font-bold">OR</p>
        <div className="w-full flex justify-center items-center pt-2 gap-2">
          <button
            onClick={(e) => handleGoogleAuth(e)}
            className="flex items-center gap-1 py-1 px-2 border-1 rounded-md text-white hover:bg-white hover:text-black duration-75 transition-all"
          >
            <FcGoogle className="text-3xl " />
            <span className="text-base ">Log in with Google</span>
          </button>
          <button className="flex items-center gap-1 py-1 px-2 border-1 rounded-md text-white hover:bg-white hover:text-black duration-75 transition-all">
            <FaSquareFacebook className="text-3xl text-blue-500 " />
            <span className="text-base ">Log in with Facebook</span>
          </button>
        </div>
      </form>
    </div>
  );
}
