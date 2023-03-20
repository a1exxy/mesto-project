// Настройки бекенда

export const apiConfig = {
  baseUrl: process.env.BACKEND_API_URL,
  headers: {
    authorization: process.env.BACKEND_API_TOKEN,
    'Content-Type': 'application/json'
  }
}
