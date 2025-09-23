'use client'

import { useQuery } from "@tanstack/react-query"
import { Post } from "../interfaces/interfaces"
import Link from "next/link"
import { useState } from "react"

export default function Posts() {
  const [searchText, setSearchText] = useState("")
  const getPosts = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts")
      const data = await res.json()
      return data
    } catch (err: any) {
      throw new Error(err)
    }
  }


  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  const filteredPosts = posts?.filter((post) => post.title.toLowerCase().includes(searchText.toLowerCase()))
  return (
    <main className="py-14 md:py-24 px-8 flex justify-center items-center">
      {isLoading && "Obteniendo posts..."}
      {!isLoading && posts && (
        <div className="space-y-4">

          <h1 className="text-5xl font-bold">Posts</h1>
          <input
            placeholder="Buscar por titulo..."
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-200 p-2"
          />
          <ul className="flex flex-col gap-4 ">
            {filteredPosts?.map((post) => (
              <Link href={`posts/${post.id}`} className="border border-gray-200 p-4 group hover:cursor-pointer flex flex-col"
                key={post.id}>
                <span className="text-2xl font-bold group-hover:underline">{post.title}</span>
                <p className="text-md text-gray-500 truncate w-[100ch]">"{post.body}"</p>
              </Link>
            ))}
          </ul>
        </div>
      )}

    </main>
  )
}
