import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";

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
import {
  updateCurrentUser,
  useModifyUserMutation
} from "@/redux/user/user.slice";

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
  const dispatch = useDispatch();
  const { user } = useSelector(({ User }) => User);
  const [modifyUser, { data, isSuccess, isError, error, isLoading }] =
    useModifyUserMutation();

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
      const values = form.getValues();
      //populate user state in the store with updated data
      dispatch(updateCurrentUser({...user,...values}));

      toast.success("Changes Saved");
      router.push("/tasks");
      form.reset();
    }
    if (isError && error) {
      toast.error("Changes not saved");
    }
  }, [data, isSuccess, isError, error, router, form, dispatch]);

  const onSubmit = async (data) => {
    await modifyUser(data);
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
            disabled
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    defaultValues={user?.email}
                    disabled
                   value={user?.email}
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
            disabled={isLoading}
            type="submit"
            className={cn("w-1/4  py-4 text-white", isLoading && "opacity-8")}
          >
            {isLoading ? "saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForms;
