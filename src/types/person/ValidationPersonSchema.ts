import * as Yup from 'yup'
import { Person } from '@/types/person/Person'

// 実際はメッセージ定義ファイル等で管理されている
const requiredMessage: string = '入力は必須です。'
const maxLengthMessage: string = '文字以内で入力して下さい。'
const numberRangeMessage: string = 'の範囲で入力して下さい。'
// const mailAddressMessage: string = 'メールアドレスの形式で入力して下さい。'

export const ValidationPersonSchema: { errorScheme: Yup.ObjectSchema<Person> } = {
  errorScheme: Yup.object().shape({
    // ここがreact-hook-form側と一致しているとバリデーションが発火
    // Dateはstringとして使用します
    personCode: Yup.string()
      .required(requiredMessage)
      .max(20, 20 + maxLengthMessage),
    personName: Yup.string()
      .required(requiredMessage)
      .max(20, 20 + maxLengthMessage),
    age: Yup.number()
      .min(0, '0～100' + numberRangeMessage)
      .max(100, '0～100' + numberRangeMessage),
    hobby: Yup.string().required(requiredMessage),
    posted: Yup.string().required(requiredMessage),
    remarks: Yup.string().max(20, '20' + maxLengthMessage),
    isDeleted: Yup.boolean(),
    createdAt: Yup.string(),
    updatedAt: Yup.string(),
    createdBy: Yup.string(),
    updatedBy: Yup.string()
  })
}
