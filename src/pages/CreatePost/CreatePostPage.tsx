import styles from "./CreatePostPage.module.css";
import InputField from "../../components/InputField/InputField";
import TextField from "../../components/TextField/TextField";
import addIcon from "../../assets/addIcon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useLocation } from "react-router-dom";

const CreatePostPage = () => {

  const location = useLocation();
  const communityId = location.state as string;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const [imagem, setImagem] = useState<string>("");
  const [community, setCommunity] = useState(communityId || '');

  async function createPost() {
    if (!title) return; 

    try {
      const response = await api.post("/posts/", {
        title: title,
        content: content,
        image: imagem,
        community,//Implementar isso
      });

      console.log("Post criado com sucesso:", response.data);
      navigate("/comunidade/" + communityId);
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
        maxLength={100}
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
