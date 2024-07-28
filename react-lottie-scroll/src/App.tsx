import ScrollProgress from "./components/scroll-progress.component";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div style={{ height: "200vh", padding: "20px" }}>
        <ScrollProgress />
      </div>
    </div>
  );
}
