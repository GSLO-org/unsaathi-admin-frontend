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

  // Testimonial handlers
  async function handleAddOrEditTestimonial(data) {
    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial._id}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await api.post('/testimonials', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
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
      await api.delete(`/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchTestimonials();
    } catch (err) {
      console.error('Delete testimonial error:', err);
    }
  }

  function handleEditTestimonial(item) {
    setEditingTestimonial(item);
    setShowTestimonialForm(true);
  }

  // Blog handlers
  async function handleAddOrEditBlog(data, files) {
    try {
      let imageUrls = data.images || [];

      if (files && files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => formData.append('images', file));

        const uploadRes = await api.post('/upload', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        imageUrls = [...imageUrls, ...(uploadRes.data.imageUrls || [])];
      }

      if (editingBlog) {
        await api.put(
          `/blogs/${editingBlog._id}`,
          { ...data, images: imageUrls },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      } else {
        await api.post(
          '/blogs',
          { ...data, images: imageUrls },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }

      setShowBlogForm(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      console.error('Blog save error:', err);
    }
  }

  async function handleDeleteBlog(id) {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await api.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchBlogs();
    } catch (err) {
      console.error('Delete blog error:', err);
    }
  }

  function handleEditBlog(item) {
    setEditingBlog(item);
    setShowBlogForm(true);
  }

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
                {showBlogForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <BlogForm
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
