import type { Task } from "../types/todo";
import { useTasks } from "../context/TodoContext";

export default function TodoItem({ task }: { task: Task }) {
  const { toggle, remove } = useTasks();

  const isDone = task.done;

  return (
    <li className="todo__item">
      <span
        className="render-container__item-text"
        style={isDone ? { textDecoration: "line-through", opacity: 0.7 } : {}}
      >
        {task.text}
      </span>

      {isDone ? (
        <button
          className="todo__btn"
          style={{ backgroundColor: "#b22222" }}
          onClick={() => remove(task.id)}
          title="삭제"
        >
          삭제
        </button>
      ) : (
        <button
          className="todo__btn"
          style={{ backgroundColor: "#2e8b57" }}
          onClick={() => toggle(task.id)}
          title="완료"
        >
          완료
        </button>
      )}
    </li>
  );
}
