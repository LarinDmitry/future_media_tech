'use client';

import {FC} from 'react';
import {Message} from '../../../store/features/messagesSlice';
import MessageCard from './MessageCard';

interface Props {
  isLoading: boolean;
  filteredMessages: Message[];
  visibleCount: number;
  onLoadMore: () => void;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  editingId: string | null;
  editText: string;
  setEditText: (val: string) => void;
  onStartEdit: (msg: Message) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: string) => void;
  onDeleteMessage: (id: string) => void;
}

const List: FC<Props> = ({
  isLoading,
  filteredMessages,
  visibleCount,
  onLoadMore,
  user,
  editingId,
  editText,
  setEditText,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDeleteMessage,
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({length: 3}).map((_, idx) => (
          <div key={idx} className="bg-white border-[3px] border-[#111111] p-6 space-y-4 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 border-[2px] border-gray-300"></div>
                <div>
                  <div className="h-3 w-24 bg-gray-200 mb-1"></div>
                  <div className="h-2 w-16 bg-gray-100"></div>
                </div>
              </div>
              <div className="h-3 w-8 bg-gray-100"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-200"></div>
              <div className="h-3 w-4/5 bg-gray-200"></div>
            </div>
            <div className="h-6 w-16 bg-gray-100 border-[2px] border-gray-200"></div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (filteredMessages.length === 0) {
    return (
      <div
        className="border-[3px] border-[#111111] border-dashed bg-white flex flex-col items-center justify-center p-16 text-center"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #f3f4f6, #f3f4f6 10px, #ffffff 10px, #ffffff 20px)',
        }}
      >
        <div className="w-12 h-12 bg-[#FFE600] border-[3px] border-[#111111] flex items-center justify-center font-black text-2xl mb-4 [box-shadow:4px_4px_0px_0px_#111111]">
          !
        </div>
        <h3 className="text-xl font-extrabold mb-2">Nothing here yet</h3>
        <p className="text-gray-500 text-sm max-w-sm">
          No messages match this view. Post the first one, or clear your filters.
        </p>
      </div>
    );
  }

  // List + pagination
  return (
    <div className="space-y-4">
      {filteredMessages.slice(0, visibleCount).map((msg) => (
        <MessageCard
          key={msg.id}
          msg={msg}
          isCurrentUserAuthor={msg.username === user.username}
          isEditing={editingId === msg.id}
          editText={editText}
          setEditText={setEditText}
          onStartEdit={() => onStartEdit(msg)}
          onCancelEdit={onCancelEdit}
          onSave={() => onSaveEdit(msg.id)}
          onDelete={() => onDeleteMessage(msg.id)}
        />
      ))}

      {filteredMessages.length > visibleCount && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-white border-[3px] border-[#111111] font-mono font-bold text-xs uppercase tracking-wider [box-shadow:4px_4px_0px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:[box-shadow:2px_2px_0px_0px_#111111] active:translate-x-[4px] active:translate-y-[4px] active:[box-shadow:0px_0px_0px_0px_#111111] transition-all cursor-pointer"
          >
            LOAD MORE ↓
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
