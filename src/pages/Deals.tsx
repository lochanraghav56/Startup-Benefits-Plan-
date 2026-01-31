import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DealCard from '../components/DealCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Deals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAccess, setSelectedAccess] = useState('all');
  const [isLoading] = useState(false);

  // Mock deals data
  const deals = [
    {
      id: '1',
      title: 'AWS Activate Credits',
      company: 'Amazon Web Services',
      description: 'Get up to $5,000 in AWS credits for your startup infrastructure needs.',
      discount: '$5,000 Credits',
      category: 'Cloud Services',
      isLocked: false,
      rating: 4.8,
      expiresAt: 'Dec 31, 2026',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '2',
      title: 'Notion Team Plan',
      company: 'Notion',
      description: 'All-in-one workspace for notes, docs, and collaboration.',
      discount: '6 months free',
      category: 'Productivity',
      isLocked: true,
      rating: 4.9,
      expiresAt: 'Jan 15, 2027',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '3',
      title: 'Stripe Payment Processing',
      company: 'Stripe',
      description: 'No processing fees for the first 6 months of operation.',
      discount: 'No fees for 6 months',
      category: 'Payments',
      isLocked: false,
      rating: 4.7,
      expiresAt: 'Mar 1, 2027',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '4',
      title: 'HubSpot CRM Suite',
      company: 'HubSpot',
      description: 'Complete CRM and marketing automation platform.',
      discount: '90% off first year',
      category: 'Marketing',
      isLocked: true,
      rating: 4.6,
      expiresAt: 'Feb 28, 2027',
      logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '5',
      title: 'Figma Professional',
      company: 'Figma',
      description: 'Design and prototyping tool for teams.',
      discount: '1 year free',
      category: 'Design',
      isLocked: false,
      rating: 4.8,
      expiresAt: 'Apr 15, 2027',
      logo: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '6',
      title: 'Slack Business+',
      company: 'Slack',
      description: 'Team communication and collaboration platform.',
      discount: '85% off',
      category: 'Communication',
      isLocked: true,
      rating: 4.5,
      expiresAt: 'May 30, 2027',
      logo: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const categories = ['all', ...Array.from(new Set(deals.map(deal => deal.category)))];

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           deal.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || deal.category === selectedCategory;
      const matchesAccess = selectedAccess === 'all' || 
                           (selectedAccess === 'unlocked' && !deal.isLocked) ||
                           (selectedAccess === 'locked' && deal.isLocked);
      
      return matchesSearch && matchesCategory && matchesAccess;
    });
  }, [deals, searchTerm, selectedCategory, selectedAccess]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Exclusive Startup Deals
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl opacity-90 max-w-2xl mx-auto"
            >
              Access premium SaaS tools at startup-friendly prices. Save thousands on the tools you need to grow.
            </motion.p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedAccess}
                  onChange={(e) => setSelectedAccess(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Access</option>
                  <option value="unlocked">Unlocked</option>
                  <option value="locked">Verification Required</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Deals Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredDeals.length} of {deals.length} deals
                  </p>
                </div>
                
                {filteredDeals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDeals.map((deal, index) => (
                      <DealCard key={deal.id} deal={deal} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No deals found matching your criteria.</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSelectedAccess('all');
                      }}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}