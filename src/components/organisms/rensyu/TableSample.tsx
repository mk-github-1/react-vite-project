import React, { memo, useEffect, useRef, useState } from 'react'
import { Checkbox, Table, Text } from '@mantine/core'
import {
  Cell,
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  // getFilteredRowModel,
  // getPaginationRowModel,
  Header,
  HeaderGroup,
  Row,
  RowSelectionState,
  // RowSelectionState,
  useReactTable
} from '@tanstack/react-table'

// Types
import { Person } from '@/types/person/Person'
import { PersonColumn } from '@/types/person/PersonColumn'
import { IRensyuTableProps } from '@/types/rensyu/IRensyuProps'

export const TableSample: React.FC<IRensyuTableProps> = memo((rensyuTableProps: IRensyuTableProps) => {
  const { persons, /* isLoading, isError, */ getPerson, handleRowSelect }: IRensyuTableProps = rensyuTableProps

  const isMounted: React.MutableRefObject<boolean> = useRef<boolean>(false)
  const [rowData, setRowData]: [PersonColumn[], React.Dispatch<React.SetStateAction<PersonColumn[]>>] = useState<
    PersonColumn[]
  >([])
  const [rowSelection, setRowSelection]: [RowSelectionState, React.Dispatch<React.SetStateAction<RowSelectionState>>] =
    useState<RowSelectionState>({})

  const columnDefs: ColumnDef<PersonColumn>[] = [
    { accessorKey: 'personCode', header: 'Person code', size: 500 },
    { accessorKey: 'personName', header: 'Person name', size: 500 },
    {
      accessorKey: 'age',
      header: 'Age',
      cell: ({ getValue }: CellContext<PersonColumn, number>) => {
        return <Text ta="right">{getValue()}</Text>
      },
      size: 100
    },
    {
      accessorKey: 'hobby',
      header: 'Hobby',
      cell: ({ getValue }: CellContext<PersonColumn, string>) => {
        const dictionaries: Record<string, string>[] = [
          { value: 'react', label: 'React' },
          { value: 'ng', label: 'Angular' },
          { value: 'vue', label: 'Vue' },
          { value: 'svelte', label: 'Svelte' }
        ]

        const value: string = getValue()

        if (value) {
          const found: Record<string, string> | undefined = dictionaries.find(
            (element: Record<string, string>) => element.value === value
          )
          return found !== undefined ? found.label : ''
        }
      },
      size: 200
    },
    { accessorKey: 'posted', header: 'Posted', size: 200 },
    { accessorKey: 'remarks', header: 'Remarks', size: 300 },
    {
      accessorKey: 'isDeleted',
      header: 'IsDeleted',
      cell: ({ getValue }: CellContext<PersonColumn, boolean>) => {
        return <Checkbox checked={getValue()} readOnly />
      },
      size: 100
    },
    { accessorKey: 'createdAt', header: 'CreatedAt' },
    { accessorKey: 'updatedAt', header: 'UpdatedAt' },
    { accessorKey: 'createdBy', header: 'CreatedBy' },
    { accessorKey: 'updatedBy', header: 'UpdatedBy' }
  ]

  type TableType = ReturnType<typeof useReactTable<PersonColumn>>

  const table: TableType = useReactTable<PersonColumn>({
    data: rowData,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility: {
        position: false,
        createdAt: false,
        updatedAt: false,
        createdBy: false,
        updatedBy: false
      }
    },
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    },
    // getRowId: (row) => row.personCode,
    enableMultiRowSelection: false
    /*
    enableRowSelection: true,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
     */
  })

  // 初回実行
  useEffect(() => {
    if (isMounted.current) {
      getPerson([])
    } else {
      isMounted.current = true
    }
  }, [getPerson])

  // personsを監視し、テーブルを更新する
  useEffect(() => {
    if (persons.length) {
      const data: PersonColumn[] = persons.map((element: Person, index: number) => {
        const row: PersonColumn = {
          isChecked: false,
          position: index,
          personCode: element.personCode,
          personName: element.personName,
          age: element.age,
          hobby: element.hobby,
          posted: element.posted ? element.posted : '',
          remarks: element.remarks,
          isDeleted: element.isDeleted,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          createdBy: element.createdBy,
          updatedBy: element.updatedBy
        }

        return row
      }, [])

      setRowData(data)
    }
  }, [persons])

  return (
    <>
      Table sample
      <Table stickyHeader>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<Person>, headerGroupIndex: number) => (
            <Table.Tr key={headerGroupIndex}>
              <Table.Th style={{ border: '1px solid dimgray', backgroundColor: 'lightskyblue' }}></Table.Th>
              {headerGroup.headers.map((header: Header<Person, unknown>, headerIndex: number) => (
                <Table.Th
                  key={headerIndex}
                  colSpan={header.colSpan}
                  style={{
                    border: '1px solid dimgray',
                    backgroundColor: 'lightskyblue'
                  }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row: Row<PersonColumn>, rowIndex: number) => {
            return (
              <Table.Tr key={rowIndex} bg={row.original.isChecked ? 'var(--mantine-color-blue-light)' : undefined}>
                <Table.Td style={{ border: '1px solid dimgray' }}>
                  <Checkbox
                    checked={row.getIsSelected()}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      // 全ての行を未選択に設定
                      const newRowData: PersonColumn[] = rowData.map(
                        (element: PersonColumn) => ({
                          ...element,
                          isChecked: false
                        }),
                        []
                      )

                      // クリックされた行だけをチェック状態に更新
                      newRowData[row.index].isChecked = event.currentTarget.checked

                      // 新しいrowData配列を状態にセット
                      setRowData(newRowData)

                      // トグル関数
                      const toggle: (event: unknown) => void = row.getToggleSelectedHandler()
                      toggle(event)

                      // 選択データを取得
                      handleRowSelect(row)
                    }}
                  />
                </Table.Td>
                {row.getVisibleCells().map((cell: Cell<PersonColumn, unknown>, columnIndex: number) => {
                  return (
                    <Table.Td key={columnIndex} style={{ border: '1px solid dimgray' }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Td>
                  )
                })}
              </Table.Tr>
            )
          })}
        </Table.Tbody>
      </Table>
    </>
  )
})
