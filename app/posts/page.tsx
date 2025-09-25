'use client'

import { useQuery } from "@tanstack/react-query"
import { Post } from "../interfaces/interfaces"
import { useState } from "react"
import { GetPosts } from "../api/post/post.api"
import PostCard from "../components/PostCard"

export default function Posts() {
  const [searchText, setSearchText] = useState("")
  const [page, setPage] = useState(1)

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts', page],
    queryFn: () => GetPosts(page),
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
          <div className="flex gap-4 mt-6 items-center">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 border border-gray-200 cursor-pointer rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>Página {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border  border-gray-200 cursor-pointer  rounded"
            >
              Siguiente
            </button>
          </div>

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
