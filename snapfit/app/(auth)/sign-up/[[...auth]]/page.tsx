'use client'
import React from 'react'
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left - Form */}
      <div className="flex-1 flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-purple-900 via-indigo-900 to-indigo-800">
        <div className="max-w-md w-full mx-auto text-white">
          <h1 className="text-5xl font-extrabold mb-6">Create your account</h1>
          <p className="mb-10 text-indigo-300 text-lg">
            Join SnapFit and manage your videos with style and ease.
          </p>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <SignUp
              routing="path"
              path="/sign-up"
              appearance={{
                elements: {
                  card: "bg-gray-900 shadow-none",
                  headerTitle: "hidden",
                  formButtonPrimary:
                    "bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition",
                  socialButtonsIconBox: "text-purple-400",
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Right - Image + Text */}
      <div
        className="hidden md:flex flex-1 items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-lg px-12 text-white">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
            Welcome to SnapFit
          </h2>
          <p className="text-lg drop-shadow-md">
            Effortlessly upload, compress, and share your videos — all in one place.
          </p>
        </div>
      </div>
    </div>
  )
}
