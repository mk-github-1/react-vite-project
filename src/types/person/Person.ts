export type Person = {
  personName: string
  personCode: string
  age?: number
  hobby: string
  posted: string | null // Dateはstringとして使用します
  remarks?: string | null
  isDeleted?: boolean
  createdAt?: string | null // Dateはstringとして使用します
  updatedAt?: string | null // Dateはstringとして使用します
  createdBy?: string | null
  updatedBy?: string | null
}
