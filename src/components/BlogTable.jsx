export default function BlogTable({ data, onEdit, onDelete }) {
  return (
    <div className="p-6">
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Summary</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="p-3">{item.title}</td>
              <td className="p-3">{item.summary}</td>
              <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
