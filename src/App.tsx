import AppLayout from "./components/layout/AppLayout";
import Timer from "./components/timer/Timer";
import Onboarding from "./components/onboarding/Onboarding";
import { useOnboarding } from "./hooks/useOnboarding";
import "./App.css";

function App() {
  const { isOpen, completeOnboarding } = useOnboarding();

  return (
    <>
      {isOpen && <Onboarding onFinish={completeOnboarding} />}
      <AppLayout>
        <Timer />
      </AppLayout>
    </>
  );
}

export default App;
