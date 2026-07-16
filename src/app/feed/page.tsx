'use client';

import {useState, useEffect, useMemo, Suspense, ChangeEvent, SyntheticEvent} from 'react';
import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';
import {logout} from '../../store/features/authSlice';
import {addMessage, deleteMessage, editMessage, Message} from '../../store/features/messagesSlice';
import BaseInput from 'components/BaseComponents/BaseInput';
import {AVAILABLE_TAGS, formatTimeAgo} from '../utils';

const FeedContent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUser = useSelector(({auth: {user}}: RootState) => user);
  const messages = useSelector(({messages: {list}}: RootState) => list);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('PRODUCT');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const activeTag = searchParams.get('tag') || '';
  const activeUser = searchParams.get('user') || '';
  const activeDateFrom = searchParams.get('from') || '';
  const activeDateTo = searchParams.get('to') || '';

  useEffect(() => {
    !currentUser && router.push('/');
  }, [currentUser, router]);

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) =>
      value === null || value === '' ? params.delete(key) : params.set(key, value)
    );
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [activeTag, activeUser, activeDateFrom, activeDateTo]);

  const filteredMessages = useMemo(
    () =>
      messages.filter(({tag, username, createdAt}) => {
        if (activeTag && tag !== activeTag) return false;

        if (activeUser && activeUser !== 'All users') {
          if (username !== activeUser) return false;
        }

        const msgTime = new Date(createdAt).getTime();
        if (activeDateFrom) {
          const fromTime = new Date(activeDateFrom).getTime();
          if (msgTime < fromTime) return false;
        }
        if (activeDateTo) {
          const toTime = new Date(activeDateTo).getTime();
          if (msgTime > toTime) return false;
        }

        return true;
      }),
    [messages, activeTag, activeUser, activeDateFrom, activeDateTo]
  );

  const allUsersList = useMemo(() => {
    const usersMap = new Map<string, string>();
    messages.forEach(({username, author}) => usersMap.set(username, author));

    return Array.from(usersMap.entries()).map(([username, author]) => ({username, author}));
  }, [messages]);

  const handlePostSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!newText.trim() || newText.length > 240 || !currentUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      author: currentUser.name,
      username: currentUser.username,
      avatar: currentUser.avatar,
      text: newText.trim(),
      tag: newTag,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));
    setNewText('');
  };

  const saveEdit = (id: string) => {
    if (!editText.trim() || editText.length > 240) return;
    dispatch(editMessage({id, text: editText.trim()}));
    setEditingId(null);
  };

  const hasActiveFilters = activeTag || (activeUser && activeUser !== 'All users') || activeDateFrom || activeDateTo;

  if (!currentUser) return null;

  return (
    <div className="bg-[#E5E5E0] text-[#111111] min-h-screen font-sans">
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
              {currentUser.avatar}
            </span>
            <span className="hidden sm:inline font-bold text-gray-500">{currentUser.name}</span>
          </div>
          <button
            onClick={() => {
              dispatch(logout());
              router.push('/');
            }}
            className="border-[2px] border-[#111111] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            LOG OUT
          </button>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 p-6 md:p-12">
        <aside className="space-y-6">
          <div className="flex justify-between items-baseline font-mono text-xs font-bold uppercase tracking-wider">
            <span>FILTERS</span>
            {hasActiveFilters && (
              <button
                onClick={() => router.push(pathname)}
                className="underline text-gray-500 hover:text-black cursor-pointer"
              >
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
                    onClick={() => updateFilters({tag: isActive ? null : tag})}
                    className={`px-3 py-1 text-xs font-mono font-bold uppercase border-[2px] border-[#111111] transition-all cursor-pointer ${
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
                onChange={({target: {value}}) => updateFilters({user: value || null})}
                className="w-full bg-white px-3 py-2 border-[2px] border-[#111111] text-xs font-mono font-bold rounded-none appearance-none focus:outline-none cursor-pointer"
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
            <span className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">DATA</span>
            <BaseInput
              label=""
              value={activeDateFrom}
              onChange={({target: {value}}: ChangeEvent<HTMLInputElement>) => updateFilters({from: value || null})}
              placeholder="From"
              type="date"
            />
            <BaseInput
              label=""
              value={activeDateTo}
              onChange={({target: {value}}: ChangeEvent<HTMLInputElement>) => updateFilters({to: value || null})}
              placeholder="To"
              type="date"
            />
          </div>
        </aside>

        <main className="space-y-6">
          <form
            onSubmit={handlePostSubmit}
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

          <div className="space-y-4">
            {isLoading ? (
              Array.from({length: 3}).map((_, idx) => (
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
              ))
            ) : filteredMessages.length === 0 ? (
              <div
                className="border-[3px] border-[#111111] border-dashed bg-white flex flex-col items-center justify-center p-16 text-center"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #f3f4f6, #f3f4f6 10px, #ffffff 10px, #ffffff 20px)',
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
            ) : (
              <>
                {filteredMessages.slice(0, visibleCount).map((msg) => {
                  const isAuthor = msg.username === currentUser.username;
                  const isEditing = editingId === msg.id;

                  return (
                    <article key={msg.id} className="bg-white border-[3px] border-[#111111] p-6 space-y-4">
                      <header className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-white border-[2px] border-[#111111] flex items-center justify-center font-bold text-sm">
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
                              onChange={(e) => setEditText(e.target.value.slice(0, 240))}
                              className="w-full border-[2px] border-[#111111] p-2 focus:outline-none text-base font-medium resize-none"
                              rows={2}
                            />
                            <div className="flex justify-between items-center">
                              <span className="font-mono text-xs text-gray-500">{editText.length}/240</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="px-3 py-1 border-[2px] border-gray-300 font-mono text-xs font-bold uppercase hover:bg-gray-100 cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => saveEdit(msg.id)}
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
                        <span className="px-3 py-1 bg-[#FFE600] border-[2px] border-[#111111] font-mono text-[10px] font-bold uppercase tracking-wider">
                          {msg.tag}
                        </span>

                        {isAuthor && !isEditing && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingId(msg.id);
                                setEditText(msg.text);
                              }}
                              className="px-3 py-1 bg-white border-[2px] border-[#111111] font-mono text-[10px] font-bold uppercase hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              EDIT
                            </button>
                            <button
                              onClick={() => dispatch(deleteMessage(msg.id))}
                              className="px-3 py-1 bg-white border-[2px] border-[#111111] font-mono text-[10px] font-bold uppercase hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-colors cursor-pointer"
                            >
                              DELETE
                            </button>
                          </div>
                        )}
                      </footer>
                    </article>
                  );
                })}

                {filteredMessages.length > visibleCount && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 3)}
                      className="px-6 py-3 bg-white border-[3px] border-[#111111] font-mono font-bold text-xs uppercase tracking-wider [box-shadow:4px_4px_0px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:[box-shadow:2px_2px_0px_0px_#111111] active:translate-x-[4px] active:translate-y-[4px] active:[box-shadow:0px_0px_0px_0px_#111111] transition-all cursor-pointer"
                    >
                      LOAD MORE ↓
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const FeedPage = () => (
  <Suspense
    fallback={
      <div className="bg-[#E5E5E0] min-h-screen flex items-center justify-center font-mono font-bold">
        LOADING DISPATCH FEED...
      </div>
    }
  >
    <FeedContent />
  </Suspense>
);

export default FeedPage;
