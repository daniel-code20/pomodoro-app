import type { Task } from "../../types"

type Props = {
  task: Task
  onToggle: () => void
  onDelete: () => void
}

const TaskItem = ({ task, onToggle, onDelete }: Props) => {
  return (
    <div className="flex items-center bg-zinc-800 gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className="accent-white"
      />

      <span
        className={`flex-1 text-sm ${
          task.completed ? "line-through opacity-50" : ""
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={onDelete}
        className="text-xs text-zinc-300 hover:text-zinc-400"
      >
        ✕
      </button>
    </div>
  )
}

export default TaskItem
