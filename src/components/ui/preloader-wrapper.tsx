"use client"

import { useState, useCallback } from "react"
import Preloader from "@/components/ui/preloader"

export function PreloaderWrapper() {
  const [show, setShow] = useState(true)

  const handleComplete = useCallback(() => {
    setShow(false)
  }, [])

  if (!show) return null

  return <Preloader onComplete={handleComplete} />
}