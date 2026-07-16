'use client';

import {FC, ChangeEvent} from 'react';
import BaseInput from 'components/BaseComponents/BaseInput/BaseInput';
import {AVAILABLE_TAGS} from '../../utils';

interface Props {
  activeTag: string;
  activeUser: string;
  activeDateFrom: string;
  activeDateTo: string;
  allUsersList: Array<{username: string; author: string}>;
  hasActiveFilters: boolean;
  onUpdateFilters: (updates: Record<string, string | null>) => void;
  onClearFilters: () => void;
}

const Sidebar: FC<Props> = ({
  activeTag,
  activeUser,
  activeDateFrom,
  activeDateTo,
  allUsersList,
  hasActiveFilters,
  onUpdateFilters,
  onClearFilters,
}) => (
  <aside className="space-y-6">
    <div className="flex justify-between items-baseline font-mono text-xs font-bold uppercase tracking-wider">
      <span>FILTERS</span>
      {hasActiveFilters && (
        <button onClick={onClearFilters} className="underline text-gray-500 hover:text-black cursor-pointer">
          clear
        </button>
      )}
    </div>

    <div className="space-y-2">
      <span className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">TAG</span>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_TAGS.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onUpdateFilters({tag: isActive ? null : tag})}
              className={`px-3 py-1 text-sm font-mono font-bold uppercase border-[2px] border-[#111111] transition-all cursor-pointer ${
                isActive ? 'bg-[#FFE600] [box-shadow:2px_2px_0px_0px_#111111]' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>

    <div className="space-y-2">
      <span className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">USER</span>
      <div className="relative">
        <select
          value={activeUser}
          onChange={({target: {value}}) => onUpdateFilters({user: value || null})}
          className="w-full bg-white px-3 h-[50px] py-2 border-[3px] border-[#111111] font-mono font-bold rounded-none appearance-none focus:outline-none cursor-pointer"
        >
          <option value="">All users</option>
          {allUsersList.map(({username, author}) => (
            <option key={username} value={username}>
              {author} ({username})
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">▼</div>
      </div>
    </div>

    <div className="space-y-4">
      <span className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">DATE</span>
      <BaseInput
        label="From"
        value={activeDateFrom}
        onChange={({target: {value}}: ChangeEvent<HTMLInputElement>) => onUpdateFilters({from: value || null})}
        placeholder="DD.MM.YYYY"
        type="date"
      />
      <BaseInput
        label="To"
        value={activeDateTo}
        onChange={({target: {value}}: ChangeEvent<HTMLInputElement>) => onUpdateFilters({to: value || null})}
        placeholder="DD.MM.YYYY"
        type="date"
      />
    </div>
  </aside>
);

export default Sidebar;
