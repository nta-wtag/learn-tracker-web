import React from 'react';

function InputField({type, placeholder, value, onChange}) {
    return (
        <div className='space-y-1 flex flex-col'>
            <label className='text-sm font-light text-gray-700'>
                {placeholder}
            </label>
            <input
              type={type}
              placeholder=""
              name={type}
              className="w-full text-left border border-gray-400 rounded px-4 py-2 text-sm"
              required
              value={value}
              onChange={onChange}
            />
        </div>
    );
}

export default InputField;