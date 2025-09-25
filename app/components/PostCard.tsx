"use client"
import Link from "next/link";
import { Post } from "../interfaces/interfaces";

export default function PostCard({ post }: { post: Post }) {
  const { id, title, body } = post
  return (
    <Link href={`posts/${id}`} className="border border-gray-200 p-4 group hover:cursor-pointer flex flex-col rounded "
      key={id}>
      <span className="text-2xl font-bold group-hover:underline">{title}</span>
      <p className="text-md text-gray-500 truncate  ">"{body}"</p>
    </Link>

  )
}
