import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { useUpdatePassword } from "../../queryHooks/useUpdatePassword";
import { useSearchParams } from "react-router-dom";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate, isPending } = useUpdatePassword();

  const handleSendEmail = () => {
    if (!email || email.length < 5 || !email.includes("@")) return;

    setEmail(email);
    mutate(email);
    setIsSend(true);
    setEmail("");
  };

  const handleNavigate = (path: string) => {
    searchParams.set("auth-type", path);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full flex justify-center items-center mt-20">
      <form className="max-w-xl w-full flex justify-center items-center flex-col bg-black border-[1px] border-gray-700 py-4 px-6 rounded-lg gap-4">
        <h1 className="text-white text-xl font-semibold">Forgot Password</h1>
        <span className="text-white">
          We Will send you the mail in to your email address
        </span>
        {isSend && (
          <p className="text-green-500">
            We Already Send Confirmation Link. Please Check Your Email Address
          </p>
        )}
        <Input
          variant="faded"
          className="w-full"
          placeholder="Enter Your Email To Update Your Password"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="w-full flex justify-end items-center">
          <Button className="w-full" onClick={handleSendEmail}>
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
