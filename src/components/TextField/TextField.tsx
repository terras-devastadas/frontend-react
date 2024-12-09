import styles from './TextField.module.css';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    variant?: string;
    htmlFor?: string;
    label?: string;
}

const TextField: React.FC<TextFieldProps> = ({variant, htmlFor, label, type = "text", ...rest}) => {

    return(
        <div className={styles.InputContainer}>
            <label className={styles.InputLabel} htmlFor={htmlFor}>{label}</label>
            <textarea className={`${styles.InputArea} ${variant}`} name={htmlFor} id={htmlFor} {...rest}/> 
        </div>
    )
}

export default TextField;