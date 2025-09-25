'use client'

import { GetUser } from "@/api/user/user.api"
import { Button } from "@/components/ui/button"
import { User } from "@/interfaces/interfaces"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function UserPage({ params }: { params: Promise<{ id: number }> }) {
  const { push } = useRouter()
  const { id } = use(params)


  const { data, isLoading } = useQuery<User>({
    queryKey: [`user-${id}`],
    queryFn: () => GetUser(id),
  })

  return (
    <main className="flex flex-col items-start pt-24 container h-[90vh] gap-4">
      {isLoading && <p className="text-3xl font-bold mx-auto">Obteniendo informacion del usuario...</p>}
      <Button onClick={() => {
        push("/users")
      }}>Volver</Button>
      <h1 className="text-xl md:text-4xl font-bold">
        Informacion acerca de {data?.name}
      </h1>
      <div className="flex flex-col gap-2">
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
