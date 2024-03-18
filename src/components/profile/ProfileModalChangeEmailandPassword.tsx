import { Button, Input, Spinner } from "@nextui-org/react";
import { UseMutateFunction } from "@tanstack/react-query";
import { Models } from "appwrite";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdMail, MdOutlinePassword } from "react-icons/md";

type ChangeEmailType = {
  email: string;
  password: string;
};
export default function ProfileModalChangeEmailandPassword({
  userFromDB,
  isPending,
  updateInfo,
}: {
  userFromDB: Models.Document[] | null;
  isPending: boolean;
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
}) {
  const { register, handleSubmit } = useForm<ChangeEmailType>();

  const onSubmit: SubmitHandler<ChangeEmailType> = (data) => {
    if (!data.email || !data.password) return;
    updateInfo({
      email: data.email,
      password: data.password,
      documentId: (userFromDB && userFromDB[0].$id) || "",
    });
  };
  return (
    <form
      className="w-full flex justify-center items-center flex-col gap-2 text-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-white">Change Email</h1>
      <Input
        autoFocus
        endContent={
          <MdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Email"
        placeholder="Enter your email"
        variant="faded"
        defaultValue={userFromDB && userFromDB[0].email}
        {...register("email")}
      />
      <Input
        endContent={
          <MdOutlinePassword className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Password"
        placeholder="Enter your password"
        type="password"
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
}
