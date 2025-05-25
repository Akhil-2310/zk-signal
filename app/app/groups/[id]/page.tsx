"use client"
import { use } from "react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

interface Proposal {
  id: string
  title: string
  description: string
  status: "active" | "closed"
  votesYes: number
  votesNo: number
  created_at: string
}

interface GroupDetails {
  id: string
  name: string
  description: string
  criteria_type: "nationality" | "age" | "gender"
  criteria_value: string
  created_at: string
  members: string[]
  proposals: Proposal[]
}

export default function GroupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [group, setGroup] = useState<GroupDetails | null>(null)

  useEffect(() => {
    const fetchGroup = async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*, proposals(*)")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Failed to fetch group details:", error)
      } else {
        setGroup(data as GroupDetails)
      }
    }

    if (id) fetchGroup()
  }, [id])

  if (!group) return <div className="p-6 text-gray-500">Loading group details...</div>

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {group.criteria_type === "nationality" && `Nationality: ${group.criteria_value}`}
              {group.criteria_type === "age" && `Age: ${group.criteria_value}+`}
              {group.criteria_type === "gender" && `Gender: ${group.criteria_value}`}
            </span>
            <span className="text-sm text-gray-500">{group.members.length} members</span>
            <span className="text-sm text-gray-500">
              Created on {new Date(group.created_at).toLocaleDateString()}
            </span>
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

      {(["active", "closed"] as const).map((status) => (
        <div key={status} className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {status === "active" ? "Active Proposals" : "Closed Proposals"}
            </h3>
            {status === "active" && (
              <Link
                href={`/app/groups/${id}/create-proposal`}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                New Proposal
              </Link>
            )}
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {group.proposals
                .filter((p) => p.status === status)
                .map((proposal) => (
                  <li key={proposal.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/app/groups/${id}/proposals/${proposal.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-900 truncate"
                      >
                        {proposal.title}
                      </Link>
                      <span
                        className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <p className="text-sm text-gray-500">{proposal.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <span className="flex items-center mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6z" />
                          </svg>
                          <span className="ml-1">{proposal.votesYes}</span>
                        </span>
                        <span className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6z" />
                          </svg>
                          <span className="ml-1">{proposal.votesNo}</span>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
