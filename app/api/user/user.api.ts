export async function GetUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    return data
  } catch (err: any) {
    throw new Error(err)
  }
}

export async function GetUser(id: number) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const data = await response.json()
    return data
  } catch (err: any) {
    throw new Error(err)
  }
}
