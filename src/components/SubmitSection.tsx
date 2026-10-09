import { useState, FormEvent } from 'react';
import { Send, Briefcase, Wrench, FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import Card from './Card';
import { supabase, isSupabaseAvailable } from '../lib/supabase';

type SubmissionType = 'job' | 'tool' | 'blog' | 'event';

interface FormData {
  [key: string]: string | boolean;
}

export default function SubmitSection() {
  const [selectedType, setSelectedType] = useState<SubmissionType>('job');
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const submissionTypes = [
    { id: 'job' as const, label: 'Job Posting', icon: Briefcase },
    { id: 'tool' as const, label: 'AI Tool', icon: Wrench },
    { id: 'blog' as const, label: 'Blog Post', icon: FileText },
    { id: 'event' as const, label: 'Event', icon: Calendar }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // If database credentials are not configured, route submissions to the site inbox.
      if (!isSupabaseAvailable || !supabase) {
        const response = await fetch('https://formsubmit.co/ajax/business@aiworldnext.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New AIWorldNext ${selectedType} submission`,
            _template: 'table',
            submissionType: selectedType,
            ...formData
          })
        });
        const payload = await response.json().catch(() => null);
        if (!response.ok || payload?.success === false || payload?.success === 'false') {
          throw new Error(payload?.message || 'The submission service did not accept the request. Please email business@aiworldnext.com.');
        }
        setSubmitStatus('success');
        setFormData({});
        (e.target as HTMLFormElement).reset();
        setErrorMessage('');
        return;
      }

      let result;

      switch (selectedType) {
        case 'job':
          result = await supabase.from('job_submissions').insert([{
            title: formData.jobTitle as string,
            company: formData.company as string,
            location: formData.location as string,
            job_type: formData.jobType as string,
            salary_range: formData.salaryRange as string || null,
            is_remote: formData.isRemote as boolean || false,
            description: formData.description as string,
            application_url: formData.applicationUrl as string,
            email: formData.email as string,
            featured: formData.featured as boolean || false,
            sponsored: formData.sponsored as boolean || false
          }]);
          break;

        case 'tool':
          result = await supabase.from('tool_submissions').insert([{
            name: formData.toolName as string,
            tagline: formData.tagline as string,
            category: formData.category as string,
            pricing: formData.pricing as string,
            description: formData.description as string,
            website_url: formData.websiteUrl as string,
            email: formData.email as string,
            featured: formData.featured as boolean || false,
            sponsored: formData.sponsored as boolean || false
          }]);
          break;

        case 'blog':
          result = await supabase.from('blog_submissions').insert([{
            title: formData.blogTitle as string,
            category: formData.category as string,
            excerpt: formData.excerpt as string,
            content: formData.content as string,
            image_url: formData.imageUrl as string || null,
            email: formData.email as string
          }]);
          break;

        case 'event':
          result = await supabase.from('event_submissions').insert([{
            title: formData.eventTitle as string,
            event_type: formData.eventType as string,
            location: formData.location as string,
            start_date: formData.startDate as string,
            end_date: formData.endDate as string,
            is_virtual: formData.isVirtual as boolean || false,
            description: formData.description as string,
            registration_url: formData.registrationUrl as string,
            email: formData.email as string
          }]);
          break;
      }

      if (result.error) {
        // A configured Supabase project can still be missing a table or insert policy.
        // In that case, preserve the user's submission by trying the email inbox fallback.
        const fallbackResponse = await fetch('https://formsubmit.co/ajax/business@aiworldnext.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New AIWorldNext ${selectedType} submission (database fallback)`,
            _template: 'table',
            submissionType: selectedType,
            ...formData
          })
        });
        const fallbackPayload = await fallbackResponse.json().catch(() => null);
        if (!fallbackResponse.ok || fallbackPayload?.success === false || fallbackPayload?.success === 'false') {
          throw new Error(result.error.message || fallbackPayload?.message || 'Submission failed. Please try again or email business@aiworldnext.com.');
        }
      }

      setSubmitStatus('success');
      setFormData({});
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error
        ? error.message
        : 'Failed to submit. Please try again or email business@aiworldnext.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="submit" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Submit Your Content
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Share AI jobs, tools, blog posts, or events with our global community
          </p>
        </div>

        <Card>
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-400 mb-4">Select Submission Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {submissionTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSelectedType(id);
                    setSubmitStatus('idle');
                  }}
                  className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all duration-200 ${
                    selectedType === id
                      ? 'border-neon-blue bg-neon-blue/10 text-neon-blue'
                      : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-400 font-semibold">Submission Successful!</p>
                <p className="text-green-300 text-sm mt-1">
                  Thank you! Your submission was accepted by the configured submission service. We'll review it and contact you at the provided email.
                </p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-semibold">Submission Failed</p>
                <p className="text-red-300 text-sm mt-1">{errorMessage}</p>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {selectedType === 'job' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Job Title *</label>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="e.g., Senior Machine Learning Engineer"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your company name"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g., San Francisco, CA"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Job Type *</label>
                    <select
                      name="jobType"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Salary Range</label>
                  <input
                    type="text"
                    name="salaryRange"
                    placeholder="e.g., $150k - $200k"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isRemote"
                      className="w-5 h-5 rounded border-gray-700 text-neon-blue focus:ring-neon-blue bg-gray-900"
                      onChange={handleInputChange}
                    />
                    <span className="ml-2 text-white">Remote Position</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Job Description *</label>
                  <textarea
                    name="description"
                    rows={6}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue resize-none"
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Application URL *</label>
                  <input
                    type="url"
                    name="applicationUrl"
                    placeholder="https://"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {selectedType === 'tool' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Tool Name *</label>
                  <input
                    type="text"
                    name="toolName"
                    placeholder="e.g., AI Content Generator"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Tagline *</label>
                  <input
                    type="text"
                    name="tagline"
                    placeholder="Brief description of your tool"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Category *</label>
                    <select
                      name="category"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      onChange={handleInputChange}
                      required
                    >
                      <option>Language Models</option>
                      <option>Image Generation</option>
                      <option>Code Assistant</option>
                      <option>Content Creation</option>
                      <option>Video Editing</option>
                      <option>Productivity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Pricing *</label>
                    <select
                      name="pricing"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      onChange={handleInputChange}
                      required
                    >
                      <option>Free</option>
                      <option>Freemium</option>
                      <option>Paid</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Tool Description *</label>
                  <textarea
                    name="description"
                    rows={6}
                    placeholder="Describe what your tool does and its key features..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue resize-none"
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Website URL *</label>
                  <input
                    type="url"
                    name="websiteUrl"
                    placeholder="https://"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {selectedType === 'blog' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Blog Title *</label>
                  <input
                    type="text"
                    name="blogTitle"
                    placeholder="Your blog post title"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Category *</label>
                  <select
                    name="category"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                    required
                  >
                    <option>AI Research</option>
                    <option>Machine Learning</option>
                    <option>Deep Learning</option>
                    <option>NLP</option>
                    <option>Computer Vision</option>
                    <option>AI Ethics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Excerpt *</label>
                  <textarea
                    name="excerpt"
                    rows={3}
                    placeholder="Brief summary of your blog post..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue resize-none"
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Content *</label>
                  <textarea
                    name="content"
                    rows={10}
                    placeholder="Your full blog post content..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue resize-none"
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Featured Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    placeholder="https://"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            {selectedType === 'event' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Event Title *</label>
                  <input
                    type="text"
                    name="eventTitle"
                    placeholder="e.g., AI Summit 2024"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Event Type *</label>
                    <select
                      name="eventType"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      onChange={handleInputChange}
                      required
                    >
                      <option>Conference</option>
                      <option>Webinar</option>
                      <option>Workshop</option>
                      <option>Meetup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="City or Virtual"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">End Date *</label>
                    <input
                      type="date"
                      name="endDate"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isVirtual"
                      className="w-5 h-5 rounded border-gray-700 text-neon-blue focus:ring-neon-blue bg-gray-900"
                      onChange={handleInputChange}
                    />
                    <span className="ml-2 text-white">Virtual Event</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Event Description *</label>
                  <textarea
                    name="description"
                    rows={6}
                    placeholder="Describe your event..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue resize-none"
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Registration URL *</label>
                  <input
                    type="url"
                    name="registrationUrl"
                    placeholder="https://"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">Your Email *</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                onChange={handleInputChange}
                required
              />
              <p className="text-sm text-gray-500 mt-1">We'll contact you regarding your submission</p>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
              <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-neon-blue">⚡</span> Upgrade Options
              </h4>
              <div className="space-y-4">
                <label className="flex items-start cursor-pointer hover:bg-gray-800/50 p-3 rounded-lg transition-all">
                  <input
                    type="checkbox"
                    name="featured"
                    className="w-5 h-5 mt-0.5 rounded border-gray-700 text-neon-blue focus:ring-neon-blue bg-gray-800"
                    onChange={handleInputChange}
                  />
                  <div className="ml-3">
                    <span className="text-white font-semibold">Featured Listing</span>
                    <span className="ml-2 px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-cyan text-black text-xs font-bold rounded-full">$99</span>
                    <p className="text-sm text-gray-400 mt-1">Get 10x more visibility with featured placement</p>
                  </div>
                </label>

                <label className="flex items-start cursor-pointer hover:bg-gray-800/50 p-3 rounded-lg transition-all">
                  <input
                    type="checkbox"
                    name="sponsored"
                    className="w-5 h-5 mt-0.5 rounded border-gray-700 text-neon-blue focus:ring-neon-blue bg-gray-800"
                    onChange={handleInputChange}
                  />
                  <div className="ml-3">
                    <span className="text-white font-semibold">Sponsored Badge</span>
                    <span className="ml-2 px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-cyan text-black text-xs font-bold rounded-full">$49</span>
                    <p className="text-sm text-gray-400 mt-1">Stand out with a sponsored badge</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-gray-700">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 bg-gradient-to-r from-neon-blue to-neon-cyan text-black rounded-xl text-xl font-extrabold hover:shadow-2xl hover:shadow-neon-blue/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-neon-blue/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-neon-cyan uppercase tracking-wide"
              >
                {isSubmitting ? '⏳ Submitting...' : '✨ Submit for Review'}
                <Send className="w-6 h-6" />
              </button>

              <p className="text-sm text-gray-400 text-center mt-4">
                All submissions are reviewed within 24-48 hours. Free submissions are subject to availability.
              </p>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
