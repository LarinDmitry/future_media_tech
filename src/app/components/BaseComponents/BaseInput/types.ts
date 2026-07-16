import {ChangeEvent} from 'react';

export interface BaseInputProps {
    label: string;
    value: string;
    placeholder: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}