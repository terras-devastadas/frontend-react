import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [items, setItems] = useState<any>([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getItems = () => {
      axios.get(`${apiUrl}/items/`).then((response) => {
        setItems(response.data?.results);
      });
    };
    getItems();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>

      <h2>Item do back</h2>

      {items.map((item: any) => {
        return (
          <div key={item.id}>
            <p className="mb-1">
              {item.id} - {item.name} - {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
