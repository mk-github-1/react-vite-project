import React, { memo } from 'react'
import { Link } from 'react-router-dom'

export const Menu: React.FC = memo(() => {
  return (
    <>
      <Link to="/">Home(root)</Link> | <Link to="/RensyuPage">Rensyuページ</Link> |{' '}
      <Link to="/MemoSample">MemoSample</Link> | <Link to="/PropsSample">PropsSample</Link> |{' '}
      <Link to="/UseCallbackSample">UseCallbackSample</Link> |{' '}
      <Link to="/UseContextSample">UseContextSample</Link> |{' '}
      <Link to="/UseEffectSample">UseEffectSample</Link> |{' '}
      <Link to="/UseEffectUseRefSample">UseEffectUseRefSample</Link> |{' '}
      <Link to="/UseMemoNothingSample">UseMemoNothingSample</Link> |{' '}
      <Link to="/UseMemoSample">UseMemoSample</Link> |{' '}
      <Link to="/UseStateSample">UseStateSample</Link> |{' '}
    </>
  )
})
