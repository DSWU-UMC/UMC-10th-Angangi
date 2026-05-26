import { useEffect } from "react";

import CartItem from "../components/CartItem";
import { useCartStore } from "../store/useCartStore";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const total = useCartStore((state) => state.total);
  const calculateTotals = useCartStore((state) => state.calculateTotals);
  const openModal = useCartStore((state) => state.openModal);

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  if (cartItems.length === 0) {
    return (
      <main className="py-16 text-center">
        <h2 className="text-3xl font-bold">장바구니가 비어있습니다.</h2>
      </main>
    );
  }

  return (
    <main className="pb-14">
      <section>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </section>

      <footer className="mx-auto mt-10 w-[900px] border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between text-2xl font-bold">
          <span>총 금액</span>
          <span>${total.toLocaleString()}</span>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={openModal}
            className="rounded border border-black px-8 py-5 hover:bg-black hover:text-white"
          >
            전체 삭제
          </button>
        </div>
      </footer>
    </main>
  );
}
