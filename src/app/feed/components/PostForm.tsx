'use client';

import {FC, SyntheticEvent} from 'react';
import {AVAILABLE_TAGS} from '../../utils';

interface Props {
  newText: string;
  setNewText: (val: string) => void;
  newTag: string;
  setNewTag: (val: string) => void;
  isTagDropdownOpen: boolean;
  setIsTagDropdownOpen: (val: boolean) => void;
  onSubmit: (e: SyntheticEvent) => void;
}

const PostForm: FC<Props> = ({
  newText,
  setNewText,
  newTag,
  setNewTag,
  isTagDropdownOpen,
  setIsTagDropdownOpen,
  onSubmit,
}) => (
  <form
    onSubmit={onSubmit}
    className="bg-white border-[3px] border-[#111111] [box-shadow:6px_6px_0px_0px_#111111] p-4 flex flex-col gap-4"
  >
    <textarea
      value={newText}
      onChange={({target: {value}}) => setNewText(value.slice(0, 240))}
      placeholder="What's happening?"
      rows={3}
      required
      className="w-full text-lg font-medium placeholder-gray-400 focus:outline-none resize-none"
    />

    <hr className="border-t-[2px] border-[#111111]" />

    <div className="flex justify-between items-center flex-wrap gap-2">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
          className="px-3 py-1.5 bg-white border-[2px] border-[#111111] font-mono text-xs font-bold uppercase flex items-center gap-2 cursor-pointer hover:bg-gray-50"
        >
          TAG: {newTag} <span className="text-[10px]">▼</span>
        </button>
        {isTagDropdownOpen && (
          <div className="absolute left-0 mt-1 bg-white border-[2px] border-[#111111] z-10 w-36 font-mono text-xs font-bold uppercase shadow-sm">
            {AVAILABLE_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setNewTag(t);
                  setIsTagDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#FFE600] border-b border-gray-200 last:border-b-0 cursor-pointer"
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-gray-500">{newText.length}/240</span>
        <button
          type="submit"
          disabled={!newText.trim()}
          className="px-6 py-2 bg-[#FFE600] border-[2px] border-[#111111] font-mono font-bold text-xs uppercase tracking-wider [box-shadow:3px_3px_0px_0px_#111111] active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:1px_1px_0px_0px_#111111] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          POST
        </button>
      </div>
    </div>
  </form>
);

export default PostForm;
