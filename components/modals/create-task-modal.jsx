"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { onClose } from "@/redux/modal/modal.slice";
import { DatePickerWithRange } from "../date-picker";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Task name isn required"
  }),
  start_date: z.string().min(1, {
    message: "Start date is required"
  }),
  end_date: z.string().min(1, {
    message: "End date is required"
  }),
  description: z.string().min(1, {
    message: "Description is required"
  }),
  fileUrl: z.string().min(1, {
    message: "File url is required"
  })
});

export const CreateTaskModal = () => {
  const { isOpen, type } = useSelector(({ Modal }) => Modal);
  const router = useRouter();
  const dispatch = useDispatch();

  const isModalOpen = isOpen && type == "createTask";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      start_date: "",
      end_date: "",
      description: "",
      fileUrl: ""
    }
  });

  //destruct to know when form is submitting
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      form.reset();
      router.refresh();
      dispatch(onClose());
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  };

  const handleClose = () => {
    form.reset();
    dispatch(onClose());
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#191a1f] p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Task
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between space-x-4">
                <DatePickerWithRange />
              </div>

              <div className="flex flex-col space-y-2 ">Assignee</div>

              <div className="flex flex-col space-y-2 ">
                Project
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">QT User module</SelectItem>
                      <SelectItem value="banana">QT Task module </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add more details to this task"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-2 ">
                Priority
                <RadioGroup
                  defaultValue="comfortable"
                  className="flex flex-row items-center mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Default</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">Comfortable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3">Compact</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter className="px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
