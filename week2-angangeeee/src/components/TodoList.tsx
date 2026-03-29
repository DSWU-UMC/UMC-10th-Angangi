import TodoItem from "./TodoItem";
import { useTasks } from "../context/TodoContext";

type Filter = "todo" | "done";

export default function TodoList({
  title,
  filter,
}: {
  title: string;
  filter: Filter;
}) {
  const { todos, dones } = useTasks();
  const list = filter === "done" ? dones : todos;

  return (
    <div className="todo__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="todo-list">
        {list.map((t) => (
          <TodoItem key={t.id} task={t} />
        ))}
      </ul>
    </div>
  );
}
