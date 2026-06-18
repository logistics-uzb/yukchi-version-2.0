import type { ThemeConfig } from 'antd'

const colors = {
  primary: '#635bff',
  border: '#d9dce5',
  inputBackground: '#ffffff',
  placeholder: '#98a2b3',
} as const

export const antTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    borderRadius: 10,
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  components: {
    Input: {
      colorBgContainer: colors.inputBackground,
      colorBorder: colors.border,
      colorTextPlaceholder: colors.placeholder,
      borderRadius: 12,
      paddingBlock: 10,
      paddingBlockLG: 12,
      paddingBlockSM: 6,
      paddingInline: 14,
      paddingInlineLG: 16,
      paddingInlineSM: 10,
      addonBg: '#f7f7fa',
      hoverBg: colors.inputBackground,
      activeBg: colors.inputBackground,
      hoverBorderColor: '#8b85ff',
      activeBorderColor: colors.primary,
      activeShadow: '0 0 0 4px rgba(99, 91, 255, 0.12)',
      errorActiveShadow: '0 0 0 4px rgba(255, 77, 79, 0.12)',
      warningActiveShadow: '0 0 0 4px rgba(250, 173, 20, 0.14)',
    },
  },
}
