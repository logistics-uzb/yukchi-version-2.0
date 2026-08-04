import { Outlet } from "react-router-dom";
import styles from "./app-layout.module.css";

export function AppLayout() {
  return (
    <div className={styles.app_layout}>
      <Outlet />
    </div>
  );
}
