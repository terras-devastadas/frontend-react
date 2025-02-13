import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./ListPosts.module.css";
import React from "react";
import Avatar from "../../assets/AvatarPlaceholder.png";
// import { Link } from "react-router-dom";

interface ListPostsProps {
    endpoint: string;
    }

const ListPosts: React.FC<ListPostsProps> = ({endpoint}) => {
    const[posts, setPosts] = useState<any>()
  
    useEffect(() => {
        async function getPosts() {
            try{
                const response = await api.get(endpoint)
                //console.log(response.data)
                setPosts(response.data)
            } catch (error) {
                console.error("Erro ao buscar posts:", error);
            }
        }
        getPosts();
    }, []);

    if(!posts) {
        return(
            <div>Carregando...</div>
        ) 
    }

  return (
    <>
      {posts && posts.map((post: any) => (
      <div className={styles.post} key={post.id}>
        <div className={styles.infoUser}>
          {post.user.photo_profile? 
          <div className={styles.userPhotoContainer}>
            <img src={post.user.photo_profile} alt="Foto de perfil do autor" title={`@${post.user.username}`} className={styles.userPhoto}/> 
          </div> 
          : 
          <div className={styles.userPhotoContainer}>
            <img src={Avatar} alt="Foto de perfil do autor" title={`@${post.user.username}`} className={styles.userPhoto}/> 
          </div> 
          }

          <div className={styles.containerTitle}><h2 className={styles.title}>{post.title}</h2></div>
        </div>


        {/* Adicionar em qual comunidade o post foi publicado */}
        <p className={styles.content}>{post.content}</p>
        {post.image? 
          <div>
            <img src={post.image} alt="Imagem do post" className={styles.image}/> 
          </div> 
        : null}
      </div>
      ))}
    </>
  );
};

export default ListPosts;