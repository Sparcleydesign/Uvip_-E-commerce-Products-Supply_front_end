'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(false);

  const handleRegister = (e) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError(true);
      return;
    }
    setError(false);
    // MOCK AUTH
    localStorage.setItem('uvip_auth', 'true');
    router.push('/onboarding');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRegister();
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

      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create your account</h2>
      <p className="text-sm text-gray-500 mt-2 mb-10 font-medium">Start automating in minutes</p>

      {error && (
        <div className="bg-red-50 text-red-500 text-xs font-semibold p-3 rounded-xl mb-6 border border-red-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Please fill in all required fields
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 pl-4">Full Name*</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full h-11 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-sm font-medium focus:border-sage-dark focus:ring-4 focus:ring-sage/10 transition-all font-medium"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 pl-4">Email Address*</label>
          <input
            type="email"
            placeholder="example@mail.com"
            className="w-full h-11 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-sm font-medium focus:border-sage-dark focus:ring-4 focus:ring-sage/10 transition-all font-medium"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 pl-4">Password*</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-11 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-sm font-medium focus:border-sage-dark focus:ring-4 focus:ring-sage/10 transition-all font-medium"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>


        <Button
          onClick={handleRegister}
          variant="primary"
          size="lg"
          className="w-full mt-4 h-12 shadow-xl shadow-sage/10 rounded-2xl"
        >
          Create Account
        </Button>
      </div>

      <div className="text-center mt-10 pb-4">
        <p className="text-sm text-gray-500 font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-sage-dark font-bold hover:underline underline-offset-4 ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
