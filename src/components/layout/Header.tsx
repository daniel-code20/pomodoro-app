import { useTheme } from "../../hooks/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b mb-4 border-gray-200 dark:border-neutral-700">
      <h1 className="font-semibold text-lg">Pomodoro Focus</h1>
      <button
        onClick={toggleTheme}
        className="text-sm px-3 py-1 rounded-md bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 transition"
      >
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
};

export default Header;
