import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import styles from "./index.module.css";

function App() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Outlet />
      </div>

    </>
  );
}

export default App;
