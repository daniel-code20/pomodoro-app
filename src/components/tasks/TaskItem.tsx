import type { Task } from "../../types"

type Props = {
  task: Task
  onToggle: () => void
  onDelete: () => void
}

const TaskItem = ({ task, onToggle, onDelete }: Props) => {
  return (
    <div className="flex items-center 0 text-gray-500 font-medium  dark:text-white gap-3 p-2 rounded-lg">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className="accent-white rounded-full"
      />

      <span
        className={`flex-1 text-sm ${
          task.completed ? "line-through opacity-80" : ""
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={onDelete}
        className="text-xs text-zinc-600 dark:text-zinc-300 hover:text-neutral-400"
      >
        ✕
      </button>
    </div>
  )
}

export default TaskItem
