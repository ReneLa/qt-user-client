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
import { useResetPasswordMutation } from "@/redux/user/user.slice";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters."
  }),
  new_password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
});

const ResetForm = () => {
  const router = useRouter();
  const [resetPassword, { data, isError, isSuccess }] =
    useResetPasswordMutation();

  const [isFetching, setFetching] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      new_password: ""
    }
  });

  useEffect(() => {
    if (data && isSuccess) {
      router.replace("/projects");
    }
  }, [data, isSuccess, router]);

  const onSubmit = async (data) => {
    setFetching(true);
    setTimeout(() => {
      toast.success("Reset Successful");
      router.push("/projects");
      setFetching(false);
    }, 3000);

    // await resetPassword(data).unwrap();
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
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter New Password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-row items-center justify-center">
          <p className="text-sm font-regular text-center">Back to</p>
          <div
            role="button"
            className="text-sm font-regular text-center ml-1 text-[#0f6fec]"
            onClick={() => router.push("/signin")}
          >
            Sign in
          </div>
        </div>
        <Button
          disabled={isFetching}
          type="submit"
          className={cn("w-full py-4 text-white", isFetching && "opacity-8")}
        >
          {isFetching ? "resetting..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetForm;
