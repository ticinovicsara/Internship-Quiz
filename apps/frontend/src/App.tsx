import { BrowserRouter as Router } from "react-router-dom";
import { ToastNotification } from "./components/ToastNotification";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastNotification />
    </Router>
  );
}

export default App;
