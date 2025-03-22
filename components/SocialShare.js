import { useState } from 'react';

export default function SocialShare({ match }) {
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/matches/${match.id}`;
  const shareText = `Check out ${match.title} - ${match.status} 🏏`;

  const platforms = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    x: `https://x.com/intent/post?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`, // ✅ Updated Twitter to X
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Share Scorecard</h3>
      <div className="flex flex-wrap gap-3">
        {Object.entries(platforms).map(([name, url]) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 transition-opacity hover:opacity-90 ${
              name === 'whatsapp' ? 'bg-green-500' :
              name === 'telegram' ? 'bg-blue-500' :
              name === 'x' ? 'bg-gray-900' : // ✅ Changed Twitter (X) background color
              name === 'facebook' ? 'bg-blue-600' :
              'bg-blue-700' // LinkedIn
            }`}
          >
            <span className="capitalize">{name === 'x' ? 'X' : name}</span> {/* ✅ Display 'X' instead of 'x' */}
          </a>
        ))}
        
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          {isCopied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
