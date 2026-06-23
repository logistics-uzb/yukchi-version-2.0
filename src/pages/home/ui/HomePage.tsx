import { Typography } from "antd";
import { RoutePlanner } from "@/widgets/route-planner";
import styles from "./HomePage.module.css";

const { Title, Paragraph } = Typography;

export function HomePage() {
  return (
    <main className={styles.page}>
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
