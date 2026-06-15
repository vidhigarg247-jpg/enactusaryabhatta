"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const ALLOWED_ADMINS = [
  "tanmaypandit1308@gmail.com",
  "garvg2606@gmail.com",
  "khushipandey93540@gmail.com",
  "vidhigarg247@gmail.com",
  "monisharai056@gmail.com",
  "komalsaini257408@gmail.com",
  "09bhoomikasinghal@gmail.com",
  "pragungulati9@gmail.com",
  "bahulikasrivastava@gmail.com",
  "alisha.ahlawat.75@gmail.com",
  "16mehaksharma@gmail.com",
  "16mehaksharma@gmail.com"
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError(""); setMessage(""); setLoading(true);
    if (!email || !password) { setError("Please fill in all fields"); setLoading(false); return; }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    const userEmail = data.user?.email;
    if (!userEmail || !ALLOWED_ADMINS.includes(userEmail)) {
      await supabase.auth.signOut();
      setError("You are not authorized to access this portal");
      setLoading(false); return;
    }
    router.push("/admin");
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setError(""); setMessage("");
    if (!email) { setError("Enter your email address first"); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset`,
    });
    if (error) setError(error.message);
    else setMessage("Check your inbox for a reset link");
  };

  return (
    <div className="min-h-screen bg-[#050505] flex overflow-hidden">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-14 bg-[#0a0a0a] border-r border-zinc-900">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`linear-gradient(#fbbf24 1px,transparent 1px),linear-gradient(90deg,#fbbf24 1px,transparent 1px)`,backgroundSize:'40px 40px'}} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/8 rounded-full blur-3xl" />

        {/* TOP — tagline */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-6 h-[2px] bg-amber-400" />
            <span className="text-xs text-zinc-500 uppercase tracking-widest">Internal Portal</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Building leaders<br />
            <span className="text-amber-400">through action.</span>
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Managing Enactus Aryabhatta's impact projects, team, and community initiatives since 2016.
          </p>
        </div>

        {/* MIDDLE — stats */}
        <div className="relative z-10 grid grid-cols-3 gap-3">
          {[{num:"44+",label:"Active Initiatives"},{num:"₹1Cr+",label:"Value Generated"},{num:"10K+",label:"Lives Impacted"}].map((s) => (
            <div key={s.num} className="border border-zinc-800/80 rounded-2xl p-5 bg-black/20">
              <p className="text-amber-400 font-bold text-2xl mb-1">{s.num}</p>
              <p className="text-zinc-500 text-xs leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* BOTTOM — college name */}
        <div className="relative z-10">
          <div className="h-[1px] bg-zinc-800 mb-6" />
          <p className="text-zinc-600 text-xs">© 2026 Enactus Aryabhatta College, University of Delhi</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[380px] relative z-10">

          {/* HEADER */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-amber-400 text-xs font-medium">Admin Access</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-zinc-500 text-sm">Enter your credentials to continue</p>
          </div>

          {/* FORM */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 focus:border-amber-400 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder:text-zinc-600 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 focus:border-amber-400 rounded-xl pl-11 pr-12 py-3.5 text-white text-sm placeholder:text-zinc-600 outline-none transition-all duration-200"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors">
                  {showPassword ? (
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
                  ) : (
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 bg-red-500/8 border border-red-500/15 rounded-xl px-4 py-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            {message && (
              <div className="flex items-start gap-3 bg-green-500/8 border border-green-500/15 rounded-xl px-4 py-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                <p className="text-sm text-green-400">{message}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 active:scale-[0.98] disabled:opacity-50 text-black font-bold py-3.5 rounded-xl transition-all duration-200 text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Signing in...
                </span>
              ) : "Sign In →"}
            </button>

            <div className="text-center">
              <button type="button" onClick={handleResetPassword} className="text-xs text-zinc-600 hover:text-amber-400 transition-colors duration-200">
                Forgot your password?
              </button>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-900 text-center">
            <p className="text-xs text-zinc-700">🔒 Authorized personnel only</p>
          </div>
        </div>
      </div>
    </div>
  );
}
