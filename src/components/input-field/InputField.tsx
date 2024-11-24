import React from "react";
import styles from './InputField.module.css';

interface InputFieldProps {
    type: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({type, name, ...rest}) => {
    return(
        <input type={type} name={name} {...rest}/>
    );
}


export default InputField