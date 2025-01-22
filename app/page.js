"use client";

import React, { useState } from "react";

function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }
  
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Check for response errors
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Login failed. Please try again.");
      }
  
      // Parse the response JSON
      const data = await response.json();
  
      // Store the token securely in cookies
      document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
  
      alert("Login successful!");
  
      // Redirect the user based on their role
      if (data.role === "client") {
        window.location.href = "/client"; // Redirect to client dashboard
      } else if (data.role === "bidder") {
        window.location.href = "/bidder"; // Redirect to bidder dashboard
      } else {
        throw new Error("Invalid user role"); // Handle unexpected roles
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };
  
  
  const handleRegister = async () => {
    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }
  
    try {
      const role = email.includes("client") ? "client" : "bidder";
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Registration failed.");
      }
  
      const data = await response.json();
      alert(data.message);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error during registration:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-white flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-md p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-12" />
          <h1 className="text-2xl font-extrabold text-orange-600">
            Blockchain Tendering System
          </h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#about" className="text-gray-700 hover:text-orange-600">
            About
          </a>
          <a href="#features" className="text-gray-700 hover:text-orange-600">
            Features
          </a>
          <a href="#contact" className="text-gray-700 hover:text-orange-600">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-yellow-200 via-orange-100 to-yellow-300 shadow-md">
        <h1 className="text-5xl font-bold text-orange-700 mb-4">
          Building Trust Block by Block
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          Revolutionizing the construction tendering process with transparency, security, and efficiency powered by blockchain technology.
        </p>
        <div className="mt-8">
          <a
            href="#auth"
            className="bg-orange-500 text-white py-3 px-8 rounded-lg shadow-lg text-lg hover:bg-orange-600 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Stylish Card Section */}
      <section id="features" className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Why Blockchain?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore how blockchain technology ensures trust, transparency, and efficiency in the tendering process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-300 text-white p-8 shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Transparency</h3>
            <p className="text-sm">
              Blockchain ensures tamper-proof bid submissions and evaluations, providing unparalleled transparency.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-blue-300 text-white p-8 shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Security</h3>
            <p className="text-sm">
              Your data is encrypted and stored securely on the blockchain, protecting sensitive information.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-300 text-white p-8 shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Efficiency</h3>
            <p className="text-sm">
              Simplifies tendering processes, reducing administrative overhead and saving time.
            </p>
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section
        id="auth"
        className="p-12 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-12"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Log in to access your dashboard or create a new account to get started.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col space-y-6 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={handleRegister}
            className={`bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition ${
              isRegistering ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isRegistering}
          >
            {isRegistering ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default LandingPage;
