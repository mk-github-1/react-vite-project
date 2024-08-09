import React, { useState, useEffect, memo, useRef } from 'react'

export const UseEffectSample: React.FC = memo(() => {
  const [isChecked, setIsChecked]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false)
  const [count, setCount]: [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(0)
  console.log('再レンダリング')
  const intervalId: React.MutableRefObject<NodeJS.Timeout | null> = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    console.log('再レンダリング useEffect')

    if (isChecked && !intervalId.current) {
      intervalId.current = setInterval(() => {
        setCount((count: number) => count + 1)
      }, 1000)
    } else if (!isChecked && intervalId.current) {
      clearInterval(intervalId.current)
      intervalId.current = null
    }
  }, [intervalId, isChecked])

  return (
    <>
      <h3>UseEffectサンプル</h3>
      <div>
        <p>checkを入れるとcount開始 ※外しても停止はしません</p>
        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        <p>count is {count}</p>
      </div>
    </>
  )
})
