import type { PropsWithChildren } from 'react'
import { ConfigProvider } from 'antd'
import { antTheme } from '../config/antTheme'

export function AntProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider componentSize="middle" theme={antTheme}>
      {children}
    </ConfigProvider>
  )
}
