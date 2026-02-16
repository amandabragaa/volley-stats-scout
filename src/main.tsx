import { createRoot } from "react-dom/client";
import ReactLogger from "react-terminal-logger/console-logger";
import App from "./App.tsx";
import "./index.css";

ReactLogger.start();
createRoot(document.getElementById("root")!).render(<App />);
