import { useState, ReactNode, useLayoutEffect, useCallback } from "react"

type PreloaderProps = {
  children: ReactNode
  loaders: Array<() => Promise<unknown>>
  loadingSlot?: ReactNode
  errorSlot?: (reload: () => Promise<unknown>) => void
}
export const Preloader = ({ children, loaders, loadingSlot, errorSlot }: PreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const load = useCallback(async () => {
    setIsLoading(true)

    try {
      await Promise.all(loaders.map((loader) => loader()))
      setIsError(false)
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useLayoutEffect(() => {
    load()
  }, [])

  if (isLoading) {
    return loadingSlot || (
        <div>
          Подождите пожалуйста, грузится что-то, без чего этот кусок страницы не может работать
        </div>
    )
  }

  if (isError) {
    return errorSlot?.(load) || (
        <div>
          Что-то очень нужное здесь не загрузилось
          <button onClick={load}> Попробовать перезагрузить </button>
        </div>
    )
  }

  return children
}