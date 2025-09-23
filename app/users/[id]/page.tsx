'use client'

import { User } from "@/app/interfaces/interfaces"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { use, useEffect } from "react"

export default function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const fetchUser = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      const data = await response.json()
      return data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  const { data } = useQuery<User>({
    queryKey: [`user-${id}`],
    queryFn: fetchUser
  })

  return (
    <main className="flex flex-col items-start w-full h-screen px-8 py-14 md:py-24 gap-4">
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
