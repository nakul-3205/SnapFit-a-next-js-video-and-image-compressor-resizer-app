'use client'
import React from 'react'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left - Form */}
      <div className="flex-1 flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800">
        <div className="max-w-md w-full mx-auto text-white">
          <h1 className="text-5xl font-extrabold mb-6">Welcome Back</h1>
          <p className="mb-10 text-purple-300 text-lg">
            Sign in to your SnapFit account and continue managing your videos.
          </p>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <SignIn
              routing="path"
              path="/sign-in"
              appearance={{
                elements: {
                  card: "bg-gray-900 shadow-none",
                  headerTitle: "hidden",
                  formButtonPrimary:
                    "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition",
                  socialButtonsIconBox: "text-indigo-400",
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
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-lg px-12 text-white">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
            Welcome Back to SnapFit
          </h2>
          <p className="text-lg drop-shadow-md">
            Access your videos, upload more, and stay organized with ease.
          </p>
        </div>
      </div>
    </div>
  )
}
