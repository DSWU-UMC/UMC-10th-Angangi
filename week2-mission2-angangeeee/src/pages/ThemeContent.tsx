import clsx from "clsx";
import { useTheme } from "../context/ThemeProvider";

export default function ThemeContent() {
  const { theme } = useTheme();

  const isLightMode = theme === "LIGHT";
  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800",
      )}
    >
      <h1
        className={clsx(
          "text-xl font-bold",
          isLightMode ? "text-black" : "text-white",
        )}
      >
        Theme Content
      </h1>
    </div>
  );
}
