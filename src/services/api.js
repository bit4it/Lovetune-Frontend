
const BASE_URL =
  import.meta.env.VITE_API_URL || 'https://lovetunes-backend-osos.onrender.com/api'

const API = `${BASE_URL}/v1/master/music`

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `API Error: ${response.status}`)
  }

  // Handle empty responses
  if (response.status === 204) {
    return null
  }
  
  return response.json()
}

export const api = {
  // GET /api/v1/master/music/home-page/
  getHomePage: async () => {
    return request(`${API}/home-page/`)
  },

  // GET /api/v1/master/music/search/?q=...
  search: async (q) => {
    return request(
      `${API}/search?query=${encodeURIComponent(q)}`
    )
  },


  // POST /api/v1/master/music/rooms/
  createRoom: async () => {
    return request(`${API}/rooms/`, {
      method: 'POST',
    })
  },

  // POST /api/v1/master/music/rooms/:code/join/
  joinRoom: async (code) => {
    return request(
      `${API}/rooms/${encodeURIComponent(code)}/join/`,
      {
        method: 'POST',
      }
    )
  },

  // POST /api/v1/master/music/rooms/:code/leave/
  leaveRoom: async (code) => {
    return request(
      `${API}/rooms/${encodeURIComponent(code)}/leave/`,
      {
        method: 'POST',
      }
    )
  },
}