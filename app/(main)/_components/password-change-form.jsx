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
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChangePasswordMutation } from "@/redux/user/user.slice";

const FormSchema = z.object({
  current_password: z.string().min(2, {
    message: "Current password must be at least 2 characters."
  }),
  new_password: z.string().min(2, {
    message: "New password must be at least 2 characters."
  }),
  confirm_new_password: z.string().min(2, {
    message: "Confirm must be at least 2 characters."
  })
});

const PasswordChangeForm = () => {
  const router = useRouter();
  const [changePassword, { data, isError, isSuccess }] =
    useChangePasswordMutation();

  const [isSaving, setSaving] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: ""
    }
  });

  useEffect(() => {
    if (data && isSuccess) {
      router.replace("/profile");
    }
  }, [data, isSuccess, router]);

  const onSubmit = async (data) => {
    setSaving(true);
    setTimeout(() => {
      toast.success("New password saved");
      router.push("/");
      setSaving(false);
    }, 3000);

    // await changePassword(data).unwrap();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full px-8 space-y-6"
      >
        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
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
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <Button
            disabled={isSaving}
            type="submit"
            className={cn("w-1/4  py-4 text-white", isSaving && "opacity-8")}
          >
            {isSaving ? "updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordChangeForm;
