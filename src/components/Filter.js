import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const Filter = ({ setSelectedArea, data, setData }) => {
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedAreaLocal] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const sortDropdownRef = useRef(null);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
                const data = await response.json();
                setAreas(data.meals.map(area => area.strArea));
            } catch (error) {
                console.error("Error fetching areas:", error);
            }
        };

        fetchAreas();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const toggleSortDropdown = () => {
        setIsSortDropdownOpen(prev => !prev);
    };

    const applyFilter = () => {
        setSelectedArea(selectedArea);
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
        if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
            setIsSortDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSort = (order) => {
        const sortedData = [...data].sort((a, b) => {
            return order === 'asc' ? a.strMeal.localeCompare(b.strMeal) : b.strMeal.localeCompare(a.strMeal);
        });
        setData(sortedData);
        setIsSortDropdownOpen(false);
    };

    return (
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center mb-4 p-4">
            <button
                className="flex items-center border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100"
                onClick={toggleDropdown}
            >
                Filter
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="h-6 w-6 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 12h8M10 18h4" />
                </svg>
            </button>

            {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg max-h-[400px] overflow-y-auto p-3 top-60 ">

                    <ul className="space-y-3 text-sm text-gray-700">
                        {areas.map((area, index) => (
                            <li key={index}>
                                <div className="flex items-center">
                                    <input
                                        id={`area-radio-${index}`}
                                        type="radio"
                                        value={area}
                                        name="area"
                                        checked={selectedArea === area}
                                        onChange={() => setSelectedAreaLocal(area)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    />
                                    <label htmlFor={`area-radio-${index}`} className="ms-2 text-sm font-medium text-gray-900">
                                        {area}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button onClick={applyFilter} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-2">
                        Apply
                    </button>
                </div>

            )}

            <div className="relative">
                <button
                    className="flex justify-center items-center border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 ml-2"
                    onClick={toggleSortDropdown}
                >
                    Sort By
                    <IoIosArrowDown className='ml-2' />
                </button>

                {isSortDropdownOpen && (
                    <div ref={sortDropdownRef} className="absolute z-10 w-48 bg-white rounded-lg shadow-lg transition-all duration-200 ease-in-out">
                        <ul className="p-3 space-y-2 text-sm text-gray-700">
                            <li>
                                <button
                                    onClick={() => handleSort('asc')}
                                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Sort Ascending
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSort('desc')}
                                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Sort Descending
                                </button>
                            </li>
                        </ul>
                    </div>

                )}
            </div>
            {['Fast Delivery', 'New on Swiggy', 'Ratings 4.0+', 'Pure Veg', 'Offers', '₹300 – ₹600', 'Less than ₹300'].map((label, index) => (
                <button key={index} className="border border-gray-300 px-4 py-2 m-1 rounded-full hover:bg-gray-100">
                    {label}
                </button>
            ))}
        </div>
    );
};

export default Filter;
