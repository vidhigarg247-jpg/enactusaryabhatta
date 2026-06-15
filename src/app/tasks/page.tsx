"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Lightfall from "@/app/components/ui/Lightfall";

type Task = {
  id: string;
  title: string;
  description: string;
};

type Volunteer = {
  id: string;
  task_id: string;
  name: string;
  email: string;
  phone: string;
};

export default function TeamTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [volName, setVolName] = useState("");
  const [volEmail, setVolEmail] = useState("");
  const [volPhone, setVolPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
    fetchVolunteers();
  }, []);

  const fetchTasks = async () => {
    const { data } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
    if (data) setTasks(data);
  };

  const fetchVolunteers = async () => {
    const { data } = await supabase.from("task_volunteers").select("*");
    if (data) setVolunteers(data);
  };

  const handleVolunteer = async () => {
    if (!volName || !showModal) return;
    setSubmitting(true);
    const existing = volunteers.find(
      (v) => v.task_id === showModal && v.name.toLowerCase() === volName.toLowerCase()
    );
    if (existing) {
      alert("You have already volunteered for this task!");
      setSubmitting(false);
      return;
    }
    const { error } = await supabase.from("task_volunteers").insert([{
      task_id: showModal,
      name: volName,
      email: volEmail,
      phone: volPhone,
    }]);
    if (error) {
      alert("Failed: " + error.message);
    } else {
      const stored = JSON.parse(localStorage.getItem("volunteered_task_ids") || "[]");
      localStorage.setItem("volunteered_task_ids", JSON.stringify([...stored, showModal]));
      setSuccess(volName);
      await fetchVolunteers();
      setVolName(""); setVolEmail(""); setVolPhone("");
      setTimeout(() => { setShowModal(null); setSuccess(null); }, 2000);
    }
    setSubmitting(false);
  };

  const volunteersForTask = (taskId: string) =>
    volunteers.filter((v) => v.task_id === taskId);

  const alreadyVolunteered = (taskId: string) => {
    const stored = JSON.parse(localStorage.getItem("volunteered_task_ids") || "[]");
    return stored.includes(taskId);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden -mt-16">

      <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 z-0">
        <Lightfall
          colors={['#EAB308', '#FDE68A', '#C4B5FD']}
          backgroundColor="#000000"
          speed={0.4}
          streakCount={3}
          streakWidth={0.8}
          streakLength={1.5}
          glow={0.8}
          density={0.5}
          twinkle={0.8}
          zoom={3}
          backgroundGlow={0}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0.5}
          mouseRadius={1}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16 text-white">

        <div className="mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-400/80 font-semibold mb-3">
            Enactus Aryabhatta
          </p>
          <h1 className="text-5xl md:text-6xl font-black mb-4" style={{ textShadow: '0 0 40px rgba(234,179,8,0.4)' }}>
            <span className="text-white">Team </span>
            <span className="text-amber-400">Tasks</span>
          </h1>
          <p className="text-white/50 text-sm max-w-md">
            Click "I'm Working" to volunteer for a task and let the team know you're on it.
          </p>
        </div>

        <div className="grid gap-4">
          {tasks.length === 0 && (
            <p className="text-white/30">No tasks available right now.</p>
          )}
          {tasks.map((task) => {
            const vols = volunteersForTask(task.id);
            const volunteered = alreadyVolunteered(task.id);
            return (
              <div key={task.id} className="rounded-2xl p-6 border border-white/10 bg-black/30 backdrop-blur-md" style={{ boxShadow: '0 0 30px rgba(234,179,8,0.05)' }}>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-amber-100">{task.title}</h2>
                    <p className="text-sm text-white/40 mt-1">{task.description}</p>
                  </div>
                  {volunteered && (
                    <span className="shrink-0 text-xs bg-amber-400/10 text-amber-400 px-3 py-1 rounded-full border border-amber-400/30">
                      ✓ Volunteered
                    </span>
                  )}
                </div>

                <div className="mt-4 text-sm">
                  <span className="text-white/30 font-medium">Volunteers ({vols.length}):</span>
                  {vols.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {vols.map((v) => (
                        <span key={v.id} className="px-3 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-full text-xs">
                          {v.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-white/20 ml-2">No volunteers yet</span>
                  )}
                </div>

                {volunteered ? (
                  <div className="mt-4 px-4 py-2 rounded-xl bg-amber-400/5 border border-amber-400/20 text-amber-400/70 text-sm text-center">
                    ✓ You are already volunteered for this task
                  </div>
                ) : (
                  <button
                    onClick={() => setShowModal(task.id)}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black text-sm font-bold transition-all"
                    style={{ boxShadow: '0 0 20px rgba(234,179,8,0.3)' }}
                  >
                    I'm Working ↗
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-black/90 border border-amber-400/20 rounded-2xl p-8 w-full max-w-md" style={{ boxShadow: '0 0 60px rgba(234,179,8,0.1)' }}>
            {success ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-amber-400 font-bold text-lg">Thanks, {success}!</p>
                <p className="text-white/40 text-sm mt-1">You have been added as a volunteer.</p>
              </div>
            ) : (
              <>
                <h3 className="text-white font-bold text-lg mb-1">Volunteer for Task</h3>
                <p className="text-amber-400 text-sm mb-6">
                  {tasks.find(t => t.id === showModal)?.title}
                </p>
                <div className="space-y-3">
                  <input className="vol-input" placeholder="Your Name *" value={volName} onChange={(e) => setVolName(e.target.value)} />
                  <input className="vol-input" placeholder="Email (optional)" value={volEmail} onChange={(e) => setVolEmail(e.target.value)} />
                  <input className="vol-input" placeholder="Phone (optional)" value={volPhone} onChange={(e) => setVolPhone(e.target.value)} />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => { setShowModal(null); setVolName(""); setVolEmail(""); setVolPhone(""); }}
                    className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-white/50 text-sm hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVolunteer}
                    disabled={!volName || submitting}
                    className="flex-1 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold text-sm transition"
                  >
                    {submitting ? "Submitting..." : "Confirm"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .vol-input { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(234,179,8,0.2); background: rgba(0,0,0,0.5); font-size: 14px; outline: none; color: #fff; }
        .vol-input::placeholder { color: rgba(255,255,255,0.2); }
        .vol-input:focus { border-color: #fbbf24; }
      `}</style>
    </div>
  );
}
