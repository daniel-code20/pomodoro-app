import type { Task } from "../types"
import { useLocalStorage } from "./useLocalStorage"

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const editTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title } : task
      )
    )
  }

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
  }
}
