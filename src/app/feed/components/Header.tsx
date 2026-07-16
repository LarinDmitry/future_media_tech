'use client';

import {FC} from 'react';
import {useRouter} from 'next/navigation';

interface Props {
  user: {
    name: string;
    avatar: string;
  };
  onLogout: () => void;
}

const Header: FC<Props> = ({user, onLogout}) => {
  const router = useRouter();

  return (
    <header className="bg-white border-b-[3px] border-[#111111] py-4 px-6 md:px-12 flex justify-between items-center">
      <div
        className="flex items-center gap-2 font-mono text-base font-bold tracking-wider uppercase cursor-pointer"
        onClick={() => router.push('/')}
      >
        <span>◆</span> DISPATCH
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-mono text-xs md:text-sm">
          <span className="w-8 h-8 bg-[#FFE600] border-[2px] border-[#111111] flex items-center justify-center font-bold">
            {user.avatar}
          </span>
          <span className="hidden sm:inline font-bold text-gray-500">{user.name}</span>
        </div>
        <button
          onClick={onLogout}
          className="border-[2px] border-[#111111] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          LOG OUT
        </button>
      </div>
    </header>
  );
};

export default Header;
