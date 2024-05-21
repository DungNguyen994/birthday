import { useNavigate } from "react-router-dom";
import "./App.css";
import Birthday from "./Birthday";

function App() {
  const navigate = useNavigate();
  return (
    <div className="birthday-container">
      <h1>Happy Birthday Michelle</h1>
      <Birthday />
      <div
        id="testbutton"
        onClick={() => {
          navigate("/card");
        }}
      ></div>
    </div>
  );
}

export default App;
