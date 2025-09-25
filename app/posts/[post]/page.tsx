"use client"
import { GetComments } from "@/api/comment/comment.api"
import { GetPost } from "@/api/post/post.api"
import { GetUser } from "@/api/user/user.api"
import { Post, User, IComment } from "@/interfaces/interfaces"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Comment from "@/components/Comment"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"


export default function PostPage({ params }: { params: Promise<{ post: string }> }) {

  const { post: postId } = use(params)
  const [comment, setComment] = useState("")


  const { data: post, isLoading } = useQuery<Post>({
    queryKey: [`post-${postId}`],
    queryFn: () => GetPost(postId)
  })

  const { data: user } = useQuery<User>({
    queryKey: [`user-${post?.userId}`],
    queryFn: () => GetUser(post?.userId!)
  })

  const { data: comments, isLoading: isLoadingComments } = useQuery<IComment[]>({
    queryKey: [`comments-${postId}`],
    queryFn: () => GetComments(Number(postId))
  })

  const queryClient = useQueryClient()
  const onCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    queryClient.setQueryData<IComment[]>([`comments-${postId}`], old => {
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
    <main className="py-14 md:py-24 px-8 container max-w-5xl">
      {isLoading && <p className="font-bold text-3xl mx-auto">Obteniendo post...</p>}
      {!isLoading && post && (
        <div className="flex flex-col gap-24">
          <div className="border-b border-t border-gray-500 p-3">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-600">De: {user?.name}</p>
          </div>
          <p className=" ">
            {post.body}
          </p>

          <div>
            <h2 className="text-3xl font-semibold mb-4 border-b-2">Comentarios ({comments?.length})</h2>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Añade un comentario</h3>
              <form onSubmit={onCommentSubmit}>
                <textarea placeholder="Que opinas?" className="rounded border border-gray-200 p-4 w-full outline-none" onChange={(e) => setComment(e.target.value)} value={comment} />
                <Button disabled={comment.length <= 0} type="submit">Comentar</Button>
              </form>
            </div>
            <Separator className="my-4" />
            <ul className="flex flex-col gap-4">

              {isLoadingComments &&
                <li className="mx-auto">
                  <p className="text-3xl font-bold">
                    Obteniendo comentarios...
                  </p>
                </li>
              }
              {!isLoadingComments && comments?.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))}
            </ul>
          </div>

        </div>
      )}
    </main>
  )
}
