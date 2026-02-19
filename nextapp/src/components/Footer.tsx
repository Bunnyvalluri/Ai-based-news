export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-16 text-sm text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">

          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="white" strokeWidth="2.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                TruthLens
              </span>
            </div>
            <p className="leading-relaxed mb-6">
              AI-powered fake news detection. Validate information instantly with 90%+ confidence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors" aria-label="GitHub">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.475 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-1.062-3.362-1.987-.162-.412-1.675-2.837-2.612-2.837-.875.05.787 1.5.9.112 3.175.762 4.487-1.787 1.25-1.912 2.2-.625 2.813-.425 2.75-.975 8.788-5.913 8.788-2.625 0-4.875-1.175-6.525-4.575a2.27 2.27 0 10.463-6.525c.35-1.113 1.2 1.113 3 .5l.175 1.162.7 3.325.862c1.788 1.963 6.963 1.963 6.963-3.6 2.45-3.6-7.813-3.6-11.413 0-6.287 0-11.412 5.112-11.412 11.412 0 6.288 5.113 11.413 11.412 11.413 6.288 0 11.413-5.113 11.413-11.413 0-6.288-5.113-11.413-11.413-11.413z" /></svg>
              </a>
            </div>
          </div>

          <nav aria-label="Footer Nav" className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Product</h4>
            <a href="#detector" className="hover:text-indigo-600 transition-colors">Start Detecting</a>
            <a href="#metrics" className="hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About Us</a>
          </nav>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Models</h4>
            <span>Google Gemini 1.5</span>
            <span>Scikit-Learn Ensemble</span>
            <span>TF-IDF Vectorizer</span>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Legal</h4>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>© {new Date().getFullYear()} TruthLens. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for <strong className="text-indigo-600">Impact</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
