import { useState } from 'react';

export default function TestimonialForm({ onSubmit, onClose, initialData = null }) {
  const [form, setForm] = useState({ name: '', description: '', date: '' });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="bg-white p-6 rounded shadow w-96">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Edit Testimonial' : 'Add Testimonial'}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date ? form.date.split('T')[0] : ''}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
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
