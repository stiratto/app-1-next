'use client'

import React from "react";
import ReactQueryClient from "./providers/QueryClient";
import "./globals.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center w-full">
        <ReactQueryClient>
          {children}
        </ReactQueryClient>
      </body>
    </html>
  )
}
