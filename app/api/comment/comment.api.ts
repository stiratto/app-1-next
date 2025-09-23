export async function GetComments(postId: number) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    const comments = await res.json()
    return comments
  } catch (err: any) {
    throw new Error(err)
  }
}
