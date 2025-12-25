export type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

export type TimerMode = "work" | "short-break" | "long-break"
