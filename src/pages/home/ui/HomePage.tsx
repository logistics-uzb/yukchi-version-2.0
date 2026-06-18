import { Typography } from "antd";
import { RoutePlanner } from "@/widgets/route-planner";
import styles from "./HomePage.module.css";

const { Title, Paragraph } = Typography;

export function HomePage() {
  return (
    <main className={styles.page}>
      {/* <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <AppstoreOutlined />
          </span>
          <Text strong>Yukchi</Text>
        </div>
      </header> */}

      <section className={styles.hero}>
        <Title className={styles.title}>Qayerga yuk olib borasiz?</Title>
        <Paragraph className={styles.subtitle}>
          Yo‘nalishni tanlang, sizga mos yuklarni ko‘rsatamiz.
        </Paragraph>
      </section>

      <RoutePlanner />
    </main>
  );
}
