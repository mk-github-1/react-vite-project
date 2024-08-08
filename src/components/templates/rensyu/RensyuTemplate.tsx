import React, { memo } from 'react'

// Mantine
import { Button } from '@mantine/core'

// Components
import { TableSample } from '@/components/organisms/rensyu/TableSample'
import { ModalFormSample } from '@/components/organisms/rensyu/ModalFormSample'

// Types
import { IRensyuProps } from '@/types/rensyu/IRensyuProps'

export const RensyuTemplate: React.FC<IRensyuProps> = memo((rensyuProps: IRensyuProps) => {
  const {
    persons,
    isLoading,
    isError,
    getPerson,
    postPerson,
    patchPerson,
    deletePerson,
    handleRowSelect,
    handleButton,
    modalType,
    formData
  }: IRensyuProps = rensyuProps

  return (
    <>
      <p>-- RensyuTemplate(Templates)</p>
      <p>
        <b>テーブルを表示</b>
        ・Y軸スクロールバーの追加。一定上の高さの時、Y軸でスクロール。
        <br />
        <b>モーダル機能、モーダルの表示</b>
        ・NumberInputが時々NaNになる原因の調査
        <br />
        ・mswはうまくいかないので保留
      </p>
      <TableSample
        persons={persons}
        isLoading={isLoading}
        isError={isError}
        getPerson={getPerson}
        handleRowSelect={handleRowSelect}
      />
      <ModalFormSample
        isLoading={isLoading}
        isError={isError}
        getPerson={getPerson}
        postPerson={postPerson}
        patchPerson={patchPerson}
        deletePerson={deletePerson}
        modalType={modalType}
        formData={formData}
      />
      <div style={{ width: '200px', marginTop: '5px' }}>
        <Button size="md" onClick={() => handleButton(1)}>
          新規登録
        </Button>
        <Button size="md" ml={5} onClick={() => handleButton(2)}>
          変更
        </Button>
      </div>
    </>
  )
})
