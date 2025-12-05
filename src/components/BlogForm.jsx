import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function BlogForm({ onSubmit, onClose, initialData = null }) {
  const [form, setForm] = useState({ 
    title: '', summary: '', date: '', 
    seoFocusKeyword: '', seoTitle: '', seoMetaDescription: '' 
  });
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  async function handleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);
    setLoading(true);
    
    const base64Images = [];
    for (let file of selectedFiles) {
      try {
        const base64 = await convertToBase64(file);
        base64Images.push(base64);
      } catch (error) {
        console.error('Base64 conversion error:', error);
      }
    }
    
    setFiles(base64Images);
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formWithImages = { 
      ...form, 
      content: content,
      images: files, 
      date: new Date(form.date) 
    };
    onSubmit(formWithImages);
  }

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        summary: initialData.summary || '',
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
        seoFocusKeyword: initialData.seoFocusKeyword || '',
        seoTitle: initialData.seoTitle || '',
        seoMetaDescription: initialData.seoMetaDescription || ''
      });
      setContent(initialData.content || '');
      setFiles(initialData.images || []);
    }
  }, [initialData]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['clean']
    ]
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-[650px] max-h-[90vh] overflow-y-auto border border-gray-100">
      <h2 className="text-2xl font-bold mb-8 text-neutral-900 border-b border-gray-200 pb-4">
        {initialData ? 'Edit Blog' : 'Add Blog'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Blog Title
          </label>
          <input 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            placeholder="Enter blog title" 
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#c48e53]/20 focus:border-[#c48e53] transition-all duration-200 text-lg" 
            required 
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Summary
          </label>
          <textarea 
            name="summary" 
            value={form.summary} 
            onChange={handleChange} 
            placeholder="Brief summary (shows on blog cards)" 
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#c48e53]/20 focus:border-[#c48e53] resize-vertical h-28 transition-all duration-200" 
            required 
          />
        </div>

        {/* Content - Quill Editor */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Blog Content
          </label>
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              placeholder="Write your full blog content here. Use headings (H2-H6), bold text, links, and press Enter for new paragraphs."
              className="w-full"
              style={{ height: '350px' }}
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Publish Date
          </label>
          <input 
            name="date" 
            type="date" 
            value={form.date} 
            onChange={handleChange} 
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#c48e53]/20 focus:border-[#c48e53] transition-all duration-200 cursor-pointer" 
            required 
          />
        </div>

        {/* SEO Focus Keyword */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            SEO Focus Keyword
          </label>
          <input 
            name="seoFocusKeyword" 
            value={form.seoFocusKeyword} 
            onChange={handleChange} 
            placeholder="Main keyword for SEO" 
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#c48e53]/20 focus:border-[#c48e53] transition-all duration-200" 
          />
        </div>

        {/* SEO Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            SEO Title
          </label>
          <input 
            name="seoTitle" 
            value={form.seoTitle} 
            onChange={handleChange} 
            placeholder="SEO-optimized title (shows in search results)" 
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#c48e53]/20 focus:border-[#c48e53] transition-all duration-200" 
          />
        </div>

        {/* SEO Meta Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            SEO Meta Description
          </label>
          <textarea 
            name="seoMetaDescription" 
            value={form.seoMetaDescription} 
            onChange={handleChange} 
            placeholder="Meta description for search results (160 chars)" 
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#c48e53]/20 focus:border-[#c48e53] resize-vertical h-28 transition-all duration-200" 
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Featured Images
          </label>
          <input 
            type="file" 
            name="images" 
            accept="image/*" 
            multiple 
            onChange={handleFileChange} 
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#c48e53] file:text-white hover:file:bg-[#a07a3a] hover:border-[#c48e53]/50 cursor-pointer transition-all duration-200" 
          />
          {files.length > 0 && (
            <p className="text-sm text-green-600 mt-2 font-medium">
              ✅ {files.length} image(s) ready to upload
            </p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-1 bg-gradient-to-r from-[#c48e53] to-[#a07a3a] hover:from-[#a07a3a] hover:to-[#8f6833] text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? 'Saving...' : (initialData ? 'Update Blog' : 'Create Blog')}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-400 text-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
