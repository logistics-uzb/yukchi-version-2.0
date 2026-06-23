import {
  ArrowLeftOutlined,
  ArrowUpOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Empty,
  FloatButton,
  Skeleton,
  Typography,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetLoadsQuery, type Load } from "@/entities/load";
import { countries } from "@/shared/consts/countries";
import { LoadCard } from "@/widgets/load-card";
import styles from "./LoadsPage.module.css";

const { Title, Text } = Typography;

function getRegionName(countryId?: string, regionId?: string) {
  if (!countryId || !regionId) return undefined;

  return countries
    .find((country) => country.id === countryId)
    ?.regions.find((region) => region.id === regionId)?.name;
}

export function LoadsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [loads, setLoads] = useState<Load[]>([]);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const countryFrom = searchParams.get("countryFrom") ?? undefined;
  const regionFrom = searchParams.get("regionFrom") ?? undefined;
  const countryTo = searchParams.get("countryTo") ?? undefined;
  const regionTo = searchParams.get("regionTo") ?? undefined;
  const filterKey = [countryFrom, regionFrom, countryTo, regionTo].join("|");
  const params = {
    aiStatus: "LOAD_POST",
    isComplete: "TRUE",
    limit: 20,
    page,
    countryFrom,
    regionFrom,
    countryTo,
    regionTo,
  };
  const {
    data: loadsPage,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetLoadsQuery(params);
  const hasNextPage = Boolean(
    loadsPage && loadsPage.page < loadsPage.totalPages,
  );
  const fromRegionName = getRegionName(countryFrom, regionFrom);
  const toRegionName = getRegionName(countryTo, regionTo);

  useEffect(() => {
    setPage(1);
    setLoads([]);
  }, [filterKey]);

  useEffect(() => {
    if (!loadsPage) return;

    setLoads((currentLoads) => {
      const nextLoads = loadsPage.page === 1 ? [] : currentLoads;
      const knownIds = new Set(
        nextLoads.map((load) => load.id ?? load._id).filter(Boolean),
      );

      return [
        ...nextLoads,
        ...loadsPage.data.filter((load) => {
          const id = load.id ?? load._id;
          return !id || !knownIds.has(id);
        }),
      ];
    });
  }, [loadsPage]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          setPage((currentPage) => currentPage + 1);
        }
      },
      { rootMargin: "2000px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetching]);

  const refreshLoads = () => {
    setLoads([]);

    if (page === 1) {
      refetch();
    } else {
      setPage(1);
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Button
          type="text"
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          aria-label="Orqaga"
        />
        <div>
          <Title level={2}>
            Mos yuklar - {loadsPage?.total ?? loads.length}
          </Title>
          <Text type="secondary">
            {fromRegionName ?? "Barcha hududlar"} →{" "}
            {toRegionName ?? "Barcha hududlar"}
          </Text>
        </div>
        <Button
          type="text"
          shape="circle"
          size="large"
          icon={<ReloadOutlined />}
          onClick={refreshLoads}
          loading={isFetching && loads.length === 0}
          aria-label="Yangilash"
        />
      </header>

      {isError && (
        <Alert
          className={styles.alert}
          type="warning"
          showIcon
          message="Yuklarni olib bo‘lmadi"
          description="API manzili va endpoint sozlamalarini tekshiring."
        />
      )}

      <section className={styles.list}>
        {isLoading &&
          Array.from({ length: 3 }, (_, index) => (
            <div className={styles.skeleton} key={index}>
              <Skeleton active paragraph={{ rows: 6 }} />
            </div>
          ))}

        {!isLoading &&
          loads.map((load, index) => (
            <div
              className={styles.virtualItem}
              key={load.id ?? load._id ?? index}
            >
              <LoadCard load={load} />
            </div>
          ))}

        {!isLoading && !isError && loads.length === 0 && (
          <div className={styles.empty}>
            <Empty description="Bu yo‘nalishda hozircha yuk yo‘q" />
            <Button type="primary" onClick={() => navigate("/")}>
              Yo‘nalishni o‘zgartirish
            </Button>
          </div>
        )}

        <div className={styles.loadMore} ref={loadMoreRef} />
      </section>

      <FloatButton.BackTop
        type="primary"
        style={{ height: 60, width: 60 }}
        icon={<ArrowUpOutlined />}
        visibilityHeight={300}
        aria-label="Sahifa boshiga qaytish"
      />
    </main>
  );
}
