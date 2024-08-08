import React, { Dispatch, SetStateAction } from 'react'
import { createContext, useState } from 'react'

// 利用するデータ型
export type LoginUser = {
  loginUserName: string
}

type ILoginUserContextProps = {
  children: React.ReactNode
}

// コンテキスト用の型
export type TypeLoginUserContext = {
  loginUser: LoginUser
  setLoginUser: Dispatch<SetStateAction<LoginUser>>
}

// コンテキストを宣言
export const LoginUserContext: React.Context<TypeLoginUserContext | undefined> = createContext<
  TypeLoginUserContext | undefined
>(undefined)

// Propsをchildrenとして受け取る
export const LoginUserProvider = (props: ILoginUserContextProps) => {
  const { children }: ILoginUserContextProps = props

  // useState定義
  const [loginUser, setLoginUser]: [LoginUser, React.Dispatch<React.SetStateAction<LoginUser>>] = useState<LoginUser>({
    loginUserName: ''
  })

  // Providerでchildrenを囲む
  // contextオブジェクトとして、loginUser、setLoginUserをセット
  return <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>{children}</LoginUserContext.Provider>
}
