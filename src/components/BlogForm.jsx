import { useState } from 'react';

export default function BlogForm({ onSubmit, onClose, initialData = null  }) {
  const [form, setForm] = useState({ title: '', summary: '', content: '', date: '', seoFocusKeyword: '', seoTitle: '', seoMetaDescription: '' });
  const [files, setFiles] = useState([]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e) {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles(Array.from(selectedFiles));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form, files);
  }

  return (
     <div className="bg-white p-6 rounded shadow w-96 max-h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Edit Blog' : 'Add Blog'}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Summary"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="date"
          type="date"
          value={form.date ? form.date.split('T')[0] : ''}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          name="seoFocusKeyword"
          value={form.seoFocusKeyword}
          onChange={handleChange}
          placeholder="SEO Focus Keyword"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="seoTitle"
          value={form.seoTitle}
          onChange={handleChange}
          placeholder="SEO Title"
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          name="seoMetaDescription"
          value={form.seoMetaDescription}
          onChange={handleChange}
          placeholder="SEO Meta Description"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-3"
        />
        {files.length > 0 && (
          <p className="text-sm text-green-600 mb-3">{files.length} file(s) selected</p>
        )}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {initialData ? 'Update' : 'Submit'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
