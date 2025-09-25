'use client'

import { useQuery } from "@tanstack/react-query"
import { Post } from "../interfaces/interfaces"
import { useEffect, useState, useMemo } from "react"
import { GetPosts } from "../api/post/post.api"
import PostCard from "../components/PostCard"
import { Button } from "@/components/ui/button"

export default function Posts() {
  const [searchText, setSearchText] = useState("")
  const [page, setPage] = useState(1)

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts', page],
    queryFn: () => GetPosts(page),
  })


  const filteredPosts = posts?.filter((post) => post.title.toLowerCase().includes(searchText.toLowerCase()))


  return (
    <main className="py-14 px-8 container ">
      {isLoading && <p className="font-bold text-3xl mx-auto">Danos un segundo...</p>}
      {!isLoading && posts && (
        <div className="space-y-4 w-full">
          <h1 className="text-5xl font-bold">Posts</h1>
          <input
            placeholder="Buscar por titulo..."
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-200 p-2 rounded"
          />
          <div className="flex gap-4 mt-6 items-center">
            <Button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </Button>
            <span>Pagina {page}</span>
            <Button
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
            </Button>
          </div>

          <ul className="flex flex-col gap-4 ">
            {filteredPosts?.length === 0 && (
              <div>
                <h2 className="text-[clamp(2rem,4vw,4rem)] font-bold">No se encontraron posts.</h2>

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
