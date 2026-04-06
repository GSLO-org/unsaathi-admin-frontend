import { useState, useEffect } from 'react';

export default function FAQForm({ onSubmit, onClose, initialData = null }) {
  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: 'general',
    order: 0,
    isActive: true,
    blogId: ''
  });

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs'); // change if your backend URL differs
        const data = await res.json();
        setBlogs(data.blogs || data || []);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        question: initialData.question || '',
        answer: initialData.answer || '',
        category: initialData.category || 'general',
        order: initialData.order || 0,
        isActive: initialData.isActive !== false,
        blogId: initialData.blogId || ''
      });
    }
  }, [initialData]);

  function handleChange(e) {
    const value =
      e.target.name === 'isActive' ? e.target.checked : e.target.value;

    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="bg-white p-6 rounded shadow w-96 max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Edit FAQ' : 'Add FAQ'}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="What is mutual divorce cost?"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
          placeholder="₹20k-₹1.5L, 6 months process..."
          className="w-full p-2 border rounded mb-3 h-32"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="general">General (all pages)</option>

          <optgroup label="Service Pages">
            <option value="services">Services Page</option>
            <option value="mutual-divorce">Services → Mutual Divorce</option>
            <option value="contested-divorce">Services → Contested Divorce</option>
            <option value="maintanance-and-alimony">Services → Maintenance & Alimony</option>
            <option value="dowry">Services → Dowry</option>
            <option value="child-custody">Services → Child Custody</option>
            <option value="cruelty">Services → Cruelty</option>
            <option value="judicial-separation">Services → Judicial Separation</option>
            <option value="child-visitation">Services → Child Visitation</option>
            <option value="annulment-of-marriage">Services → Annulment of Marriage</option>
            <option value="conjugal-rights">Services → Conjugal Rights</option>
          </optgroup>

          <optgroup label="City Pages">
            <option value="divorce-lawyer-noida">Divorce Lawyer → Noida</option>
            <option value="divorce-lawyer-delhi">Divorce Lawyer → Delhi</option>
            <option value="divorce-lawyer-gurgaon">Divorce Lawyer → Gurgaon</option>
          </optgroup>

          <optgroup label="Other Pages">
            <option value="home">Home Page</option>
            <option value="why-unsaathi">Why Unsaathi</option>
            <option value="how-unsaathi">How Unsaathi Works</option>
            <option value="about-us">About Us</option>
            <option value="connect-with-us">Connect With Us</option>
            <option value="contact">Contact Us</option>
            <option value="faqs">FAQ Page</option>
            <option value="blog">Blog Listing Page</option>
          </optgroup>
        </select>

        <select
          name="blogId"
          value={form.blogId}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select specific blog (optional)</option>
          {blogs.map((blog) => (
            <option key={blog._id} value={blog._id}>
              {blog.title}
            </option>
          ))}
        </select>

        <input
          name="order"
          type="number"
          value={form.order}
          onChange={handleChange}
          placeholder="0"
          className="w-full p-2 border rounded mb-3"
          min="0"
        />

        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          Active
        </label>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {initialData ? 'Update' : 'Submit'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}