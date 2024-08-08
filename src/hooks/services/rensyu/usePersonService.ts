import { useCallback, useState } from 'react'
import axios, { AxiosError /* , AxiosResponse */ } from 'axios'

// Types
import { Person } from '@/types/person/Person'
import { IPersonService } from '@/types/person/IPersonService'

export const usePersonService = (apiUrl: string): IPersonService => {
  const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false)
  const [isError, setIsError]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false)
  const [persons, setPersons]: [Person[], React.Dispatch<React.SetStateAction<Person[]>>] = useState<Person[]>([])
  const API_URL: string = apiUrl + '/persons'

  const getPerson: () => Promise<void> = useCallback(
    async (/* params: Record<string, string>[] */): Promise<void> => {
      setIsError(false)
      setIsLoading(true)

      await axios({
        method: 'get',
        url: API_URL,
        params: '', // paramsをGETパラメータとして使用する
        headers: {
          // Accept: 'application/json;odata=verbose', GET時など、必要であれば
          // Authorization: 'Bearer ' + accessToken など
          'Content-Type': 'application/json',
          Origin: 'http://localhost:5173'
          // Origin: 'https://jsonplaceholder.typicode.com/' // HTTPリクエストのCORS設定
        }
      })
        .then((/* response: AxiosResponse<string> */) => {
          // const results: Person[] = response.data
          // setPersons(results)

          // MSWモックでaxiosの実行がうまくできないため、ダミーデータを返却しています。
          const results: Person[] = [
            {
              personCode: 'test1',
              personName: 'test2',
              age: 20,
              hobby: 'react',
              posted: '2024/08/01',
              remarks: 'memo1',
              isDeleted: true,
              createdAt: '2024/08/02',
              updatedAt: '2024/08/03',
              createdBy: 'aaa',
              updatedBy: 'bbb'
            },
            {
              personCode: 'test11',
              personName: 'test12',
              age: 21,
              hobby: 'vue',
              posted: '2024/08/04',
              remarks: 'memo2',
              isDeleted: false,
              createdAt: '2024/08/05',
              updatedAt: '2024/08/06',
              createdBy: 'aaa',
              updatedBy: 'bbb'
            }
          ]
          setPersons(results)
          setIsError(false)
        })
        .catch((response: AxiosError) => {
          alert(response.message)
          setIsError(true)
        })
        .finally(() => setIsLoading(false))
    },
    [API_URL]
  )

  const postPerson: (person: Person) => Promise<void> = useCallback(
    async (person: Person): Promise<void> => {
      setIsError(false)
      setIsLoading(true)

      await axios({
        method: 'post',
        url: API_URL,
        data: JSON.stringify(person),
        headers: {
          // Authorization: 'Bearer ' + accessToken など
          'Content-Type': 'application/json'
          // Origin: 'https://xxx.com' HTTPリクエストのCORS設定
        }
      })
        .then((/* response: AxiosResponse<string> */) => {
          setIsError(false)
        })
        .catch((response: AxiosError) => {
          alert(response.message)
          setIsError(true)
        })
        .finally(() => setIsLoading(false))
    },
    [API_URL]
  )

  const patchPerson: (person: Person) => Promise<void> = useCallback(
    async (person: Person): Promise<void> => {
      setIsError(false)
      setIsLoading(true)

      await axios({
        method: 'patch',
        url: API_URL,
        data: JSON.stringify(person),
        headers: {
          // Authorization: 'Bearer ' + accessToken など
          'Content-Type': 'application/json'
          // Origin: 'https://xxx.com' HTTPリクエストのCORS設定
        }
      })
        .then((/* response: AxiosResponse<string> */) => {
          setIsError(false)
        })
        .catch((response: AxiosError) => {
          alert(response.message)
          setIsError(true)
        })
        .finally(() => setIsLoading(false))
    },
    [API_URL]
  )

  const deletePerson: (person: Person) => Promise<void> = useCallback(
    async (person: Person): Promise<void> => {
      setIsError(false)
      setIsLoading(true)

      await axios({
        method: 'delete',
        url: API_URL,
        data: JSON.stringify(person),
        headers: {
          // Authorization: 'Bearer ' + accessToken, など
          'Content-Type': 'application/json'
          // Origin: 'https://xxx.com' HTTPリクエストのCORS設定
        }
      })
        .then((/* response: AxiosResponse<string> */) => {
          setIsError(false)
        })
        .catch((response: AxiosError) => {
          alert(response.message)
          setIsError(true)
        })
        .finally(() => setIsLoading(false))
    },
    [API_URL]
  )

  return { persons, isLoading, isError, getPerson, postPerson, patchPerson, deletePerson }
}
