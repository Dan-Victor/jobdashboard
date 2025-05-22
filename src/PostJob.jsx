import { useState } from 'react';

function PostJob() {
  const url = `${import.meta.env.VITE_MOCK_API_URL}`;
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    'organisation-name': '',
    location: '',
    'date-posted': new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to post job');
      }

      alert('Job posted successfully!');
      setFormData({
        title: '',
        category: '',
        'organisation-name': '',
        location: '',
        'date-posted': new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto pt-[100px] pb-[50px] px-4">
      <h2 className="text-2xl font-bold text-[#1599e6] mb-8 text-center">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#1599e6] rounded-lg focus:outline-none focus:border-[#1599e6] focus:ring-1 focus:ring-[#1599e6]"
            placeholder="Enter job title"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#1599e6] rounded-lg focus:outline-none focus:border-[#1599e6] focus:ring-1 focus:ring-[#1599e6]"
            placeholder="e.g., Technology, Marketing, Design"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Organization Name</label>
          <input
            type="text"
            name="organisation-name"
            value={formData['organisation-name']}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#1599e6] rounded-lg focus:outline-none focus:border-[#1599e6] focus:ring-1 focus:ring-[#1599e6]"
            placeholder="Enter organization name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#1599e6] rounded-lg focus:outline-none focus:border-[#1599e6] focus:ring-1 focus:ring-[#1599e6]"
            placeholder="Enter job location"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1599e6] text-white py-3 px-6 rounded-lg hover:bg-[#1280c2] transition-colors duration-200"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;
