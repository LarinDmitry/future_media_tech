import {FC, Fragment, ChangeEvent} from 'react';

interface Props {
  label: string;
  value: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BaseInput: FC<Props> = ({label, value, onChange, placeholder, type}) => (
  <Fragment>
    <label className="block font-mono text-xs font-bold tracking-wider uppercase mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-4 py-3 border-[3px] border-[#111111] rounded-none text-base font-medium focus:outline-none focus:bg-[#FFE600]/10 transition-colors placeholder-gray-400"
    />
  </Fragment>
);

export default BaseInput;
