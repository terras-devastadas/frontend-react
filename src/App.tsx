import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Layout from "./components/LateralBar/Layout";
function App() {
  return (
    <>
      <NavBar />
      <Layout />
      {/* <Outlet /> */}
    </>
  );
}

export default App;
