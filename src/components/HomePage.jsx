import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import TestimonialTable from './TestimonialTable';
import TestimonialForm from './TestimonialForm';
import BlogTable from './BlogTable';
import BlogForm from './BlogForm';
import FAQTable from './FaqTable';
import FAQForm from './FaqForm';
import api from '../api';

export default function HomePage() {
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showFAQForm, setShowFAQForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);

  async function fetchTestimonials() {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.error('Fetch testimonials error:', err.response?.data || err.message);
    }
  }

  async function fetchBlogs() {
    try {
      const res = await api.get('/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error('Fetch blogs error:', err.response?.data || err.message);
    }
  }

  async function fetchFaqs() {
    try {
      const res = await api.get('/faq');
      setFaqs(res.data);
    } catch (err) {
      console.error('Fetch faqs error:', err.response?.data || err.message);
    }
  }

  useEffect(() => {
    fetchTestimonials();
    fetchBlogs();
    fetchFaqs();
  }, []);

  // TESTIMONIAL
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
      console.error('Testimonial save error:', err.response?.data || err.message);
    }
  }

  async function handleDeleteTestimonial(id) {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error('Delete testimonial error:', err.response?.data || err.message);
    }
  }

  function handleEditTestimonial(item) {
    setEditingTestimonial(item);
    setShowTestimonialForm(true);
  }

  // BLOG
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
      console.error('Blog save error:', err.response?.data || err.message);
    }
  }

  async function handleDeleteBlog(id) {
    if (!window.confirm('Are you sure?')) return;

    try {
      await api.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Delete blog error:', err.response?.data || err.message);
    }
  }

  async function handleEditBlog(item) {
    try {
      const res = await api.get(`/blogs/${item._id}`);
      setEditingBlog(res.data);
      setShowBlogForm(true);
    } catch (err) {
      console.error('Fetch single blog failed:', err.response?.data || err.message);
    }
  }

  // FAQ
  async function handleAddOrEditFAQ(data) {
    try {
      if (editingFAQ?._id) {
        console.log('✏️ Updating FAQ:', editingFAQ._id);
        await api.put(`/faq/${editingFAQ._id}`, data);
      } else {
        console.log('➕ Creating FAQ');
        await api.post('/faq', data);
      }

      setShowFAQForm(false);
      setEditingFAQ(null);
      fetchFaqs();
    } catch (err) {
      console.error('❌ FAQ save error:', err.response?.data || err.message);
    }
  }

  async function handleDeleteFAQ(id) {
    console.log('🗑️ Deleting FAQ:', id);

    if (!id) {
      alert('Invalid FAQ ID');
      return;
    }

    if (!window.confirm('Are you sure?')) return;

    try {
      await api.delete(`/faq/${id}`);
      fetchFaqs();
    } catch (err) {
      console.error('❌ Delete FAQ error:', err.response?.data || err.message);
    }
  }

  function handleEditFAQ(item) {
    console.log('✏️ Editing FAQ:', item);
    setEditingFAQ(item);
    setShowFAQForm(true);
  }

  return (
    <div className="flex min-h-screen bg-gray-50"> <Sidebar /> <main className="flex-1 flex flex-col"> <Routes> {/* Testimonials route (unchanged) */} <Route path="/testimonials" element={ <> <Topbar title="Testimonials" buttonText="+ Add Testimonial" onAddClick={() => { setEditingTestimonial(null); setShowTestimonialForm(true); }} /> <TestimonialTable data={testimonials} onEdit={handleEditTestimonial} onDelete={handleDeleteTestimonial} /> {showTestimonialForm && ( <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> <TestimonialForm initialData={editingTestimonial} onSubmit={handleAddOrEditTestimonial} onClose={() => { setShowTestimonialForm(false); setEditingTestimonial(null); }} /> </div> )} </> } /> {/* Blogs route (unchanged) */} <Route path="/blogs" element={ <> <Topbar title="Blogs" buttonText="+ Add Blog" onAddClick={() => { setEditingBlog(null); setShowBlogForm(true); }} /> <BlogTable data={blogs} onEdit={handleEditBlog} onDelete={handleDeleteBlog} /> {showBlogForm && editingBlog !== undefined && ( <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> <BlogForm key={editingBlog?._id || 'new'} initialData={editingBlog} onSubmit={handleAddOrEditBlog} onClose={() => { setShowBlogForm(false); setEditingBlog(null); }} /> </div> )} </> } /> {/* ← NEW: FAQ route */} <Route path="/faq" element={ <> <Topbar title="FAQs" buttonText="+ Add FAQ" onAddClick={() => { setEditingFAQ(null); setShowFAQForm(true); }} /> <FAQTable data={faqs} onEdit={handleEditFAQ} onDelete={handleDeleteFAQ} /> {showFAQForm && ( <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> <FAQForm initialData={editingFAQ} onSubmit={handleAddOrEditFAQ} onClose={() => { setShowFAQForm(false); setEditingFAQ(null); }} /> </div> )} </> } /> </Routes> </main> </div> ); }