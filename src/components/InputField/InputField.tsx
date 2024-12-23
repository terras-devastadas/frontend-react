import React, {forwardRef} from "react";
import styles from './InputField.module.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'primary' | 'secondary';
    htmlFor?: string;
    label?: string;
}

const InputField = forwardRef<HTMLInputElement ,InputFieldProps>(
        ({variant = '', htmlFor, label, type = "text", ...rest}, ref) => {
        return(
            <div className={`${styles.InputContainer} ${styles[variant]}`}>
                <label className={styles.InputLabel} htmlFor={htmlFor}>{label}</label>
                <input className={styles.InputArea} name={htmlFor} ref={ref} type={type} {...rest}/> 
            </div>
        );
    }
);

export default InputField