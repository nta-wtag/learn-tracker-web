import React from 'react';

function Button({text, onClick}) {
    return (
        <div className='w-50 bg-[#6b3dcb] p-2 text-white flex justify-center rounded-lg my-4 content-center' onClick={onClick}>
            {text}
        </div>
    );
}

export default Button;