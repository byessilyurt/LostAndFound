import React from "react";

function AuthHero() {
  return (
    <div className="bg-foundColor flex flex-col justify-center items-center w-full h-full min-w-[300px] text-white p-10 space-y-5">
      <h1 className="text-4xl font-bold">Welcome to Lost & Found App</h1>
      <p className="text-xl text-center">
        A community-driven platform to help people find their lost items and
        return found items to their rightful owners.
      </p>
      <p className="text-lg">
        Join our growing community and make a difference in someone's life.
      </p>
      <button className="bg-white text-foundColor font-bold py-2 px-4 rounded-md mt-4">
        Learn More
      </button>
    </div>
  );
}

export default AuthHero;
