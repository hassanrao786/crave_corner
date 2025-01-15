'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm as LoginFormType } from '../../../types/auth';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormType>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setErrorMessage(data.message || 'Invalid login credentials');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-orange-600"
      >
        Login
      </button>
    </form>
  );
}
