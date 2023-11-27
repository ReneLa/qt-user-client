"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";

const Header = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#141519] fixed top-0 flex items-center justify-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      {/* <div className="w-full max-w-6xl h-full flex bg-red-500">header</div> */}
    </div>
  );
};

export default Header;
