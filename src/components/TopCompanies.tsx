import { Building2, Users, TrendingUp, ExternalLink, Star } from 'lucide-react';
import companiesData from '../data/companies.json';

interface Company {
  id: number;
  name: string;
  description: string;
  logo: string;
  category: string;
  valuation: string;
  employees: string;
  founded: string;
  notable: string;
  url: string;
  featured: boolean;
}

export default function TopCompanies() {
  const companies = companiesData as Company[];
  const featuredCompanies = companies.filter(c => c.featured);
  const allCompanies = companies;

  return (
    <section id="companies" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-6">
            <Building2 className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Top AI Companies 2026</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Leading AI companies shaping the future of artificial intelligence and machine learning
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Star className="w-6 h-6 text-yellow-400 mr-3 fill-yellow-400" />
            Featured Leaders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all overflow-hidden group"
              >
                <div className="p-8">
                  <div className="flex items-start space-x-6 mb-6">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-800 border border-gray-700">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {company.name}
                        </h4>
                        <a
                          href={company.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
                        {company.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">
                    {company.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center text-gray-400 text-sm mb-1">
                        <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                        Valuation
                      </div>
                      <div className="text-white font-semibold">{company.valuation}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center text-gray-400 text-sm mb-1">
                        <Users className="w-4 h-4 mr-2 text-blue-400" />
                        Employees
                      </div>
                      <div className="text-white font-semibold">{company.employees}</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-4">
                    <div className="text-gray-400 text-sm mb-1">Notable Products:</div>
                    <div className="text-white font-medium">{company.notable}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-3"></span>
            Complete Directory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-gray-900/50 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all p-6 group"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 border border-gray-700">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {company.name}
                      </h4>
                      {company.featured && (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
                      {company.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {company.description}
                </p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Founded:</span>
                    <span className="text-white font-medium">{company.founded}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Valuation:</span>
                    <span className="text-white font-medium">{company.valuation}</span>
                  </div>
                </div>

                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-gray-800 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to be featured?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            If you're building innovative AI solutions and want to be included in our directory, reach out to us.
          </p>
          <a
            href="mailto:business@aiworldnext.com?subject=Company%20Listing%20Request"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            Submit Your Company
          </a>
        </div>
      </div>
    </section>
  );
}
