import { ExternalLink, Calendar, User, MapPin, DollarSign, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { useState } from 'react';

interface CardProps {
  title: string;
  description?: string;
  image: string;
  link: string;
  date?: string;
  author?: string;
  authorImage?: string;
  category?: string;
  company?: string;
  location?: string;
  salary?: string;
  price?: string;
  members?: string;
  funding?: string;
  founded?: string;
  host?: string;
}

export default function Card(props: CardProps) {
  const [showShare, setShowShare] = useState(false);

  const shareUrl = encodeURIComponent(props.link);
  const shareTitle = encodeURIComponent(props.title);

  return (
    <a
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-neon-blue transition-all duration-300 hover:transform hover:scale-105 border border-gray-800 hover:border-neon-blue shadow-lg hover:shadow-neon-blue/20"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={props.image}
          alt={props.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/aiworldnext-fallback-${encodeURIComponent(props.title)}/800/600`;
          }}
        />
        {props.category && (
          <span className="absolute top-2 left-2 bg-neon-blue text-black text-xs px-3 py-1 rounded-full font-semibold">
            {props.category}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowShare(!showShare);
          }}
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full transition-all duration-200"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
        {showShare && (
          <div className="absolute top-12 right-2 bg-gray-900 border border-gray-700 rounded-lg p-2 flex gap-2 shadow-xl z-10">
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4 text-blue-400" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-blue-600" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-4 h-4 text-blue-500" />
            </a>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {props.title}
        </h3>

        {props.description && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {props.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          {props.date && (
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{props.date}</span>
            </span>
          )}

          {props.author && (
            <span className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{props.author}</span>
            </span>
          )}

          {props.host && (
            <span className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{props.host}</span>
            </span>
          )}

          {props.company && (
            <span className="flex items-center space-x-1">
              <span className="font-medium text-blue-400">{props.company}</span>
            </span>
          )}

          {props.location && (
            <span className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{props.location}</span>
            </span>
          )}

          {props.salary && (
            <span className="flex items-center space-x-1">
              <DollarSign className="w-3 h-3" />
              <span className="text-green-400">{props.salary}</span>
            </span>
          )}

          {props.price && (
            <span className="flex items-center space-x-1">
              <DollarSign className="w-3 h-3" />
              <span className="text-green-400">{props.price}</span>
            </span>
          )}

          {props.members && (
            <span className="text-blue-400">{props.members} members</span>
          )}

          {props.funding && (
            <span className="text-green-400">{props.funding} funding</span>
          )}

          {props.founded && (
            <span>Founded {props.founded}</span>
          )}
        </div>

        <div className="flex items-center text-blue-400 text-sm mt-3 group-hover:text-blue-300">
          <span>View Details</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </div>
      </div>
    </a>
  );
}
