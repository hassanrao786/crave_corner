// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // For client-side navigation

// export default function Orders() {
//   interface Order {
//     _id: string;
//     name: string;
//     address: string;
//     price: number;
//     status: string;
//     createdAt: string;
//   }

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchUserStatus() {
//       try {
//         // Retrieve JWT token from localStorage or cookies (where it's stored)
//         const token = localStorage.getItem('token'); // Adjust based on where you store the token
//         if (!token) {
//           router.push('/signin'); // Redirect to sign-in if no token
//           return;
//         }

//         // Check if the user is authenticated by passing token in Authorization header
//         const res = await fetch('/api/auth/status', {
//           headers: {
//             Authorization: `Bearer ${token}` // Send token for validation
//           }
//         });

//         if (res.ok) {
//           const userData = await res.json();
//           if (userData.isAuthenticated) {
//             setIsAuthenticated(true);
//             fetchOrders(userData.user.userId); // Fetch orders based on user ID
//           } else {
//             router.push('/signin'); // Redirect to sign-in if not authenticated
//           }
//         } else {
//           throw new Error('Failed to verify authentication.');
//         }
//       } catch (err) {
//         if (err instanceof Error) {
//           if (err instanceof Error) {
//             if (err instanceof Error) {
//               if (err instanceof Error) {
//                 if (err instanceof Error) {
//                   if (err instanceof Error) {
//                     if (err instanceof Error) {
//                       if (err instanceof Error) {
//                         if (err instanceof Error) {
//                           if (err instanceof Error) {
//                             setError(err.message);
//                           } else {
//                             setError('An unknown error occurred.');
//                           }
//                         } else {
//                           setError('An unknown error occurred.');
//                         }
//                       } else {
//                         setError('An unknown error occurred.');
//                       }
//                     } else {
//                       setError('An unknown error occurred.');
//                     }
//                   } else {
//                     setError('An unknown error occurred.');
//                   }
//                 } else {
//                   setError('An unknown error occurred.');
//                 }
//               } else {
//                 setError('An unknown error occurred.');
//               }
//             } else {
//               setError('An unknown error occurred.');
//             }
//           } else {
//             setError('An unknown error occurred.');
//           }
//         } else {
//           setError('An unknown error occurred.');
//         }
//         setLoading(false);
//       }
//     }

//     async function fetchOrders(userId: string) {
//       try {
//         const res = await fetch(`/api/orders?userId=${userId}`); // Fetch orders for the logged-in user
//         if (!res.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const data = await res.json();
//         setOrders(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUserStatus();
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="text-lg text-gray-600">Loading orders...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="text-lg text-red-600">Error: {error}</span>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return null; // Or redirect to the login page
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
//         My Orders
//       </h1>
//       {orders.length === 0 ? (
//         <div className="text-center text-xl text-gray-600">No orders found.</div>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="border bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out"
//             >
//               <h2 className="text-2xl font-semibold text-gray-800">{order.name}</h2>
//               <p className="text-xl text-gray-700">{order.address}</p>

//               <div className="mt-2">
//                 <p className="text-gray-800">
//                   Price: <span className="font-semibold">${order.price}</span>
//                 </p>
//                 <p className="text-gray-600">Status: {order.status}</p>
//                 <p className="text-sm text-gray-400">
//                   Created At: {new Date(order.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
