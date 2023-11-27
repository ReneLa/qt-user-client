"use client";

import { useRouter } from "next/navigation";

import RegisterForm from "../../_components/register-form";

const SignUpPage = () => {
  const router = useRouter();
  return (
    <div className="w-1/3 min-h-1/2 flex flex-col  border border-[#202227] bg-[#141519] rounded-sm py-6 ">
      <div className="flex flex-col items-center justify-center px-4 py-4 space-y-2">
        <p className="text-3xl font-bold text-center">Sign Up</p>
        <div className="flex items-center justify-center">
          <p className="text-sm font-regular text-center">
            {`Already have an account??`}
          </p>
          <div
            role="button"
            className="text-sm font-regular text-center ml-1 text-[#0f6fec]"
            onClick={() => router.push("/signin")}
          >
            Sign in here
          </div>
        </div>
      </div>
      <RegisterForm />
    </div>
  );
};

export default SignUpPage;
