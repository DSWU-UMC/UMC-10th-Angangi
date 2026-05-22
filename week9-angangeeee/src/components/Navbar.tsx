import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function Navbar() {
  const amount = useSelector((state: RootState) => state.cart.amount);

  return (
    <header className="flex h-[84px] items-center justify-between bg-slate-800 px-4 text-white">
      <h1 className="text-4xl font-bold">앙앙이</h1>

      <div className="flex items-center gap-2 text-2xl font-bold">
        <span>{amount}</span>
      </div>
    </header>
  );
}
