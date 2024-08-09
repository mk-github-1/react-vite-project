import React, { memo, useCallback, useState } from 'react'
import { Row } from '@tanstack/react-table'

// Components
import { RensyuTemplate } from '@/components/templates/rensyu/RensyuTemplate'

// Types
import { Person } from '@/types/person/Person'
import { PersonColumn } from '@/types/person/PersonColumn'
import { IPersonService } from '@/types/person/IPersonService'

// Custom hooks
import { usePersonService } from '@/hooks/services/rensyu/usePersonService'

export const RensyuPage: React.FC = memo(() => {
  // API Call
  const SYSTEM_API_URL: string =
    import.meta.env.VITE_API_URL !== undefined ? import.meta.env.VITE_API_URL.toString() : ''
  // const SYSTEM_API_URL: string = import.meta.env.JSONPLACEHOLDER_API_URL !== undefined ? import.meta.env.JSONPLACEHOLDER_API_URL.toString() : ''
  const { persons, isLoading, isError, getPerson, postPerson, patchPerson, deletePerson }: IPersonService =
    usePersonService(SYSTEM_API_URL)

  // Table
  const [selectedRow, setSelectedRow]: [
    Row<PersonColumn> | null,
    React.Dispatch<React.SetStateAction<Row<PersonColumn> | null>>
  ] = useState<Row<PersonColumn> | null>(null)

  // Modal
  const [modalType, setModalType]: [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(0)
  const [formData, setFormData]: [Person | null, React.Dispatch<React.SetStateAction<Person | null>>] =
    useState<Person | null>(null)

  const handleRowSelect: (event: Row<PersonColumn>) => void = useCallback((event: Row<PersonColumn>): void => {
    setSelectedRow(event)
  }, [])

  const handleButton = (mode: number): void => {
    if (mode === 1) {
      const formData: Person = {
        personCode: '',
        personName: '',
        age: 0,
        hobby: '',
        posted: null,
        remarks: null,
        isDeleted: false,
        createdAt: null,
        updatedAt: null,
        createdBy: null,
        updatedBy: null
      }

      setFormData(formData)
      setModalType(mode)
    } else if (mode === 2) {
      // 独自の処理 (例: API呼び出しなど)
      const formData: Person = {
        personCode: selectedRow ? selectedRow.getValue('personCode') : '',
        personName: selectedRow ? selectedRow.getValue('personName') : '',
        age: selectedRow ? selectedRow.getValue('age') : 0,
        hobby: selectedRow ? selectedRow.getValue('hobby') : '',
        posted: selectedRow ? selectedRow.getValue('posted') : null,
        remarks: selectedRow ? selectedRow.getValue('remarks') : null,
        isDeleted: selectedRow ? selectedRow.getValue('isDeleted') : false,
        createdAt: selectedRow ? selectedRow.getValue('createdAt') : null,
        updatedAt: selectedRow ? selectedRow.getValue('updatedAt') : null,
        createdBy: selectedRow ? selectedRow.getValue('createdBy') : null,
        updatedBy: selectedRow ? selectedRow.getValue('updatedBy') : null
      }

      setFormData(formData)
      setModalType(mode)
    }
  }

  return (
    <>
      <p>- RensyuPage(Pages)</p>
      <RensyuTemplate
        persons={persons}
        isLoading={isLoading}
        isError={isError}
        getPerson={getPerson}
        postPerson={postPerson}
        patchPerson={patchPerson}
        deletePerson={deletePerson}
        handleRowSelect={handleRowSelect}
        handleButton={handleButton}
        modalType={modalType}
        formData={formData}
      />
    </>
  )
})
