import { ReactNode } from "react";

import "../styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        <main className="flex-grow flex justify-center items-center">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
