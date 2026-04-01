'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { registerUser } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const toast = useToast();
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setFormData((p) => ({ ...p, [field]: e.target.value }));

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    const { full_name, email, password } = formData;
    if (!full_name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await registerUser({ full_name, email, password });
      if (data?.user) setUser(data.user);
      toast.success('Account created! Setting up your workspace...');
      setTimeout(() => router.push('/onboarding'), 800);
    } catch (err) {
      const msg = err.message || 'Registration failed. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onKeyDown={(e) => e.key === 'Enter' && handleRegister()}>
      <Link href="/" className="mb-8 flex flex-col items-start w-fit group">
        <Image src="/assets/uvip_logo_main.png" alt="UVIP Logo" width={150} height={48}
          className="h-12 w-auto object-contain transition-transform group-hover:scale-105" priority />
        <span className="text-[10px] text-gray-500 font-medium tracking-tight mt-1">
          Automate Your E-commerce Products Supply
        </span>
      </Link>

      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create your account</h2>
      <p className="text-sm text-gray-500 mt-2 mb-10 font-medium">Start automating in minutes</p>

      {error && (
        <div className="bg-red-50 text-red-500 text-xs font-semibold p-3 rounded-xl mb-6 border border-red-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 pl-4">Full Name*</label>
          <input type="text" placeholder="John Doe" autoComplete="name" onChange={set('full_name')}
            className="w-full h-11 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-sm font-medium focus:border-sage-dark focus:ring-4 focus:ring-sage/10 transition-all" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 pl-4">Email Address*</label>
          <input type="email" placeholder="example@mail.com" autoComplete="email" onChange={set('email')}
            className="w-full h-11 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-sm font-medium focus:border-sage-dark focus:ring-4 focus:ring-sage/10 transition-all" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 pl-4">Password*</label>
          <input type="password" placeholder="Min 6 characters" autoComplete="new-password" onChange={set('password')}
            className="w-full h-11 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-sm font-medium focus:border-sage-dark focus:ring-4 focus:ring-sage/10 transition-all" />
        </div>

        <Button onClick={handleRegister} variant="primary" size="lg" disabled={loading}
          className="w-full mt-4 h-12 shadow-xl shadow-sage/10 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Creating account...
            </span>
          ) : 'Create Account'}
        </Button>
      </div>

      <div className="text-center mt-10 pb-4">
        <p className="text-sm text-gray-500 font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-sage-dark font-bold hover:underline underline-offset-4 ml-1">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
