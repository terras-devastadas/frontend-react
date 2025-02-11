import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LateralBar from "../src/components/LateralBar/LateralBar";
import styles from "../src/index.module.css";

function App() {
  const location = useLocation();
  const hiddenNavRoutes = ["/login", "/cadastro"];
  const hiddenLateralBarRoutes = ["/login", "/cadastro"];
  const showNavBar = !hiddenNavRoutes.includes(location.pathname);
  const showLateralBar = !hiddenLateralBarRoutes.includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}
      <div className={styles.container}>
        {showLateralBar && <LateralBar />}
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
