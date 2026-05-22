import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import type { CartItemType } from "../constants/cartItems";
import { decrease, increase, removeItem } from "../store/cartSlice";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <article className="mx-auto flex w-[900px] items-center justify-between border-b border-gray-200 py-5">
      <div className="flex items-center gap-5">
        <img
          src={item.img}
          alt={item.title}
          className="h-[100px] w-[100px] rounded object-cover"
        />

        <div>
          <h2 className="text-[25px] font-bold">{item.title}</h2>
          <p className="text-lg text-slate-600">{item.singer}</p>
          <p className="text-xl font-bold text-slate-800">${item.price}</p>

          <button
            type="button"
            onClick={() => dispatch(removeItem(item.id))}
            className="mt-1 text-sm text-slate-400 hover:text-red-500"
          >
            remove
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={() => dispatch(decrease(item.id))}
          className="h-10 w-10 rounded-l bg-slate-300 text-xl"
        >
          -
        </button>

        <div className="flex h-10 w-12 items-center justify-center border border-slate-300 text-xl">
          {item.amount}
        </div>

        <button
          type="button"
          onClick={() => dispatch(increase(item.id))}
          className="h-10 w-10 rounded-r bg-slate-300 text-xl"
        >
          +
        </button>
      </div>
    </article>
  );
}
