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
        <div
          style={{
            display: "inline-block",
            padding: "4px 10px",
            marginTop: 8,
            background: "#635bff",
            color: "white",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          DEPLOY TEST #1 — {new Date().toISOString().slice(0, 16)}
        </div>
      </section>
      <RoutePlanner />
    </main>
  );
}
