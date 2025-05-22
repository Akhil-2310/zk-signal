import Link from "next/link"

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
  criteriaType: "nationality" | "age" | "gender"
  criteriaValue: string
  createdAt: string
}

// Mock data for groups
const groups: Group[] = [
  {
    id: "1",
    name: "European Citizens Feedback",
    description: "A group for European citizens to provide anonymous feedback on policy proposals.",
    memberCount: 128,
    criteriaType: "nationality",
    criteriaValue: "European",
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    name: "Over 25 Tech Survey",
    description: "Anonymous technology usage survey for people over 25 years old.",
    memberCount: 76,
    criteriaType: "age",
    criteriaValue: "25",
    createdAt: "2023-11-02",
  },
  {
    id: "3",
    name: "Women in Tech Anonymous Feedback",
    description: "A safe space for women in technology to share experiences and feedback anonymously.",
    memberCount: 93,
    criteriaType: "gender",
    criteriaValue: "female",
    createdAt: "2023-09-28",
  },
  {
    id: "4",
    name: "US Residents Policy Voting",
    description: "Anonymous voting on policy proposals for US residents.",
    memberCount: 215,
    criteriaType: "nationality",
    criteriaValue: "United States",
    createdAt: "2023-10-05",
  },
]

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Groups</h1>
          <p className="mt-1 text-sm text-gray-500">Join a group to participate in anonymous voting and feedback.</p>
        </div>
        <Link
          href="/app/groups/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all transform hover:-translate-y-0.5"
        >
          Create Group
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-emerald-600 flex items-center justify-center text-white">
                    {group.criteriaType === "nationality" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                        />
                      </svg>
                    )}
                    {group.criteriaType === "age" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {group.criteriaType === "gender" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {group.criteriaType === "nationality" && `Nationality: ${group.criteriaValue}`}
                      {group.criteriaType === "age" && `Age: ${group.criteriaValue}+`}
                      {group.criteriaType === "gender" && `Gender: ${group.criteriaValue}`}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">{group.memberCount} members</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500">{group.description}</p>
              <div className="mt-4">
                <Link
                  href={`/app/groups/${group.id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  View Details
                </Link>
                <Link
                  href={`/app/groups/${group.id}/join`}
                  className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all"
                >
                  Join Group
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
