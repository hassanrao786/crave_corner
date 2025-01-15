// src/app/components/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="blog-card">
      <Image src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <Link href={`/blogs/${post.id}`}>Read More</Link>
    </div>
  );
};

export default BlogCard;
