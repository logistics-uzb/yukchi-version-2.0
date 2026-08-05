import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

import styles from "./header.module.css";

const { Title, Text } = Typography;

interface HeaderProps {
  title: string;
  eyebrow?: string;
  onBack?: () => void;
  backLabel?: string;
}

export function Header({
  title,
  eyebrow,
  onBack,
  backLabel = "Orqaga",
}: HeaderProps) {
  return (
    <header className={styles.header}>
      {onBack ? (
        <Button
          type="text"
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          aria-label={backLabel}
        />
      ) : (
        <span />
      )}
      <div>
        {eyebrow && <Text className={styles.eyebrow}>{eyebrow}</Text>}
        <Title level={2}>{title}</Title>
      </div>
    </header>
  );
}
