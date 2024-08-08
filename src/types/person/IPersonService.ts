import { Person } from '@/types/person/Person'

export interface IPersonService {
  persons: Person[]
  isLoading: boolean
  isError: boolean
  getPerson: (params: Record<string, string>[]) => Promise<void>
  postPerson: (person: Person) => Promise<void>
  patchPerson: (person: Person) => Promise<void>
  deletePerson: (person: Person) => Promise<void>
}
