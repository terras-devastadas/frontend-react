import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./HomePage.module.css";


const HomePage = () => {
  const[posts, setPosts] = useState<any>()
  const token = sessionStorage.getItem("Token");
  
  useEffect(() => {
    if (token){
      async function getPosts() {
        try{
          const response = await api.get("/posts/")
          //console.log(response.data)
          setPosts(response.data)

        } catch (error) {
          console.error("Erro ao buscar posts:", error);
        }
      }
      getPosts();
    }
  }, []);

  // O usuário precisa estar logado para acessar essa página
  // Verificar se o token está presente no localStorage

    if(token == null) { 
        return <div>Você precisa estar logado para acessar essa página</div>
    }else if(!posts) {
        return <div>Carregando...</div>
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

export default HomePage;
