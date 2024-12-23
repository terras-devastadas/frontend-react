import styles from "./CreatePostPage.module.css";
import InputField from "../../components/InputField/InputField";
import TextField from "../../components/TextField/TextField";


const CreatePostPage = () => {

    return(
        <div className={styles.container}>
            <div>
                <img src="" alt="" />
                <h2></h2>
            </div>

            <InputField/>
            <TextField/>
        </div>
    )
}

export default CreatePostPage;
