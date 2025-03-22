import { useState } from 'react';
import { 
  FiShare2,
  FiTwitter,
  FiFacebook,
  FiLink
} from 'react-icons/fi';
import { 
  FaWhatsapp,
  FaTelegram,
  FaLinkedin
} from 'react-icons/fa';

export default function SocialShare({ match }) {
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/matches/${match.id}`;
  const shareText = `Check out ${match.title} - ${match.status} 🏏`;

  const platforms = [
    {
      name: 'whatsapp',
      icon: <FaWhatsapp className="w-5 h-5" />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'telegram',
      icon: <FaTelegram className="w-5 h-5" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'x',
      icon: <FiTwitter className="w-5 h-5" />,
      url: `https://x.com/intent/post?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
      color: 'bg-black hover:bg-gray-800'
    },
    {
      name: 'facebook',
      icon: <FiFacebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'linkedin',
      icon: <FaLinkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    }
  ];

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
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
        <FiShare2 className="w-4 h-4" />
        Share Scorecard
      </h3>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 rounded-lg text-white ${platform.color} transition-colors`}
            aria-label={`Share on ${platform.name}`}
          >
            {platform.icon}
          </a>
        ))}
        
        <button
          onClick={copyToClipboard}
          className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={isCopied ? 'Link copied' : 'Copy link'}
        >
          {isCopied ? (
            <span className="text-green-500">✓</span>
          ) : (
            <FiLink className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
}