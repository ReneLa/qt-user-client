"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRegisterUserMutation } from "@/redux/user/user.slice";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  }),
  confirm_password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
});

const RegisterForm = () => {
  const router = useRouter();
  const [registerUser, { data, isError, isSuccess }] =
    useRegisterUserMutation();

  const [isFetching, setFetching] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: ""
    }
  });

  useEffect(() => {
    if (data && isSuccess) {
      router.replace("/profile");
    }
  }, [data, isSuccess, router]);

  const onSubmit = async (data) => {
    setFetching(true);
    setTimeout(() => {
      toast.success("Successful registered");
      router.push("/profile");
      setFetching(false);
    }, 3000);

    // await registerUser(data).unwrap();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full px-8 space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Re-enter Password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isFetching}
          type="submit"
          className={cn("w-full py-4 text-white", isFetching && "opacity-8")}
        >
          {isFetching ? "creating..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
