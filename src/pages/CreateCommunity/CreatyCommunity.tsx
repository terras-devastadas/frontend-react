import React, { useState, useEffect, useRef } from 'react';
import lasagneLogo from '../../assets/lasagneLogo.png';
import styles from './CreateCommunity.module.css';
import InputField from '../../components/input-field/InputField';

function CreateCommunity() {

    const inputName = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLInputElement>(null);

    const clickedCreate = () => {
        console.log("Hello World");
    }

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
                </div>
                <div className={styles.footer}>
                    <button className={styles.buttonCreate} onClick={clickedCreate}>
                        Criar Comunidade
                    </button>
                </div>
            </div>
        </div>



    );
}

export default CreateCommunity;