import React from "react";
import styles from "./CommunityPage.module.css";
import ListPosts from "../../components/ListPosts/ListPosts";

const CommunityPage = () => {

  //pegar a comunidade que o usuário clicou via url params
  //Arrumar o componente dos posts para pegar a comunidade correta
  return (
    <ListPosts endpoint="/posts/"/>
  ); 
};

export default CommunityPage;