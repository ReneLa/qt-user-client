"use client";

import Image from "next/image";

import { Separator } from "@/components/ui/separator";

const TASKS = [
  {
    id: "1",
    name: "Design UI",
    start_date: "2022-01-94",
    end_date: "2033-04-03",
    assignee: [
      {
        id: "2",
        name: "Rene La",
        title: "Developer",
      },
      {
        id: "3",
        name: "Rene La",
        title: "Developer",
      },
      {
        id: "3",
        name: "Rene La",
        title: "Developer",
      },
    ],
    project: {
      title: "QT user Module",
    },
    description: "Lorem ipsum ipsumnsdas sdasd",
  },
  {
    id: "3",
    name: "Design UI",
    start_date: "2022-01-94",
    end_date: "2033-04-03",
    assignee: [
      {
        id: "2",
        name: "Rene La",
        title: "Developer",
      },
      {
        id: "3",
        name: "Rene La",
        title: "Developer",
      },
      {
        id: "3",
        name: "Rene La",
        title: "Developer",
      },
    ],
    project: {
      title: "QT user Module",
    },
    description: "Lorem ipsum ipsumnsdas sdasd",
  },
  {
    id: "3",
    name: "Design UI",
    start_date: "2022-01-94",
    end_date: "2033-04-03",
    assignee: [
      {
        id: "2",
        name: "Rene La",
        title: "Developer",
      },
      {
        id: "3",
        name: "Rene La",
        title: "Developer",
      },
      {
        id: "3",
        name: "Rene La",
        title: "Developer",
      },
    ],
    project: {
      title: "QT user Module",
    },
    description: "Lorem ipsum ipsumnsdas sdasd",
  },
];
const TaskList = () => {
  return (
    <div className="mt-2 grid grid-cols-3 gap-4">
      {TASKS.map((task) => (
        <div className="w-full bg-[rgb(20,21,25)] max-h-1/2 flex flex-col border shadow-sm rounded-xl space-y-4 pb-2">
          <div className="relative  w-full h-[60px]">
            <div className="absolute flex  -bottom-8 w-full left-0 right-0 z-10 items-center justify-center">
              <div className="relative w-16 h-14 rounded-lg border-2 border-white">
                <Image
                  src="/wallpaper.jpg"
                  fill
                  className="object-contain"
                  alt="Wallpaper"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex-col items-center space-y-3-2  pt-6">
            <h4 className="text-base sm:text-xl md:text-xl font-medium text-center">
              {task.name}
            </h4>
            <p className="text-[13px] font-regular text-neutral-300/50 text-center">
              {task.project.title}
            </p>
          </div>
          <div className="w-full flex-col items-center px-4">
            <p className="text-[13px] font-regular text-neutral-300/50 text-center">
              {`I'd love to change the world, but they won’t give me the source code.`}
            </p>
          </div>
          <Separator />
          <div className="w-full px-4 items-center justify-center">
            <div
              role="button"
              className="text-sm font-regular text-center ml-1 text-[#0f6fec]"
              //   onClick={() => router.push("/profile")}
            >
              View Settings
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
