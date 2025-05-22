"use client"

import { useState } from "react"
import Link from "next/link"

interface ProposalDetails {
  id: string
  groupId: string
  title: string
  description: string
  status: "active" | "closed"
  votesYes: number
  votesNo: number
  createdAt: string
  createdBy: string
  details: string
}

export default function ProposalDetailsPage({
  params,
}: {
  params: { id: string; proposalId: string }
}) {
  const [userVote, setUserVote] = useState<"yes" | "no" | null>(null)
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  // Mock data for a specific proposal
  const proposal: ProposalDetails = {
    id: params.proposalId,
    groupId: params.id,
    title: "Digital Privacy Standards Proposal",
    description: "Should we adopt stricter digital privacy standards across all platforms?",
    status: "active",
    votesYes: 78,
    votesNo: 12,
    createdAt: "2023-11-05",
    createdBy: "Anonymous Member",
    details: `
      This proposal aims to establish a framework for enhanced digital privacy standards that would apply across all digital platforms operating within our jurisdiction.
      
      Key points:
      
      1. Mandatory end-to-end encryption for all personal communications
      2. Opt-in only data collection policies
      3. Right to be forgotten within 30 days of request
      4. Transparent algorithms that can be audited by independent third parties
      5. Strict penalties for data breaches or unauthorized data sharing
      
      The implementation would be phased over 18 months to allow platforms to adapt their systems and policies.
      
      Background research indicates that similar standards adopted in other regions have led to increased user trust and engagement, while having minimal impact on legitimate business operations.
    `,
  }

  const handleVote = (vote: "yes" | "no") => {
    setUserVote(vote)
  }

  const handleSubmitVote = () => {
    if (!userVote) return

    setIsVoting(true)

    // Simulate API call to submit vote
    setTimeout(() => {
      setIsVoting(false)
      setHasVoted(true)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/app/groups/${params.id}`}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Group
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-sm text-gray-500">Proposal</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{proposal.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                proposal.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              {proposal.status === "active" ? "Active" : "Closed"}
            </span>
            <span className="text-sm text-gray-500">
              Created on {new Date(proposal.createdAt).toLocaleDateString()}
            </span>
            <span className="text-sm text-gray-500">by {proposal.createdBy}</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Proposal Summary</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <p className="text-sm text-gray-500">{proposal.description}</p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Proposal Details</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="prose prose-sm max-w-none text-gray-500">
            {proposal.details.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Current Results</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{proposal.votesYes}</div>
              <div className="text-sm text-gray-500">Yes Votes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{proposal.votesNo}</div>
              <div className="text-sm text-gray-500">No Votes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{proposal.votesYes + proposal.votesNo}</div>
              <div className="text-sm text-gray-500">Total Votes</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Yes
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {Math.round((proposal.votesYes / (proposal.votesYes + proposal.votesNo)) * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(proposal.votesYes / (proposal.votesYes + proposal.votesNo)) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                    No
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-red-600">
                    {Math.round((proposal.votesNo / (proposal.votesYes + proposal.votesNo)) * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(proposal.votesNo / (proposal.votesYes + proposal.votesNo)) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {proposal.status === "active" && !hasVoted && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Cast Your Vote</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your vote is completely anonymous thanks to zero-knowledge proofs.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                type="button"
                onClick={() => handleVote("yes")}
                className={`flex-1 sm:flex-none px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  userVote === "yes"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  Vote Yes
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleVote("no")}
                className={`flex-1 sm:flex-none px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                  userVote === "no"
                    ? "border-red-600 bg-red-50 text-red-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                  Vote No
                </div>
              </button>
            </div>

            {userVote && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmitVote}
                  disabled={isVoting}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isVoting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isVoting ? "Submitting..." : "Submit Vote"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {hasVoted && (
        <div className="bg-green-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Vote submitted successfully!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Your anonymous vote has been recorded. Thank you for participating!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
