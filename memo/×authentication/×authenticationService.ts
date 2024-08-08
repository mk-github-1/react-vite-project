import axios, { AxiosResponse } from 'axios'
import { Message } from 'src/types/Message'
import { Authentication } from 'src/types/auth/Authentication'
import { LoginUser } from 'src/types/auth/LoginUser'

export const authenticationService = () => {
  // const frontendBaseUrl = 'http://localhost:5173'
  const backendBaseUrl = 'http://localhost:3000/api'
  const url = backendBaseUrl + '/authentications'

  // login (ログインはパスワードを含むためPOSTでアクセス)
  const login = async (authentication: Authentication) => {
    await axios({
      method: 'post',
      url: url,
      data: authentication,
      headers: {
        // Authorization: `Bearer ${token}`, // ログイン後はJWTトークンをBearerスキームで送信する
        'Content-Type': 'application/json',
        Origin: backendBaseUrl
      }
    })
    .then((response: AxiosResponse<LoginUser>) => {
        // レスポンスの処理
        // const { loginUser } = response.data
        // vconst loginUser: LoginUser = loginUser

        // loginUserStoreに保存
        // const store: any = loginUserStore()
        // store.set(loginUser)

        // 画面遷移の処理
      })
      .catch((response: AxiosResponse<Message>) => {
        // レスポンス(エラー)の処理
        console.log(response)
      })
  }

  // post  // account: string, password: string, rePassword: string
  const post = async (authentication: Authentication) => {
    await axios({
      method: 'post',
      url: url,
      data: authentication,
      headers: {
        'Content-Type': 'application/json',
        Origin: backendBaseUrl
      }
    })
    .then((response: AxiosResponse<LoginUser>) => {
      // レスポンスの処理
      console.log(response)
    })
    .catch((response: AxiosResponse<Message>) => {
      // レスポンス(エラー)の処理
      console.log(response)
    })
  }

  // patch
  const patch = async (authentication: Authentication) => {
    await axios({
      method: 'patch',
      url: url,
      data: authentication,
      headers: {
        'Content-Type': 'application/json',
        Origin: backendBaseUrl
      }
    })
      .then((response: AxiosResponse<LoginUser>) => {
        // レスポンスの処理
        console.log(response)
      })
      .catch((response: AxiosResponse<Message>) => {
        // レスポンス(エラー)の処理
        console.log(response)
      })
  }

  return {
    login,
    post,
    patch
  }
}
