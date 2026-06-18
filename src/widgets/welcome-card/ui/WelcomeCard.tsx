import { CheckCircleOutlined, RocketOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Space, Tag, Typography } from 'antd'
import styles from './WelcomeCard.module.css'

const { Title, Paragraph, Text } = Typography

const technologies = [
  ['purple', 'Vite'],
  ['blue', 'React'],
  ['cyan', 'TypeScript'],
  ['red', 'Ant Design'],
] as const

const statuses = [
  'TypeScript sozlandi',
  'Ant Design ulandi',
  'Hot Module Replacement tayyor',
]

export function WelcomeCard() {
  return (
    <Card className={styles.card} bordered={false}>
      <Flex vertical gap={24}>
        <Space size={8} wrap>
          {technologies.map(([color, name]) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>

        <div>
          <Title className={styles.title} level={1}>
            Loyiha tayyor!
          </Title>
          <Paragraph className={styles.description}>
            Zamonaviy frontend yaratish uchun barcha asosiy texnologiyalar
            muvaffaqiyatli sozlandi.
          </Paragraph>
        </div>

        <Space direction="vertical" size={12}>
          {statuses.map((status) => (
            <Text key={status}>
              <CheckCircleOutlined className={styles.successIcon} />
              {status}
            </Text>
          ))}
        </Space>

        <Button
          className={styles.button}
          type="primary"
          size="large"
          icon={<RocketOutlined />}
          href="/ui"
        >
          Komponentlarni ko‘rish
        </Button>
      </Flex>
    </Card>
  )
}
