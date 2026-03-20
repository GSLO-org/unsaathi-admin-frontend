export default function FAQTable({ data, onEdit, onDelete }) {
  return (
    <div className="p-6">
      <table className="w-full bg-white shadow rounded overflow-x-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left min-w-[200px]">Question</th>
            <th className="p-3 text-left min-w-[250px]">Answer (preview)</th>
            <th className="p-3 text-left w-24">Category</th>
            <th className="p-3 text-left w-16">Order</th>
            <th className="p-3 text-left w-20">Status</th>
            <th className="p-3 text-left w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
  <tr key={item._id || `faq-${index}`} className="border-b hover:bg-gray-50">
    <td className="p-3 font-medium max-w-[200px] truncate">{item.question}</td>
    <td className="p-3 max-w-[250px] truncate">{item.answer?.substring(0, 80)}...</td>
    <td className="p-3">
      <span className={`px-2 py-1 rounded text-xs ${
        item.category === 'divorce' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {item.category}
      </span>
    </td>
    <td className="p-3">{item.order}</td>
    <td className="p-3">
      <span className={`px-2 py-1 rounded text-xs ${
        item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {item.isActive ? 'Active' : 'Inactive'}
      </span>
    </td>
    <td className="p-3 flex gap-2">
      <button onClick={() => onEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
      <button 
        onClick={() => {
          console.log('🗑️ Delete:', item._id);
          onDelete(item._id);
        }} 
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  );
}
