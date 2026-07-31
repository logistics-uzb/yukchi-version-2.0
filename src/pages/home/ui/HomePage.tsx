import { Typography } from "antd";
import { RoutePlanner } from "@/widgets/route-planner";
import styles from "./HomePage.module.css";

const { Title, Paragraph } = Typography;

export function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Title className={styles.title}>Qaysi yo'nalishda yuk kerak?</Title>
        <Paragraph className={styles.subtitle}>
          Yo‘nalishni tanlang, sizga mos yuklarni ko‘rsatamiz.
        </Paragraph>
        <Paragraph className={styles.subtitle} style={{ opacity: 0.5, fontSize: 12 }}>
          deploy check · 2026-07-31
        </Paragraph>
      </section>
      <RoutePlanner />
    </main>
  );
}
