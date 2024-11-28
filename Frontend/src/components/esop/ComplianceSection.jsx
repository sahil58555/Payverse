import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, FileText, AlertTriangle, 
  Download, ExternalLink, CheckCircle 
} from 'lucide-react';

export default function ComplianceSection() {
  const complianceItems = [
    {
      title: 'Vesting Schedule',
      status: 'Compliant',
      description: '4-year vesting with 1-year cliff',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      title: 'Token Distribution',
      status: 'Review Required',
      description: 'Annual distribution limit reached',
      icon: AlertTriangle,
      color: 'text-yellow-400'
    },
    {
      title: 'Legal Documentation',
      status: 'Up to Date',
      description: 'Last updated: 2 days ago',
      icon: FileText,
      color: 'text-indigo-400'
    }
  ];

  const documents = [
    {
      name: 'ESOP Agreement Template',
      type: 'PDF',
      size: '245 KB'
    },
    {
      name: 'Vesting Schedule Guidelines',
      type: 'PDF',
      size: '180 KB'
    },
    {
      name: 'Token Distribution Policy',
      type: 'PDF',
      size: '320 KB'
    }
  ];

  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                      flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Compliance Status</h2>
          <p className="text-sm text-gray-400">Legal and regulatory overview</p>
        </div>
      </div>

      {/* Compliance Items */}
      <div className="space-y-4 mb-6">
        {complianceItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-crypto-dark rounded-lg p-4 border border-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legal Resources */}
      <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
        <h3 className="font-semibold mb-4">Legal Resources</h3>
        
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-crypto-card/50 rounded-lg
                       hover:bg-crypto-card transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-sm font-medium">{doc.name}</div>
                  <div className="text-xs text-gray-400">{doc.type} • {doc.size}</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Legal Support */}
        <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-yellow-200 font-medium">
                Need Legal Support?
              </p>
              <p className="text-sm text-yellow-200/80 mt-1">
                Contact our legal team for assistance with ESOP compliance and documentation.
              </p>
              <button className="mt-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors flex items-center">
                Contact Support
                <ExternalLink className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}