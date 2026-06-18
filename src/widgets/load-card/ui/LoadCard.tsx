import {
  CheckCircleFilled,
  EnvironmentOutlined,
  FlagOutlined,
  PhoneOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Button, Typography } from 'antd'
import type { Load, LoadLocation } from '@/entities/load'
import styles from './LoadCard.module.css'

const { Title, Text } = Typography

interface LoadCardProps {
  load: Load
}

function formatLocation(location?: LoadLocation | string) {
  if (!location) return 'Manzil ko‘rsatilmagan'
  if (typeof location === 'string') return location
  return [location.region, location.city].filter(Boolean).join(', ') ||
    location.country ||
    'Manzil ko‘rsatilmagan'
}

function formatPrice(load: Load) {
  if (!load.price) return 'Kelishiladi'
  return `${load.price.toLocaleString('uz-UZ')} ${load.currency ?? 'UZS'}`
}

export function LoadCard({ load }: LoadCardProps) {
  const owner = load.companyName ?? load.ownerName
  const weight = load.weight ? `${load.weight} tonna` : 'Kelishiladi'

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div>
          <Title level={3}>{load.cargoName ?? load.title ?? 'Yuk'}</Title>
          {owner && (
            <Text className={styles.owner}>
              {load.isVerified && <CheckCircleFilled />}
              {owner}
            </Text>
          )}
        </div>
        <span className={styles.price}>{formatPrice(load)}</span>
      </div>

      <div className={styles.route}>
        <div className={styles.routeIcons}>
          <EnvironmentOutlined className={styles.fromIcon} />
          <span />
          <FlagOutlined className={styles.toIcon} />
        </div>
        <div className={styles.routeContent}>
          <div>
            <Text className={styles.label}>QAYERDAN</Text>
            <strong>{formatLocation(load.from)}</strong>
          </div>
          <div>
            <Text className={styles.label}>QAYERGA</Text>
            <strong>{formatLocation(load.to)}</strong>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div>
          <Text type="secondary">Masofa</Text>
          <strong>{load.distance ? `${load.distance} km` : '—'}</strong>
        </div>
        <div>
          <Text type="secondary">Yuk hajmi</Text>
          <strong>{weight}</strong>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          type="primary"
          size="large"
          icon={<PhoneOutlined />}
          href={load.phone ? `tel:${load.phone}` : undefined}
          disabled={!load.phone}
        >
          Qo‘ng‘iroq qilish
        </Button>
        <Button
          className={styles.sendButton}
          size="large"
          icon={<SendOutlined />}
          aria-label="Bog‘lanish"
        />
      </div>
    </article>
  )
}
