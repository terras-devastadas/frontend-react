import styles from "./CreatePostPage.module.css";
import InputField from "../../components/InputField/InputField";
import TextField from "../../components/TextField/TextField";
// import AddFile from "../../components/AddFile/AddFile";
import addIcon from "../../assets/addIcon.png";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CreatePostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const [imagem, setImagem] = useState<string>("");
  const [username,  setUsername] = useState<any>({})
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  useEffect(() => {  
    async function getUser(){
      try{
        const response = await api.get('/info/')
        setUsername(response.data.username)
        setProfilePhoto(response.data.photo_profile)
      }catch(error){
        console.error("Erro ao buscar dados do perfil:", error)
      }
    }

    getUser()
  }, []);

  async function createPost() {
    if (!title) return; 

    try {
      const response = await api.post("/posts/", {
        title: title,
        content: content,
        image: imagem,
        author: username,
        profilePhoto: profilePhoto,
        communityId: 1,//Implementar isso
      });

      console.log("Post criado com sucesso:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagem(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    createPost();
  };

  return (
    <div className={styles.container}>
      <h2>Criar Post</h2>
      <InputField
        htmlFor="title"
        label="Título:"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.content}>
        <TextField
          variant="secondary"
          htmlFor="content"
          label="Conteúdo:"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className={styles.bannerBox}>
            <h1 className={styles.personalizarText}>Personalizar Banner:</h1>

            <input
              type="file"
              onChange={handleImageChange}
              id="file-upload"
              className={styles.fileInput}
              accept="image/*"
            />
            <label htmlFor="file-upload" className={styles.fileUploadButton}>
              {" "}
              <img src={addIcon} alt="" />
              Escolher Imagem
            </label>

            {/* Exibindo a imagem carregada */}
            {imagem ? (
              <div className={styles.previewContainer}>
                <img src={imagem} alt="Imagem carregada" className={styles.previewImage} />
              </div>
            ) : (
              <div className={styles.skeleton}>Imagem não carregada</div>
            )}
          </div>
      </div>

      <button type="submit" className={styles.submitButton} onClick={handleClick} disabled={!title}>
        Criar Post
      </button>
    </div>
  );
};

export default CreatePostPage;
