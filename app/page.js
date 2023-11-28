"use client";

import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { save_token, useGetUserInfoQuery } from "@/redux/user/user.slice";

import { Spinner } from "@/components/spinner";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const { token } = useSelector(({ User }) => User);
  // const { data, isSuccess, isError, isLoading } = useGetUserInfoQuery();

  const [isReady, setReady] = useState(false);

  const getUser = async () => {
    const token = await localStorage.getItem("auth");
    if (token) {
      setReady(true);
      dispatch(save_token(token));
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  // if (!token && !isReady) {
  //   return <Spinner size="lg" />;
  // }

  // if (!token && isReady) {
  //   return redirect("/signin");
  // }

  // if (token && isReady) {
  //   return redirect("/tasks");
  // }

  return redirect("/signin");
}
