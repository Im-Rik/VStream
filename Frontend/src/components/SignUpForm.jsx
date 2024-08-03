import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const submit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    axios.post('http://localhost:4500/user/signup', { name, email, password })
        .then(result => {
            // console.log(result);
            if (result.status === 201) {
                window.location.href = '/login';
            }
        })
        .catch(e => {
            // console.log(e);
            if (e.response && e.response.data && e.response.data.error) {
                setError(e.response.data.error);
            } else {
                setError("An error occurred. Please try again.");
            }
        });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form action='POST' className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={(e)=> setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={(e)=> setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button onClick={submit} type="submit" className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"> Sign Up </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
