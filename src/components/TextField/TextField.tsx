import React from 'react';
import styles from './TextField.module.css';

interface TextFieldProps {
    variant?: 'primary' | 'secondary';
    htmlFor: string;
    label: string;
    required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ variant = 'primary', htmlFor, label, required }) => {
    return (
        <div className={`${styles.InputContainer} ${styles[variant]}`}>
            <label htmlFor={htmlFor} className={styles.InputLabel}>
                {label} {required && '*'}
            </label>
            <textarea id={htmlFor} className={styles.InputArea} required={required}></textarea>
        </div>
    );
};

export default TextField;