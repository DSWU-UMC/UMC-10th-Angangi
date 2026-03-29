import "./App.css";
import "./index.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { TasksProvider } from "./context/TodoContext";

function App() {
  return (
    <TasksProvider>
      <div className="todo">
        <h2 className="todo__title">🐑YANG TODO🐑</h2>
        <TodoInput />
        <div className="todo__list">
          <TodoList title="할 일" filter="todo" />
          <TodoList title="완료" filter="done" />
        </div>
      </div>
    </TasksProvider>
  );
}

export default App;
