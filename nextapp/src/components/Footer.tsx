export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-[#0a0a14] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="white" strokeWidth="2.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>TruthLens</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              AI-powered fake news detection using Machine Learning + Google Gemini AI.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">Navigation</h4>
            <div className="space-y-2">
              {["#detector", "#how-it-works", "#metrics", "#about"].map((href) => (
                <a key={href} href={href}
                  className="block text-sm text-slate-500 hover:text-slate-300 transition-colors capitalize">
                  {href.replace("#", "").replace("-", " ")}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">Tech</h4>
            <div className="space-y-2 text-sm text-slate-500">
              <p>scikit-learn · Flask · Python</p>
              <p>Google Gemini 1.5 Flash</p>
              <p>Next.js · React · Tailwind CSS</p>
              <p>Deployed on Vercel</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} TruthLens · AI-Based Fake News Detector</p>
          <p>Built with ❤️ using ML + Gemini AI + Next.js</p>
        </div>
      </div>
    </footer>
  );
}
