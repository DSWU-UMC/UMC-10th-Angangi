import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "../components/CartItem";
import { calculateTotals } from "../store/cartSlice";
import { openModal } from "../store/modalSlice";
import type { AppDispatch, RootState } from "../store/store";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, total } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

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
            onClick={() => dispatch(openModal())}
            className="rounded border border-black px-8 py-5 hover:bg-black hover:text-white"
          >
            전체 삭제
          </button>
        </div>
      </footer>
    </main>
  );
}
