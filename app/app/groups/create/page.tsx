"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Select from "react-select"

// Country data interface
interface Country {
  value: string
  label: string
  flag: string
}

// List of countries with flags
const countries: Country[] = [
  { value: "AF", label: "Afghanistan", flag: "🇦🇫" },
  { value: "AL", label: "Albania", flag: "🇦🇱" },
  { value: "DZ", label: "Algeria", flag: "🇩🇿" },
  { value: "AD", label: "Andorra", flag: "🇦🇩" },
  { value: "AO", label: "Angola", flag: "🇦🇴" },
  { value: "AG", label: "Antigua and Barbuda", flag: "🇦🇬" },
  { value: "AR", label: "Argentina", flag: "🇦🇷" },
  { value: "AM", label: "Armenia", flag: "🇦🇲" },
  { value: "AU", label: "Australia", flag: "🇦🇺" },
  { value: "AT", label: "Austria", flag: "🇦🇹" },
  { value: "AZ", label: "Azerbaijan", flag: "🇦🇿" },
  { value: "BS", label: "Bahamas", flag: "🇧🇸" },
  { value: "BH", label: "Bahrain", flag: "🇧🇭" },
  { value: "BD", label: "Bangladesh", flag: "🇧🇩" },
  { value: "BB", label: "Barbados", flag: "🇧🇧" },
  { value: "BY", label: "Belarus", flag: "🇧🇾" },
  { value: "BE", label: "Belgium", flag: "🇧🇪" },
  { value: "BZ", label: "Belize", flag: "🇧🇿" },
  { value: "BJ", label: "Benin", flag: "🇧🇯" },
  { value: "BT", label: "Bhutan", flag: "🇧🇹" },
  { value: "BO", label: "Bolivia", flag: "🇧🇴" },
  { value: "BA", label: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { value: "BW", label: "Botswana", flag: "🇧🇼" },
  { value: "BR", label: "Brazil", flag: "🇧🇷" },
  { value: "BN", label: "Brunei", flag: "🇧🇳" },
  { value: "BG", label: "Bulgaria", flag: "🇧🇬" },
  { value: "BF", label: "Burkina Faso", flag: "🇧🇫" },
  { value: "BI", label: "Burundi", flag: "🇧🇮" },
  { value: "CV", label: "Cabo Verde", flag: "🇨🇻" },
  { value: "KH", label: "Cambodia", flag: "🇰🇭" },
  { value: "CM", label: "Cameroon", flag: "🇨🇲" },
  { value: "CA", label: "Canada", flag: "🇨🇦" },
  { value: "CF", label: "Central African Republic", flag: "🇨🇫" },
  { value: "TD", label: "Chad", flag: "🇹🇩" },
  { value: "CL", label: "Chile", flag: "🇨🇱" },
  { value: "CN", label: "China", flag: "🇨🇳" },
  { value: "CO", label: "Colombia", flag: "🇨🇴" },
  { value: "KM", label: "Comoros", flag: "🇰🇲" },
  { value: "CG", label: "Congo", flag: "🇨🇬" },
  { value: "CD", label: "Congo (Democratic Republic)", flag: "🇨🇩" },
  { value: "CR", label: "Costa Rica", flag: "🇨🇷" },
  { value: "HR", label: "Croatia", flag: "🇭🇷" },
  { value: "CU", label: "Cuba", flag: "🇨🇺" },
  { value: "CY", label: "Cyprus", flag: "🇨🇾" },
  { value: "CZ", label: "Czech Republic", flag: "🇨🇿" },
  { value: "DK", label: "Denmark", flag: "🇩🇰" },
  { value: "DJ", label: "Djibouti", flag: "🇩🇯" },
  { value: "DM", label: "Dominica", flag: "🇩🇲" },
  { value: "DO", label: "Dominican Republic", flag: "🇩🇴" },
  { value: "EC", label: "Ecuador", flag: "🇪🇨" },
  { value: "EG", label: "Egypt", flag: "🇪🇬" },
  { value: "SV", label: "El Salvador", flag: "🇸🇻" },
  { value: "GQ", label: "Equatorial Guinea", flag: "🇬🇶" },
  { value: "ER", label: "Eritrea", flag: "🇪🇷" },
  { value: "EE", label: "Estonia", flag: "🇪🇪" },
  { value: "SZ", label: "Eswatini", flag: "🇸🇿" },
  { value: "ET", label: "Ethiopia", flag: "🇪🇹" },
  { value: "FJ", label: "Fiji", flag: "🇫🇯" },
  { value: "FI", label: "Finland", flag: "🇫🇮" },
  { value: "FR", label: "France", flag: "🇫🇷" },
  { value: "GA", label: "Gabon", flag: "🇬🇦" },
  { value: "GM", label: "Gambia", flag: "🇬🇲" },
  { value: "GE", label: "Georgia", flag: "🇬🇪" },
  { value: "DE", label: "Germany", flag: "🇩🇪" },
  { value: "GH", label: "Ghana", flag: "🇬🇭" },
  { value: "GR", label: "Greece", flag: "🇬🇷" },
  { value: "GD", label: "Grenada", flag: "🇬🇩" },
  { value: "GT", label: "Guatemala", flag: "🇬🇹" },
  { value: "GN", label: "Guinea", flag: "🇬🇳" },
  { value: "GW", label: "Guinea-Bissau", flag: "🇬🇼" },
  { value: "GY", label: "Guyana", flag: "🇬🇾" },
  { value: "HT", label: "Haiti", flag: "🇭🇹" },
  { value: "HN", label: "Honduras", flag: "🇭🇳" },
  { value: "HU", label: "Hungary", flag: "🇭🇺" },
  { value: "IS", label: "Iceland", flag: "🇮🇸" },
  { value: "IN", label: "India", flag: "🇮🇳" },
  { value: "ID", label: "Indonesia", flag: "🇮🇩" },
  { value: "IR", label: "Iran", flag: "🇮🇷" },
  { value: "IQ", label: "Iraq", flag: "🇮🇶" },
  { value: "IE", label: "Ireland", flag: "🇮🇪" },
  { value: "IL", label: "Israel", flag: "🇮🇱" },
  { value: "IT", label: "Italy", flag: "🇮🇹" },
  { value: "JM", label: "Jamaica", flag: "🇯🇲" },
  { value: "JP", label: "Japan", flag: "🇯🇵" },
  { value: "JO", label: "Jordan", flag: "🇯🇴" },
  { value: "KZ", label: "Kazakhstan", flag: "🇰🇿" },
  { value: "KE", label: "Kenya", flag: "🇰🇪" },
  { value: "KI", label: "Kiribati", flag: "🇰🇮" },
  { value: "KP", label: "Korea (North)", flag: "🇰🇵" },
  { value: "KR", label: "Korea (South)", flag: "🇰🇷" },
  { value: "KW", label: "Kuwait", flag: "🇰🇼" },
  { value: "KG", label: "Kyrgyzstan", flag: "🇰🇬" },
  { value: "LA", label: "Laos", flag: "🇱🇦" },
  { value: "LV", label: "Latvia", flag: "🇱🇻" },
  { value: "LB", label: "Lebanon", flag: "🇱🇧" },
  { value: "LS", label: "Lesotho", flag: "🇱🇸" },
  { value: "LR", label: "Liberia", flag: "🇱🇷" },
  { value: "LY", label: "Libya", flag: "🇱🇾" },
  { value: "LI", label: "Liechtenstein", flag: "🇱🇮" },
  { value: "LT", label: "Lithuania", flag: "🇱🇹" },
  { value: "LU", label: "Luxembourg", flag: "🇱🇺" },
  { value: "MG", label: "Madagascar", flag: "🇲🇬" },
  { value: "MW", label: "Malawi", flag: "🇲🇼" },
  { value: "MY", label: "Malaysia", flag: "🇲🇾" },
  { value: "MV", label: "Maldives", flag: "🇲🇻" },
  { value: "ML", label: "Mali", flag: "🇲🇱" },
  { value: "MT", label: "Malta", flag: "🇲🇹" },
  { value: "MH", label: "Marshall Islands", flag: "🇲🇭" },
  { value: "MR", label: "Mauritania", flag: "🇲🇷" },
  { value: "MU", label: "Mauritius", flag: "🇲🇺" },
  { value: "MX", label: "Mexico", flag: "🇲🇽" },
  { value: "FM", label: "Micronesia", flag: "🇫🇲" },
  { value: "MD", label: "Moldova", flag: "🇲🇩" },
  { value: "MC", label: "Monaco", flag: "🇲🇨" },
  { value: "MN", label: "Mongolia", flag: "🇲🇳" },
  { value: "ME", label: "Montenegro", flag: "🇲🇪" },
  { value: "MA", label: "Morocco", flag: "🇲🇦" },
  { value: "MZ", label: "Mozambique", flag: "🇲🇿" },
  { value: "MM", label: "Myanmar", flag: "🇲🇲" },
  { value: "NA", label: "Namibia", flag: "🇳🇦" },
  { value: "NR", label: "Nauru", flag: "🇳🇷" },
  { value: "NP", label: "Nepal", flag: "🇳🇵" },
  { value: "NL", label: "Netherlands", flag: "🇳🇱" },
  { value: "NZ", label: "New Zealand", flag: "🇳🇿" },
  { value: "NI", label: "Nicaragua", flag: "🇳🇮" },
  { value: "NE", label: "Niger", flag: "🇳🇪" },
  { value: "NG", label: "Nigeria", flag: "🇳🇬" },
  { value: "MK", label: "North Macedonia", flag: "🇲🇰" },
  { value: "NO", label: "Norway", flag: "🇳🇴" },
  { value: "OM", label: "Oman", flag: "🇴🇲" },
  { value: "PK", label: "Pakistan", flag: "🇵🇰" },
  { value: "PW", label: "Palau", flag: "🇵🇼" },
  { value: "PS", label: "Palestine", flag: "🇵🇸" },
  { value: "PA", label: "Panama", flag: "🇵🇦" },
  { value: "PG", label: "Papua New Guinea", flag: "🇵🇬" },
  { value: "PY", label: "Paraguay", flag: "🇵🇾" },
  { value: "PE", label: "Peru", flag: "🇵🇪" },
  { value: "PH", label: "Philippines", flag: "🇵🇭" },
  { value: "PL", label: "Poland", flag: "🇵🇱" },
  { value: "PT", label: "Portugal", flag: "🇵🇹" },
  { value: "QA", label: "Qatar", flag: "🇶🇦" },
  { value: "RO", label: "Romania", flag: "🇷🇴" },
  { value: "RU", label: "Russia", flag: "🇷🇺" },
  { value: "RW", label: "Rwanda", flag: "🇷🇼" },
  { value: "KN", label: "Saint Kitts and Nevis", flag: "🇰🇳" },
  { value: "LC", label: "Saint Lucia", flag: "🇱🇨" },
  { value: "VC", label: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
  { value: "WS", label: "Samoa", flag: "🇼🇸" },
  { value: "SM", label: "San Marino", flag: "🇸🇲" },
  { value: "ST", label: "Sao Tome and Principe", flag: "🇸🇹" },
  { value: "SA", label: "Saudi Arabia", flag: "🇸🇦" },
  { value: "SN", label: "Senegal", flag: "🇸🇳" },
  { value: "RS", label: "Serbia", flag: "🇷🇸" },
  { value: "SC", label: "Seychelles", flag: "🇸🇨" },
  { value: "SL", label: "Sierra Leone", flag: "🇸🇱" },
  { value: "SG", label: "Singapore", flag: "🇸🇬" },
  { value: "SK", label: "Slovakia", flag: "🇸🇰" },
  { value: "SI", label: "Slovenia", flag: "🇸🇮" },
  { value: "SB", label: "Solomon Islands", flag: "🇸🇧" },
  { value: "SO", label: "Somalia", flag: "🇸🇴" },
  { value: "ZA", label: "South Africa", flag: "🇿🇦" },
  { value: "SS", label: "South Sudan", flag: "🇸🇸" },
  { value: "ES", label: "Spain", flag: "🇪🇸" },
  { value: "LK", label: "Sri Lanka", flag: "🇱🇰" },
  { value: "SD", label: "Sudan", flag: "🇸🇩" },
  { value: "SR", label: "Suriname", flag: "🇸🇷" },
  { value: "SE", label: "Sweden", flag: "🇸🇪" },
  { value: "CH", label: "Switzerland", flag: "🇨🇭" },
  { value: "SY", label: "Syria", flag: "🇸🇾" },
  { value: "TW", label: "Taiwan", flag: "🇹🇼" },
  { value: "TJ", label: "Tajikistan", flag: "🇹🇯" },
  { value: "TZ", label: "Tanzania", flag: "🇹🇿" },
  { value: "TH", label: "Thailand", flag: "🇹🇭" },
  { value: "TL", label: "Timor-Leste", flag: "🇹🇱" },
  { value: "TG", label: "Togo", flag: "🇹🇬" },
  { value: "TO", label: "Tonga", flag: "🇹🇴" },
  { value: "TT", label: "Trinidad and Tobago", flag: "🇹🇹" },
  { value: "TN", label: "Tunisia", flag: "🇹🇳" },
  { value: "TR", label: "Turkey", flag: "🇹🇷" },
  { value: "TM", label: "Turkmenistan", flag: "🇹🇲" },
  { value: "TV", label: "Tuvalu", flag: "🇹🇻" },
  { value: "UG", label: "Uganda", flag: "🇺🇬" },
  { value: "UA", label: "Ukraine", flag: "🇺🇦" },
  { value: "AE", label: "United Arab Emirates", flag: "🇦🇪" },
  { value: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { value: "US", label: "United States", flag: "🇺🇸" },
  { value: "UY", label: "Uruguay", flag: "🇺🇾" },
  { value: "UZ", label: "Uzbekistan", flag: "🇺🇿" },
  { value: "VU", label: "Vanuatu", flag: "🇻🇺" },
  { value: "VA", label: "Vatican City", flag: "🇻🇦" },
  { value: "VE", label: "Venezuela", flag: "🇻🇪" },
  { value: "VN", label: "Vietnam", flag: "🇻🇳" },
  { value: "YE", label: "Yemen", flag: "🇾🇪" },
  { value: "ZM", label: "Zambia", flag: "🇿🇲" },
  { value: "ZW", label: "Zimbabwe", flag: "🇿🇼" },
  // Regional options
  { value: "EU", label: "European Union", flag: "🇪🇺" },
  { value: "AF", label: "Africa", flag: "🌍" },
  { value: "AS", label: "Asia", flag: "🌏" },
  { value: "EU", label: "Europe", flag: "🌍" },
  { value: "NA", label: "North America", flag: "🌎" },
  { value: "SA", label: "South America", flag: "🌎" },
  { value: "OC", label: "Oceania", flag: "🌏" },
]

// Custom styles for react-select
const customStyles = {
  option: (provided: any) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
}

// Fixed Custom Option component for react-select
const CustomOption = ({ children, data, innerProps }: any) => (
  <div className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer" {...innerProps}>
    <span className="mr-2">{data.flag}</span>
    {data.label}
  </div>
)

// Fixed Custom SingleValue component for react-select
const CustomSingleValue = ({ data }: any) => (
  <div className="flex items-center">
    <span className="mr-2">{data.flag}</span>
    {data.label}
  </div>
)

export default function CreateGroupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [criteriaType, setCriteriaType] = useState<"nationality" | "age" | "gender">("nationality")
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [ageValue, setAgeValue] = useState("")
  const [genderValue, setGenderValue] = useState<"male" | "female">("male")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Redirect to groups page after "creating" the group
      router.push("/app/groups")
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Create a New Group</h2>
          <p className="mt-1 text-sm text-gray-500">
            Create a group where members can provide anonymous feedback and vote on proposals.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            href="/app/groups"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Cancel
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Group Information</h3>
              <p className="mt-1 text-sm text-gray-500">Basic information about your group and its purpose.</p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Group Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., European Citizens Feedback"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe the purpose of this group and what kind of feedback or voting will take place."
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description of your group. This will be visible to potential members.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Membership Criteria</h3>
              <p className="mt-1 text-sm text-gray-500">
                Define who can join this group. Members will need to verify they meet these criteria using Self
                Protocol.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="criteria-type" className="block text-sm font-medium text-gray-700">
                  Criteria Type
                </label>
                <div className="mt-1">
                  <select
                    id="criteria-type"
                    name="criteria-type"
                    value={criteriaType}
                    onChange={(e) => setCriteriaType(e.target.value as "nationality" | "age" | "gender")}
                    className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="nationality">Nationality</option>
                    <option value="age">Age</option>
                    <option value="gender">Gender</option>
                  </select>
                </div>
              </div>

              {criteriaType === "nationality" && (
                <div className="sm:col-span-3">
                  <label htmlFor="nationality-value" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <div className="mt-1">
                    <Select
                      options={countries}
                      value={selectedCountry}
                      onChange={(option) => setSelectedCountry(option as Country)}
                      styles={customStyles}
                      components={{
                        Option: CustomOption,
                        SingleValue: CustomSingleValue,
                      }}
                      placeholder="Select a country"
                      isClearable
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Members will need to verify their nationality.</p>
                </div>
              )}

              {criteriaType === "age" && (
                <div className="sm:col-span-3">
                  <label htmlFor="age-value" className="block text-sm font-medium text-gray-700">
                    Minimum Age
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="age-value"
                      id="age-value"
                      value={ageValue}
                      onChange={(e) => setAgeValue(e.target.value)}
                      min="13"
                      max="100"
                      className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., 18"
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Members will need to verify they are at least this age.</p>
                </div>
              )}

              {criteriaType === "gender" && (
                <div className="sm:col-span-3">
                  <label htmlFor="gender-value" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="mt-1">
                    <select
                      id="gender-value"
                      name="gender-value"
                      value={genderValue}
                      onChange={(e) => setGenderValue(e.target.value as "male" | "female")}
                      className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Members will need to verify their gender.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Link
                href="/app/groups"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || (criteriaType === "nationality" && !selectedCountry)}
                className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                  isSubmitting || (criteriaType === "nationality" && !selectedCountry)
                    ? "opacity-75 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? "Creating..." : "Create Group"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
