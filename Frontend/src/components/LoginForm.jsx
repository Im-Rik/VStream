import React, { useState } from 'react';
import axios from 'axios';

const LogInForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        axios.post('',{email, password})
            .then((result)=>{
                if(result.status==201) window.location.href("/")
            })
            .catch((e)=>{
                if(e.response && e.response.data && e.response.data.error) setError(e.response.data.error);
                else setError("An Error Occured, Please Try Again")
            })
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={submit} className="space-y-6">
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
          <button className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"> Sign Up </button>
        </form>
      </div>
    </div>
  );
};

export default LogInForm;