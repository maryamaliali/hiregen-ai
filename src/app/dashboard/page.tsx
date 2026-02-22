"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  TrendingUp,
  UserPlus,
  Mail,
  Search,
  Brain,
  MailCheck,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DashboardHome() {
  const [candidates, setCandidates] = useState(0);
  const [jobs, setJobs] = useState(0);
  const [score, setScore] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCandidates((prev) => (prev < 124 ? prev + 2 : 124));
      setJobs((prev) => (prev < 18 ? prev + 1 : 18));
      setScore((prev) => (prev < 87 ? prev + 1 : 87));
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 50 },
    { month: "Apr", value: 40 },
    { month: "May", value: 70 },
  ];

  const candidateList = [
    { name: "Ali Khan", status: "Shortlisted", role: "Frontend Dev" },
    { name: "Sara Ahmed", status: "Review", role: "Backend Dev" },
    { name: "Usman Tariq", status: "Rejected", role: "UI/UX Designer" },
  ];

  const filteredCandidates = candidateList.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-20">

      {/* HERO */}
      <section>
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-600 mb-3">
          Welcome to HireGen AI
        </h1>
        <p className="text-gray-600 max-w-2xl">
          AI-powered recruitment automation platform for smarter hiring decisions.
        </p>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Candidates" value={candidates} icon={<Users />} />
        <StatCard title="Jobs Posted" value={jobs} icon={<Briefcase />} />
        <StatCard title="Avg Match Score" value={`${score}%`} icon={<TrendingUp />} />
      </section>

      {/* AI TOOLS */}
      <section>
        <h2 className="text-2xl font-semibold text-cyan-600 mb-6">
          AI Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ToolCard icon={<Brain />} title="Resume Analysis" />
          <ToolCard icon={<MailCheck />} title="Email Generator" />
          <ToolCard icon={<BarChart3 />} title="Skill Gap Detection" />
        </div>
      </section>

      {/* RESUME UPLOAD */}
      <section>
        <h2 className="text-2xl font-semibold text-cyan-600 mb-6">
          Upload Resume
        </h2>

        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <input
            type="file"
            className="border p-3 rounded-lg w-full mb-4"
          />

          <button className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition">
            Analyze Resume
          </button>
        </div>
      </section>

      {/* CHART + TABLE */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* Chart */}
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-6 text-cyan-600">
            Monthly Candidate Growth
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Candidates Table */}
        <div className="bg-white shadow-lg p-6 rounded-2xl overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-cyan-600">
              Recent Candidates
            </h2>

            <div className="flex items-center border rounded-lg px-3 py-1">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-600">
                <th className="py-3">Name</th>
                <th>Status</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((c, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 font-medium">{c.name}</td>
                  <td>
                    <StatusBadge status={c.status} />
                  </td>
                  <td>{c.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ACTIVITY */}
      <section>
        <h2 className="text-xl font-semibold mb-6 text-cyan-600">
          Recent Activity
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActivityItem icon={<UserPlus />} text="New candidate added." />
          <ActivityItem icon={<Mail />} text="Interview email sent." />
          <ActivityItem icon={<TrendingUp />} text="Match score updated." />
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="flex flex-col sm:flex-row gap-4">
        <a
          href="/dashboard/analytics"
          className="bg-cyan-600 px-6 py-3 rounded-xl text-white font-semibold hover:bg-cyan-700 transition text-center shadow-md hover:shadow-lg"
        >
          View Full Analytics
        </a>
      </section>

    </div>
  );
}

/* COMPONENTS */

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl hover:shadow-xl transition hover:-translate-y-1">
      <div className="text-cyan-600 mb-4">{icon}</div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-cyan-600 mt-2">{value}</p>
    </div>
  );
}

function ToolCard({ icon, title }: any) {
  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl hover:shadow-xl transition hover:-translate-y-1 cursor-pointer">
      <div className="text-cyan-600 mb-4">{icon}</div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-500 text-sm mt-2">
        Launch AI tool and connect with backend API.
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Shortlisted"
      ? "bg-green-100 text-green-600"
      : status === "Review"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-red-100 text-red-600";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
}

function ActivityItem({ icon, text }: any) {
  return (
    <div className="flex items-center gap-4 bg-white shadow-md p-5 rounded-2xl hover:shadow-lg transition">
      <div className="text-cyan-600">{icon}</div>
      <p className="text-gray-700 font-medium">{text}</p>
    </div>
  );
}