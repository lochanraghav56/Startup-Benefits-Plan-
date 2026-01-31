import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Star, Clock, Lock, Check, Building, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function DealDetails() {
  const { id } = useParams();
  const [isClaiming, setIsClaiming] = useState(false);

  // Mock deal data - in real app, this would be fetched based on ID
  const deal = {
    id: '1',
    title: 'AWS Activate Credits',
    company: 'Amazon Web Services',
    description: 'Get up to $5,000 in AWS credits for your startup infrastructure needs. Perfect for hosting, computing, storage, and other cloud services.',
    fullDescription: 'AWS Activate is designed to provide startups with the low-cost, easy-to-use infrastructure needed to scale and grow. The program provides startups with AWS credits, technical support, and training.',
    discount: '$5,000 Credits',
    category: 'Cloud Services',
    isLocked: false,
    rating: 4.8,
    reviewCount: 1247,
    expiresAt: 'December 31, 2026',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    partner: {
      name: 'Amazon Web Services',
      description: 'Leading cloud computing platform',
      website: 'https://aws.amazon.com',
      founded: '2006',
      employees: '1.5M+'
    },
    eligibility: [
      'Company must be less than 10 years old',
      'Must not have received AWS credits before',
      'Valid business registration required',
      'Technical contact person required'
    ],
    benefits: [
      'Up to $5,000 in AWS credits',
      '24/7 technical support',
      'Access to startup resources',
      'Training and certification discounts'
    ],
    terms: [
      'Credits expire after 2 years',
      'Cannot be transferred',
      'Subject to AWS terms of service',
      'One-time offer per company'
    ]
  };

  const handleClaimDeal = async () => {
    if (deal.isLocked) {
      toast.error('This deal requires verification. Please complete your profile first.');
      return;
    }

    setIsClaiming(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsClaiming(false);
      toast.success('Deal claimed successfully! Check your dashboard for next steps.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/deals"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Deals
            </Link>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Deal Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                  <div className="relative">
                    <img
                      src={deal.logo}
                      alt={`${deal.company} logo`}
                      className="w-full h-64 object-cover"
                    />
                    {deal.isLocked && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Lock className="w-12 h-12 mx-auto mb-4" />
                          <p className="text-lg font-medium">Verification Required</p>
                          <p className="text-sm opacity-90">Complete your profile to access this deal</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                      {deal.discount}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                        {deal.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{deal.rating}</span>
                        </div>
                        <span className="text-gray-500">({deal.reviewCount} reviews)</span>
                      </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{deal.title}</h1>
                    <p className="text-xl text-gray-600 mb-6">{deal.description}</p>

                    <div className="flex items-center text-gray-500 mb-6">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>Expires {deal.expiresAt}</span>
                    </div>

                    <motion.button
                      onClick={handleClaimDeal}
                      disabled={isClaiming}
                      whileHover={{ scale: deal.isLocked ? 1 : 1.02 }}
                      whileTap={{ scale: deal.isLocked ? 1 : 0.98 }}
                      className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                        deal.isLocked
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : isClaiming
                          ? 'bg-blue-400 text-white cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isClaiming ? 'Claiming...' : deal.isLocked ? 'Verification Required' : 'Claim This Deal'}
                    </motion.button>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Deal</h2>
                  <p className="text-gray-600 leading-relaxed">{deal.fullDescription}</p>
                </div>

                {/* Benefits */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h2>
                  <div className="space-y-4">
                    {deal.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
                  <div className="space-y-3">
                    {deal.terms.map((term, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-24"
              >
                {/* Partner Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Partner Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Building className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{deal.partner.name}</div>
                        <div className="text-sm text-gray-500">{deal.partner.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Founded</div>
                        <div className="font-medium text-gray-900">{deal.partner.founded}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Employees</div>
                        <div className="font-medium text-gray-900">{deal.partner.employees}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility Requirements</h3>
                  <div className="space-y-3">
                    {deal.eligibility.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}