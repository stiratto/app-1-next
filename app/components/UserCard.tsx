import Link from "next/link";
import { User } from "../interfaces/interfaces";

export default function UserCard({ user }: { user: User }) {
  return (
    <Link href={`users/${user.id}`} key={user.id} className="border border-gray-300 p-4 group hover:cursor-pointer rounded">
      <p className="text-xl font-bold group-hover:underline">{user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </Link>
  )
}

