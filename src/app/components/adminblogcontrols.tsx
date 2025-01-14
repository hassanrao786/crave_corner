// src/app/components/AdminBlogControls.tsx
import React from 'react';

const AdminBlogControls: React.FC<{ onEdit: () => void; onDelete: () => void }> = ({ onEdit, onDelete }) => {
  return (
    <div className="admin-controls">
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default AdminBlogControls;
