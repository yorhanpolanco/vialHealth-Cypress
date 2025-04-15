import { ICountedFormData } from '@/utils/types'

export async function GetFormData(): Promise<{
  success: boolean
  data?: ICountedFormData
  error?: string | unknown
}> {
  try { //run local http://127.0.0.1:8080
    const response = await fetch('http://nodeserver:8080/form-data')
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
