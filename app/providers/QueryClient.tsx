'use client'

import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import React from "react";


export default function ReactQueryClient({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient} children={children}></QueryClientProvider>

}
