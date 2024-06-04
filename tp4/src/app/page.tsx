'use client';
import { useState, useEffect } from 'react';

const Home: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const res = await fetch('/api');
      if (res.ok) {
        const data = await res.json();
        setCount(data.count);
      } else {
        console.error('Failed to fetch count');
      }
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const updateCount = async (newCount: number) => {
    try {
      const res = await fetch('/api', { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newCount }),
      });
      if (res.ok) {
        const data = await res.json();
        setCount(data.count);
      } else {
        console.error('Failed to update count');
      }
    } catch (error) {
      console.error('Error updating count:', error);
    }
  };

  const incrementCount = () => {
    updateCount(count + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Counter</h1>
      <button
        onClick={incrementCount}
        className="text-2xl px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        {count}
      </button>
    </div>
  );
};

export default Home;
