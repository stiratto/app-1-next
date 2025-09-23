import Link from "next/link";
import { Post } from "../interfaces/interfaces";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`posts/${post.id}`} className="border border-gray-200 p-4 group hover:cursor-pointer flex flex-col"
      key={post.id}>
      <span className="text-2xl font-bold group-hover:underline">{post.title}</span>
      <p className="text-md text-gray-500 truncate w-[100ch]">"{post.body}"</p>
    </Link>

  )
}
