import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastNotification() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={true}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
  );
}
