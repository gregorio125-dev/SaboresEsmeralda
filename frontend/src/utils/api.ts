const API_URL = "http://localhost:8000"

export async function getProducts() {

  const response = await fetch(`${API_URL}/products`)

  const data = await response.json()

  return data
}