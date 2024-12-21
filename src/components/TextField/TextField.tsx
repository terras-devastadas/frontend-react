import styles from './TextField.module.css';
import React from 'react';

interface TextFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: 'primary' | 'secondary' | 'error' | 'success';
    htmlFor?: string;
    label?: string;
}

const TextField: React.FC<TextFieldProps> = ({variant, htmlFor, label, ...rest}) => {

    return(
        <div className={`${styles.InputContainer} ${variant ? styles[variant] : ''}`}>
            <label className={styles.InputLabel} htmlFor={htmlFor}>{label}</label>
            <textarea className={styles.InputArea} name={htmlFor} id={htmlFor} {...rest}/> 
        </div>
    )
}

export default TextField;