'use client'

import { GetUser } from "@/app/api/user/user.api"
import { User } from "@/app/interfaces/interfaces"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { use, useEffect } from "react"

export default function UserPage({ params }: { params: Promise<{ id: number }> }) {
  const { push } = useRouter()
  const { id } = use(params)


  const { data, isLoading } = useQuery<User>({
    queryKey: [`user-${id}`],
    queryFn: () => GetUser(id),
  })

  return (
    <main className="flex flex-col items-start w-full h-screen px-8 py-14 md:py-24 gap-4">
      {isLoading && <p className="text-3xl font-bold mx-auto">Obteniendo informacion del usuario...</p>}
      <button className="text-sm p-2 bg-black text-white cursor-pointer hover:bg-black/50" onClick={() => {
        push("/users")
      }}>Volver</button>
      <h1 className="text-xl md:text-4xl font-bold">
        Info acerca de {data?.name}
      </h1>
      <div>
        <p>Telefono: {data?.phone}</p>
        <p>Lat: {data?.address.geo.lat}</p>
        <p>Longitude: {data?.address.geo.lng}</p>
        <p>City: {data?.address.city}</p>
        <p>Suite: {data?.address.suite}</p>
        <p>Street: {data?.address.street}</p>
        <p>Zipcode: {data?.address.zipcode}</p>
        <p>Website: {data?.website}</p>
        <p>Email: <span className="underline">{data?.email}</span></p>
      </div>
    </main>
  )

}
