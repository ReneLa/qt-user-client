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
import { useLoginUserMutation } from "@/redux/user/user.slice";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  password: z.string().min(2, {
    message: "Password must be at least 8 characters."
  })
});

const LoginForm = () => {
  const router = useRouter();
  const [loginUser, { data, isError, isSuccess }] = useLoginUserMutation();

  const [isFetching, setFetching] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (data && isSuccess) {
      router.replace("/tasks");
    }
  }, [data, isSuccess, router]);

  const onSubmit = async (data) => {
    setFetching(true);
    setTimeout(() => {
      toast.success("Successful login");
      router.push("/projects");
      setFetching(false);
    }, 3000);

    // await loginUser(data).unwrap();
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
        <div className="w-full flex flex-row items-center justify-end">
          <div
            role="button"
            className="text-sm font-regular text-center ml-1 text-[#0f6fec]"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot Password?
          </div>
        </div>
        <Button
          disabled={isFetching}
          type="submit"
          className={cn("w-full py-4 text-white", isFetching && "opacity-8")}
        >
          {isFetching ? "authenticating..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
