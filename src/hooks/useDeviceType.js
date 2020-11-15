import { useState, useEffect } from 'react'

export const useDeviceType = () => {
  const [ready, setReady] = useState(false)
  const [smartphone, setSmartPhone] = useState(false)
  useEffect(() => {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      setSmartPhone(true)
    }
    setReady(true)
  }, [])

  return {
    ready,
    smartphone,
  }
}
