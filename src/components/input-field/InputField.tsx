import React, {forwardRef} from "react";
import styles from './InputField.module.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: string;
    htmlFor?: string;
    label?: string;
}

const InputField = forwardRef<HTMLInputElement ,InputFieldProps>(
        ({variant, htmlFor, label, type = "text", ...rest}, ref) => {
        return(
            <div className={styles.InputContainer}>
                <label className={styles.InputLabel} htmlFor={htmlFor}>{label}</label>
                <input className={`${styles.InputArea} ${variant}`} name={htmlFor} ref={ref} type={type} {...rest}/> 
            </div>
        );
    }
);

export default InputField