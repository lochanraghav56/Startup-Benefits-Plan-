import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Deal {
  id: string;
  title: string;
  company: string;
  description: string;
  discount: string;
  category: string;
  isLocked: boolean;
  rating: number;
  expiresAt: string;
  logo: string;
}

interface DealCardProps {
  deal: Deal;
  index: number;
}

const DealCard: React.FC<DealCardProps> = ({ deal, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={deal.logo}
          alt={`${deal.company} logo`}
          className="w-full h-48 object-cover"
        />
        {deal.isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Verification Required</p>
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
          {deal.discount}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{deal.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{deal.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{deal.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{deal.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>Expires {deal.expiresAt}</span>
          </div>
          <Link
            to={`/deals/${deal.id}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              deal.isLocked
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {deal.isLocked ? 'Locked' : 'View Deal'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DealCard;