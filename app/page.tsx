import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Anonymous Signals with Zero-Knowledge Proofs
              </h1>
              <p className="text-xl text-white/90">
                ZKSignals enables truly sending anonymous signals like votes and feedback while ensuring only eligible participants can
                contribute. Your identity stays private, your voice matters.
              </p>
              <div className="pt-6">
                <Link
                  href="/app/groups"
                  className="inline-block px-8 py-4 bg-white text-emerald-700 font-medium rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Launch App
                </Link>
                <Link
                  href="#features"
                  className="inline-block ml-4 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg transition-all border border-emerald-500"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-80 md:h-96 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden relative shadow-2xl border border-white/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl max-w-md">
                      <div className="w-16 h-16 mx-auto mb-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <div className="text-center text-white">
                        <div className="font-bold text-xl mb-2">Privacy Guaranteed</div>
                        <div className="text-white/80">
                          Cast votes and provide feedback without revealing your identity. Zero-knowledge proofs ensure
                          your privacy while verifying your eligibility.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How ZKSignals Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge cryptography with user-friendly design
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emerald-600"
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
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Create Private Groups</h3>
              <p className="text-gray-600">
                Form groups based on specific criteria like nationality, age, or gender, ensuring only eligible
                participants can join.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Without Revealing</h3>
              <p className="text-gray-600">
                Using Self Protocol, verify your eligibility without exposing personal information or identity details.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Anonymous Signals</h3>
              <p className="text-gray-600">
                Cast votes and provide feedback with complete anonymity using Semaphore Protocol's zero-knowledge
                proofs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-80 md:h-96 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl overflow-hidden relative shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-6">
                      <div className="p-4 bg-white rounded-lg shadow-md">
                        <div className="text-sm font-medium text-gray-500">Traditional Voting</div>
                        <div className="mt-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-2 text-gray-700">Identity Exposed</span>
                        </div>
                        <div className="mt-1 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-2 text-gray-700">Potential Coercion</span>
                        </div>
                      </div>
                      <div className="p-4 bg-emerald-600 text-white rounded-lg shadow-md">
                        <div className="text-sm font-medium text-white">ZKSignals</div>
                        <div className="mt-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-2">Complete Anonymity</span>
                        </div>
                        <div className="mt-1 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-2">Verified Eligibility</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Privacy Matters</h2>
              <p className="text-gray-600">
                In many contexts, revealing your identity when providing feedback or voting can lead to bias, fear of
                retaliation, or social pressure that distorts true opinions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Freedom from Coercion</h3>
                    <p className="mt-1 text-gray-600">
                      When your vote can't be traced back to you, you're free to express your true opinion without fear
                      of consequences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Honest Feedback</h3>
                    <p className="mt-1 text-gray-600">
                      Anonymous feedback is more likely to be honest, leading to better decision-making and more
                      accurate results.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Protection for Vulnerable Groups</h3>
                    <p className="mt-1 text-gray-600">
                      In some contexts, revealing identity can put individuals at risk. ZKSignals provides protection
                      while still ensuring eligibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
