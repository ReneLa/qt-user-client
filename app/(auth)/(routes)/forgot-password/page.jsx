"use client";
import { useRouter } from "next/navigation";

import ResetForm from "../../_components/reset-form";

const ForgotPasswordPage = () => {
  return (
    <div className="w-1/3 min-h-1/2 flex flex-col  border border-[#202227] bg-[#141519] rounded-sm py-6 ">
      <div className="flex flex-col items-center justify-center px-4 py-4 space-y-2">
        <p className="text-3xl font-bold text-center">Forgot Password</p>
        <div className="flex items-center justify-center">
          <p className="text-sm font-regular text-center">
            {`Enter the email address associated with account.`}
          </p>
        </div>
      </div>
      <ResetForm />
    </div>
  );
};

export default ForgotPasswordPage;
