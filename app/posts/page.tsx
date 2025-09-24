'use client'

import { useQuery } from "@tanstack/react-query"
import { Post } from "../interfaces/interfaces"
import { useState } from "react"
import { GetPosts } from "../api/post/post.api"
import PostCard from "../components/PostCard"

export default function Posts() {
  const [searchText, setSearchText] = useState("")

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: GetPosts
  })

  const filteredPosts = posts?.filter((post) => post.title.toLowerCase().includes(searchText.toLowerCase()))
  return (
    <main className="py-14 md:py-24 px-8 flex justify-center items-center w-full h-full">
      {isLoading && <p className="font-bold text-3xl mx-auto">Danos un segundo...</p>}
      {!isLoading && posts && (
        <div className="space-y-4 w-full">

          <h1 className="text-5xl font-bold">Posts</h1>
          <input
            placeholder="Buscar por titulo..."
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-200 p-2"
          />

          <ul className="flex flex-col gap-4 ">
            {filteredPosts?.length === 0 && (
              <div>
                <p>No se encontraron posts.</p>
              </div>
            )}
            {filteredPosts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </ul>
        </div>
      )}

    </main>
  )
}
