import {
  CheckCircleFilled,
  EnvironmentOutlined,
  FlagOutlined,
  PhoneOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Flex, Tag, Typography } from "antd";
import {
  usePostLoadClickCountMutation,
  type Load,
  type LoadClickType,
} from "@/entities/load";
import styles from "./LoadCard.module.css";
import { Flag } from "@/shared/ui/flag";
import { regionDetector } from "@/shared/helpers/region-detector";
import { timeAgo } from "@/shared/helpers/time-ago";
import { getRegionName } from "@/shared/helpers/region-name";
import { capitalize } from "@/shared/helpers/uppercase-first-letter";
import { formatDistanceDuration } from "../helpers/format-distance-duration";
import { formatPrice } from "../helpers/format-price";
import { getPhoneUrl } from "../helpers/format-phone-number";
import { formatCurrency } from "../helpers/format-currency";
import { setSpaceFromEnd } from "@/shared/helpers/set-space-from-end";

const { Title, Text } = Typography;

interface LoadCardProps {
  load: Load;
}

export function LoadCard({ load }: LoadCardProps) {
  const [postLoadClickCount] = usePostLoadClickCountMutation();

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

  const distance = load.distanceKm ? Number(load.distanceKm).toFixed() : "";

  const pricePerKm = load.pricePerKm
    ? `${Number(load.pricePerKm).toFixed(1)}`
    : "";

  const currency = load.paymentCurrency && formatCurrency(load.paymentCurrency);

  const distanceDurationInMinutes = load.distanceTimeMinutes
    ? `~ ${formatDistanceDuration(+load.distanceTimeMinutes.toFixed())}`
    : "";

  const phone = load.phoneNumber ?? load.phone;
  const phoneUrl = getPhoneUrl(phone);
  const loadId = load.id ?? load._id;

  const tgUsername = load.senderTgUsername ?? load.senderTgUsername;

  const timeAgoValue = timeAgo(load.sentToTelegramAt || "");

  const trackContactClick = (type: LoadClickType) => {
    if (!loadId) return;

    void postLoadClickCount({
      type,
      loadId,
    });
  };

  const callPhone = () => {
    if (!phoneUrl) return;

    trackContactClick("call");

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
        <Flex gap={8}>
          <span className={styles.price}>{formatPrice(load)}</span>
        </Flex>
      </div>

      <div className={styles.route}>
        <Flex vertical align="center" className={styles.routeIcons}>
          <EnvironmentOutlined className={styles.startIcon} />
          <div className={styles.line}>
            <span className={styles.distance}>
              {setSpaceFromEnd(distance)} km
            </span>
          </div>
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
        {distanceDurationInMinutes && (
          <Tag color="geekblue">{distanceDurationInMinutes}</Tag>
        )}
        {pricePerKm && (
          <Tag color="geekblue">
            {setSpaceFromEnd(pricePerKm)} {currency}/km
          </Tag>
        )}
      </Flex>

      <Flex style={{ width: "100%" }} justify="space-between" gap={8}>
        {/* <Button
          style={{ width: "100%" }}
          size="large"
          icon={<WhatsAppOutlined />}
          href={phone ? `https://wa.me/${phone}` : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick("tg")}
          aria-label="Bog‘lanish"
          disabled={!phone}
        /> */}
        {tgUsername && (
          <Button
            style={{ width: "100%" }}
            size="large"
            icon={<SendOutlined />}
            href={phone ? `https://t.me/${tgUsername}` : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick("tg")}
            aria-label="Bog‘lanish"
            disabled={!phone}
          >
            Telegram
          </Button>
        )}

        <Button
          style={{ width: "100%" }}
          type="primary"
          size="large"
          icon={<PhoneOutlined />}
          onClick={callPhone}
          disabled={!phone}
        >
          Qo‘ng‘iroq qilish
        </Button>
      </Flex>
      <Flex style={{ marginTop: 16 }} gap={8} justify="space-between">
        <Flex gap={16}>
          {/* <Text type="secondary">
            {mockStats.views} <EyeOutlined />
          </Text>
          <Text type="secondary">
            {mockStats.calls} <PhoneOutlined />
          </Text> */}
        </Flex>
        <Text type="secondary">
          {timeAgoValue.value === 0 && timeAgoValue.unit === "daqiqa"
            ? "hozir"
            : `${timeAgoValue.value} ${timeAgoValue.unit} oldin`}
        </Text>
      </Flex>
    </article>
  );
}
