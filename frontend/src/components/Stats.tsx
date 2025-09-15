import React, { useState, useEffect } from 'react';
import { BarChart3, Link2, Calendar, TrendingUp, Globe, Clock } from 'lucide-react';
import { SavedUrl } from '../types/url.types';
import { getUrlHistory } from '../utils/storage';

interface StatsProps {
  refreshTrigger: number;
}

const Stats: React.FC<StatsProps> = ({ refreshTrigger }) => {
  const [urls, setUrls] = useState<SavedUrl[]>([]);

  useEffect(() => {
    setUrls(getUrlHistory());
  }, [refreshTrigger]);

  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);
  const avgClicksPerUrl = totalUrls > 0 ? Math.round((totalClicks / totalUrls) * 10) / 10 : 0;
  
  const today = new Date().toDateString();
  const urlsCreatedToday = urls.filter(url => 
    new Date(url.created_at).toDateString() === today
  ).length;

  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  const urlsThisWeek = urls.filter(url => 
    new Date(url.created_at) >= thisWeek
  ).length;

  const uniqueDomains = new Set(
    urls.map(url => {
      try {
        return new URL(url.original_url).hostname;
      } catch {
        return url.original_url;
      }
    })
  ).size;

  const stats = [
    {
      label: 'Total des liens',
      value: totalUrls,
      icon: Link2,
      color: 'text-violet-600',
      bgColor: 'bg-violet-100',
      borderColor: 'border-violet-200'
    },
    {
      label: 'Total des clics',
      value: totalClicks,
      icon: BarChart3,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      borderColor: 'border-cyan-200'
    },
    {
      label: 'Moyenne par lien',
      value: avgClicksPerUrl,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-200'
    },
    {
      label: 'Créés aujourd\'hui',
      value: urlsCreatedToday,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    {
      label: 'Cette semaine',
      value: urlsThisWeek,
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      borderColor: 'border-indigo-200'
    },
    {
      label: 'Domaines uniques',
      value: uniqueDomains,
      icon: Globe,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-cyan-100 rounded-xl">
          <BarChart3 className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Statistiques</h2>
          <p className="text-gray-600">Aperçu de votre activité</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-white border-2 ${stat.borderColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;