// import { useEffect, useState } from "react";
// import api from "../../services/api";
import styles from "./HomePage.module.css";
import ListPosts from "../../components/ListPosts/ListPosts";


const HomePage = () => {
  const token = sessionStorage.getItem("Token");
  
  // O usuário precisa estar logado para acessar essa página
  // Verificar se o token está presente no localStorage

    if(token == null) { 
        return <div>Você precisa estar logado para acessar essa página</div>
    }
    
  return (
    <ListPosts endpoint="/posts/"/>
  );
};

export default HomePage;
