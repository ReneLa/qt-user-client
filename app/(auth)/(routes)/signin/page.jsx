"use client";
import { useRouter } from "next/navigation";

import LoginForm from "../../_components/login-form";

const SignInPage = () => {
  const router = useRouter();
  return (
    <div className="w-1/3 min-h-1/2 flex flex-col  border border-[#202227] bg-[#141519] rounded-sm py-6 ">
      <div className="flex flex-col items-center justify-center px-4 py-4 space-y-2">
        <p className="text-3xl font-bold text-center">Sign In</p>
        <div className="flex items-center justify-center">
          <p className="text-sm font-regular text-center">
            {`Don't have an account?`}
          </p>
          <div
            role="button"
            className="text-sm font-regular text-center ml-1 text-[#0f6fec]"
            onClick={() => router.push("/signup")}
          >
            Click here to sign up
          </div>
        </div>
      </div>
      <LoginForm />
    </div>
  );
};

export default SignInPage;
