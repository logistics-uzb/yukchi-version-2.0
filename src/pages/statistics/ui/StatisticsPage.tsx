import {
  PhoneOutlined,
  SearchOutlined,
  SendOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Alert, Button, DatePicker, Skeleton, Typography } from "antd";
import Chart from "chart.js/auto";
import type { ChartConfiguration } from "chart.js";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  EMPTY_ALL_IN_ONE_STATS,
  useGetAllInOneStatsQuery,
  type AllInOneStatsPoint,
} from "@/entities/statistics";
import { Header } from "@/shared/ui/header";
import styles from "./StatisticsPage.module.css";

const { Title, Text } = Typography;
const DATE_FORMAT = "DD.MM.YYYY";
const CHART_COLORS = {
  view: "#2764d8",
  call: "#11845b",
  tg: "#d97904",
  users: "#c9374c",
};

type StatisticTone = "blue" | "green" | "orange" | "red";

interface StatisticItem {
  key: string;
  label: string;
  helper: string;
  tone: StatisticTone;
  icon: ReactNode;
}

type StatisticTemplate = StatisticItem & {
  getValue: () => number;
};

function getStatisticTemplates(totals: {
  view: number;
  tg: number;
  call: number;
  users: number;
  all: number;
}): StatisticTemplate[] {
  return [
    {
      key: "search",
      label: "Yuk qidirishlar",
      helper: "",
      tone: "blue",
      icon: <SearchOutlined />,
      getValue: () => totals.view,
    },
    {
      key: "call",
      label: "Telefon orqali kontakt",
      helper: "",
      tone: "green",
      icon: <PhoneOutlined />,
      getValue: () => totals.call,
    },
    {
      key: "telegram",
      label: "Telegramga o'tishlar",
      helper: "",
      tone: "orange",
      icon: <SendOutlined />,
      getValue: () => totals.tg,
    },
    {
      key: "new-users",
      label: "Yangi foydalanuvchilar",
      helper: "",
      tone: "red",
      icon: <UserAddOutlined />,
      getValue: () => totals.users,
    },
  ];
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("uz-UZ").format(value);
}

interface StatisticsLineChartProps {
  points: AllInOneStatsPoint[];
}

function StatisticsLineChart({ points }: StatisticsLineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"line", number[], string> | null>(null);
  const labels = useMemo(
    () => points.map((point) => dayjs(point.date).format("DD.MM")),
    [points],
  );
  const datasets = useMemo(
    () => [
      {
        label: "Yuk qidirishlar",
        data: points.map((point) => point.view),
        borderColor: CHART_COLORS.view,
        backgroundColor: CHART_COLORS.view,
      },
      {
        label: "Telefon",
        data: points.map((point) => point.call),
        borderColor: CHART_COLORS.call,
        backgroundColor: CHART_COLORS.call,
      },
      {
        label: "Telegram",
        data: points.map((point) => point.tg),
        borderColor: CHART_COLORS.tg,
        backgroundColor: CHART_COLORS.tg,
      },
      {
        label: "Yangi foydalanuvchilar",
        data: points.map((point) => point.users),
        borderColor: CHART_COLORS.users,
        backgroundColor: CHART_COLORS.users,
      },
    ],
    [points],
  );

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const config: ChartConfiguration<"line", number[], string> = {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        elements: {
          line: {
            tension: 0.35,
            borderWidth: 3,
          },
          point: {
            radius: 2.5,
            hoverRadius: 5,
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxHeight: 8,
              boxWidth: 8,
              usePointStyle: true,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.dataset.label}: ${formatNumber(
                  Number(context.parsed.y ?? 0),
                )}`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              maxTicksLimit: 7,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#e7ebf2",
            },
            ticks: {
              precision: 0,
              callback: (value) => formatNumber(Number(value)),
            },
          },
        },
      },
    };

    chartRef.current?.destroy();
    chartRef.current = new Chart(canvas, config);

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [datasets, labels]);

  return (
    <div className={styles.chartWrap}>
      <canvas ref={canvasRef} className={styles.chartCanvas} />
    </div>
  );
}

export function StatisticsPage() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Dayjs>(() =>
    dayjs().startOf("month"),
  );
  const [endDate, setEndDate] = useState<Dayjs>(() => dayjs());
  const queryParams = useMemo(
    () => ({
      bucket: "day" as const,
      from: startDate.startOf("day").valueOf(),
      to: endDate.startOf("day").valueOf(),
    }),
    [endDate, startDate],
  );
  const {
    data: stats = EMPTY_ALL_IN_ONE_STATS,
    isError,
    isLoading,
    refetch,
  } = useGetAllInOneStatsQuery(queryParams);
  const statistics = useMemo(
    () =>
      getStatisticTemplates(stats.totals).map(({ getValue, ...item }) => ({
        ...item,
        value: getValue(),
      })),
    [stats.totals],
  );

  const changeStartDate = (value: Dayjs | null) => {
    if (!value) return;

    setStartDate(value);

    if (value.isAfter(endDate, "day")) {
      setEndDate(value);
    }
  };

  const changeEndDate = (value: Dayjs | null) => {
    if (!value) return;

    setEndDate(value);

    if (value.isBefore(startDate, "day")) {
      setStartDate(value);
    }
  };

  return (
    <main className={styles.page}>
      <Header
        eyebrow="STATISTICS"
        title="Statistika"
        onBack={() => navigate("/")}
      />

      <section className={styles.filters} aria-label="Statistika sanasi">
        <label className={styles.dateField}>
          <Text>Start date</Text>
          <DatePicker
            className={styles.datePicker}
            value={startDate}
            format={DATE_FORMAT}
            allowClear={false}
            inputReadOnly
            onChange={changeStartDate}
          />
        </label>
        <label className={styles.dateField}>
          <Text>End date</Text>
          <DatePicker
            className={styles.datePicker}
            value={endDate}
            format={DATE_FORMAT}
            allowClear={false}
            inputReadOnly
            onChange={changeEndDate}
          />
        </label>
      </section>

      {isError && (
        <Alert
          className={styles.alert}
          type="warning"
          showIcon
          message="Statistikani olib bo'lmadi"
          action={
            <Button size="small" onClick={() => refetch()}>
              Qayta urinish
            </Button>
          }
        />
      )}

      <section className={styles.statsGrid} aria-label="Asosiy statistika">
        {statistics.map((item) => (
          <article
            className={`${styles.statCard} ${styles[item.tone]}`}
            key={item.key}
          >
            <div className={styles.cardTop}>
              <span className={styles.icon}>{item.icon}</span>
              <Text className={styles.cardLabel}>{item.label}</Text>
            </div>
            {isLoading ? (
              <Skeleton.Input active className={styles.valueSkeleton} />
            ) : (
              <strong className={styles.value}>
                {formatNumber(item.value)}
              </strong>
            )}
            <Text className={styles.helper}>{item.helper}</Text>
          </article>
        ))}
      </section>

      <section className={styles.chartCard} aria-label="Kunlik statistika">
        <div className={styles.sectionHeader}>
          <Title level={3}>Kunlik statistika diagrammasi</Title>
        </div>

        {isLoading ? (
          <Skeleton.Node active className={styles.chartSkeleton} />
        ) : (
          <StatisticsLineChart points={stats.points} />
        )}
      </section>
    </main>
  );
}
