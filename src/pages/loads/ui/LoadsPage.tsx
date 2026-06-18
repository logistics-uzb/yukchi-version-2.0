import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { Alert, Button, Empty, Skeleton, Typography } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetLoadsQuery } from '@/entities/load'
import { LoadCard } from '@/widgets/load-card'
import styles from './LoadsPage.module.css'

const { Title, Text } = Typography

export function LoadsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = {
    fromCountry: searchParams.get('fromCountry') ?? undefined,
    fromRegion: searchParams.get('fromRegion') ?? undefined,
    toCountry: searchParams.get('toCountry') ?? undefined,
    toRegion: searchParams.get('toRegion') ?? undefined,
  }
  const { data: loads = [], isLoading, isError, refetch } = useGetLoadsQuery(params)

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Button
          type="text"
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          aria-label="Orqaga"
        />
        <div>
          <Title level={2}>Mos yuklar</Title>
          <Text type="secondary">
            {params.fromRegion ?? 'Barcha hududlar'} →{' '}
            {params.toRegion ?? 'Barcha hududlar'}
          </Text>
        </div>
        <Button
          type="text"
          shape="circle"
          size="large"
          icon={<ReloadOutlined />}
          onClick={() => refetch()}
          aria-label="Yangilash"
        />
      </header>

      {isError && (
        <Alert
          className={styles.alert}
          type="warning"
          showIcon
          message="Yuklarni olib bo‘lmadi"
          description="API manzili va endpoint sozlamalarini tekshiring."
        />
      )}

      <section className={styles.list}>
        {isLoading &&
          Array.from({ length: 3 }, (_, index) => (
            <div className={styles.skeleton} key={index}>
              <Skeleton active paragraph={{ rows: 6 }} />
            </div>
          ))}

        {!isLoading &&
          loads.map((load) => <LoadCard key={load._id} load={load} />)}

        {!isLoading && !isError && loads.length === 0 && (
          <div className={styles.empty}>
            <Empty description="Bu yo‘nalishda hozircha yuk yo‘q" />
            <Button type="primary" onClick={() => navigate('/')}>
              Yo‘nalishni o‘zgartirish
            </Button>
          </div>
        )}
      </section>
    </main>
  )
}
