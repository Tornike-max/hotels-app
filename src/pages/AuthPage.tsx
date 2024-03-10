import { useSearchParams } from "react-router-dom";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import ForgetPass from "../components/auth/ForgetPass";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const authType = searchParams.get("auth-type") || "login";
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center mt-20">
      {authType === "login" && <Login />}
      {authType === "signup" && <SignUp />}
      {authType === "forgot" && <ForgetPass />}
    </div>
  );
}
