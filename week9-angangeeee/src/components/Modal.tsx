import { useDispatch, useSelector } from "react-redux";

import { clearCart } from "../store/cartSlice";
import { closeModal } from "../store/modalSlice";
import type { AppDispatch, RootState } from "../store/store";

export default function Modal() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[360px] rounded-lg bg-white px-8 py-7 text-center shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">장바구니를 비우시겠습니까?</h2>

        <p className="mb-8 text-gray-500">
          선택한 모든 음반이 장바구니에서 삭제됩니다.
        </p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="rounded border border-gray-300 px-6 py-2 hover:bg-gray-100"
          >
            아니요
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="rounded bg-slate-800 px-6 py-2 text-white hover:bg-slate-700"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
