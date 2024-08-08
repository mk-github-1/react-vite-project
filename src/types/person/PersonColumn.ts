export type PersonColumn = {
  // Table
  isChecked: boolean
  position: number

  // Person
  personCode: string
  personName: string
  age?: number
  hobby: string
  posted: string | null
  remarks?: string | null
  isDeleted?: boolean
  createdAt?: string | null
  updatedAt?: string | null
  createdBy?: string | null
  updatedBy?: string | null
}
