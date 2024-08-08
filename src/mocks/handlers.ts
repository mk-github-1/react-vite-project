import { http, HttpHandler, HttpResponse /* DefaultBodyType, PathParams*/ } from 'msw'
import { Person } from '@/types/person/Person'
// import { HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler'
// import { ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler'

type Params = {
  params: string
}

type RequestBodyType = {
  persons: Person
}

type ResponseBodyType = {
  persons: Person[]
}

type ResponseBodyMessageType = {
  message: string
}

// const SYSTEM_API_URL: string = import.meta.env.VITE_API_URL !== undefined ? import.meta.env.VITE_API_URL.toString() : ''

export const handlers: HttpHandler[] = [
  // 参考 https://mswjs.io/docs/best-practices/typescript
  // 動かないときがある、よくわからない
  http.get<Params, RequestBodyType, ResponseBodyType, 'http://localhost:5173/api/persons'>(
    'http://localhost:5173/api/persons',
    async ({ params }) => {
      // dummy
      console.log('get: ' + params)

      // GETでは、何かの方法でURLを取り出すが、ここでは省略します。
      const persons: Person[] = [
        {
          personName: 'test1-1',
          personCode: 'test1-2',
          age: 21,
          hobby: 'react',
          posted: '2024/07/01',
          remarks: 'test1-3',
          isDeleted: true,
          createdAt: '2024/07/01 00:00',
          updatedAt: '2024/07/01 00:00',
          createdBy: '2024/07/01 00:00',
          updatedBy: '2024/07/01 00:00'
        },
        {
          personName: 'test2-1',
          personCode: 'test2-2',
          age: 21,
          hobby: 'vue',
          posted: '2024/07/01',
          remarks: 'test2-3',
          isDeleted: true,
          createdAt: '2024/07/01 00:00',
          updatedAt: '2024/07/01 00:00',
          createdBy: '2024/07/01 00:00',
          updatedBy: '2024/07/01 00:00'
        }
      ]

      return await HttpResponse.json({ persons })
    }
  ),

  http.post<Params, RequestBodyType, ResponseBodyMessageType, 'http://localhost:5173/api/persons'>(
    'http://localhost:5173/api/persons',
    async ({ request }) => {
      // dummy
      console.log('post: ' + request)

      return await HttpResponse.json({ message: 'OK' })
    }
  ),

  http.patch<Params, RequestBodyType, ResponseBodyMessageType, 'http://localhost:5173/api/persons'>(
    'http://localhost:5173/api/persons',
    async ({ request }) => {
      // dummy
      console.log('patch: ' + request)

      return await HttpResponse.json({ message: 'OK' })
    }
  ),

  http.delete<Params, RequestBodyType, ResponseBodyMessageType, 'http://localhost:5173/api/persons'>(
    'http://localhost:5173/api/persons',
    async ({ request }) => {
      // dummy
      console.log('delete: ' + request)

      return await HttpResponse.json({ message: 'OK' })
    }
  )
]
