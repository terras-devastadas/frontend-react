import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./ListPosts.module.css";
import React from "react";
import Avatar from "../../assets/AvatarPlaceholder.png";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface ListPostsProps {
  endpoint: string;
  communityId?: string;
}

const ListPosts: React.FC<ListPostsProps> = ({ endpoint, communityId }) => {
  const [posts, setPosts] = useState<any>()

  useEffect(() => {
    async function getPosts() {
      try {
        const url = communityId ? `${endpoint}?community=${communityId}`: endpoint;
        const response = await api.get(url);
        //console.log(response.data)
        setPosts(response.data)
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    }
    getPosts();
  }, [endpoint, communityId]);

  if (!posts) {
    return (
      <div className={styles.loadingContainer}> 
        <ClipLoader color="#0b2548" loading={true} size={50} />
      </div>
    )
  }

  return (
    <>
      {posts && posts.map((post: any) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.infoUser}>
            <Link to={`/profile/${post.user.id}`} state={post.user} >
            {post.user.photo_profile ?
              <div className={styles.userPhotoContainer}>
                
                <img src={post.user.photo_profile} alt="Foto de perfil do autor" title={`@${post.user.username}`} className={styles.userPhoto} />
              
              </div>
              :
              <div className={styles.userPhotoContainer}>
                <img src={Avatar} alt="Foto de perfil do autor" title={`@${post.user.username}`} className={styles.userPhoto} />
              </div>
            }
            </Link>
            <div className={styles.containerTitle}><h2 className={styles.title}>{post.title}</h2></div>
          </div>


          {/* Adicionar em qual comunidade o post foi publicado */}
          <p className={styles.content}>{post.content}</p>
          {post.image ?

            
              <img src={post.image} alt="Imagem do post" className={styles.image} />
            

            : null}
        </div>
      ))}
    </>
  );
};

export default ListPosts;