import {FC, Fragment} from 'react';
import {BaseInputProps} from './types';

const BaseInput: FC<BaseInputProps> = ({label, value, onChange, placeholder, type}) => (
  <Fragment>
    <label className="block font-mono text-xs font-bold tracking-wider uppercase mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full bg-white px-4 py-3 border-[3px] border-[#111111] rounded-none cursor-pointer text-base font-medium focus:outline-none focus:bg-[#FFE600]/10 transition-colors placeholder-gray-400"
    />
  </Fragment>
);

export default BaseInput;
