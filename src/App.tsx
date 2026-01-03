import AppLayout from "./components/layout/AppLayout";
import PomodoroPage from "./components/pages/PomodoroPage";
import Onboarding from "./components/onboarding/Onboarding";
import { useOnboarding } from "./hooks/useOnboarding";
import "./App.css";

function App() {
  const { isOpen, completeOnboarding } = useOnboarding();

  return (
    <>
      {isOpen && <Onboarding onFinish={completeOnboarding} />}
      <AppLayout>
        <PomodoroPage />
      </AppLayout>
    </>
  );
}

export default App;
