import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/App'
import './assets/index.css'

import { LoginUserProvider } from '@/common/providers/LoginUserProvider'

// Mantine
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { MantineProvider } from '@mantine/core'
import { variantColorResolver } from '@/common/mantine/variantColorResolver'

// msw (Viteでは外でimportする)
import { worker } from './mocks/browser'

if (import.meta.env.NODE_ENV) {
  worker.start()
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={{ variantColorResolver }}>
        <LoginUserProvider>
          <App />
        </LoginUserProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)
