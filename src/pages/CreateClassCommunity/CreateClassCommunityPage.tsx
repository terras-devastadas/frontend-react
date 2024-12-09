import styles from '../CreateClassCommunity/createClassCommunityPage.module.css'
import InputField from '../../components/InputField/InputField'
import TextField from '../../components/TextField/TextField'

const CreateClassCommunityPage = () => {

    return(
        <>
            <div className={styles.Container}>
                <h2 className={styles.title}>Criação de Comunidade</h2>
                <div className={styles.leftSide}>
                    <InputField />
                    <TextField />
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.visibilityContainer}>
                        <h3 className={styles.visibilityTitle}>Visibilidade:</h3>
                        <button className={styles.visibilityOption}>Professores</button>
                        <button className={styles.visibilityOption}>Todos</button>
                    </div>
                    <div className={styles.bannerContainer}>
                        <label htmlFor="fileInput" className={styles.bannerLabel}>Banner:</label>
                        <input type="file" id="fileInput" name="Banner" accept="image/*" className={styles.bannerInput}/>
                    </div>
                    <button type='submit' className={styles.submitButton}>Criar Comunidade</button>
                </div>
            </div>
        </>
    )
}

export default CreateClassCommunityPage