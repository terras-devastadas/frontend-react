import styles from "./CreatePostPage.module.css";
import InputField from "../../components/InputField/InputField";
import TextField from "../../components/TextField/TextField";
import AddFile from "../../components/AddFile/AddFile";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CreatePostPage = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const navigate = useNavigate();
    const [imagem, setImagem] = useState<string>("");

    async function createPost() {
        if (!title) return;//adicionar disabled no botão

        try {
            const response = await api.post("/createPost/", {
                title: title,
                content: content,
                image: imagem,//receber imagem do componente
            })

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
    } 

    return(
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
                <AddFile variant="primary" label="Imagem:" onChange={handleImageChange}/>  
            </div>

            <button type="submit" className={styles.submitButton} onClick={handleClick}>Criar Post</button>
        </div>
    )
}

export default CreatePostPage;
