import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
// import Layout from "./components/LateralBar/Layout";
import LateralBar from "../src/components/LateralBar/LateralBar";
import styles from "../src/index.module.css";

function App() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <LateralBar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
      {/* <Outlet /> */}
    </>
  );
}

export default App;
