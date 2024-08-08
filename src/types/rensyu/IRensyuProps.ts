import { Row } from '@tanstack/react-table'
import { Person } from '@/types/person/Person'
import { PersonColumn } from '@/types/person/PersonColumn'

export interface IRensyuProps {
  persons: Person[]
  isLoading: boolean
  isError: boolean
  getPerson: (params: Record<string, string>[]) => Promise<void>
  postPerson: (person: Person) => Promise<void>
  patchPerson: (person: Person) => Promise<void>
  deletePerson: (person: Person) => Promise<void>
  handleRowSelect: (row: Row<PersonColumn>) => void
  handleButton: (mode: number) => void
  modalType?: number
  formData?: Person
}

export interface IRensyuTableProps {
  persons: Person[]
  isLoading: boolean
  isError: boolean
  getPerson: (params: Record<string, string>[]) => Promise<void>
  handleRowSelect: (row: Row<PersonColumn>) => void
}

export interface IRensyuModalFormProps {
  isLoading: boolean
  isError: boolean
  getPerson: (params: Record<string, string>[]) => Promise<void>
  postPerson: (person: Person) => Promise<void>
  patchPerson: (person: Person) => Promise<void>
  deletePerson: (person: Person) => Promise<void>
  modalType?: number
  formData?: Person
}
