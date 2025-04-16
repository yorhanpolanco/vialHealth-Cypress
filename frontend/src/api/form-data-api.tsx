import { ICountedFormData } from '@/utils/types'

const isDocker = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
const backendUrl = isDocker ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_LOCAL;


export async function GetFormData(): Promise<{
  success: boolean
  data?: ICountedFormData
  error?: string | unknown
}> {
  try { //run local http://127.0.0.1:8080
    const response = await fetch(`${backendUrl}/form-data`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const resp_data = await response.json()
    return {
      success: true,
      data: resp_data.data,
    }
  } catch (error) {
    console.error('Error fetching form data:', error)
    return {
      success: false,
      error,
    }
  }
}
