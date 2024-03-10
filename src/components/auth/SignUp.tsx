import { SubmitHandler, useForm } from "react-hook-form";
import { SignupType } from "../../types/types";
import { HiOutlineUser } from "react-icons/hi2";
import { Button } from "@nextui-org/button";
import { Input, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useSignup } from "../../queryHooks/useSignup";
import { useSearchParams } from "react-router-dom";
import { useLogin } from "../../queryHooks/useLogin";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<SignupType>();
  const { signupUser, isPending } = useSignup();
  const { loginUser } = useLogin();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit: SubmitHandler<SignupType> = async (data) => {
    console.log(data);
    if (!data.email || !data.password || !data.password1) {
      toast.error("Please fill all the fields");
      return;
    }

    const signup = await signupUser(data);
    if (signup) {
      loginUser({ email: data.email, password: data.password });
      reset();
    }
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
            placeholder="User Name"
            type="text"
            errorMessage={errors.fullname && errors.fullname.message}
            startContent={<HiOutlineUser />}
            {...register("fullname", {
              required: "This Field Is Required",
            })}
          />
        </div>

        <div className="w-full px-4 sm:px-8 py-2">
          <Input
            size="lg"
            placeholder="Email"
            type="email"
            errorMessage={errors.email && errors.email.message}
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
            errorMessage={errors.password && errors.password.message}
            startContent={<HiOutlineUser />}
            {...register("password", {
              required: "This Field Is Required",
            })}
          />
        </div>
        <div className="w-full px-4 sm:px-8 py-2">
          <Input
            size="lg"
            type="password"
            placeholder="Repeat Password"
            errorMessage={errors.password && errors.password.message}
            startContent={<HiOutlineUser />}
            {...register("password1", {
              required: "This Field Is Required",
              validate: (value) =>
                value === getValues().password || "Password Should match",
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
            {isPending ? <Spinner size="sm" /> : "Register"}
          </Button>
        </div>
        <button
          className="w-full text-white text-sm text-end px-4 sm:px-8 py-1"
          onClick={() => handleNavigate("login")}
        >
          Already have an account? <span className="font-bold">Click here</span>
        </button>
      </form>
    </div>
  );
}
