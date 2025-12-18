import { LazyVoiceWidget } from '@/components/LazyVoiceWidget'
import { Header } from '@/components/Header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf9f7] via-white to-[#fef7f0] relative">
      {/* Aionysus Watermark Background - Full Screen */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
        <img
          src="/aionysus.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* BETA Badge */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2 bg-gradient-to-r from-stone-900 to-stone-800 text-white px-4 py-2 rounded-full text-xs font-mono tracking-wider border border-stone-700 shadow-lg">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        BETA — DEMO DATABASE
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 relative">

          {/* Voice Widget - Lazy loaded */}
          <LazyVoiceWidget />

          {/* Supporting text */}
          <div className="text-center mt-8 relative z-10">
            <p className="text-base text-stone-500 max-w-xl mx-auto mb-8 italic">
              Connected to partner wine databases • Powered by conversational AI • Built for business
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#sommelier-ai-for-business"
                className="inline-flex items-center justify-center border-2 border-wine-700 text-wine-700 font-semibold px-8 py-4 rounded-lg hover:bg-wine-50 transition-colors text-lg"
              >
                For Business & Events
              </a>
            </div>
          </div>
        </section>

        {/* How Aionysus Works */}
        <section id="how-sommelier-ai-works" className="bg-gradient-to-b from-white to-stone-50 py-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 text-center mb-6">
              How Aionysus Works
            </h2>
            <p className="text-lg text-stone-600 text-center max-w-2xl mx-auto mb-16">
              Conversational AI meets premium wine curation. Describe your needs and receive intelligent, personalized recommendations from partner wine databases.
            </p>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-wine-100 to-wine-200 text-wine-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-md">1</div>
                <h3 className="font-bold text-stone-900 text-lg mb-3">Start Conversation</h3>
                <p className="text-stone-600 leading-relaxed">Hit play to begin speaking with Aionysus, your AI wine expert. For business inquiries, he'll immediately ask about your event or bulk order needs.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-wine-100 to-wine-200 text-wine-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-md">2</div>
                <h3 className="font-bold text-stone-900 text-lg mb-3">Describe Your Needs</h3>
                <p className="text-stone-600 leading-relaxed">Tell Aionysus about your event size, budget, food pairings, or corporate requirements. Natural conversation at its finest.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-wine-100 to-wine-200 text-wine-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-md">3</div>
                <h3 className="font-bold text-stone-900 text-lg mb-3">Receive Recommendations</h3>
                <p className="text-stone-600 leading-relaxed">Premium selections with tasting notes, pairings, and scalable ordering options. All from connected partner databases.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Aionysus */}
        <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 text-center mb-6">
              About Aionysus
            </h2>
            <p className="text-lg text-stone-600 text-center max-w-2xl mx-auto mb-8">
              Aionysus is the <span className="text-wine-600 font-medium">AI</span> goddess of wine—your personal sommelier for investment-grade Bordeaux. Natural conversation, expert knowledge, instant recommendations for collectors, investors, and connoisseurs.
            </p>
            <p className="text-lg text-stone-600 text-center max-w-2xl mx-auto mb-4">
              <span className="font-semibold text-wine-700">Now in BETA:</span> Featuring 40 prestigious Red Bordeaux from legendary châteaux (1952-2000). First Growths, investment-grade vintages, and collector pieces.
            </p>
            <p className="text-base text-stone-500 text-center max-w-2xl mx-auto">
              Perfect for wine investors, collectors, corporate events, and premium gifting. Available 24/7.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <article className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🍷%3C/text%3E%3C/svg%3E"
                  alt="Premium wine recommendations icon"
                  width="48"
                  height="48"
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-bold text-stone-900 text-lg mb-2">Investment-Grade Bordeaux</h3>
                <p className="text-stone-600">Access 40 prestigious Red Bordeaux from legendary châteaux—Lafite, Latour, Margaux, Haut-Brion, and more. Vintages from 1952-2000, priced £360-£25,000+. Perfect for collecting or investment.</p>
              </article>
              <article className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🍽️%3C/text%3E%3C/svg%3E"
                  alt="Food pairing icon"
                  width="48"
                  height="48"
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-bold text-stone-900 text-lg mb-2">Expert Food Pairing</h3>
                <p className="text-stone-600">Tell Aionysus what you're serving—from casual weeknight dinners to multi-course galas. He delivers perfect wine matches with sommelier-level expertise for every scenario.</p>
              </article>
              <article className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E📦%3C/text%3E%3C/svg%3E"
                  alt="Bulk ordering icon"
                  width="48"
                  height="48"
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-bold text-stone-900 text-lg mb-2">Bulk & B2B Ordering</h3>
                <p className="text-stone-600">Sourcing wine for 50 guests? 500? Aionysus scales with you, offering corporate pricing, bulk logistics support, and curated wine programs for restaurants and hospitality.</p>
              </article>
              <article className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌍%3C/text%3E%3C/svg%3E"
                  alt="Global wine access icon"
                  width="48"
                  height="48"
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-bold text-stone-900 text-lg mb-2">Global Wine Access</h3>
                <p className="text-stone-600">Curated access to premium wines from partner databases worldwide. From iconic Bordeaux to emerging boutique regions, discover wines beyond what's on your local shelf.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Aionysus for Enterprise */}
        <section id="sommelier-ai-for-business" className="py-24 bg-gradient-to-b from-white to-stone-50 border-y border-stone-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-stone-900">
              Aionysus for Enterprise
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-6">
              Restaurants seeking sommelier recommendations. Wine retailers wanting a competitive edge. Hotels, venues, and corporate event teams planning sophisticated gatherings. Aionysus integrates seamlessly into your customer experience.
            </p>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-10">
              We offer API access, custom integrations, white-label solutions, and dedicated enterprise support. Connect to partner wine databases, scale ordering infrastructure, and delight your clients with AI-powered wine expertise.
            </p>

            <a
              href="mailto:hello@aionysus.wine?subject=Aionysus Enterprise Inquiry"
              className="inline-flex items-center justify-center bg-wine-700 text-white font-semibold px-10 py-4 rounded-lg hover:bg-wine-800 transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              Inquire About Enterprise Solutions
            </a>

            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="p-4 bg-white rounded-lg border border-stone-100">
                <p className="text-3xl font-bold text-wine-600">24/7</p>
                <p className="text-stone-600 text-sm mt-1">Always Available</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-stone-100">
                <p className="text-3xl font-bold text-wine-600">API</p>
                <p className="text-stone-600 text-sm mt-1">Full Integration</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-stone-100">
                <p className="text-3xl font-bold text-wine-600">Global</p>
                <p className="text-stone-600 text-sm mt-1">Partner Databases</p>
              </div>
            </div>
          </div>
        </section>

        {/* Aionysus FAQ */}
        <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <details className="bg-white rounded-xl border border-stone-100 group shadow-sm">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-stone-900 flex justify-between items-center hover:text-wine-600">
                  Is Aionysus really free to use?
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-stone-600">Yes. Aionysus is free for individuals and organizations during the BETA period. Start conversing immediately by hitting play above. Sign in to save preferences and conversation history. Enterprise SLAs and premium support are available for business customers—contact us for details.</p>
              </details>
              <details className="bg-white rounded-xl border border-stone-100 group shadow-sm">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-stone-900 flex justify-between items-center hover:text-wine-600">
                  Is this really a demo? What about the database?
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-stone-600"><span className="text-wine-600 font-medium">Important:</span> This is a BETA demo with a curated collection of 40 investment-grade Red Bordeaux wines. Our current focus is on prestigious châteaux from 1952-2000 vintages. If you're looking for other regions or styles, Aionysus can connect you to our sales team. <span className="text-wine-600 font-medium">Privacy:</span> Personal information shared during this demo is not retained.</p>
              </details>
              <details className="bg-white rounded-xl border border-stone-100 group shadow-sm">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-stone-900 flex justify-between items-center hover:text-wine-600">
                  How accurate are Aionysus's recommendations?
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-stone-600">Aionysus draws on sommelier knowledge spanning thousands of wines from major regions worldwide. Recommendations consider your taste preferences, budget, occasion, event size, and food pairings to deliver expert-level suggestions. The AI continuously learns and improves.</p>
              </details>
              <details className="bg-white rounded-xl border border-stone-100 group shadow-sm">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-stone-900 flex justify-between items-center hover:text-wine-600">
                  Can my restaurant/business use Aionysus?
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-stone-600">Absolutely. Restaurants, wine retailers, hotels, event venues, and corporates can integrate Aionysus via API, custom integrations, or white-label solutions. We offer dedicated enterprise support, SLAs, and bulk ordering infrastructure. Email us to explore options.</p>
              </details>
              <details className="bg-white rounded-xl border border-stone-100 group shadow-sm">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-stone-900 flex justify-between items-center hover:text-wine-600">
                  What if I want to place a large order?
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-stone-600">Tell Aionysus your event size, quantity, and requirements when you start a conversation. He'll provide recommendations at scale, connect you to wholesale pricing, and coordinate with our partner fulfillment network. Reach out to our team for enterprise-scale logistics.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white to-stone-50 border-t border-stone-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🍷%3C/text%3E%3C/svg%3E"
                alt="Aionysus logo"
                width="32"
                height="32"
                className="w-8 h-8"
              />
              <span className="font-bold text-lg text-stone-900">Sommelier<span className="text-wine-600">Quest</span></span>
            </div>

            <nav className="flex gap-6 text-sm text-stone-600 flex-wrap justify-center">
              <a href="#how-sommelier-ai-works" className="hover:text-wine-600 transition-colors">How It Works</a>
              <span className="text-stone-300">•</span>
              <a href="#sommelier-ai-for-business" className="hover:text-wine-600 transition-colors">Enterprise</a>
              <span className="text-stone-300">•</span>
              <a href="mailto:hello@aionysus.wine" className="hover:text-wine-600 transition-colors">Contact</a>
            </nav>
          </div>

          <div className="border-t border-stone-200 pt-8">
            <p className="text-center text-stone-600 text-xs">
              © {new Date().getFullYear()} Aionysus • The AI Goddess of Wine • v0.1 BETA • Bordeaux Collection: 40 SKUs<br />
              <span className="text-stone-500">Drink responsibly. For consumers of legal drinking age only.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
