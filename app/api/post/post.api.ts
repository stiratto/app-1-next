export async function GetPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    return data
  } catch (err: any) {
    throw new Error(err)
  }
}

export async function GetPost(id: string) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = await res.json()
    return post
  } catch (err: any) {
    throw new Error(err)
  }
}
