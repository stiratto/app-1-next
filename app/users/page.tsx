'use client'

import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { User } from "../interfaces/interfaces";
import { GetUsers } from "../api/user/user.api";
import UserCard from "../components/UserCard";


export default function Page() {
  const [searchText, setSearchText] = useState("")


  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: GetUsers
  })

  // each render, this is executed due to the setSearchText (every
  // state change triggers a new render)
  const filteredUsers = users?.filter((u) => u.name.toLowerCase().includes(searchText.toLowerCase()) || u.username.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <main className="w-full flex flex-col items-center justify-center h-full py-8 gap-14">
      <input placeholder="Buscar" className="p-2 border border-gray-200 focus:outline-none" onChange={(e) => setSearchText(e.target.value)} />
      {isLoading && <p className="text-3xl font-bold mx-auto">Danos un segundo...</p>}
      {!isLoading && (
        <div className="">
          {filteredUsers?.length === 0 && (
            <div className="mt-24">
              <p>No se encontraron usuarios.</p>
            </div>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center h-screen gap-4">
            {filteredUsers && filteredUsers.map((user: User) => (
              <UserCard key={user.id} user={user} />
            ))}
          </ul>
        </div>
      )}
    </main >
  )
}
