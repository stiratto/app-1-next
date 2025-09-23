"use client"
import { Post, User, Comment } from "@/app/interfaces/interfaces"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { use, useState } from "react"

export default function PostPage({ params }: { params: Promise<{ post: string }> }) {
  const { post: postId } = use(params)
  const [comment, setComment] = useState("")
  const fetchPost = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      const post = await res.json()
      return post
    } catch (err: any) {
      throw new Error(err)
    }
  }



  const { data: post, isLoading } = useQuery<Post>({
    queryKey: [`post-${postId}`],
    queryFn: fetchPost
  })

  const fetchUser = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${post?.userId}`)
      const user = await res.json()
      return user
    } catch (err: any) {
      throw new Error(err)
    }
  }

  const { data: user } = useQuery<User>({
    queryKey: [`user-${post?.userId}`],
    queryFn: fetchUser
  })


  const fetchComments = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      const comments = await res.json()
      return comments
    } catch (err: any) {
      throw new Error(err)
    }
  }


  const { data: comments } = useQuery<Comment[]>({
    queryKey: [`comments-${postId}`],
    queryFn: fetchComments
  })

  const queryClient = useQueryClient()
  const onCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    queryClient.setQueryData<Comment[]>([`comments-${postId}`], old => {
      return [{
        body: comment,
        name: "Tu",
        id: comments?.length! + 1,
        postId: Number(postId),
        email: "tuemail@gmail.com"
      }, ...old!]
    })

    setComment("")

  }

  return (
    <main className="py-14 md:py-24 px-8 flex flex-col w-full h-full max-w-5xl">
      {isLoading && "Obteniendo post..."}
      {!isLoading && post && (
        <div className="flex flex-col gap-24">
          <div className="border border-2 border-gray-500 p-3">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-600">De: {user?.name}</p>
          </div>
          <p className="px-4 text-prose">
            {post.body}
          </p>

          <div>
            <h2 className="text-3xl font-semibold mb-4 border-b-2">Comentarios ({comments?.length})</h2>
            <div className="flex flex-col gap-2 mb-4">
              <h3>Añade un comentario</h3>
              <form onSubmit={onCommentSubmit}>
                <textarea placeholder="Que opinas?" className="border border-gray-200 p-4 w-full outline-none" onChange={(e) => setComment(e.target.value)} value={comment} />
                <button type="submit" className="bg-black text-white p-2 w-min hover:cursor-pointer hover:bg-black/50">Comentar</button>
              </form>
            </div>
            <ul className="flex flex-col gap-4">

              {comments?.map((comment) => (
                <li key={comment.id}>
                  <div>
                    <p><span className="underline">{comment.email}</span> dijo:</p>
                  </div>
                  <p>
                    "{comment.body}"
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </main>
  )
}
