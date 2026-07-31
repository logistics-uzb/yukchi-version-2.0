import {
  EnvironmentOutlined,
  FlagOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import {
  clearRoutePlannerValues,
  getStoredRoutePlannerValues,
  storeRoutePlannerValues,
} from "../model/route-planner-storage";
import type { RoutePlannerValues } from "../model/types";
import { LocationCard } from "./LocationCard";
import styles from "./RoutePlanner.module.css";

export function RoutePlanner() {
  const navigate = useNavigate();
  const [form] = Form.useForm<RoutePlannerValues>();
  const fromCountry = Form.useWatch("from_country", form);
  const toCountry = Form.useWatch("to_country", form);

  const swapLocations = () => {
    const values = form.getFieldsValue();

    form.setFieldsValue({
      from_country: values.to_country,
      from_region: values.to_region,
      to_country: values.from_country,
      to_region: values.from_region,
    });
    storeRoutePlannerValues({
      from_country: values.to_country,
      from_region: values.to_region,
      to_country: values.from_country,
      to_region: values.from_region,
    });
  };

  const searchLoads = (values: RoutePlannerValues) => {
    storeRoutePlannerValues(values);
    navigate("/loads");
  };

  const handleValuesChange = (
    _: Partial<RoutePlannerValues>,
    values: RoutePlannerValues,
  ) => {
    storeRoutePlannerValues(values);
  };

  const clearRoutePlanner = () => {
    clearRoutePlannerValues();
    form.setFieldsValue({
      from_country: undefined,
      from_region: undefined,
      to_country: undefined,
      to_region: undefined,
    });
  };

  return (
    <section className={styles.section}>
      <Form
        form={form}
        initialValues={getStoredRoutePlannerValues()}
        onFinish={searchLoads}
        onValuesChange={handleValuesChange}
      >
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
            icon={<FlagOutlined />}
            tone="success"
            countryName="to_country"
            regionName="to_region"
            countryValue={toCountry}
            form={form}
          />
        </div>

        <div className={styles.actions}>
          <Button
            className={styles.clearButton}
            size="large"
            onClick={clearRoutePlanner}
          >
            Tozalash
          </Button>
          <Button
            className={styles.searchButton}
            type="primary"
            size="large"
            htmlType="submit"
          >
            Qidirish
          </Button>
        </div>
      </Form>
    </section>
  );
}
