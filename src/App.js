import logo from "./logo.svg";
import "./App.css";
import Getdatarealtime from "./components/Getdatarealtime";

function App() {
  return (
    <div className=" text-white p-6 flex items-center justify-center bg-blue-300">
      {/* <h1 className="text-2xl font-bold">Hello, Tailwind CSS in React!</h1> */}
      <Getdatarealtime />
    </div>
  );
}

export default App;
