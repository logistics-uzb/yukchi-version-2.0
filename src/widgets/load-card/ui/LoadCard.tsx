import {
  CheckCircleFilled,
  EnvironmentOutlined,
  FlagOutlined,
  PhoneOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Flex, Tag, Typography } from "antd";
import type { Load } from "@/entities/load";
import styles from "./LoadCard.module.css";
import { Flag } from "@/shared/ui/flag";
import { regionDetector } from "@/shared/helpers/region-detector";
import { timeAgo } from "@/shared/helpers/time-ago";
import { getRegionName } from "@/shared/helpers/region-name";
import { capitalize } from "@/shared/helpers/uppercase-first-letter";

const { Title, Text } = Typography;

interface LoadCardProps {
  load: Load;
}

function formatPrice(load: Load) {
  const amount = load.paymentAmount;
  const currency = load.paymentCurrency || null;

  if (!amount) return "Kelishiladi";

  const formattedAmount =
    amount > 1_000_000
      ? `${amount / 1_000_000} mln`
      : amount.toLocaleString("uz-UZ");

  function formatCurrency(value: "sum" | "usd" | null) {
    switch (value) {
      case "sum":
        return "so'm";
      case "usd":
        return "$";
      default:
        return "";
    }
  }

  const formattedCurrency = formatCurrency(currency);

  return `${formattedAmount} ${formattedCurrency}`;
}

function getPhoneUrl(phone?: string) {
  if (!phone) return undefined;

  const normalizedPhone = phone.trim().replace(/[^\d+*#,;]/g, "");
  return normalizedPhone ? `tel:${normalizedPhone}` : undefined;
}

export function LoadCard({ load }: LoadCardProps) {
  const route = {
    from: {
      country: load.countryFrom,
      region: load.regionFrom,
    },
    to: {
      country: load.countryTo,
      region: load.regionTo,
    },
  };
  const owner = load.companyName ?? load.ownerName;
  const weight = load.weight
    ? `${load.weight} ${load.cargoUnit === "tons" ? "tonna" : (load.cargoUnit ?? "")}`.trim()
    : null;

  const phone = load.phoneNumber ?? load.phone;
  const phoneUrl = getPhoneUrl(phone);

  const timeAgoValue = timeAgo(load.sentToTelegramAt || "");

  const callPhone = () => {
    if (!phoneUrl) return;

    const callLink = document.createElement("a");
    callLink.href = phoneUrl;
    callLink.target = "_blank";
    callLink.rel = "noopener noreferrer";
    callLink.style.display = "none";
    document.body.appendChild(callLink);
    callLink.click();
    callLink.remove();
  };

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.summary}>
          <Title ellipsis level={3}>
            {capitalize(load.title?.slice(0, 20) || "Yuk")}
          </Title>
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
        <Flex vertical align="center" className={styles.routeIcons}>
          <EnvironmentOutlined className={styles.startIcon} />
          <div className={styles.line} />
          <FlagOutlined className={styles.endIcon} />
        </Flex>
        <div className={styles.routeContent}>
          <div>
            <Text className={styles.label}>QAYERDAN</Text>
            <Flex gap={4}>
              <Flag code={regionDetector(route.from.country || "")} />
              <strong>{getRegionName(route.from.region)}</strong>
            </Flex>
          </div>
          <div>
            <Text className={styles.label}>QAYERGA</Text>
            <Flex gap={4}>
              <Flag code={regionDetector(route.to.country || "")} />
              <strong>{getRegionName(route.to.region)}</strong>
            </Flex>
          </div>
        </div>
      </div>

      <Flex gap={4} style={{ marginBottom: 16 }}>
        {weight && <Tag color="volcano">{weight}</Tag>}
      </Flex>

      <Flex className={styles.actions} gap={8}>
        <Button
          className={styles.actionButton}
          size="large"
          icon={<SendOutlined />}
          href={phone ? `https://t.me/${phone}` : undefined}
          aria-label="Bog‘lanish"
          disabled={!phone}
        >
          Telegram
        </Button>
        <Button
          className={styles.actionButton}
          type="primary"
          size="large"
          icon={<PhoneOutlined />}
          onClick={callPhone}
          disabled={!phoneUrl}
        >
          Qo‘ng‘iroq qilish
        </Button>
      </Flex>
      <Text type="secondary" className={styles.time}>
        {timeAgoValue.value === 0 && timeAgoValue.unit === "daqiqa"
          ? "hozir"
          : `${timeAgoValue.value} ${timeAgoValue.unit} oldin`}
      </Text>
    </article>
  );
}
