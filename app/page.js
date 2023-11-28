"use client";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

import { useGetUserInfoQuery } from "@/redux/user/user.slice";

import { Spinner } from "@/components/spinner";
export default function Home() {
  const { token } = useSelector(({ User }) => User);
  const { data, isSuccess, isError, isLoading } = useGetUserInfoQuery();

  if (!token) {
    return redirect("/signin");
  }

  if (token && isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (token && isError) {
    return redirect("/signin");
  }

  if (isSuccess && data?.user) {
    return redirect("/tasks");
  }

  return null;
}
