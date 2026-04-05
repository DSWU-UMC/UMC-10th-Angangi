import { useState, type FormEvent } from "react";
import { useTasks } from "../context/TodoContext";

export default function TodoInput() {
  const { add } = useTasks();
  const [text, setText] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    add(t);
    setText("");
  };

  return (
    <form className="todo__input" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="할 일 입력"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit" className="add-btn">
        할 일 추가
      </button>
    </form>
  );
}
