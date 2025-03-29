import { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, User, Mail,Trash2, Edit,X, Search } from 'lucide-react';
import { toast } from 'react-toastify';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers,setFilteredUser]=useState([]);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);


  useEffect(() => {
    let results = users;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(user => 
        user.first_name.toLowerCase().includes(query) || 
        user.last_name.toLowerCase().includes(query));
    }
    setFilteredUser(results);
  }, [searchQuery,users]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };
 const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success('User deleted successfully.');
    } catch (error) {
      toast.error(`Failed to delete user. ${error}`);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleEditClick = (user) => {
    setEditUser(user);
  };
  const handleSaveEdit = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(editUser.email)) {
      toast.error('Invalid email format. Please enter a valid email.');
      return;
    }
    try {
      await axios.put(`https://reqres.in/api/users/${editUser.id}`, {
        first_name: editUser.first_name,
        last_name: editUser.last_name,
        email: editUser.email,
      });
      setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
      setEditUser(null);
      toast.success('User updated successfully.');
    } catch (error) {
      toast.error(`Failed to update user ${error}`);
    }
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-4 flex items-center">
        <div className="h-16 w-16 rounded-full bg-gray-300 mr-4"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
  
  const renderSkeletons = () => {
    const skeletonCount = users.length > 0 ? users.length : 6;
    return Array(skeletonCount).fill().map((_, index) => (
      <SkeletonCard key={`skeleton-${index}`} />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Directory</h1>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {loading ? 'Loading...' : `Showing ${users.length} users`}
        </div>
      {/*Search Bar*/}
      </div>
      <div className="px-6 pt-6 pb-4">
            <div className="flex items-center bg-gray-50 rounded-full p-2 px-4 border border-gray-100">
              <div className="text-gray-400 mr-2">
                <Search/>
              </div>
              <input 
                type="text" 
                placeholder="Search by first or last name..." 
                className="bg-transparent border-none flex-grow outline-none text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X/>
                </button>
              )}
            </div>
          </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          renderSkeletons()
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6 flex flex-col sm:flex-row sm:items-center">
                {user.avatar ? (
                  <img
                    src={user.avatar} 
                    alt={`${user.first_name} ${user.last_name}`} 
                    className="h-24 w-24 rounded-full object-cover mx-auto sm:mx-0 sm:mr-6 mb-4 sm:mb-0 border-2 border-green-100"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto sm:mx-0 sm:mr-6 mb-4 sm:mb-0">
                    <User size={32} className="text-green-600" />
                  </div>
                )}
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-bold text-gray-800">{user.first_name} {user.last_name}</h2>
                  <div className="flex items-center justify-center sm:justify-start mt-2 text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <p className="text-sm">{user.email}</p>
                  </div>
                  <div className="flex space-x-3 mt-3 justify-center sm:justify-normal">
                  <button onClick={() => handleEditClick(user)} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDeleteClick(user.id)} className="text-red-500 hover:text-red-700 cursor-pointer">
                    <Trash2 size={20} />
                  </button>
                </div>
                  
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-12 flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1 || loading}
          className={`flex items-center justify-center px-5 py-2 rounded-md transition-colors duration-300 ${
            currentPage === 1 || loading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-500'
          }`}
        >
          <ChevronLeft size={18} className="mr-1" />
          Previous
        </button>
        
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              disabled={loading}
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                currentPage === page
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || loading}
          className={`flex items-center justify-center px-5 py-2 rounded-md transition-colors duration-300 ${
            currentPage === totalPages || loading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-500'
          }`}
        >
          Next
          <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
      {editUser && (
      <div className="fixed inset-0 bg-gray-500 opacity-95 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-1/3 h-auto shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit User</h2>
            <button onClick={() => setEditUser(null)} className="text-gray-600 hover:text-gray-900 cursor-pointer">
              <X size={20} color='red'/>
            </button>
          </div>
          <input type="text" value={editUser.first_name} onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })} className="w-full p-2 border rounded mb-2" />
          <input type="text" value={editUser.last_name} onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })} className="w-full p-2 border rounded mb-2" />
          <input type="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} className="w-full p-2 border rounded mb-4" />
          <button onClick={handleSaveEdit} className="w-full bg-green-600 text-white py-2 rounded cursor-pointer">Save</button>
        </div>
      </div>
    )}
    </div>
 
  );
}