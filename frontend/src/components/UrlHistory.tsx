import React, { useState, useEffect } from 'react';
import { History, ExternalLink, Copy, Trash2, BarChart3, Check, Clock, Globe } from 'lucide-react';
import { SavedUrl } from '../types/url.types';
import { getUrlHistory, removeUrlFromHistory, clearUrlHistory } from '../utils/storage';

interface UrlHistoryProps {
  refreshTrigger: number;
}

const UrlHistory: React.FC<UrlHistoryProps> = ({ refreshTrigger }) => {
  const [urls, setUrls] = useState<SavedUrl[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    setUrls(getUrlHistory());
  }, [refreshTrigger]);

  const handleCopy = async (url: string, id: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDelete = (id: number) => {
    removeUrlFromHistory(id);
    setUrls(getUrlHistory());
  };

  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tout l\'historique ?')) {
      clearUrlHistory();
      setUrls([]);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  if (urls.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
              <History className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Aucun historique
            </h3>
            <p className="text-gray-600 text-lg">
              Vos liens raccourcis apparaîtront ici une fois créés
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-100 rounded-xl">
            <History className="h-6 w-6 text-violet-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Historique
            </h2>
            <p className="text-gray-600">{urls.length} lien{urls.length > 1 ? 's' : ''} créé{urls.length > 1 ? 's' : ''}</p>
          </div>
        </div>
        {urls.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            Tout supprimer
          </button>
        )}
      </div>

      <div className="space-y-4">
        {urls.map((url) => (
          <div
            key={url.id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-violet-200"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <a
                    href={url.short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 hover:text-violet-700 font-semibold text-lg break-all transition-colors"
                  >
                    {url.short_url}
                  </a>
                  <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 text-sm font-medium">URL originale:</span>
                  <span className="text-gray-800 break-all">
                    {truncateUrl(url.original_url, 80)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Créé le {formatDate(url.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>{url.clicks || 0} clic{(url.clicks || 0) > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>{getDomainFromUrl(url.original_url)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleCopy(url.short_url, url.id)}
                  className="p-3 text-violet-600 hover:bg-violet-50 rounded-xl transition-colors group"
                  title="Copier le lien"
                >
                  {copiedId === url.id ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Copy className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  )}
                </button>
                
                <button
                  onClick={() => handleDelete(url.id)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
                  title="Supprimer"
                >
                  <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlHistory;