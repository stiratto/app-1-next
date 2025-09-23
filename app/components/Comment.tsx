'use client'
import { Comment } from "../interfaces/interfaces";

export default function Comment({ comment }: { comment: Comment }) {
  return (
    <li key={comment.id}>
      <div>
        <p><span className="underline">{comment.email}</span> dijo:</p>
      </div>
      <p>
        "{comment.body}"
      </p>
    </li>

  )

}
