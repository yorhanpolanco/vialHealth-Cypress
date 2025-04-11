// Define Status enum locally instead of importing from Prisma
export enum Status {
  OPEN = 'OPEN',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export interface IQuery {
  id: string
  title: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
  status: Status
  formData: IFormData
  formDataId: string
}

export interface IFormData {
  id: string
  question: string
  answer: string
  query?: IQuery
}

export interface ICountedFormData {
  total: number
  formData: IFormData[]
}
