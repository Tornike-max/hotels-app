import { Button, Input, Spinner } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { account } from "../../appwriteConfig/appwrite";
import { useState } from "react";
import toast from "react-hot-toast";

type UpdatePasswordType = {
  password: string;
  repeatPass: string;
};

export default function UpdatePass() {
  const [isPending, setIsPending] = useState(false);
  const { register, handleSubmit, reset } = useForm<UpdatePasswordType>();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit: SubmitHandler<UpdatePasswordType> = async (data) => {
    try {
      setIsPending(true);
      if (!data.password || !data.repeatPass) return;
      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");

      await account.updateRecovery(
        userId || "",
        secret || "",
        data.password,
        data.repeatPass
      );

      toast.success("successfully update password");
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleNavigate = (path: string) => {
    searchParams.set("auth-type", path);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full flex justify-center items-center mt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl w-full flex justify-center items-center flex-col bg-black border-[1px] border-gray-700 py-4 px-6 rounded-lg gap-4"
      >
        <h1 className="text-white text-xl font-semibold">Password Recovery</h1>
        <span className="text-white">Please fill all the fields</span>

        <Input
          variant="faded"
          className="w-full"
          label="Enter new password"
          type="password"
          {...register("password", {
            required: "This Field Is Required",
          })}
        />
        <Input
          variant="faded"
          className="w-full"
          label="Repeat new password"
          type="password"
          {...register("repeatPass", {
            required: "This Field Is Required",
          })}
        />
        <div className="w-full flex justify-end items-center">
          <Button type="submit" className="w-full">
            {isPending ? <Spinner /> : "Send"}
          </Button>
        </div>
        <div className="w-full flex justify-end items-center px-2">
          <button
            onClick={() => handleNavigate("login")}
            className="text-slate-200 hover:text-white font-semibold text-sm"
          >
            Go Back to login form
          </button>
        </div>
      </form>
    </div>
  );
}
