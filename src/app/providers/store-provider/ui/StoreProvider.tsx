import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from '../config/store'

export function StoreProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>
}
