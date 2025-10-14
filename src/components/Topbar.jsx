export default function Topbar({ title, buttonText, onAddClick }) {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <button onClick={onAddClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {buttonText}
      </button>
    </div>
  );
}
