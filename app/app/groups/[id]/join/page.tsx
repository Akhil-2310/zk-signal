"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React from "react";

export default function JoinGroupPage({ params }: {params: Promise<{ id: string }>  }) {
  // Use params directly from props
  const { id } = React.use(params);

  const router = useRouter()
  const [step, setStep] = useState<"initial" | "verification" | "success">("initial")
  const [isLoading, setIsLoading] = useState(false)

  // Mock group data - in a real app, you would fetch this based on the ID
  const group = {
    id: id,
    name: "European Citizens Feedback",
    criteriaType: "nationality" as "nationality" | "age" | "gender",
    criteriaValue: "European",
  }

  const handleStartVerification = () => {
    setIsLoading(true)
    // Simulate API call to generate QR code
    setTimeout(() => {
      setStep("verification")
      setIsLoading(false)
    }, 1500)
  }

  const handleCompleteVerification = () => {
    setIsLoading(true)
    // Simulate API call to verify identity
    setTimeout(() => {
      setStep("success")
      setIsLoading(false)
    }, 2000)
  }

  const handleFinish = () => {
    router.push(`/app/groups/${id}`)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Join Group: {group.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">Complete the verification process to join this group.</p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            href={`/app/groups/${id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Group
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Verification Process</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            You need to verify that you meet the criteria for this group:{" "}
            {group.criteriaType === "nationality" && `Nationality: ${group.criteriaValue}`}
            {group.criteriaType === "age" && `Age: ${group.criteriaValue}+`}
            {group.criteriaType === "gender" && `Gender: ${group.criteriaValue}`}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          {step === "initial" && (
            <div className="space-y-6">
              <div className="bg-indigo-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-indigo-700">
                      This verification process uses Self Protocol to verify your eligibility without revealing your
                      identity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-gray-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">What you'll need:</h3>
                    <div className="mt-2 text-sm text-gray-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>A smartphone with a camera</li>
                        <li>Valid identification documents</li>
                        <li>A few minutes to complete the verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-gray-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">Privacy guarantee:</h3>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>
                        Your personal information is never stored or shared. Zero-knowledge proofs allow us to verify
                        your eligibility without knowing your actual data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleStartVerification}
                  disabled={isLoading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Loading..." : "Start Verification"}
                </button>
              </div>
            </div>
          )}

          {step === "verification" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-48 h-48 bg-gray-200 rounded-md flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Scan QR Code</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Scan this QR code with your Self Protocol app to begin the verification process.
                </p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-indigo-700">
                      Don't have the Self Protocol app?{" "}
                      <a href="#" className="font-medium underline">
                        Download it here
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCompleteVerification}
                  disabled={isLoading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Verifying..." : "I've Completed Verification"}
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Verification Successful!</h3>
              <p className="mt-1 text-sm text-gray-500">
                You have successfully joined the group. You can now participate in anonymous voting and feedback.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Go to Group
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
