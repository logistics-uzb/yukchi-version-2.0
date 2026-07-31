import type { ReactNode } from "react";
import { Card, Form, Select, Typography } from "antd";
import { countryOptions, getRegionOptions } from "../helpers/route-options";
import { storeRoutePlannerValues } from "../model/route-planner-storage";
import type { RoutePlannerValues } from "../model/types";
import styles from "./RoutePlanner.module.css";

const { Text, Title } = Typography;

interface LocationCardProps {
  title: string;
  icon: ReactNode;
  tone: "primary" | "success";
  countryName: "from_country" | "to_country";
  regionName: "from_region" | "to_region";
  countryValue?: string;
  form: ReturnType<typeof Form.useForm<RoutePlannerValues>>[0];
}

export function LocationCard({
  title,
  icon,
  tone,
  countryName,
  regionName,
  countryValue,
  form,
}: LocationCardProps) {
  const handleCountryChange = () => {
    form.setFieldValue(regionName, undefined);
    storeRoutePlannerValues({
      ...form.getFieldsValue(),
      [regionName]: undefined,
    });
  };

  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.cardTitle}>
        <span className={`${styles.icon} ${styles[tone]}`}>{icon}</span>
        <Title level={3}>{title}</Title>
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <Text>Davlat</Text>
          <Form.Item name={countryName} noStyle>
            <Select
              variant="borderless"
              options={countryOptions}
              optionFilterProp="label"
              onChange={handleCountryChange}
              allowClear
            />
          </Form.Item>
        </label>

        <label className={styles.field}>
          <Text>Viloyat</Text>
          <Form.Item name={regionName} noStyle>
            <Select
              variant="borderless"
              options={getRegionOptions(countryValue ?? "")}
              allowClear
            />
          </Form.Item>
        </label>
      </div>
    </Card>
  );
}
