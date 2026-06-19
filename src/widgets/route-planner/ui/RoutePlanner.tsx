import { EnvironmentOutlined, SendOutlined, SwapOutlined } from '@ant-design/icons'
import { Button, Card, Form, Select, Typography } from 'antd'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { countries } from '@/shared/consts/countries'
import styles from './RoutePlanner.module.css'

const { Text, Title } = Typography

interface FilterFormValues {
  from_country?: string
  from_region?: string
  to_country?: string
  to_region?: string
}

const countryOptions = countries.map((country) => ({
  label: country.name,
  value: country.id,
}))

function getRegionOptions(countryId: string) {
  return (
    countries
      .find((country) => country.id === countryId)
      ?.regions.map((region) => ({
        label: region.name,
        value: region.id,
      })) ?? []
  )
}

export function RoutePlanner() {
  const navigate = useNavigate()
  const [form] = Form.useForm<FilterFormValues>()
  const fromCountry = Form.useWatch('from_country', form)
  const toCountry = Form.useWatch('to_country', form)

  const swapLocations = () => {
    const values = form.getFieldsValue()

    form.setFieldsValue({
      from_country: values.to_country,
      from_region: values.to_region,
      to_country: values.from_country,
      to_region: values.from_region,
    })
  }

  const searchLoads = (values: FilterFormValues) => {
    const searchParams = new URLSearchParams()

    if (values.from_country) {
      searchParams.set('countryFrom', values.from_country)
    }
    if (values.from_region) {
      searchParams.set('regionFrom', values.from_region)
    }
    if (values.to_country) {
      searchParams.set('countryTo', values.to_country)
    }
    if (values.to_region) {
      searchParams.set('regionTo', values.to_region)
    }

    const query = searchParams.toString()
    navigate(query ? `/loads?${query}` : '/loads')
  }

  return (
    <section className={styles.section}>
      <Form form={form} onFinish={searchLoads}>
        <div className={styles.routeGrid}>
          <LocationCard
            title="Qayerdan"
            icon={<EnvironmentOutlined />}
            tone="primary"
            countryName="from_country"
            regionName="from_region"
            countryValue={fromCountry}
            form={form}
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
            countryName="to_country"
            regionName="to_region"
            countryValue={toCountry}
            form={form}
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
  countryName: 'from_country' | 'to_country'
  regionName: 'from_region' | 'to_region'
  countryValue?: string
  form: ReturnType<typeof Form.useForm<FilterFormValues>>[0]
}

function LocationCard({
  title,
  icon,
  tone,
  countryName,
  regionName,
  countryValue,
  form,
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
          <Form.Item name={countryName} noStyle>
            <Select
              variant="borderless"
              options={countryOptions}
              showSearch
              optionFilterProp="label"
              onChange={() => form.setFieldValue(regionName, undefined)}
              allowClear
            />
          </Form.Item>
        </label>

        <label className={styles.field}>
          <Text>Viloyat</Text>
          <Form.Item name={regionName} noStyle>
            <Select
              variant="borderless"
              options={getRegionOptions(countryValue ?? '')}
              allowClear
            />
          </Form.Item>
        </label>
      </div>
    </Card>
  )
}
