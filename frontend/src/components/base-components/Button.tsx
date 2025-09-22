import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
}) => (
    <button onClick={onClick} className='bg-[#6b3dcb] py-2 px-4 text-white rounded-lg'>
        {text}
    </button>
);


export default Button;