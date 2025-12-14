import Link from 'next/link'
import { VoiceWidget } from '@/components/VoiceWidget'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🍷%3C/text%3E%3C/svg%3E"
                alt="SommelierQuest wine glass logo"
                width="32"
                height="32"
                className="w-8 h-8"
              />
              <span className="font-bold text-xl text-stone-900">Sommelier<span className="text-wine-600">Quest</span></span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#how-sommelier-ai-works" className="text-stone-600 hover:text-stone-900 transition-colors">How it works</a>
              <a href="#sommelier-ai-for-business" className="text-stone-600 hover:text-stone-900 transition-colors">For Business</a>
              <Link href="/handler/sign-in" className="text-stone-600 hover:text-stone-900 transition-colors">Sign in</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/handler/sign-up"
                className="hidden sm:inline-flex bg-wine-600 text-white font-medium px-5 py-2.5 rounded-full hover:bg-wine-700 transition-colors"
              >
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-12">
          {/* H1 with keyword */}
          <h1 className="sr-only">SommelierQuest - Your Personal AI Wine Expert</h1>

          {/* Voice Widget */}
          <VoiceWidget />

          {/* Main headline */}
          <div className="text-center mt-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 leading-tight mb-6">
              Never pick the wrong<br />wine again
            </h2>

            <p className="text-lg text-stone-500 max-w-xl mx-auto mb-10 leading-relaxed">
              SommelierQuest listens to what you want and recommends the perfect wine for any occasion.
              Our AI sommelier knows thousands of wines from regions worldwide, food pairings, and works within any budget.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center bg-wine-500 text-white font-semibold px-8 py-4 rounded-lg hover:bg-wine-600 transition-colors text-lg"
              >
                Ask SommelierQuest about wine
              </a>
              <a
                href="#sommelier-ai-for-business"
                className="inline-flex items-center justify-center bg-stone-900 text-white font-semibold px-8 py-4 rounded-lg hover:bg-stone-800 transition-colors text-lg"
              >
                SommelierQuest for Business
              </a>
            </div>
          </div>
        </section>

        {/* How SommelierQuest Works */}
        <section id="how-sommelier-ai-works" className="bg-white py-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 text-center mb-6">
              How SommelierQuest Works
            </h2>
            <p className="text-lg text-stone-500 text-center max-w-2xl mx-auto mb-16">
              SommelierQuest uses advanced artificial intelligence to provide personalized wine recommendations through natural voice conversation.
            </p>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-wine-100 text-wine-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-bold text-stone-900 text-xl mb-3">Start SommelierQuest</h3>
                <p className="text-stone-500 leading-relaxed">Tap the play button to begin a voice conversation with SommelierQuest, your personal AI wine expert.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-wine-100 text-wine-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-bold text-stone-900 text-xl mb-3">Tell SommelierQuest what you need</h3>
                <p className="text-stone-500 leading-relaxed">Describe the occasion, your taste preferences, budget, or what food you are eating to SommelierQuest.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-wine-100 text-wine-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-bold text-stone-900 text-xl mb-3">Get SommelierQuest recommendations</h3>
                <p className="text-stone-500 leading-relaxed">SommelierQuest suggests specific wines with tasting notes, prices, and food pairing suggestions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is SommelierQuest */}
        <section className="py-24 bg-[#faf9f7]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 text-center mb-6">
              What is SommelierQuest?
            </h2>
            <p className="text-lg text-stone-500 text-center max-w-2xl mx-auto mb-8">
              SommelierQuest is an artificial intelligence wine advisor that provides expert-level wine recommendations through natural voice conversation. SommelierQuest is like having a professional sommelier in your pocket, available 24 hours a day, 7 days a week.
            </p>
            <p className="text-lg text-stone-500 text-center max-w-2xl mx-auto mb-16">
              Whether you are looking for wine recommendations for a dinner party, trying to find the perfect wine pairing for steak, or want to learn about wine regions like Bordeaux or Napa Valley, SommelierQuest can help. Our AI sommelier technology makes expert wine advice accessible to everyone, completely free.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <article className="bg-white rounded-xl p-6 border border-stone-100">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🍷%3C/text%3E%3C/svg%3E"
                  alt="SommelierQuest wine recommendations icon"
                  width="48"
                  height="48"
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-bold text-stone-900 text-lg mb-2">SommelierQuest Wine Recommendations</h3>
                <p className="text-stone-500">SommelierQuest knows red wine, white wine, rosé, and sparkling wines from every major wine region. Get personalized wine recommendations matched to your taste preferences.</p>
              </article>
              <article className="bg-white rounded-xl p-6 border border-stone-100">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🍽️%3C/text%3E%3C/svg%3E"
                  alt="SommelierQuest food pairing icon"
                  width="48"
                  height="48"
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-bold text-stone-900 text-lg mb-2">SommelierQuest Food Pairings</h3>
                <p className="text-stone-500">Tell SommelierQuest what you are eating and get the perfect wine match. SommelierQuest understands food and wine pairing principles from classic combinations to creative pairings.</p>
              </article>
              <article className="bg-white rounded-xl p-6 border border-stone-100">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E💰%3C/text%3E%3C/svg%3E"
                  alt="SommelierQuest budget wine recommendations icon"
                  width="48"
                  height="48"
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-bold text-stone-900 text-lg mb-2">SommelierQuest for Any Budget</h3>
                <p className="text-stone-500">SommelierQuest recommends wines at every price point. From everyday bottles under $15 to special occasion splurges, SommelierQuest finds great wines within your budget.</p>
              </article>
              <article className="bg-white rounded-xl p-6 border border-stone-100">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌍%3C/text%3E%3C/svg%3E"
                  alt="SommelierQuest wine regions knowledge icon"
                  width="48"
                  height="48"
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-bold text-stone-900 text-lg mb-2">SommelierQuest Wine Education</h3>
                <p className="text-stone-500">SommelierQuest teaches you about wine regions including Bordeaux, Burgundy, Napa Valley, Tuscany, and Marlborough. Learn about grape varieties, tasting notes, and wine terminology.</p>
              </article>
            </div>
          </div>
        </section>

        {/* SommelierQuest for Business */}
        <section id="sommelier-ai-for-business" className="py-24 bg-stone-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              SommelierQuest for Business
            </h2>
            <p className="text-lg text-stone-300 max-w-xl mx-auto mb-6">
              Restaurants, wine retailers, and hospitality businesses can integrate SommelierQuest into their customer experience. Help your guests find the perfect wine with SommelierQuest technology.
            </p>
            <p className="text-lg text-stone-300 max-w-xl mx-auto mb-10">
              SommelierQuest offers enterprise solutions including API access, custom integrations, and white-label SommelierQuest products. Contact us to learn how SommelierQuest can enhance your business.
            </p>

            <a
              href="mailto:hello@sommelier.quest?subject=SommelierQuest for Business Inquiry"
              className="inline-flex items-center justify-center bg-white text-stone-900 font-semibold px-8 py-4 rounded-lg hover:bg-stone-100 transition-colors text-lg"
            >
              Contact SommelierQuest for Enterprise
            </a>

            <div className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto">
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-stone-400 text-sm">SommelierQuest Always On</p>
              </div>
              <div>
                <p className="text-3xl font-bold">API</p>
                <p className="text-stone-400 text-sm">SommelierQuest Integration</p>
              </div>
              <div>
                <p className="text-3xl font-bold">1000s</p>
                <p className="text-stone-400 text-sm">Wines in SommelierQuest</p>
              </div>
            </div>
          </div>
        </section>

        {/* SommelierQuest FAQ */}
        <section className="py-24 bg-[#faf9f7]">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 text-center mb-12">
              SommelierQuest FAQ
            </h2>

            <div className="space-y-4">
              <details className="bg-white rounded-xl border border-stone-100 group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-stone-900 flex justify-between items-center">
                  Is SommelierQuest free to use?
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-stone-500">Yes, SommelierQuest is completely free to use. Start using SommelierQuest immediately by tapping the play button above. Sign in to save your preferences and get even more personalized SommelierQuest recommendations over time.</p>
              </details>
              <details className="bg-white rounded-xl border border-stone-100 group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-stone-900 flex justify-between items-center">
                  How accurate is SommelierQuest?
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-stone-500">SommelierQuest is trained on professional sommelier knowledge covering thousands of wines from wine regions worldwide. SommelierQuest recommendations consider your taste preferences, budget, occasion, and food pairings to provide relevant, expert-level wine suggestions.</p>
              </details>
              <details className="bg-white rounded-xl border border-stone-100 group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-stone-900 flex justify-between items-center">
                  What is SommelierQuest?
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-stone-500">SommelierQuest is an artificial intelligence sommelier that uses advanced AI technology to provide personalized wine recommendations through natural voice conversation. SommelierQuest acts like having a professional sommelier available on demand, helping you discover wines you will love.</p>
              </details>
              <details className="bg-white rounded-xl border border-stone-100 group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-stone-900 flex justify-between items-center">
                  Can businesses integrate SommelierQuest?
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-stone-500">Absolutely. SommelierQuest offers enterprise solutions for restaurants, wine retailers, and hospitality businesses. Contact SommelierQuest for API access, custom integrations, and white-label SommelierQuest products tailored to your business needs.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🍷%3C/text%3E%3C/svg%3E"
                alt="SommelierQuest logo"
                width="32"
                height="32"
                className="w-8 h-8"
              />
              <span className="font-bold text-xl text-stone-900">Sommelier<span className="text-wine-600">Quest</span></span>
            </div>

            <nav className="flex gap-6 text-sm text-stone-500">
              <span>SommelierQuest Wine Recommendations</span>
              <span>•</span>
              <span>SommelierQuest Food Pairings</span>
              <span>•</span>
              <span>SommelierQuest Enterprise</span>
            </nav>
          </div>

          <p className="text-center text-stone-400 text-xs mt-8">
            © {new Date().getFullYear()} SommelierQuest. All rights reserved. Drink responsibly.
          </p>
        </div>
      </footer>
    </div>
  )
}
