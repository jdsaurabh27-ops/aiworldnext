import { Mail, Globe, Linkedin, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';
import BrandMark from './BrandMark';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a href="#home" className="block w-fit max-w-full mb-4" aria-label="AIWorldNext home">
              <BrandMark />
            </a>
            <p className="text-gray-400 text-sm mb-4">
              Discover AI news, tools, career opportunities and practical learning resources.
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-4 h-4 text-neon-blue" />
              <a
                href="mailto:business@aiworldnext.com"
                className="text-sm text-gray-400 hover:text-neon-blue transition-colors"
              >
                business@aiworldnext.com
              </a>
            </div>
            <p className="mt-5 mb-2 text-sm font-semibold text-white">Follow AIWorldNext</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href="https://www.linkedin.com/in/aiworldnext"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-blue transition-colors inline-flex min-h-[44px] items-center gap-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              <span className="text-sm">LinkedIn</span></a>
              <a
                href="https://x.com/aiworldnext"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-blue transition-colors inline-flex min-h-[44px] items-center gap-2"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              <span className="text-sm">X</span></a>
              <a
                href="https://instagram.com/aiworldnext"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors inline-flex min-h-[44px] items-center gap-2"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              <span className="text-sm">Instagram</span></a>
              <a
                href="https://www.youtube.com/@aiworldnexthub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors inline-flex min-h-[44px] items-center gap-2"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              <span className="text-sm">YouTube</span></a>
              <a
                href="https://facebook.com/aiworldnext"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors inline-flex min-h-[44px] items-center gap-2"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              <span className="text-sm">Facebook</span></a>
              <a
                href="https://medium.com/@AiWorldNext/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors flex items-center justify-center  inline-flex min-h-[44px] items-center gap-2"
                aria-label="Medium"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              <span className="text-sm">Medium</span></a>
              <a
                href="https://reddit.com/r/aiworldnext"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors flex items-center justify-center  inline-flex min-h-[44px] items-center gap-2"
                aria-label="Reddit"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              <span className="text-sm">Reddit</span></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about.html" className="text-gray-400 hover:text-neon-blue transition-colors">About AIWorldNext</a></li>
              <li><a href="/guides/" className="text-gray-400 hover:text-neon-blue transition-colors">Practical guides</a></li>
              <li><a href="#news" className="text-gray-400 hover:text-neon-blue transition-colors">AI News</a></li>
              <li><a href="#blogs" className="text-gray-400 hover:text-neon-blue transition-colors">Blogs</a></li>
              <li><a href="#jobs" className="text-gray-400 hover:text-neon-blue transition-colors">Jobs</a></li>
              <li><a href="#tools" className="text-gray-400 hover:text-neon-blue transition-colors">Products</a></li>
              <li><a href="#startups" className="text-gray-400 hover:text-neon-blue transition-colors">Startups</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#podcasts" className="text-gray-400 hover:text-neon-blue transition-colors">Podcasts</a></li>
              <li><a href="#resources" className="text-gray-400 hover:text-neon-blue transition-colors">Resources</a></li>
              <li><a href="#robotics" className="text-gray-400 hover:text-neon-blue transition-colors">Robotics</a></li>
              <li><a href="#support" className="text-gray-400 hover:text-neon-blue transition-colors">Support Us</a></li>
              <li><a href="#community" className="text-gray-400 hover:text-neon-blue transition-colors">Forums</a></li>
              <li><a href="#websites" className="text-gray-400 hover:text-neon-blue transition-colors">Directory</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="mx-auto mb-5 max-w-3xl text-center text-sm leading-relaxed text-gray-300">AIWorldNext is an independent AI discovery platform. Listings do not imply endorsement. Affiliate links and sponsored content are clearly labelled. <a href="/about.html#editorial" className="text-cyan-400 underline">Our editorial approach</a></p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="/about.html" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
              About Us
            </a>
            <span className="text-gray-600">|</span>
            <a href="/contact.html" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
              Contact Us
            </a>
            <span className="text-gray-600">|</span>
            <a href="/privacy-policy.html" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
              Privacy Policy
            </a>
            <span className="text-gray-600">|</span>
            <a href="/terms.html" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
              Terms of Service
            </a>
            <span className="text-gray-600">|</span>
            <a href="/disclaimer.html" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
              Disclaimer
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 AIWorldNext. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Globe className="w-4 h-4 text-neon-blue" />
              <span className="text-gray-400 text-sm">Connecting the AI world, one innovation at a time.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
