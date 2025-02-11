import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./CommunityPage.module.css";
import ListPosts from "../../components/ListPosts/ListPosts";
import api from "../../services/api";
import CommunityIcon from "../../assets/CommunityIcon.png";

const CommunityPage = () => {
  const { id } = useParams<{ id: string }>();
  const [communityName, setCommunityName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [isInCommunity, setIsInCommunity] = useState<string>("Entrar");

  useEffect(() => {
    async function getCommunity() {
      try {
        const response = await api.get(`/communities/${id}`);
        setCommunityName(response.data.communityName);
        setDescription(response.data.communityDescription);
        setBanner(response.data.banner);
      } catch (error) {
        console.error("Erro ao buscar comunidade:", error);
      }
    }
    getCommunity();
  }, [id]);

  //Arrumar o componente dos posts para pegar a comunidade correta
  //verificar se tem banner
  return (
    <>
      <div className={styles.communityHeader}>
        <div className={styles.bannerContainer}>{banner ? <img src={banner} alt="Banner da comunidade" className={styles.banner}/>
         : null}</div>
        
        <div className={styles.communityInfo}>
          <div className={styles.iconContainer}>
            <img src={CommunityIcon} alt="Icone de comunidade" className={styles.icon}/>
          </div>
          <div className={styles.communityNameContainer}>
            <h1 className={styles.name}>{communityName}</h1>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
          <button className={styles.actionButton}>{isInCommunity}</button>

      </div>
      <ListPosts endpoint="/posts/"/>
    </>
  ); 
};

export default CommunityPage;