import { useEffect, useRef, memo } from 'react'

export const UseEffectUseRefSample: React.FC = memo(() => {
  const isMounted: React.MutableRefObject<boolean> = useRef<boolean>(false)

  useEffect(() => {
    console.log('ここは2回実行される')

    if (isMounted.current) {
      alert('mountedされました(初回のみ実行)')
    } else {
      isMounted.current = true
    }
  }, [])

  return (
    <>
      <h3>UseEffect初回実行のサンプル</h3>
      <p>画面を開いた時、alertが1回実行されます</p>
      <p>
        React.StrictModeの2回レンダリング対応のため、
        <br />
        useRefでフラグを利用しmountedしたときのみ実行
      </p>
      <p>useRefは都度レンダリングをしない</p>
    </>
  )
})
