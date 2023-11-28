"use client";

import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { onOpen } from "@/redux/modal/modal.slice";
import TaskList from "../../_components/task-list";
import { selectUsersData } from "@/redux/user/user.slice";
import { selectProjectsData } from "@/redux/project/project.slice";

const TasksPage = () => {
  const dispatch = useDispatch();

  const assignees = useSelector(selectUsersData);
  const projects = useSelector(selectProjectsData);

  return (
    <div className="w-full h-full bg-[rgb(20,21,25)] flex flex-col border shadow-sm rounded-xl space-y-6 py-4 px-8">
      <div className="flex items-center justify-between">
        Your Tasks
        <Button
          className="text-white"
          onClick={() =>
            dispatch(
              onOpen({ type: "createTask", data: { assignees, projects } })
            )
          }
        >
          Create Task
        </Button>
      </div>

      <TaskList />
    </div>
  );
};

export default TasksPage;
