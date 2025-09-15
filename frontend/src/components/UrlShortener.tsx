import React, { useState } from "react";
import {
  Link2,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { createShortUrl, getShortUrl } from "../services/api";
import { UrlResponse, SavedUrl } from "../types/url.types";
import { isValidUrl, formatUrl } from "../utils/validation";
import { saveUrlToHistory } from "../utils/storage";

interface UrlShortenerProps {
  onUrlCreated: (url: SavedUrl) => void;
}

const UrlShortener: React.FC<UrlShortenerProps> = ({ onUrlCreated }) => {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    const formattedUrl = formatUrl(inputUrl.trim());

    if (!isValidUrl(formattedUrl)) {
      setError("Veuillez entrer une URL valide");
      return;
    }

    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const response: UrlResponse = await createShortUrl(formattedUrl);
      const fullShortUrl = getShortUrl(response.url.short_code);

      const newUrl: SavedUrl = {
        id: response.url.id,
        original_url: response.url.original_url,
        short_code: response.url.short_code,
        short_url: fullShortUrl,
        created_at: new Date().toISOString(),
        clicks: 0,
      };

      setShortUrl(fullShortUrl);
      saveUrlToHistory(newUrl);
      onUrlCreated(newUrl);
      setInputUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
          <Link2 className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-violet-800 to-indigo-900 bg-clip-text text-transparent mb-4">
          Raccourcisseur d'URL
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Transformez vos liens longs en URLs courtes, élégantes et partageables
          en quelques secondes
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Collez votre lien ici... (ex: https://example.com)"
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                disabled={loading}
              />
              {error && (
                <div className="absolute top-full left-0 mt-2 flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !inputUrl.trim()}
              className="px-8 py-4 bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-600 hover:via-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Raccourcir
                </>
              )}
            </button>
          </div>
        </form>

        {shortUrl && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Check className="h-6 w-6 mr-2 text-green-600" />
                Votre lien raccourci
              </h3>
              <div className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full">
                <Sparkles className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Créé avec succès</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-green-200">
              <div className="flex-1">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:text-violet-700 font-semibold text-lg break-all transition-colors"
                >
                  {shortUrl}
                </a>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-6 py-3 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copier
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
