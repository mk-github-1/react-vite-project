import React, { useState, useEffect, memo } from 'react'

export const UseEffectSample: React.FC = memo(() => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  console.log('再レンダリング')
  let intervalId: NodeJS.Timeout | string | number | undefined | null = null

  useEffect(() => {
    console.log('再レンダリング useEffect')

    if (isChecked && !intervalId) {
      intervalId = setInterval(() => {
        setCount((count) => count + 1)
      }, 1000)
    } else if (!isChecked && intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }, [isChecked])

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
