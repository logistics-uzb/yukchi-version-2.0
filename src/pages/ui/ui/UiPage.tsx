import {
  BellOutlined,
  CheckOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Progress,
  Radio,
  Rate,
  Segmented,
  Select,
  Slider,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import type { TableProps } from 'antd'
import styles from './UiPage.module.css'

const { Title, Paragraph, Text } = Typography
const { TextArea, Password } = Input

interface UserRow {
  key: string
  name: string
  role: string
  status: 'Faol' | 'Kutilmoqda'
}

const users: UserRow[] = [
  { key: '1', name: 'Ali Valiyev', role: 'Administrator', status: 'Faol' },
  { key: '2', name: 'Madina Karimova', role: 'Operator', status: 'Kutilmoqda' },
]

const columns: TableProps<UserRow>['columns'] = [
  {
    title: 'Foydalanuvchi',
    dataIndex: 'name',
    render: (name: string) => (
      <Space>
        <Avatar icon={<UserOutlined />} />
        <Text strong>{name}</Text>
      </Space>
    ),
  },
  { title: 'Lavozim', dataIndex: 'role' },
  {
    title: 'Holat',
    dataIndex: 'status',
    render: (status: UserRow['status']) => (
      <Tag color={status === 'Faol' ? 'success' : 'warning'}>{status}</Tag>
    ),
  },
]

export function UiPage() {
  const [messageApi, contextHolder] = message.useMessage()

  const submitForm = () => {
    void messageApi.success('Forma muvaffaqiyatli yuborildi')
  }

  return (
    <main className={styles.page}>
      {contextHolder}

      <header className={styles.header}>
        <div>
          <Text className={styles.eyebrow}>DESIGN SYSTEM</Text>
          <Title className={styles.pageTitle}>UI komponentlar</Title>
          <Paragraph className={styles.subtitle}>
            Loyihada ishlatiladigan asosiy Ant Design komponentlari katalogi.
          </Paragraph>
        </div>

        <Badge count={3}>
          <Button shape="circle" size="large" icon={<BellOutlined />} />
        </Badge>
      </header>

      <section className={styles.grid}>
        <Card title="Buttonlar" className={styles.card}>
          <Flex gap={12} wrap>
            <Button type="primary" icon={<PlusOutlined />}>
              Qo‘shish
            </Button>
            <Button icon={<DownloadOutlined />}>Yuklab olish</Button>
            <Button type="dashed">Dashes</Button>
            <Button type="text">Text</Button>
            <Button type="link">Havola</Button>
            <Button danger icon={<DeleteOutlined />}>
              O‘chirish
            </Button>
            <Button type="primary" loading>
              Yuklanmoqda
            </Button>
            <Button disabled>Faol emas</Button>
          </Flex>

          <Divider />

          <Flex gap={12} align="center" wrap>
            <Button type="primary" size="large">
              Large
            </Button>
            <Button type="primary">Default</Button>
            <Button type="primary" size="small">
              Small
            </Button>
            <Button shape="circle" icon={<SearchOutlined />} />
            <Button shape="round" icon={<CheckOutlined />}>
              Tasdiqlash
            </Button>
          </Flex>
        </Card>

        <Card title="Inputlar" className={styles.card}>
          <Form layout="vertical" onFinish={submitForm}>
            <div className={styles.formGrid}>
              <Form.Item
                label="Ism"
                name="name"
                rules={[{ required: true, message: 'Ismingizni kiriting' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Ismingiz" />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input type="email" placeholder="example@mail.com" />
              </Form.Item>

              <Form.Item label="Parol" name="password">
                <Password placeholder="Parolni kiriting" />
              </Form.Item>

              <Form.Item label="Telefon raqam" name="phone">
                <Input addonBefore="+998" placeholder="90 123 45 67" />
              </Form.Item>

              <Form.Item label="Kategoriya" name="category">
                <Select
                  placeholder="Tanlang"
                  options={[
                    { value: 'web', label: 'Web dasturlash' },
                    { value: 'mobile', label: 'Mobil dasturlash' },
                    { value: 'design', label: 'Dizayn' },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Sana" name="date">
                <DatePicker className={styles.fullWidth} placeholder="Sana" />
              </Form.Item>

              <Form.Item label="Yosh" name="age">
                <InputNumber
                  className={styles.fullWidth}
                  min={1}
                  max={100}
                  placeholder="Yoshingiz"
                />
              </Form.Item>

              <Form.Item label="Qidiruv">
                <Input.Search placeholder="Qidirish..." enterButton />
              </Form.Item>
            </div>

            <Form.Item label="Izoh" name="comment">
              <TextArea rows={4} showCount maxLength={250} placeholder="Yozing..." />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Yuborish
            </Button>
          </Form>
        </Card>

        <Card title="Tanlash komponentlari" className={styles.card}>
          <Space direction="vertical" size="large" className={styles.fullWidth}>
            <Checkbox.Group
              defaultValue={['sms']}
              options={[
                { label: 'SMS', value: 'sms' },
                { label: 'Email', value: 'email' },
                { label: 'Telegram', value: 'telegram' },
              ]}
            />

            <Radio.Group defaultValue="day">
              <Radio.Button value="day">Kun</Radio.Button>
              <Radio.Button value="week">Hafta</Radio.Button>
              <Radio.Button value="month">Oy</Radio.Button>
            </Radio.Group>

            <Segmented<string>
              block
              options={['Ro‘yxat', 'Jadval', 'Kalendar']}
            />

            <Flex justify="space-between" align="center">
              <Text>Bildirishnomalar</Text>
              <Switch defaultChecked />
            </Flex>

            <div>
              <Text>Qiymat</Text>
              <Slider defaultValue={65} />
            </div>

            <Flex gap={12} align="center">
              <Text>Baholash</Text>
              <Rate defaultValue={4} />
            </Flex>
          </Space>
        </Card>

        <Card title="Holatlar va feedback" className={styles.card}>
          <Space direction="vertical" size={16} className={styles.fullWidth}>
            <Alert message="Ma’lumot muvaffaqiyatli saqlandi" type="success" showIcon />
            <Alert message="Maydonlarni tekshirib chiqing" type="warning" showIcon />
            <Alert message="Server bilan aloqa mavjud emas" type="error" showIcon />

            <Divider />

            <Flex gap={8} wrap>
              <Tag color="blue">Yangi</Tag>
              <Tag color="green">Faol</Tag>
              <Tag color="orange">Jarayonda</Tag>
              <Tag color="red">Bekor qilingan</Tag>
            </Flex>

            <Progress percent={72} />
            <Progress percent={100} status="success" />
          </Space>
        </Card>

        <Card title="Jadval" className={`${styles.card} ${styles.wideCard}`}>
          <Table<UserRow>
            columns={columns}
            dataSource={users}
            pagination={false}
            scroll={{ x: 560 }}
          />
        </Card>
      </section>
    </main>
  )
}
