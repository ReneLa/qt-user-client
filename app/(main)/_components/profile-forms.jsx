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
import { useModifyUserMutation } from "@/redux/user/user.slice";

const FormSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters."
  }),
  last_name: z.string().min(2, {
    message: "Last Name must be at least 2 characters."
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters."
  }),
  caption: z.string().min(2, {
    message: "Caption must be at least 2 characters."
  })
});

const ProfileForms = () => {
  const router = useRouter();
  const [modifyUser, { data, isError, isSuccess }] = useModifyUserMutation();

  const [isSaving, setSaving] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      title: "",
      caption: ""
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
      toast.success("Changes Saved");
      router.push("/profile");
      setSaving(false);
    }, 3000);

    // await modifyUser(data).unwrap();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full px-8 space-y-6"
      >
        <div className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Rene" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="La" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="eg. Software Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="renela79@gmail.com"
                    disabled
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caption</FormLabel>
                <FormControl>
                  <Input placeholder="Enter caption" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button
            disabled={isSaving}
            type="submit"
            className={cn("w-1/4  py-4 text-white", isSaving && "opacity-8")}
          >
            {isSaving ? "saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForms;
