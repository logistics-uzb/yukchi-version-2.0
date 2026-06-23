import { useRef, type TouchEvent } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./app-layout.module.css";

const SWIPE_START_EDGE = 300;
const SWIPE_DISTANCE = 80;
const MAX_VERTICAL_DISTANCE = 50;

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const touchStart = useRef({ x: 0, y: 0, isFromLeftEdge: false });

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];

    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      isFromLeftEdge: touch.clientX <= SWIPE_START_EDGE,
    };
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const touch = event.changedTouches[0];
    const horizontalDistance = touch.clientX - touchStart.current.x;
    const verticalDistance = Math.abs(touch.clientY - touchStart.current.y);

    const isSwipeBack =
      touchStart.current.isFromLeftEdge &&
      horizontalDistance >= SWIPE_DISTANCE &&
      verticalDistance <= MAX_VERTICAL_DISTANCE &&
      horizontalDistance > verticalDistance;

    if (isSwipeBack && location.pathname !== "/") {
      navigate(-1);
    }
  }

  return (
    <div
      className={styles.app_layout}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Outlet />
    </div>
  );
}
