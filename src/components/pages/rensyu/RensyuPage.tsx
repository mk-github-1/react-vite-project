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
    Row<PersonColumn> | undefined,
    React.Dispatch<React.SetStateAction<Row<PersonColumn> | undefined>>
  ] = useState<Row<PersonColumn>>()

  // Modal
  const [modalType, setModalType]: [number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>] =
    useState<number>()
  const [formData, setFormData]: [Person | undefined, React.Dispatch<React.SetStateAction<Person | undefined>>] =
    useState<Person>()

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
        personCode: selectedRow !== undefined ? selectedRow.getValue('personCode') : '',
        personName: selectedRow !== undefined ? selectedRow.getValue('personName') : '',
        age: selectedRow !== undefined ? selectedRow.getValue('age') : 0,
        hobby: selectedRow !== undefined ? selectedRow.getValue('hobby') : '',
        posted: selectedRow !== undefined ? selectedRow.getValue('posted') : null,
        remarks: selectedRow !== undefined ? selectedRow.getValue('remarks') : null,
        isDeleted: selectedRow !== undefined ? selectedRow.getValue('isDeleted') : false,
        createdAt: selectedRow !== undefined ? selectedRow.getValue('createdAt') : null,
        updatedAt: selectedRow !== undefined ? selectedRow.getValue('updatedAt') : null,
        createdBy: selectedRow !== undefined ? selectedRow.getValue('createdBy') : null,
        updatedBy: selectedRow !== undefined ? selectedRow.getValue('updatedBy') : null
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
