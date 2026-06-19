import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { Alert, Button, Empty, Skeleton, Typography } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetLoadsQuery } from '@/entities/load'
import { countries } from '@/shared/consts/countries'
import { LoadCard } from '@/widgets/load-card'
import styles from './LoadsPage.module.css'

const { Title, Text } = Typography

function getRegionName(countryId?: string, regionId?: string) {
  if (!countryId || !regionId) return undefined

  return countries
    .find((country) => country.id === countryId)
    ?.regions.find((region) => region.id === regionId)?.name
}

export function LoadsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const countryFrom = searchParams.get('countryFrom') ?? undefined
  const regionFrom = searchParams.get('regionFrom') ?? undefined
  const countryTo = searchParams.get('countryTo') ?? undefined
  const regionTo = searchParams.get('regionTo') ?? undefined
  const params = {
    aiStatus: 'LOAD_POST',
    countryFrom,
    regionFrom,
    countryTo,
    regionTo,
  }
  const { data: loads = [], isLoading, isError, refetch } = useGetLoadsQuery(params)
  const fromRegionName = getRegionName(countryFrom, regionFrom)
  const toRegionName = getRegionName(countryTo, regionTo)

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
            {fromRegionName ?? 'Barcha hududlar'} →{' '}
            {toRegionName ?? 'Barcha hududlar'}
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
          loads.map((load, index) => (
            <LoadCard key={load.id ?? load._id ?? index} load={load} />
          ))}

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
