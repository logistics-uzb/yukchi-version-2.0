import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { shouldReload } from "@/shared/helpers/should-reload";
import styles from "./app-layout.module.css";

export function AppLayout() {
  useEffect(() => {
    if (shouldReload()) {
      window.location.reload();
    }
  }, []);

  return (
    <div className={styles.app_layout}>
      <Outlet />
    </div>
  );
}
