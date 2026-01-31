"use client";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="inherit" radius="large" scaling="100%">
          <main className="min-h-screen font-sans">
            {children}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop
              closeOnClick
              pauseOnHover
              className="mt-16"
            />
          </main>
        </Theme>
      </body>
    </html>
  );
}
