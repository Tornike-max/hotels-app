import { useLogin } from "../../queryHooks/useLogin";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginType } from "../../types/types";
import { HiOutlineUser } from "react-icons/hi2";
import { Button } from "@nextui-org/button";
import { Input, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, reset } = useForm<LoginType>();
  const { loginUser, isPending } = useLogin();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    console.log(data);
    if (!data.email || !data.password) {
      toast.error("Please fill all the fields");
      return;
    }

    loginUser(data);
    reset();
  };

  const handleNavigate = (value: string) => {
    searchParams.set("auth-type", value);
    setSearchParams(searchParams);
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
            <span className="font-bold">Click here</span>
          </button>
          <button
            className="w-full text-white text-sm text-end px-4 sm:px-8 py-1"
            onClick={() => handleNavigate("forgot")}
          >
            Forget Password? <span className="font-bold">Click here</span>
          </button>
        </div>
      </form>
    </div>
  );
}
