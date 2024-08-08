import React, { memo, useContext, useState } from 'react'
import {
  LoginUser,
  LoginUserContext,
  TypeLoginUserContext
} from '@/common/providers/LoginUserProvider'
import { Button, Input } from '@mantine/core'

export const UseContextSample: React.FC = memo(() => {
  // 使用方法、useContext<型>(参照したいコンテキストを指定)
  const loginUserContext: TypeLoginUserContext | undefined = useContext(LoginUserContext)
  const [loginUser, setInputValue] = useState<LoginUser>()

  console.log('再レンダリングされます')

  return (
    <>
      <h3>UseContextサンプル</h3>
      <p>
        1. useContextを利用するために、LoginUserProviderを準備
        <br />
        2. 利用するためのタグをmain.tsxに設定
        <br />
        3. 利用するファイルでuseContext{'<型>'}(参照したいコンテキストを指定)
        <br />
        サンプルではinputに入力した値をボタンを押して、コンテキストを更新するようにしている
      </p>
      <p>下記コードは複雑ですが、入力時にuseStateを更新、ボタンでcontextを更新しているのみです。</p>
      Label: {loginUserContext?.loginUser.loginUserName}
      <Input
        style={{ width: '200px', marginBottom: '5px' }}
        value={loginUser?.loginUserName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue({ loginUserName: event.currentTarget?.value })
        }}
      />
      <Button
        onClick={() => {
          loginUserContext?.setLoginUser({
            loginUserName: loginUser !== undefined ? loginUser.loginUserName : ''
          })
        }}
        style={{ width: '200px' }}
      >
        OK
      </Button>
    </>
  )
})
