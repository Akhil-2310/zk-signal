"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

interface Group {
  id: string
  name: string
  description: string
  members: string[]
  criteria_type: "nationality" | "age" | "gender"
  criteria_value: string
  created_at: string
  active_proposals: number
}

export default function MyGroupsPage() {
  const [groups, setGroups] = useState<Group[]>([])
  const [userCommitment, setUserCommitment] = useState<string | null>(null)

  useEffect(() => {
    const storedSig = sessionStorage.getItem("semaphore-signature")
    if (!storedSig) return

    import("@semaphore-protocol/identity").then(({ Identity }) => {
      const identity = new Identity(storedSig)
      setUserCommitment(identity.commitment.toString())
    })
  }, [])

  useEffect(() => {
    const fetchGroups = async () => {
      if (!userCommitment) return
      const { data, error } = await supabase.from("groups").select("*")
      if (!error && data) {
        const userGroups = data.filter((g) => g.members.includes(userCommitment))
        setGroups(userGroups)
      }
    }
    fetchGroups()
  }, [userCommitment])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Groups</h1>
          <p className="mt-1 text-sm text-gray-500">Groups you have joined and can participate in.</p>
        </div>
        <Link
          href="/app/groups"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Find More Groups
        </Link>
      </div>

      {groups.length === 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No groups joined</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't joined any groups yet. Find a group to join and start participating.
          </p>
          <div className="mt-6">
            <Link
              href="/app/groups"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Groups
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-indigo-600 flex items-center justify-center text-white">
                      {group.criteria_type === "nationality" && (
                        <span role="img" aria-label="flag">
                          {(() => {
                            try {
                              const parsed = JSON.parse(group.criteria_value)
                              return parsed.flag || "🌍"
                            } catch {
                              return "🌍"
                            }
                          })()}
                        </span>
                      )}
                      {group.criteria_type === "age" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {group.criteria_type === "gender" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        {group.criteria_type === "nationality" && (() => {
                          try {
                            const parsed = JSON.parse(group.criteria_value)
                            return `Nationality: ${parsed.label}`
                          } catch {
                            return `Nationality`
                          }
                        })()}
                        {group.criteria_type === "age" && `Age: ${group.criteria_value}+`}
                        {group.criteria_type === "gender" && `Gender: ${group.criteria_value}`}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">{group.members.length} members</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-500">{group.description}</p>

                <div className="mt-4 bg-indigo-50 p-3 rounded-md">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-sm text-indigo-700">
                      {group.active_proposals || 0} active {group.active_proposals === 1 ? "proposal" : "proposals"}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/app/groups/${group.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Group
                  </Link>
                  <Link
                    href={`/app/groups/${group.id}/create-proposal`}
                    className="ml-2 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Proposal
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
