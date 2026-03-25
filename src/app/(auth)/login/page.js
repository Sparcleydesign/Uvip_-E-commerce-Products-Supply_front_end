'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError(true);
      return;
    }
    setError(false);
    // MOCK AUTH
    localStorage.setItem('uvip_auth', 'true');
    router.push('/dashboard');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <Link href="/" className="mb-8 flex flex-col items-start w-fit group">
        <Image
          src="/assets/uvip_logo_main.png"
          alt="UVIP Logo"
          width={150}
          height={48}
          className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
          priority
        />
        <span className="text-[10px] text-gray-500 font-medium tracking-tight mt-1">
          Automate Your E-commerce Products Supply
        </span>
      </Link>

      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
      <p className="text-sm text-gray-500 mt-2 mb-10 font-medium">Sign in to your account</p>

      {error && (
        <div className="bg-red-50 text-red-500 text-xs font-semibold p-3 rounded-xl mb-6 border border-red-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Please fill in all fields
        </div>
      )}

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 pl-4 block">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-sage-dark focus:ring-4 focus:ring-sage/10 transition-all font-medium"
          />
        </div>

        <div className="space-y-2 relative">
          <div className="flex justify-between items-center pr-4">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 pl-4 block">
              Password
            </label>
            <Link href="#" className="text-[11px] font-bold uppercase tracking-[0.1em] text-sage-dark hover:opacity-70 transition-opacity">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-sage-dark focus:ring-4 focus:ring-sage/10 transition-all font-medium"
          />
        </div>

        <Button
          onClick={handleLogin}
          variant="primary"
          size="lg"
          className="w-full mt-4 shadow-xl shadow-sage/10 h-12 rounded-2xl"
        >
          Sign In
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-10">
        <div className="h-px bg-gray-100 flex-1" />
        <span className="text-[10px] uppercase font-bold text-gray-300 tracking-[0.2em] px-2">or</span>
        <div className="h-px bg-gray-100 flex-1" />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 font-medium">
          Don't have an account?{' '}
          <Link href="/register" className="text-sage-dark font-bold hover:underline underline-offset-4 ml-1">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
