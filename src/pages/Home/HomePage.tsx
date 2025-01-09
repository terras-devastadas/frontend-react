import { useEffect } from "react";
import api from "../../services/api";

const HomePage = () => {
  useEffect(() => {
    const testIntegration = () => {
      api.get("posts/").then((response) => {
        console.log(response);
      });
    };
    testIntegration();
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
