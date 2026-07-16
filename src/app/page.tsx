'use client';

import {SyntheticEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {login} from '../store/features/authSlice';
import BaseInput from 'components/BaseComponents/BaseInput/BaseInput';
import {VALID_USERS} from './utils';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');

    const foundUser = VALID_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (foundUser) {
      dispatch(
        login({
          email: foundUser.email,
          name: foundUser.name,
          username: `@${foundUser.email.split('@')[0]}`,
          avatar: foundUser.email[0].toUpperCase(),
        })
      );
      router.push('/feed');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen flex">
      <main className="w-full min-h-screen grid grid-cols-1 md:grid-cols-[45%_55%]">
        <section className="bg-[#FFE600] p-8 md:p-16 lg:p-16 flex flex-col justify-between border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#111111]">
          <div className="flex items-center gap-2 font-mono text-sm font-normal tracking-wider uppercase">
            <span>◆</span> DISPATCH
          </div>

          <div className="m-0 md:my-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-0 md:mb-6">
              Say it in
              <br />
              240.
            </h1>
            <p className="hidden md:block text-base md:text-lg lg:text-xl leading-relaxed max-w-sm font-medium">
              A short-message board for your team. Post, tag, filter, done.
            </p>
          </div>

          <div className="hidden md:block" />
        </section>

        <section className="bg-white p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <header className="mb-8">
              <h2 className="text-4xl font-extrabold tracking-tight mb-2">Log in</h2>
              <p className="text-gray-500 text-sm hidden md:block">Use a seeded account to continue.</p>
            </header>

            {error && (
              <div className="mb-6 p-4 bg-[#FF3B30] text-white border-[3px] border-[#111111] font-mono text-sm font-bold tracking-wide [box-shadow:4px_4px_0px_0px_#111111]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <BaseInput
                label="Email"
                value={email}
                onChange={({target: {value}}) => {
                  setError('');
                  setEmail(value);
                }}
                placeholder="ada@dispatch.dev"
                type="email"
              />

              <BaseInput
                label="Password"
                value={password}
                onChange={({target: {value}}) => {
                  setError('');
                  setPassword(value);
                }}
                placeholder="••••••••"
                type="password"
              />

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#FFE600] border-[3px] border-[#111111] rounded-none font-mono font-bold text-sm tracking-wider uppercase [box-shadow:6px_6px_0px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:[box-shadow:4px_4px_0px_0px_#111111] active:translate-x-[6px] active:translate-y-[6px] active:[box-shadow:0px_0px_0px_0px_#111111] transition-all cursor-pointer"
                >
                  Log In →
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
