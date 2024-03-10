import { Button, Input, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdConfirmationNumber } from "react-icons/md";
import { Models } from "appwrite";
import { UseMutateFunction } from "@tanstack/react-query";

type ChangePhoneType = {
  phone: string;
  password: string;
};

const ProfileModalChangePhone = ({
  updateInfo,
  isPending,
  userFromDB,
}: {
  updateInfo: UseMutateFunction<
    Models.Document | undefined,
    Error,
    {
      email?: string | undefined;
      password: string;
      phone?: string | undefined;
      location?: string | undefined;
      documentId: string;
    },
    unknown
  >;
  isPending: boolean;
  userFromDB: Models.Document[] | null;
}) => {
  const { register, handleSubmit } = useForm<ChangePhoneType>();

  const onSubmit: SubmitHandler<ChangePhoneType> = (data) => {
    if (data.phone === "" || data.password === "") return;
    updateInfo({
      phone: data.phone,
      password: data.password,
      documentId: (userFromDB && userFromDB[0].$id) || "",
    });
  };

  return (
    <form
      className="py-2 w-full flex flex-col justify-center items-center gap-2 text-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-white">Change Phone Number</h1>
      <Input
        autoFocus
        endContent={
          <MdConfirmationNumber className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Phone"
        placeholder="Enter your Number"
        variant="faded"
        {...register("phone")}
      />
      <Input
        autoFocus
        endContent={
          <MdConfirmationNumber className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Password"
        placeholder="Enter Your Password"
        variant="faded"
        {...register("password")}
      />
      <div className="w-full flex justify-end items-center">
        <Button
          className="text-white"
          type="submit"
          color="success"
          variant="shadow"
        >
          {isPending ? <Spinner size="sm" /> : "Change"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileModalChangePhone;
