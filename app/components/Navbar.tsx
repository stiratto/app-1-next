import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b-2 py-4">
      <ul className="flex gap-8 items-center">
        <Link href="/users">Usuarios</Link>
        <Link href="/posts">Posts</Link>
      </ul>
    </nav>
  )
}
