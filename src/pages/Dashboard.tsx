import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Award, Clock, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@startup.com',
    company: 'TechStartup Inc.',
    verified: true,
    joinedDate: 'January 2026'
  };

  // Mock claimed deals
  const claimedDeals = [
    {
      id: '1',
      title: 'AWS Activate Credits',
      company: 'Amazon Web Services',
      discount: '$5,000 Credits',
      status: 'approved',
      claimedDate: '2026-01-15',
      expiresDate: '2026-12-31',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: '2',
      title: 'Stripe Payment Processing',
      company: 'Stripe',
      discount: 'No fees for 6 months',
      status: 'pending',
      claimedDate: '2026-01-20',
      expiresDate: '2026-07-20',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: '3',
      title: 'Figma Professional',
      company: 'Figma',
      discount: '1 year free',
      status: 'approved',
      claimedDate: '2026-01-10',
      expiresDate: '2027-01-10',
      logo: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { label: 'Deals Claimed', value: claimedDeals.length, icon: Award },
    { label: 'Approved', value: claimedDeals.filter(d => d.status === 'approved').length, icon: CheckCircle },
    { label: 'Pending', value: claimedDeals.filter(d => d.status === 'pending').length, icon: Clock },
    { label: 'Total Savings', value: '$6,000+', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your deals and account settings</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'deals', label: 'My Deals', icon: Award },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-8">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-600">Name</label>
                          <p className="font-medium text-gray-900">{user.name}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Email</label>
                          <p className="font-medium text-gray-900">{user.email}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Company</label>
                          <p className="font-medium text-gray-900">{user.company}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Member Since</label>
                          <p className="font-medium text-gray-900">{user.joinedDate}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
                      <div className="flex items-center space-x-3">
                        {user.verified ? (
                          <>
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <span className="text-green-700 font-medium">Verified Account</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-6 h-6 text-yellow-500" />
                            <span className="text-yellow-700 font-medium">Pending Verification</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {user.verified 
                          ? 'Your account is verified and you can access all deals.'
                          : 'Complete verification to access locked deals.'
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'deals' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Claimed Deals</h2>
                  {claimedDeals.length > 0 ? (
                    <div className="space-y-4">
                      {claimedDeals.map((deal, index) => (
                        <motion.div
                          key={deal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={deal.logo}
                                alt={`${deal.company} logo`}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{deal.title}</h3>
                                <p className="text-gray-600">{deal.company}</p>
                                <p className="text-green-600 font-medium">{deal.discount}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                {getStatusIcon(deal.status)}
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(deal.status)}`}>
                                  {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">Claimed: {deal.claimedDate}</p>
                              <p className="text-sm text-gray-500">Expires: {deal.expiresDate}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No deals claimed yet</h3>
                      <p className="text-gray-600 mb-6">Start exploring our exclusive deals to save on SaaS tools.</p>
                      <a
                        href="/deals"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Browse Deals
                      </a>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                    <p className="text-gray-600">Use Meku to generate content for this page</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}