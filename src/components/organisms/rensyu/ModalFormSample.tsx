import React, { memo, useEffect } from 'react'
import { Button, Checkbox, FocusTrap, Modal, NumberInput, Select, TextInput, Textarea } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { useForm, Controller, UseFormReturn, ControllerRenderProps } from 'react-hook-form'
import yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import { DateTime } from 'luxon'

// Types
import { Person } from '@/types/person/Person'
import { IRensyuModalFormProps } from '@/types/rensyu/IRensyuProps'
import { ValidationPersonSchema } from '@/types/person/ValidationPersonSchema'

type ValidationModalFormSample = yup.InferType<typeof ValidationPersonSchema.errorScheme>

export const ModalFormSample: React.FC<IRensyuModalFormProps> = memo((rensyuModalFormProps: IRensyuModalFormProps) => {
  const {
    /* persons, isLoading, isError, getPerson, */ postPerson,
    patchPerson,
    deletePerson,
    modalType,
    formData
  }: IRensyuModalFormProps = rensyuModalFormProps

  const [opened, { open, close }]: readonly [
    boolean,
    {
      readonly open: () => void
      readonly close: () => void
      readonly toggle: () => void
    }
  ] = useDisclosure(false)

  // react-hook-form (useStateを使わずに管理)
  const { control, formState, getValues, register, reset }: UseFormReturn<ValidationModalFormSample> =
    useForm<ValidationModalFormSample>({
      resolver: yupResolver(ValidationPersonSchema.errorScheme),
      mode: 'onChange', // 'onBlur',
      defaultValues: {
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
    })

  useEffect(() => {
    if (modalType === 1 || modalType === 2) {
      const tempFormData: Person = {
        personCode: modalType === 1 ? '' : formData ? formData.personCode : '',
        personName: modalType === 1 ? '' : formData ? formData.personName : '',
        age: modalType === 1 ? 0 : formData ? formData.age : 0,
        hobby: modalType === 1 ? '' : formData ? formData.hobby : '',
        posted: modalType === 1 ? null : formData ? formData.posted : null,
        remarks: modalType === 1 ? null : formData ? formData.remarks : null,
        isDeleted: modalType === 1 ? false : formData ? formData.isDeleted : false,
        createdAt: modalType === 1 ? null : formData ? formData.createdAt : null,
        updatedAt: modalType === 1 ? null : formData ? formData.updatedAt : null,
        createdBy: modalType === 1 ? null : formData ? formData.createdBy : null,
        updatedBy: modalType === 1 ? null : formData ? formData.updatedBy : null
      }

      reset(tempFormData)
      open()
    }
  }, [modalType, formData, reset, open])

  const onNewRegister = async (): Promise<void> => {
    const person: Person = getValue()
    await postPerson(person)
  }

  const onEdit = async (): Promise<void> => {
    const person: Person = getValue()
    await patchPerson(person)
  }

  const onDelete = async (): Promise<void> => {
    const person: Person = getValue()
    await deletePerson(person)
  }

  const getValue = (): Person => {
    const person: Person = {
      personName: getValues('personName'),
      personCode: getValues('personCode'),
      age: Number(getValues('age')),
      hobby: getValues('hobby'),
      posted: getValues('posted'),
      remarks: getValues('remarks') || '',
      isDeleted: Boolean(getValues('isDeleted')) || false,
      createdAt: getValues('createdAt') || '',
      updatedAt: getValues('updatedAt') || '',
      createdBy: getValues('createdBy') || '',
      updatedBy: getValues('updatedBy') || ''
    }

    return person
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={modalType === 1 ? '新規登録画面' : '変更登録画面'} /* withCloseButton={false} */
      >
        <FocusTrap.InitialFocus />
        <Controller
          name="personCode"
          control={control}
          render={({ field }: { field: ControllerRenderProps<Person, 'personCode'> }) => (
            <TextInput
              label="Person code"
              {...field}
              {...register('personCode')}
              placeholder="person code"
              error={formState.errors.personCode?.message}
              withAsterisk
            />
          )}
        />
        <Controller
          name="personName"
          control={control}
          render={({ field }: { field: ControllerRenderProps<Person, 'personName'> }) => (
            <TextInput
              label="Person name"
              {...field}
              {...register('personName')}
              placeholder="person name"
              error={formState.errors.personName?.message}
              withAsterisk
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          render={({ field }: { field: ControllerRenderProps<Person, 'age'> }) => (
            <NumberInput label="Age" {...field} placeholder="10" error={formState.errors.age?.message} />
          )}
        />
        <Controller
          name="hobby"
          control={control}
          render={({ field }: { field: ControllerRenderProps<Person, 'hobby'> }) => (
            <Select
              label="Hobby"
              withAsterisk
              {...field}
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'vue', label: 'Vue' },
                { value: 'svelte', label: 'Svelte' }
              ]}
              clearable
              searchable
              placeholder="-- select --"
              error={formState.errors.hobby?.message}
            />
          )}
        />
        <Controller
          name="posted"
          control={control}
          render={({ field }: { field: ControllerRenderProps<Person, 'posted'> }) => (
            // DateTime.fromFormat(data?.posted.toString(), 'yyyy-MM-dd').toString()
            <DateInput
              label="Posted"
              {...field}
              value={field.value ? new Date(field.value) : null}
              valueFormat="YYYY/MM/DD"
              placeholder="yyyy/mm/dd"
              error={formState.errors.posted?.message}
              withAsterisk
              clearable
            />
          )}
        />
        <Controller
          name="remarks"
          control={control}
          render={(field: { field: ControllerRenderProps<Person, 'remarks'> }) => (
            <Textarea
              label="Remarks"
              {...field}
              {...register('remarks')}
              placeholder="memo"
              error={formState.errors.remarks?.message}
            />
          )}
        />
        <Controller
          name="isDeleted"
          control={control}
          render={(field: { field: ControllerRenderProps<Person, 'isDeleted'> }) => (
            <Checkbox label="IsDeleted" mt={10} mb={10} {...field} {...register('isDeleted')} />
          )}
        />

        <input type="hidden" {...register('createdAt')} />
        <input type="hidden" {...register('updatedAt')} />
        <input type="hidden" {...register('createdBy')} />
        <input type="hidden" {...register('updatedBy')} />
        {modalType === 1 ? (
          <Button onClick={onNewRegister} disabled={!formState.isValid}>
            登録
          </Button>
        ) : (
          ''
        )}
        {modalType !== 1 ? (
          <Button ml={5} onClick={onEdit} disabled={!formState.isValid}>
            更新
          </Button>
        ) : (
          ''
        )}
        {modalType !== 1 ? (
          <Button ml={5} variant="danger" onClick={onDelete} disabled={!formState.isValid}>
            削除
          </Button>
        ) : (
          ''
        )}
        <Button ml={5} variant="light" onClick={close}>
          閉じる
        </Button>
      </Modal>
    </>
  )
})
