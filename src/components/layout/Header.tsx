const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
      <h1 className="font-semibold text-lg">
        Pomodoro Focus
      </h1>

      {/* Placeholder para settings */}
      <div className="text-sm opacity-70">
        Settings
      </div>
    </header>
  )
}

export default Header
