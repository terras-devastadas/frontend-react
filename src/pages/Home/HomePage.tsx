import { useEffect, useState } from "react";
// import api from "../../services/api";
// import styles from "./HomePage.module.css";
import ListPosts from "../../components/ListPosts/ListPosts";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const token = sessionStorage.getItem("Token");
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      if(token == null) { 
        navigate("/login");
      } else {
        setRender(true);
      }
    });
    
    if(!render){
      return (<div>Você precisa estar logado para acessar essa página</div>);
    }
    
  return (
    <ListPosts endpoint="/posts/"/>
  );
};

export default HomePage;
