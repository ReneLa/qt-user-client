"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { Separator } from "@/components/ui/separator";

const UserInfo = () => {
  const router = useRouter();
  const { user } = useSelector(({ User }) => User);
  return (
    <div className="w-2/5 bg-[rgb(20,21,25)] max-h-1/2 flex flex-col border shadow-sm rounded-xl space-y-6 pb-4">
      <div className="relative  w-full h-[60px]">
        <Image
          src="/wallpaper.jpg"
          fill
          className="object-stretch rounded-xl"
          alt="Wallpaper"
        />
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
          {user?.first_name + user?.last_name || ""}
        </h4>
        <p className="text-[13px] font-regular text-neutral-300/50 text-center">
          {user?.title || ""}
        </p>
      </div>
      <div className="w-full flex-col items-center px-4">
        <p className="text-[13px] font-regular text-neutral-300/50 text-center">
          {user?.caption || ""}
        </p>
      </div>
      <div className="w-full px-4">
        <Separator />
      </div>
      <div className="w-full px-4 items-center justify-center">
        <div
          role="button"
          className="text-sm font-regular text-center ml-1 text-[#0f6fec]"
          onClick={() => router.push("/profile")}
        >
          View Settings
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
