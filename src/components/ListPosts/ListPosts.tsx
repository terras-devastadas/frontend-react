import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./ListPosts.module.css";
import React from "react";
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
        <h2 className={styles.title}>{post.title}</h2>
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