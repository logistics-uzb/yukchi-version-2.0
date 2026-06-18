import { EnvironmentOutlined, SendOutlined, SwapOutlined } from '@ant-design/icons'
import { Button, Card, Form, Select, Typography } from 'antd'
import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { countries } from '@/shared/config'
import styles from './RoutePlanner.module.css'

const { Text, Title } = Typography

interface RoutePoint {
  country: string
  region: string
}

const regionOptions = [
  'Toshkent',
  'Andijon',
  'Samarqand',
  'Farg‘ona',
  'Namangan',
  'Buxoro',
].map((region) => ({ label: region, value: region }))

export function RoutePlanner() {
  const navigate = useNavigate()
  const [from, setFrom] = useState<RoutePoint>({
    country: 'uzbekistan',
    region: 'Toshkent',
  })
  const [to, setTo] = useState<RoutePoint>({
    country: 'uzbekistan',
    region: 'Andijon',
  })

  const swapLocations = () => {
    setFrom(to)
    setTo(from)
  }

  const searchLoads = () => {
    const params = new URLSearchParams({
      fromCountry: from.country,
      fromRegion: from.region,
      toCountry: to.country,
      toRegion: to.region,
    })

    navigate(`/loads?${params.toString()}`)
  }

  return (
    <section className={styles.section}>
      <Form onFinish={searchLoads}>
        <div className={styles.routeGrid}>
          <LocationCard
            title="Qayerdan"
            icon={<EnvironmentOutlined />}
            tone="primary"
            value={from}
            onChange={setFrom}
          />

          <Button
            className={styles.swapButton}
            type="primary"
            shape="circle"
            size="large"
            icon={<SwapOutlined rotate={90} />}
            onClick={swapLocations}
            aria-label="Manzillarni almashtirish"
          />

          <LocationCard
            title="Qayerga"
            icon={<SendOutlined />}
            tone="success"
            value={to}
            onChange={setTo}
          />
        </div>

        <Button
          className={styles.searchButton}
          type="primary"
          size="large"
          htmlType="submit"
        >
          Yo‘nalish bo‘yicha qidirish
        </Button>
      </Form>
    </section>
  )
}

interface LocationCardProps {
  title: string
  icon: ReactNode
  tone: 'primary' | 'success'
  value: RoutePoint
  onChange: (value: RoutePoint) => void
}

function LocationCard({
  title,
  icon,
  tone,
  value,
  onChange,
}: LocationCardProps) {
  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.cardTitle}>
        <span className={`${styles.icon} ${styles[tone]}`}>{icon}</span>
        <Title level={3}>{title}</Title>
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <Text>Mamlakat</Text>
          <Select
            variant="borderless"
            value={value.country}
            options={[...countries]}
            showSearch
            optionFilterProp="label"
            onChange={(country) => onChange({ ...value, country })}
          />
        </label>

        <label className={styles.field}>
          <Text>Viloyat</Text>
          <Select
            variant="borderless"
            value={value.region}
            options={regionOptions}
            onChange={(region) => onChange({ ...value, region })}
          />
        </label>
      </div>
    </Card>
  )
}
