import axios from 'axios'

const api = axios.create({
  baseURL: 'https://infy-backend-5xyz.onrender.com/',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Auto-attach stored token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('wm_token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally → redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('wm_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
