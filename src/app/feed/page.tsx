'use client';

import {useState, useEffect, useMemo, Suspense, SyntheticEvent} from 'react';
import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';
import {logout} from '../../store/features/authSlice';
import {addMessage, deleteMessage, editMessage, Message} from '../../store/features/messagesSlice';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostForm from './components/PostForm';
import FeedList from './components/FeedList';

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

  const handleSaveEdit = (id: string) => {
    if (!editText.trim() || editText.length > 240) return;
    dispatch(editMessage({id, text: editText.trim()}));
    setEditingId(null);
  };

  const hasActiveFilters = !!(
    activeTag ||
    (activeUser && activeUser !== 'All users') ||
    activeDateFrom ||
    activeDateTo
  );

  if (!currentUser) return null;

  return (
    <div className="bg-[#E5E5E0] text-[#111111] min-h-screen font-sans">
      <Header
        user={currentUser}
        onLogout={() => {
          dispatch(logout());
          router.push('/');
        }}
      />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 p-6 md:p-12">
        <Sidebar
          activeTag={activeTag}
          activeUser={activeUser}
          activeDateFrom={activeDateFrom}
          activeDateTo={activeDateTo}
          allUsersList={allUsersList}
          hasActiveFilters={hasActiveFilters}
          onUpdateFilters={updateFilters}
          onClearFilters={() => router.push(pathname)}
        />

        <main className="space-y-6">
          <PostForm
            newText={newText}
            setNewText={setNewText}
            newTag={newTag}
            setNewTag={setNewTag}
            isTagDropdownOpen={isTagDropdownOpen}
            setIsTagDropdownOpen={setIsTagDropdownOpen}
            onSubmit={handlePostSubmit}
          />

          <FeedList
            isLoading={isLoading}
            filteredMessages={filteredMessages}
            visibleCount={visibleCount}
            onLoadMore={() => setVisibleCount((prev) => prev + 3)}
            user={currentUser}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            onStartEdit={(msg) => {
              setEditingId(msg.id);
              setEditText(msg.text);
            }}
            onCancelEdit={() => setEditingId(null)}
            onSaveEdit={handleSaveEdit}
            onDeleteMessage={(id) => dispatch(deleteMessage(id))}
          />
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
