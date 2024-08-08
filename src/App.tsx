// React
import { Route, Routes } from 'react-router-dom'

// Mantine
import { Box, Container, SimpleGrid } from '@mantine/core'

// Styled components
// import styled from 'styled-components';

import { Header } from '@/components/organisms/_layouts/Header'
import { Menu } from '@/components/organisms/_layouts/Menu'
import { Footer } from '@/components/organisms/_layouts/Footer'
import { RensyuPage } from '@/components/pages/rensyu/RensyuPage'
import { MemoSample } from '@/components/pages/sample/memoSample/MemoSample'
import { PropsSample } from '@/components/pages/sample/propsSample/PropsSample'
import { UseCallbackSample } from '@/components/pages/sample/useCallbackSample/UseCallbackSample'
import { UseContextSample } from '@/components/pages/sample/useContextSample/UseContextSample'
import { UseEffectSample } from '@/components/pages/sample/useEffectSample/UseEffectSample'
import { UseEffectUseRefSample } from '@/components/pages/sample/useEffectSample/UseEffectUseRefSample'
import { UseMemoNothingSample } from '@/components/pages/sample/useMemoSample/UseMemoNothingSample'
import { UseMemoSample } from '@/components/pages/sample/useMemoSample/UseMemoSample'
import { UseStateSample } from '@/components/pages/sample/useStateSample/UseStateSample'

// Assets
import '@/assets/App.css'

export const App = (): JSX.Element => {
  return (
    <Container
      size="lg"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'white'
      }}
    >
      <SimpleGrid cols={1}>
        <Box
          style={{
            margin: '10px'
          }}
        >
          <header>
            <Header />
          </header>
        </Box>
      </SimpleGrid>
      <SimpleGrid cols={1} style={{ borderTop: '1px solid gray' }}>
        <Box style={{ margin: '10px' }}>
          <nav>
            <Menu />
          </nav>
        </Box>
      </SimpleGrid>
      <SimpleGrid
        cols={1}
        style={{
          flex: 1,
          borderTop: '1px solid gray',
          height: '100vh', // Full viewport height
          overflowY: 'scroll', // Enable vertical scrolling
          overflowX: 'hidden' // Hide horizontal scrolling
        }}
      >
        <Box
          style={{
            margin: '10px'
          }}
        >
          <main
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <p>********** route切替エリアはここから **********</p>
            <Routes>
              <Route path="/RensyuPage" element={<RensyuPage />} />
              <Route path="/MemoSample" element={<MemoSample />} />
              <Route path="/PropsSample" element={<PropsSample />} />
              <Route path="/UseCallbackSample" element={<UseCallbackSample />} />
              <Route path="/UseContextSample" element={<UseContextSample />} />
              <Route path="/UseEffectSample" element={<UseEffectSample />} />
              <Route path="/UseEffectUseRefSample" element={<UseEffectUseRefSample />} />
              <Route path="/UseMemoNothingSample" element={<UseMemoNothingSample />} />
              <Route path="/UseMemoSample" element={<UseMemoSample />} />
              <Route path="/UseStateSample" element={<UseStateSample />} />
            </Routes>
          </main>
        </Box>
      </SimpleGrid>
      <SimpleGrid cols={1} style={{ borderTop: '1px solid gray' }}>
        <Box style={{ margin: '10px' }}>
          <footer>
            <Footer />
          </footer>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

// export default App

/* Styled componentsサンプル
const Wrapper = styled.div`
  .wrapper-container {
    /* rootに移動 /
    /* min-width: 720px; /
    /* max-width: 960px; /
    /* margin: 0 auto; // 中央寄せ /
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 40px 40px 1fr 40px;
    overflow: hidden;
  }
`
*/
