import "./App.css";
import SideBar from "./components/SideBar";
import DropZone from "./components/DropZone";

function App() {
  return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      <SideBar />
      <DropZone />
    </div>
  );
}

export default App;
