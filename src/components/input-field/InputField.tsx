import React from "react";
import styles from './InputField.module.css';


interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: string;
    htmlFor?: string;
    label?: string;
}

const InputField: React.FC<InputFieldProps> = ({variant, htmlFor, label, ...rest}) => {
    return(
        <div className={styles.InputContainer}>
            <label className={styles.InputLabel} htmlFor={htmlFor}>{label}</label>
            <input className={`${styles.InputArea} ${variant}`} name={htmlFor} {...rest}/> 
        </div>
    );
}

export default InputField