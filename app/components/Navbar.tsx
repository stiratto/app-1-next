"use client"
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b-2 py-4 sticky top-0 bg-white w-full flex justify-center items-center">

      <ul className="flex gap-8 items-center">
        <Link href="/users" prefetch={true}>Usuarios</Link>
        <Link href="/posts" prefetch={true}>Posts</Link>
      </ul>
    </nav>
  )
}
