// import React, { useEffect, useState } from 'react';
// import Card from './Card';
// import Filter from './Filter';

// const Midpart = () => {
//     const [data, setData] = useState([]);
//     const [selectedArea, setSelectedArea] = useState('');
//     const [country, setcountry] = useState('Canadian')
//     const fetchData = async (area) => {
//         const response = await fetch(area ? `https://themealdb.com/api/json/v1/1/filter.php?a=${area}` : 'https://themealdb.com/api/json/v1/1/filter.php?a=Canadian');
//         const apiData = await response.json();
//         const meals = apiData.meals || [];
//         setData(meals);
//         setcountry(area != 'Canadian' && area != '' ? area : 'Canadian')
//     };

//     useEffect(() => {
//         fetchData(selectedArea);
//     }, [selectedArea]);

//     return (
//         <>
//             <Filter setSelectedArea={setSelectedArea} data={data} setData={setData} />
//             <div className="container max-w-[1200px] mx-auto px-4 mb-10">
//                 {!data && <div className="text-center w-72 h-80 mx-auto m-10">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="#FF1429" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>
//                 </div>}
//                 {data && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//                     {data.map((d, i) => (
//                         <Card
//                             country={country}
//                             key={i}
//                             name={d.strMeal}
//                             image={d.strMealThumb}
//                             slug={d.idMeal}
//                         />
//                     ))}
//                 </div>}

//             </div>
//         </>
//     );
// };

// export default Midpart;



import React, { useEffect, useState } from 'react';
import Card from './Card';
import Filter from './Filter';

const Midpart = () => {
    const [data, setData] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');
    const [country, setCountry] = useState('Canadian');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (area) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(area ? `https://themealdb.com/api/json/v1/1/filter.php?a=${area}` : 'https://themealdb.com/api/json/v1/1/filter.php?a=Canadian');
            if (!response.ok) throw new Error('Network response was not ok');
            const apiData = await response.json();
            const meals = apiData.meals || [];
            setData(meals);
            setCountry(area && area !== 'Canadian' ? area : 'Canadian');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(selectedArea);
    }, [selectedArea]);

    return (
        <>
            <Filter setSelectedArea={setSelectedArea} data={data} setData={setData} />
            <div className="container max-w-[1200px] mx-auto px-4 mb-10 min-h-screen">
                {loading && (
                    <div className="text-center w-72 h-80 mx-auto m-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
                            <path fill="none" stroke="#FF1429" strokeWidth="15" strokeLinecap="round" strokeDasharray="300 385" strokeDashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
                                <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate>
                            </path>
                        </svg>
                    </div>
                )}
                {error && (
                    <div className="text-center text-red-500">
                        <p>Error fetching data: {error}</p>
                    </div>
                )}
                {data && !loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {data.map((d, i) => (
                            <Card
                                country={country}
                                key={i}
                                name={d.strMeal}
                                image={d.strMealThumb}
                                slug={d.idMeal}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Midpart;

