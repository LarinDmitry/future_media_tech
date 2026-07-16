'use client';

import {FC} from 'react';
import {Message} from '../../../store/features/messagesSlice';
import {formatTimeAgo} from '../../utils';

interface Props {
  msg: Message;
  isCurrentUserAuthor: boolean;
  isEditing: boolean;
  editText: string;
  setEditText: (val: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const MessageCard: FC<Props> = ({
  msg,
  isCurrentUserAuthor,
  isEditing,
  editText,
  setEditText,
  onStartEdit,
  onCancelEdit,
  onSave,
  onDelete,
}) => (
  <article className="bg-white border-[3px] border-[#111111] p-6 space-y-4">
    <header className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <span
          className={`w-8 h-8 border-[2px] bg-${isCurrentUserAuthor ? '[#FFE600]' : 'white'} border-[#111111] flex items-center justify-center font-bold text-sm`}
        >
          {msg.avatar}
        </span>
        <div>
          <h4 className="font-extrabold text-sm leading-tight">{msg.author}</h4>
          <span className="text-xs text-gray-500 font-mono">{msg.username}</span>
        </div>
      </div>
      <span className="font-mono text-xs text-gray-400">{formatTimeAgo(msg.createdAt)}</span>
    </header>

    <div className="text-base font-medium leading-relaxed break-words">
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editText}
            onChange={({target: {value}}) => setEditText(value.slice(0, 240))}
            className="w-full border-[2px] border-[#111111] p-2 focus:outline-none text-base font-medium resize-none"
            rows={2}
          />
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-gray-500">{editText.length}/240</span>
            <div className="flex gap-2">
              <button
                onClick={onCancelEdit}
                className="px-3 py-1 border-[2px] border-gray-300 font-mono text-xs font-bold uppercase hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="px-3 py-1 bg-[#FFE600] border-[2px] border-[#111111] font-mono text-xs font-bold uppercase [box-shadow:2px_2px_0px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:[box-shadow:1px_1px_0px_0px_#111111] cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>{msg.text}</p>
      )}
    </div>

    <footer className="flex justify-between items-center pt-2">
      <span
        className={`px-3 py-1 ${isCurrentUserAuthor && 'bg-[#FFE600]'} border-[2px] border-[#111111] font-mono text-[10px] font-bold uppercase tracking-wider`}
      >
        {msg.tag}
      </span>

      {isCurrentUserAuthor && !isEditing && (
        <div className="flex gap-2">
          <button
            onClick={onStartEdit}
            className="px-3 py-1 bg-white border-[2px] border-[#111111] font-mono text-[10px] font-bold uppercase hover:bg-gray-100 transition-colors cursor-pointer"
          >
            EDIT
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-white border-[2px] border-[#111111] font-mono text-[10px] font-bold uppercase hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-colors cursor-pointer"
          >
            DELETE
          </button>
        </div>
      )}
    </footer>
  </article>
);

export default MessageCard;
