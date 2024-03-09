'use client';

import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps{
    label: string, 
    id: string,
    type?: string, 
    placeholder?: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({  //react function component "Input"
    label,
    id,
    type,
    placeholder,
    required,
    register,
    errors,
    disabled
}) => {
    return (
        // <div className={styles.div_auth}>
        <div className="w-full p-2">
            {/* <label className="bloc text-sm font-medium leading-6 text-gray-900" htmlFor={id}>
                {label}
            </label> */}
            <div className='mt-2'>
                <input id={id}
                    type={type} 
                    autoComplete={id} 
                    disabled={disabled}
                    placeholder={placeholder}
                    { ...register(id, { required })} 
                    className={clsx('form-input block w-full rounded-md border-0 px-2 py-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm-leading-6 text-black',
                    errors[id] && "focus:ring-rose-500",
                    disabled && "opacity-50 cursor-default"
                    )}/>
            </div>

        </div>
    );
}

export default Input;