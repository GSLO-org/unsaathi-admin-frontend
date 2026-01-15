import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import TestimonialTable from './TestimonialTable';
import TestimonialForm from './TestimonialForm';
import BlogTable from './BlogTable';
import BlogForm from './BlogForm';
import api from '../api';

export default function HomePage() {
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);

  async function fetchTestimonials() {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.error('Fetch testimonials error:', err);
    }
  }

  async function fetchBlogs() {
    try {
      const res = await api.get('/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error('Fetch blogs error:', err);
    }
  }

  useEffect(() => {
    fetchTestimonials();
    fetchBlogs();
  }, []);

  // Testimonial handlers - SIMPLIFIED (api.js handles tokens)
  async function handleAddOrEditTestimonial(data) {
    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial._id}`, data);
      } else {
        await api.post('/testimonials', data);
      }
      setShowTestimonialForm(false);
      setEditingTestimonial(null);
      fetchTestimonials();
    } catch (err) {
      console.error('Testimonial save error:', err);
    }
  }

  async function handleDeleteTestimonial(id) {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error('Delete testimonial error:', err);
    }
  }

  function handleEditTestimonial(item) {
    setEditingTestimonial(item);
    setShowTestimonialForm(true);
  }

  // Blog handlers - SIMPLIFIED (api.js handles tokens)
  async function handleAddOrEditBlog(blogData) {
    try {
      if (editingBlog) {
        await api.put(`/blogs/${editingBlog._id}`, blogData);
      } else {
        await api.post('/blogs', blogData);
      }
      
      setShowBlogForm(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      console.error('Blog save error:', err);
    }
  }

  async function handleDeleteBlog(id) {
    console.log('Deleting blog ID:', id);
    console.log('Token:', localStorage.getItem('token'));
    
    if (!window.confirm('Are you sure?')) return;

    try {
      await api.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Delete blog error:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
      }
    }
  }

  async function handleEditBlog(item) {
  try {
    const res = await api.get(`/blogs/${item._id}`);
    setEditingBlog(res.data); // ✅ FULL BLOG WITH CONTENT
    setShowBlogForm(true);
  } catch (err) {
    console.error('Fetch single blog failed:', err);
  }
}

  // ✅ NEW: Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route
            path="/testimonials"
            element={
              <>
                <Topbar
                  title="Testimonials"
                  buttonText="+ Add Testimonial"
                  onAddClick={() => {
                    setEditingTestimonial(null);
                    setShowTestimonialForm(true);
                  }}
                />
                <TestimonialTable
                  data={testimonials}
                  onEdit={handleEditTestimonial}
                  onDelete={handleDeleteTestimonial}
                />
                {showTestimonialForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <TestimonialForm
                      initialData={editingTestimonial}
                      onSubmit={handleAddOrEditTestimonial}
                      onClose={() => {
                        setShowTestimonialForm(false);
                        setEditingTestimonial(null);
                      }}
                    />
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/blogs"
            element={
              <>
                <Topbar
                  title="Blogs"
                  buttonText="+ Add Blog"
                  onAddClick={() => {
                    setEditingBlog(null);
                    setShowBlogForm(true);
                  }}
                />
                <BlogTable data={blogs} onEdit={handleEditBlog} onDelete={handleDeleteBlog} />
                {showBlogForm && editingBlog !== undefined && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <BlogForm
      key={editingBlog?._id || 'new'}
      initialData={editingBlog}
      onSubmit={handleAddOrEditBlog}
      onClose={() => {
        setShowBlogForm(false);
        setEditingBlog(null);
      }}
    />
  </div>
)}

              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
