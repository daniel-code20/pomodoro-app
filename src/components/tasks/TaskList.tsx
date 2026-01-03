import { useState } from "react"
import { useTasks } from "../../hooks/useTasks"
import TaskItem from "./TaskItem"

const TaskList = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks()
  const [title, setTitle] = useState("")

  const handleAdd = () => {
    if (!title.trim()) return
    addTask(title)
    setTitle("")
  }

  return (
      <div className="w-full flex flex-col gap-4">
      <h3 className="text-sm font-semibold opacity-70">
        Tasks
      </h3>

      {/* Input */}
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg bg-gray-200 dark:bg-zinc-800 outline-none"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-neutral-800 dark:text-white text-sm dark:hover:bg-neutral-700 transition w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      {/* List */}
      <div
        className="
          max-h-[132px]
          overflow-y-auto
          space-y-1
          pr-1
        "
      >
        {tasks.length === 0 && (
          <p className="text-xs opacity-50 text-center">
            No tasks yet
          </p>
        )}

        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList
