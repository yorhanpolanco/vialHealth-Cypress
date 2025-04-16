// api/queries-api.ts
import { IQuery } from '@/utils/types'

const isDocker = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
const backendUrl = isDocker ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_LOCAL;


export async function CreateQuery(
  data: Pick<IQuery, 'title' | 'description' | 'status' | 'formDataId'>
): Promise<{
  success: boolean
  data?: IQuery
  error?: string | unknown
}> {
  try { //run local http://127.0.0.1:8080
    const response = await fetch(`${backendUrl}/queries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error('Error creating query:', error)
    return {
      success: false,
      error,
    }
  }
}

export async function resolveQuery(
  formDataId: string,
  data: Partial<Pick<IQuery, 'title' | 'description' | 'status'>>
): Promise<{
  success: boolean
  data?: IQuery
  error?: string | unknown
}> {
  try { //run local http://127.0.0.1:8080
    const response = await fetch(
      `${backendUrl}/queries/${formDataId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error('Error updating query:', error)
    return {
      success: false,
      error,
    }
  }
}

export async function deleteQuery(queryId: string): Promise<{
  success: boolean
  message?: string
  error?: string | unknown
}> {
  try {       //run local http://127.0.0.1:8080
    const response = await fetch(`${backendUrl}/queries/${queryId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return {
      success: true,
      message: result.message,
    }
  } catch (error) {
    console.error('Error deleting query:', error)
    return {
      success: false,
      error,
    }
  }
}
