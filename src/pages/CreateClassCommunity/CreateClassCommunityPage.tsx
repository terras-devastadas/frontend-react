import styles from '../CreateClassCommunity/createClassCommunityPage.module.css'
import InputField from '../../components/InputField/InputField'
import TextField from '../../components/TextField/TextField'

const CreateClassCommunityPage = () => {

    return(
        <>
            <div className={styles.container}>
                <h2 className={styles.title}>Criação de Comunidade</h2>
                <div className={styles.containerContent}>
                    <div className={styles.leftSide}>
                        <InputField label='Nome da comunidade:'/>
                        <TextField label='Descrição:'/>
                    </div>

                    <div className={styles.rightSide}>
                        <div className={styles.visibilityContainer}>
                            <h3 className={styles.visibilityTitle}>Visibilidade:</h3>
                            <button className={styles.visibilityOption}>Professores</button>
                            <button className={styles.visibilityOption}>Todos</button>
                        </div>
                        <div className={styles.bannerContainer}>
                            <label htmlFor="fileInput" className={styles.bannerLabel}>Personalizar:</label>
                            <input type="file" id="fileInput" name="Banner" accept="image/*" className={styles.bannerInput}/>
                        </div>
                        <button type='submit' className={styles.submitButton}>Criar Comunidade</button>
                    </div> 
                </div>
            </div>
        </>
    )
}

export default CreateClassCommunityPage