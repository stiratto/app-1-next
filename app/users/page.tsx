'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query"
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "../interfaces/interfaces";


export default function Page() {
  const [searchText, setSearchText] = useState("")
  const queryClient = useQueryClient()
  const getUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      const data = await response.json()
      return data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers
  })

  // each render, this is executed due to the setSearchText (every
  // state change triggers a new render)
  const filteredUsers = users?.filter((u) => u.name.toLowerCase().includes(searchText.toLowerCase())) ?? []

  return (
    <main className="w-full flex flex-col items-center justify-center h-full py-8">
      <input placeholder="Buscar" className="p-2 border border-gray-200 focus:outline-none" onChange={(e) => setSearchText(e.target.value)} />
      {isLoading && "Loading..."}
      {!isLoading && (
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center h-screen gap-4">
            {filteredUsers && filteredUsers.map((user) => (
              <Link href={`users/${user.id}`} key={user.id} className="border border-gray-300 p-4 group hover:cursor-pointer">
                <p className="text-xl font-bold group-hover:underline">{user.name}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </main >
  )
}
