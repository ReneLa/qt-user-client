"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";
import { useEffect, useState } from "react";
import { addDays, format, getUnixTime } from "date-fns";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { onClose } from "@/redux/modal/modal.slice";
import { DatePickerWithRange } from "../date-picker";
import { cn } from "@/lib/utils";
import { useCreateTaskMutation } from "@/redux/task/task.slice";
import { Spinner } from "../spinner";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Task name isn required"
  }),
  description: z.string().min(1, {
    message: "Description is required"
  })
});

export const CreateTaskModal = () => {
  const { isOpen, type, data: modalData } = useSelector(({ Modal }) => Modal);
  const router = useRouter();
  const dispatch = useDispatch();
  const [createTask, { data, isLoading, isSuccess }] = useCreateTaskMutation();

  const isModalOpen = isOpen && type == "createTask";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      start_date: "",
      end_date: "",
      projectId: "",
      description: "",
      priority: "Normal"
    }
  });

  const [selectedAssignees, setSetSelectedAssignees] = useState([]);
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20)
  });

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      toast.success("Task created");
    }
  }, [isSuccess]);

  const onSubmit = async () => {
    const values = form.getValues();
    const newTask = {
      ...values,
      start_date: date.from,
      end_date: date.to,
      assignees: JSON.stringify(selectedAssignees)
    };

    // console.log(newTask);
    await createTask(newTask);
  };

  const handleClose = () => {
    form.reset();
    setSetSelectedAssignees([]);
    dispatch(onClose());
  };

  const handleSelectAssignee = (id) => {
    // console.log(id);
    const existAssignee = selectedAssignees?.find(
      (assignee) => assignee === id
    );

    // console.log(existAssignee, "assignee");
    if (!existAssignee) {
      setSetSelectedAssignees([...selectedAssignees, id]);
    } else {
      const filtered = selectedAssignees.filter((ass) => {
        return ass !== id;
      });

      setSetSelectedAssignees(filtered);
    }
  };

  const isSelected = (id) => {
    const existAssignee = selectedAssignees?.find(
      (assignee) => assignee === id
    );
    if (existAssignee) {
      return true;
    } else {
      return false;
    }
  };

  const renderAssignees = () => {
    return modalData?.assignees?.map((assignee) => {
      return (
        <div
          role="button"
          onClick={() => handleSelectAssignee(assignee.id)}
          className={cn(
            "flex items-center justify-center py-1 px-2 rounded-md border cursor-pointer hover:bg-neutral-100/30 hover:shadow-lg",
            isSelected(assignee.id) && "bg-[red]"
          )}
          key={assignee.id}
          style={{
            marginLeft: "5px",
            "&:hover": {
              "> button": {
                display: "flex"
              }
            }
          }}
        >
          <p className="text-[12px] text-white font-regular">
            {assignee.first_name}
          </p>
        </div>
      );
    });
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
          <div className="space-y-8">
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
                <DatePickerWithRange setDate={setDate} date={date} />
              </div>

              <div className="flex flex-col space-y-2 ">
                Assignee
                <div className="flex flex-wrap items-center py-2 space-x-2">
                  {renderAssignees()}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ">
                Project
                <Select onValueChange={(e) => form.setValue("projectId", e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {modalData?.projects.map((proj) => (
                        <SelectItem key={proj.id} value={proj.id}>
                          {proj.name}
                        </SelectItem>
                      ))}
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
                  defaultValue="Normal"
                  onValueChange={(e) => form.setValue("priority", e)}
                  className="flex flex-row items-center mt-2"
                  on
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Low" id="r1" />
                    <Label htmlFor="r1">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Normal" id="r2" />
                    <Label htmlFor="r2">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="High" id="r3" />
                    <Label htmlFor="r3">High</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter className="px-4 pb-4">
              <div className=" w-full flex items-center justify-between ">
                <div
                  role="button"
                  disabled={isLoading}
                  onClick={handleClose}
                  className="flex items-center justify-center py-1 w-1/3 bg-secondary rounded-md"
                >
                  Cancel
                </div>
                <div
                  role="button"
                  disabled={isLoading}
                  onClick={form.handleSubmit(onSubmit)}
                  className="flex justify-center items-center py-1 w-1/3 bg-primary rounded-md"
                >
                  {isLoading ? <Spinner size="sm" /> : "Submit"}
                </div>
              </div>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
