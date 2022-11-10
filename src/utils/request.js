import axios from 'axios'
import {
  baseURL,
  contentType,
  requestTimeout,
} from '@/config'

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})


instance.interceptors.response.use(
  (response) => {
    const { data, config } = response
    const { code, msg } = data
    return data
  }
)

export default instance