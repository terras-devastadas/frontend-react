import React, { useState, useRef } from 'react';
import lasagneLogo from '../../assets/lasagneLogo.png';
import genericAvatar from '../../assets/genericAvatar.png'
import styles from './CreateCommunity.module.css';
import InputField from '../../components/InputField/InputField';

function CreateCommunity() {
    const inputName = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLInputElement>(null);

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
        <div className={styles.createCommunityPage}>
            <header className={styles.headerBar}>
                <img className={styles.logoLasagne} src={lasagneLogo} alt="Lasagne Logo" />
                <span>LaSagne</span>
            </header>

            <div className={styles.bodyCreateCommunity}>
                <div className={styles.createBox}>
                    <h1 className={styles.titleCreate}>CRIAÇÃO DE COMUNIDADE</h1>

                    <InputField
                        className={styles.nomeComunidade}
                        htmlFor="name"
                        label="Nome da Comunidade:"
                        ref={inputName}
                        required
                    />
                    <InputField
                        className={styles.descricaoComunidade}
                        htmlFor="description"
                        label="Descrição:"
                        ref={inputDescription}
                        required
                    />

                    <h1 className={styles.visibilityText}>Visibilidade:</h1>

                    <form>
                        <div>
                            <input
                                type="radio"
                                id="alunos"
                                name="option"
                                value="Alunos"
                                checked={selectedOption === 'Alunos'}
                                onChange={handleChange}
                                className={styles.buttonAlunos}
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
                                className={styles.buttonTodos}
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
                    <label htmlFor="file-upload" className={styles.fileUploadButton}>Escolher Imagem</label>

                    {/* Exibindo a imagem carregada */}
                    {imagem && (
                        <div className={styles.previewContainer}>
                            <img src={imagem} alt="Imagem carregada" className={styles.previewImage} />
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <button className={styles.buttonCreate} onClick={clickedCreate}>
                        Criar Comunidade
                    </button>
                </div>
            </div>

            <div className={styles.linhaVert}></div>

            <div className={styles.usuarioLeft}></div>

            <h1 className={styles.username}>@username123</h1>
            <img src={genericAvatar} alt="Avatar do usuário" className={styles.userAvatar} />
        </div>
    );
}

export default CreateCommunity;
