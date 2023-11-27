import { Toaster, toast } from "sonner";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { StoreProvider } from "@/components/providers/store-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Manager",
  description: "Generate and Manage Tasks"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "dark:bg-[#191a1f]")}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="task-theme"
          >
            <ModalProvider />
            {children}
            <Toaster position="bottom-center" />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
