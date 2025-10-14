import { Link, useNavigate} from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-4">
        <Link to="/testimonials" className="block py-2 px-4 rounded hover:bg-gray-700">
          Testimonials
        </Link>
        <Link to="/blogs" className="block py-2 px-4 rounded hover:bg-gray-700">
          Blogs
        </Link>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 py-2 px-4 rounded text-white font-semibold"
      >
        Logout
      </button>
    </aside>
  );
}
