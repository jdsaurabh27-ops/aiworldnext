import { Target, Eye, Lightbulb, Users as UsersIcon, Shield, Globe } from 'lucide-react';
import visionData from '../data/vision.json';

export default function VisionSection() {
  const valueIcons = {
    Innovation: Lightbulb,
    Accessibility: Globe,
    Ethics: Shield,
    Community: UsersIcon,
  };

  return (
    <section id="vision" className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Mission */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <div className="inline-flex p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{visionData.mission.title}</h2>
            <p className="text-gray-300 leading-relaxed">{visionData.mission.content}</p>
          </div>

          {/* Vision */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <div className="inline-flex p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{visionData.vision.title}</h2>
            <p className="text-gray-300 leading-relaxed">{visionData.vision.content}</p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionData.values.map((value) => {
              const Icon = valueIcons[value.title as keyof typeof valueIcons];
              return (
                <div
                  key={value.title}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="inline-flex p-2 bg-cyan-500/10 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partnerships */}
        <div>
          <h2 className="text-4xl font-bold text-white text-center mb-4">Trusted Partners</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Collaborating with leading organizations to advance AI research, education, and ethical development
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionData.partnerships.map((partnership) => (
              <div
                key={partnership.partner}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center h-16 mb-4">
                  <img
                    src={partnership.logo}
                    alt={partnership.partner}
                    className="max-h-12 max-w-full object-contain filter brightness-90 hover:brightness-110 transition-all"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="text-2xl font-bold text-white">${partnership.partner}</div>`;
                      }
                    }}
                  />
                </div>
                <h3 className="text-lg font-bold text-white text-center mb-2">{partnership.partner}</h3>
                <p className="text-gray-400 text-sm text-center">{partnership.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
