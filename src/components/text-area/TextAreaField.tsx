import React, {forwardRef} from "react";
import styles from './TextAreaField.module.css';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: string;
    htmlFor?: string;
    label?: string;
}

const TextAreaField = forwardRef<HTMLInputElement ,TextAreaFieldProps>(
    ({variant, htmlFor, label, type = "text", ...rest}, ref) => {
    return(
        <div className={styles.InputContainer}>
            <label className={styles.InputLabel} htmlFor={htmlFor}>{label}</label>
            <textarea className={`${styles.InputArea} ${variant}`} name={htmlFor} ref={ref} type={type} {...rest}/> 
        </div>
    );
}
);

export default TextAreaField;