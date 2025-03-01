import React from "react";

function Home() {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/wp8645346.jpg')",
      }}
    >
      
      <div className="flex-grow flex flex-col justify-center px-8 md:px-20">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          Order delivery near you
        </h1>

        <div className="mt-6 flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter delivery address"
            className="flex-grow px-4 py-3 rounded-lg shadow-md outline-none"
          />

          <select className="px-4 py-3 rounded-lg shadow-md outline-none">
            <option>Deliver now</option>
            <option>Schedule for later</option>
          </select>

          <button className="bg-black text-white px-6 py-3 rounded-lg shadow-md">
            Search here
          </button>
        </div>

        <p className="mt-4 text-black">
          Or <span className="underline cursor-pointer">Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default Home;

/*
<nav className="flex justify-between items-center p-4 bg-transparent">
        <div className="text-2xl font-semibold">Uber Eats</div>
        
      </nav>


<div className="space-x-4">
          <button className="bg-white text-black px-4 py-2 rounded-full font-medium">
            Log in
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-full font-medium">
            Sign up
          </button>
        </div>*/