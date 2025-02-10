import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./CreateClassCommunityPage.module.css";
import InputField from "../../components/InputField/InputField";
import TextField from "../../components/TextField/TextField";
import addIcon from "../../assets/addIcon.png";

const CreateClassCommunityPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selected, setSelected] = useState(false);
  const [imagem, setImagem] = useState<string>("");
  const [communityName, setCommunityName] = useState<string>("");
  const [communityDescription, setCommunityDescription] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [username,  setUsername] = useState<any>({})

  useEffect(() => {  
    async function getUser(){
      try{
        const response = await api.get('/info/')
        setUsername(response.data.username)
      }catch(error){
        console.error("Erro ao buscar dados do perfil:", error)
      }
    }

    getUser()
  }, []);

  const validateForm = () => {
    if (!communityName || !communityDescription) return false;
    if (selected && !password) return false;
    if (selectedOption === "") return false;
    return true;
  };

  useEffect(() => {
    setAllowed(validateForm());
  }, [communityName, communityDescription, selected, password, selectedOption]);

  async function createClassCommunity() {
    if (!allowed) return;
    try {
      const response = await api.post("/communities/", {
        communityName: communityName,
        communityDescription: communityDescription,
        visibility: selectedOption,
        passwordRequired: selected,
        password: password,
        banner: imagem,
        author: username,
      });

      console.log("Comunidade criada com sucesso:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Erro na criação da comunidade:", error);
    }
  }

  const handleCheckboxChange = () => {
    setSelected(!selected);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    // Lógica personalizada quando a opção for selecionada
  };

  const clickedCreate = () => {
    createClassCommunity();
    // Lógica ao clicar em criar comunidade
  };

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

  return (
    <div className={styles.createBox}>
      <h1 className={styles.titleCreate}>Criação de Comunidade</h1>

      <div className={styles.contentBox}>
        <div className={styles.leftBox}>
          <InputField
            variant="primary"
            htmlFor="name"
            label="Nome da Comunidade:"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            maxLength={80}
            required
          />
          <TextField
            variant="primary"
            htmlFor="description"
            label="Descrição:"
            value={communityDescription}
            onChange={(e) => setCommunityDescription(e.target.value)}
            maxLength={279}
            required
          />
        </div>

        <div className={styles.rightBox}>
          <div className={styles.visibilityBox}>
            <h1 className={styles.visibilityText}>Visibilidade:</h1>

            <form>
              <div className={styles.visibilityButtons}>
                <div>
                  <input
                    type="radio"
                    id="Professores"
                    name="option"
                    value="Professores"
                    checked={selectedOption === "Professores"}
                    onChange={handleChange}
                    className={styles.none}
                  />
                  <label htmlFor="Professores" className={styles.buttonProfessores}>
                    Professores
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="todos"
                    name="option"
                    value="Todos"
                    checked={selectedOption === "Todos"}
                    onChange={handleChange}
                    className={styles.none}
                  />
                  <label htmlFor="todos" className={styles.buttonTodos}>
                    Todos
                  </label>
                </div>
              </div>
              <div className={styles.passwordBox}>
                <input
                  type="checkbox"
                  name="checkCommunityPassword"
                  value="passwordRequired"
                  checked={selected}
                  onChange={handleCheckboxChange}
                  className={styles.passwordCheck}
                />
                <label htmlFor="communityPassword" className={styles.passwordTitle}>
                  Exigir senha
                </label>
                <InputField
                  type="text"
                  variant="secondary"
                  name="communityPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
          </div>

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

          <button className={styles.buttonCreate} onClick={clickedCreate} disabled={!allowed}>
            Criar Comunidade
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClassCommunityPage;
