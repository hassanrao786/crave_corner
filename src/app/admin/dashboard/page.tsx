'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminDashboard: React.FC = () => {
  const router = useRouter();

  const validateAdminToken = () => {
    const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
    return !!token; // Return true if token exists, otherwise false
  };

  // Redirect if the admin is not logged in
  useEffect(() => {
    if (!validateAdminToken()) {
      router.push('/admin/login'); // Redirect to login if no token is found
    }
  }, [router]);

  // Handle sign out
  const signOut = () => {
    document.cookie = 'token=; path=/; max-age=0'; // Delete the token cookie
    router.push('/'); // Redirect to login after signing out
  };

  const handleOrdersRedirect = () => {
    if (validateAdminToken()) {
      router.push('/admin/orders');
    } else {
      router.push('/admin/login');
    }
  };

  const handleRecipesRedirect = () => {
    if (validateAdminToken()) {
      router.push('/admin/recipes');
    } else {
      router.push('/admin/login');
    }
  };

  const handleBlogsRedirect = () => {
    if (validateAdminToken()) {
      router.push('/admin/blogs');
    } else {
      router.push('/admin/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

        <div className="mb-4">
          <button
            onClick={handleOrdersRedirect}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Manage Orders
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={handleRecipesRedirect}
            className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Manage Recipes
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={handleBlogsRedirect}
            className="w-full px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
          >
            Manage Blogs
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={signOut}
            className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
