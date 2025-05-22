"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CreateProposalPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock group data - in a real app, you would fetch this based on the ID
  const group = {
    id: params.id,
    name: "European Citizens Feedback",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Redirect to group page after "creating" the proposal
      router.push(`/app/groups/${params.id}`)
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Create a New Proposal</h2>
          <p className="mt-1 text-sm text-gray-500">Create a proposal for the group: {group.name}</p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            href={`/app/groups/${params.id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Proposal Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Provide details about your proposal for the group to vote on.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Proposal Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Digital Privacy Standards Proposal"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Short Description
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="A brief one-sentence description of your proposal"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">This will be displayed in the proposals list.</p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                  Detailed Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="details"
                    name="details"
                    rows={10}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Provide a detailed explanation of your proposal, including any background information, key points, and expected outcomes."
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Provide as much detail as possible to help group members make an informed decision.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Link
                href={`/app/groups/${params.id}`}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Creating..." : "Create Proposal"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
