'use client'

import React from "react";
import ReactQueryClient from "./providers/QueryClient";
import "./globals.css"
import Navbar from "./components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center w-full">
        <Navbar />
        <ReactQueryClient>
          {children}
        </ReactQueryClient>
      </body>
    </html>
  )
}
