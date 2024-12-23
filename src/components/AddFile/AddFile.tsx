import  React, { useState } from "react";   
import styles from "./AddFile.module.css";
import addIcon from "../../assets/addIcon.png";

interface AddFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'primary' | 'secondary';
    label?: string;
    onImageChange?: (image: string) => void;//
}

const AddFile: React.FC<AddFileProps> = ({variant, label, onImageChange}) => {
    const [imagem, setImagem] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
        if (typeof reader.result === "string") {
            setImagem(reader.result);
            onImageChange?.(reader.result);//
            }
        };
        reader.readAsDataURL(file);
    }
    };

    return(
        <div className={`${styles.bannerBox} ${variant? styles[variant] : ''}`}>
            <h1 className={styles.label}>{label}</h1>

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
    )
}

export default AddFile;