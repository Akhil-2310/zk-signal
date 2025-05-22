import { use } from "react"
import Link from "next/link"
import React from "react"

interface GroupDetails {
  id: string
  name: string
  description: string
  memberCount: number
  criteriaType: "nationality" | "age" | "gender"
  criteriaValue: string
  createdAt: string
  proposals: {
    id: string
    title: string
    description: string
    status: "active" | "closed"
    votesYes: number
    votesNo: number
    createdAt: string
  }[]
}

// Mock data for a specific group
const groupDetails: GroupDetails = {
  id: "1",
  name: "European Citizens Feedback",
  description:
    "A group for European citizens to provide anonymous feedback on policy proposals. This group uses zero-knowledge proofs to ensure that only European citizens can participate while keeping their identities completely anonymous.",
  memberCount: 128,
  criteriaType: "nationality",
  criteriaValue: "European",
  createdAt: "2023-10-15",
  proposals: [
    {
      id: "1",
      title: "Digital Privacy Standards Proposal",
      description: "Should we adopt stricter digital privacy standards across all platforms?",
      status: "active",
      votesYes: 78,
      votesNo: 12,
      createdAt: "2023-11-05",
    },
    {
      id: "2",
      title: "Renewable Energy Investment",
      description: "Should we increase public investment in renewable energy research by 15%?",
      status: "active",
      votesYes: 92,
      votesNo: 15,
      createdAt: "2023-11-01",
    },
    {
      id: "3",
      title: "Public Transportation Expansion",
      description: "Do you support expanding public transportation networks in major cities?",
      status: "closed",
      votesYes: 105,
      votesNo: 8,
      createdAt: "2023-10-20",
    },
  ],
}

export default function GroupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Use params directly
  const { id } = React.use(params);

  // In a real app, you would fetch the group details based on the ID
  const group = groupDetails

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {group.criteriaType === "nationality" && `Nationality: ${group.criteriaValue}`}
              {group.criteriaType === "age" && `Age: ${group.criteriaValue}+`}
              {group.criteriaType === "gender" && `Gender: ${group.criteriaValue}`}
            </span>
            <span className="text-sm text-gray-500">{group.memberCount} members</span>
            <span className="text-sm text-gray-500">Created on {new Date(group.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/app/groups/${id}/join`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Join Group
          </Link>
          <Link
            href={`/app/groups/${id}/create-proposal`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Proposal
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Group Description</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <p className="text-sm text-gray-500">{group.description}</p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Active Proposals</h3>
          <Link
            href={`/app/groups/${id}/create-proposal`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Proposal
          </Link>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {group.proposals
              .filter((p) => p.status === "active")
              .map((proposal) => (
                <li key={proposal.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/app/groups/${id}/proposals/${proposal.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-900 truncate"
                      >
                        {proposal.title}
                      </Link>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">{proposal.description}</p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-green-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            <span className="ml-1">{proposal.votesYes}</span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-red-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                            </svg>
                            <span className="ml-1">{proposal.votesNo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Closed Proposals</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {group.proposals
              .filter((p) => p.status === "closed")
              .map((proposal) => (
                <li key={proposal.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/app/groups/${id}/proposals/${proposal.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-900 truncate"
                      >
                        {proposal.title}
                      </Link>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Closed
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">{proposal.description}</p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-green-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            <span className="ml-1">{proposal.votesYes}</span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-red-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                            </svg>
                            <span className="ml-1">{proposal.votesNo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
