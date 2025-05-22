import React from 'react'
import { useState, useEffect } from 'react';





const Home = () => {
      const [allVolunteers, setAllVolunteers] = useState([]);
      const [volunteers, setVolunteers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('All');

      
      //the api url is stored in the .env file
      //the url is imported from the .env file
      //i used mockapi to create a fake api
      const url = `${import.meta.env.VITE_MOCK_API_URL}`;
    
      useEffect(() => {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            
            setAllVolunteers(data);
            setVolunteers(data);
            setLoading(false);
          })
          .catch((error) => console.error('Fetch error:', error));
      }, []);
    
      const handleInputChange = (e) => {
        const search = e.target.value;
        setSearchTerm(search);
        filterVolunteers(search, selectedCategory);
      };
    
      const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        filterVolunteers(searchTerm, category);
      };
    
      const filterVolunteers = (search, category) => {
        let filtered = allVolunteers;
    
        if (search) {
          filtered = filtered.filter((volunteer) =>
            volunteer.title.toLowerCase().includes(search.toLowerCase())
          );
        }
    
        if (category !== 'All') {
          filtered = filtered.filter((volunteer) =>
            volunteer.category === category
          );
        }
    
        setVolunteers(filtered);
      };
    
      const uniqueCategories = ['All', ...new Set(allVolunteers.map(v => v.category))];
    
  return (
    <main className='max-w-[1600px] mx-auto pt-[100px] pb-[100px]'>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for a job..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-[50%] h-[70px] rounded-[20px] border-2 border-[#1599e6] mt-[50px] mx-auto flex justify-center items-center px-[10px]"
            />

            {/* Category Dropdown */}
            <p htmlFor="category" className="text-center text-[20px] mt-[20px]">
              Select Category
            </p>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-[40%] h-[50px] rounded-[10px] border-2 border-[#1599e6] mt-[20px] mx-auto block px-[10px]"
            >
              {uniqueCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Volunteer Cards */}
            <div className="grid xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[20px] px-[45px] mt-[100px] mx-auto items-center justify-items-center">
              {loading ? (
                <p className="text-center mt-[20%]">Loading...</p>
              ) : volunteers.length === 0 ? (
                <p className="text-center text-red-500 w-[60%] sm:w-[500px] mt-[30px] h-[60px] bg-red-200 mx-auto flex justify-center items-center rounded-[12px]">
                  No job posted 
                </p>
              ) : (
                volunteers.map((volunteer) => (
                  <div
                    key={volunteer?.id}
                    className="w-[250px] h-[200px] bg-[#1599e6] rounded-[20px] flex flex-col items-center justify-center text-white gap-[8px]"
                  >
                    <h1>{volunteer?.title}</h1>
                    <div className="flex items-center gap-[10px]">
                      <p className="text-[12px]">{volunteer?.['organisation-name']},</p>
                      <p className="text-[12px]">{volunteer?.location}</p>
                    </div>
                    <p className="text-[12px]">{volunteer?.['date-posted']}</p>
                    <button className="text-[12px] w-[80px] h-[30px] bg-[#ffff] rounded-[5px] text-black cursor-pointer hover:bg-black hover:text-white">
                      View
                    </button>
                  </div>
                ))
              )}
            </div>
          </main>
  )
}

export default Home