import { useState, useEffect } from 'react';

export default function FAQForm({ onSubmit, onClose, initialData = null }) {
  const [form, setForm] = useState({ 
    question: '', 
    answer: '', 
    category: 'general',
    order: 0,
    isActive: true 
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        question: initialData.question || '',
        answer: initialData.answer || '',
        category: initialData.category || 'general',
        order: initialData.order || 0,
        isActive: initialData.isActive !== false
      });
    }
  }, [initialData]);

  function handleChange(e) {
    const value = e.target.name === 'isActive' ? e.target.checked : e.target.value;
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
          <option value="general">General</option>
          <option value="divorce">Divorce</option>
          <option value="custody">Custody</option>
          <option value="alimony">Alimony</option>
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
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {initialData ? 'Update' : 'Submit'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
