import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import eventsData from '../data/events.json';

interface Event {
  id: number;
  title: string;
  date: string;
  endDate: string;
  location: string;
  type: string;
  description: string;
  url: string;
  featured: boolean;
}

export default function EventsCalendar() {
  const events = eventsData as Event[];
  const featuredEvents = events.filter(event => event.featured);
  const upcomingEvents = events.sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formatDate = (dateStr: string, endDateStr: string) => {
    const start = new Date(dateStr);
    const end = new Date(endDateStr);

    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endDay = end.getDate();

    if (startMonth === end.toLocaleDateString('en-US', { month: 'short' })) {
      return `${startMonth} ${startDay}-${endDay}, ${start.getFullYear()}`;
    }

    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${start.getFullYear()}`;
  };

  const getEventStatus = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const now = new Date();
    const daysUntil = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return 'Past';
    if (daysUntil <= 30) return 'Soon';
    return 'Upcoming';
  };

  return (
    <section id="events" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-6">
            <Calendar className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">AI Events Calendar 2026</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect with the global AI community at premier conferences, summits, and workshops
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></span>
            Featured Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => {
              const status = getEventStatus(event.date);
              return (
                <div
                  key={event.id}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full">
                        {event.type}
                      </span>
                      {status === 'Soon' && (
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full animate-pulse">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {event.title}
                    </h4>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                        {formatDate(event.date, event.endDate)}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                        {event.location}
                      </div>
                    </div>

                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                    >
                      Learn More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-3"></span>
            All Upcoming Events
          </h3>
          <div className="bg-gray-800/30 rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Event</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {upcomingEvents.map((event) => {
                    const status = getEventStatus(event.date);
                    return (
                      <tr key={event.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-white font-medium">{event.title}</div>
                            <div className="text-gray-400 text-sm line-clamp-1">{event.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm whitespace-nowrap">
                          {formatDate(event.date, event.endDate)}
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          {event.location}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
                            {event.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            status === 'Soon'
                              ? 'bg-red-500/20 text-red-400'
                              : status === 'Past'
                              ? 'bg-gray-500/20 text-gray-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
