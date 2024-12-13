import React, { useState } from 'react'
import styles from '../CreateClassCommunity copy/createClassCommunityPage.module.css'
import InputField from '../../components/InputField/InputField'
import TextField from '../../components/TextField/TextField'
import addIcon from '../../assets/addIcon.png'

const CreateClassCommunityPageCopy = () => {
    // const inputName = useRef<HTMLInputElement>(null);
    // const inputDescription = useRef<HTMLInputElement>(null);

    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        // Lógica personalizada quando a opção for selecionada
    };

    const clickedCreate = () => {
        console.log("Hello World!");
        // Lógica ao clicar em criar comunidade
    };

    const [imagem, setImagem] = useState<string>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
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
                    <InputField className={styles.secondary} htmlFor="name" label="Nome da Comunidade:" required/>
                    <TextField variant='secondary' htmlFor="description" label="Descrição:" required/>
                </div>

                <div className={styles.rightBox}>
                    <h1 className={styles.visibilityText}>Visibilidade:</h1>

                    <form className={styles.visibilityButtons}>
                        <div>
                            <input
                                type="radio"
                                id="alunos"
                                name="option"
                                value="Alunos"
                                checked={selectedOption === 'Alunos'}
                                onChange={handleChange}
                                className={styles.none}
                                />
                            <label htmlFor="alunos" className={styles.buttonAlunos}>Alunos</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="todos"
                                name="option"
                                value="Todos"
                                checked={selectedOption === 'Todos'}
                                onChange={handleChange}
                                className={styles.none}
                                />
                            <label htmlFor="todos" className={styles.buttonTodos}>Todos</label>
                        </div>
                    </form>

                    <h1 className={styles.personalizarText}>Personalizar Banner:</h1>

                    <input
                        type="file"
                        onChange={handleImageChange}
                        id="file-upload"
                        className={styles.fileInput}
                        accept="image/*"
                        />
                    <label htmlFor="file-upload" className={styles.fileUploadButton}> <img src={addIcon} alt="" />Escolher Imagem</label>

                    {/* Exibindo a imagem carregada */}
                    {imagem && (
                        <div className={styles.previewContainer}>
                            <img src={imagem} alt="Imagem carregada" className={styles.previewImage} />
                        </div>
                    )}

                    <button className={styles.buttonCreate} onClick={clickedCreate}>
                        Criar Comunidade
                    </button>
                </div>
            </div>
        
        </div>

    );
}

export default CreateClassCommunityPageCopy;