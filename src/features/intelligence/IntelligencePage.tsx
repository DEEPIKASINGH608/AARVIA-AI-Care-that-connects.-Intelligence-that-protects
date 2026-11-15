import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Sparkles,
  TrendingUp,
  Pill,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Activity,
  Eye,
  Syringe,
  FlaskConical,
} from 'lucide-react';

// --- Hardcoded Demo Data ---

const adherenceData = [
  { day: 'Mon', adherence: 85 },
  { day: 'Tue', adherence: 90 },
  { day: 'Wed', adherence: 70 },
  { day: 'Thu', adherence: 95 },
  { day: 'Fri', adherence: 80 },
  { day: 'Sat', adherence: 88 },
  { day: 'Sun', adherence: 92 },
];

const bpTrendData = [
  { day: 'Mon', systolic: 128 },
  { day: 'Tue', systolic: 132 },
  { day: 'Wed', systolic: 125 },
  { day: 'Thu', systolic: 138 },
  { day: 'Fri', systolic: 130 },
  { day: 'Sat', systolic: 127 },
  { day: 'Sun', systolic: 131 },
];

const stats = [
  { label: 'Adherence Rate', value: '87%', icon: TrendingUp, color: '#477B62' },
  { label: 'Medications Tracked', value: '4', icon: Pill, color: '#477B62' },
  { label: 'Upcoming Appointments', value: '3', icon: Calendar, color: '#477B62' },
  { label: 'Active Alerts', value: '1', icon: AlertTriangle, color: '#D99A38' },
];

const aiInsights = [
  {
    id: 1,
    borderColor: '#477B62',
    bgColor: '#E8F3EE',
    icon: TrendingUp,
    iconColor: '#477B62',
    title: 'Medication Adherence Improving',
    description: '87% over last 7 days, up from 71%. Keep up the great routine!',
    badge: 'Positive Trend',
    badgeBg: '#477B62',
  },
  {
    id: 2,
    borderColor: '#D99A38',
    bgColor: '#FDF3E0',
    icon: Pill,
    iconColor: '#D99A38',
    title: 'Lisinopril Refill Needed',
    description: 'Only 6 pills remaining. Contact Dr. Jenkins to request a refill soon.',
    badge: 'Action Required',
    badgeBg: '#D99A38',
  },
  {
    id: 3,
    borderColor: '#4A90D9',
    bgColor: '#E8F0FA',
    icon: Calendar,
    iconColor: '#4A90D9',
    title: 'Appointment Reminder',
    description: 'Quarterly review with Dr. Jenkins scheduled for November 20.',
    badge: 'Upcoming',
    badgeBg: '#4A90D9',
  },
];

const careGaps = [
  {
    id: 1,
    icon: Eye,
    title: 'Annual Eye Exam',
    status: 'Overdue',
    statusColor: '#C65D59',
    statusBg: '#FCECEA',
  },
  {
    id: 2,
    icon: Syringe,
    title: 'Influenza Vaccine',
    status: 'Due Next Month',
    statusColor: '#D99A38',
    statusBg: '#FDF3E0',
  },
  {
    id: 3,
    icon: FlaskConical,
    title: 'HbA1c Lab Test',
    status: 'Due in 2 Weeks',
    statusColor: '#4A90D9',
    statusBg: '#E8F0FA',
  },
];

// --- Component ---

const IntelligencePage: React.FC = () => {
  const [refillRequested, setRefillRequested] = React.useState(false);

  return (
    <div
      className="min-h-screen p-6 space-y-8"
      style={{ backgroundColor: '#F7F8F3', color: '#25352D' }}
    >
      {/* ── Page Header ── */}
      <div className="flex items-start gap-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: '#477B62' }}
        >
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#254E3B' }}>
            Care Intelligence
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#477B62' }}>
            AI-powered health insights and care analytics for Eleanor Vance
          </p>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl p-5 shadow-sm border flex items-center gap-4"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#C4DDD0' }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#E8F3EE' }}
              >
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: '#254E3B' }}>
                  {stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#477B62' }}>
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── AI Insight Cards ── */}
      <section>
        <h2 className="text-lg font-semibold mb-3" style={{ color: '#254E3B' }}>
          AI Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.id}
                className="rounded-2xl p-5 shadow-sm border-l-4"
                style={{
                  backgroundColor: insight.bgColor,
                  borderLeftColor: insight.borderColor,
                  borderTopColor: '#C4DDD0',
                  borderRightColor: '#C4DDD0',
                  borderBottomColor: '#C4DDD0',
                  borderWidth: '1px',
                  borderLeftWidth: '4px',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5" style={{ color: insight.iconColor }} />
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: insight.badgeBg }}
                  >
                    {insight.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: '#254E3B' }}>
                  {insight.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#25352D' }}>
                  {insight.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Adherence Bar Chart */}
        <div
          className="rounded-2xl p-6 shadow-sm border"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#C4DDD0' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" style={{ color: '#477B62' }} />
            <h3 className="font-semibold" style={{ color: '#254E3B' }}>
              Medication Adherence — Last 7 Days
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={adherenceData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#C4DDD0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#477B62' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#477B62' }} />
              <Tooltip
                formatter={(value) => [`${Number(value ?? 0)}%`, 'Adherence']}
                contentStyle={{ borderRadius: 8, borderColor: '#C4DDD0' }}
              />
              <Bar dataKey="adherence" fill="#477B62" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* BP Trend Line Chart */}
        <div
          className="rounded-2xl p-6 shadow-sm border"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#C4DDD0' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" style={{ color: '#477B62' }} />
            <h3 className="font-semibold" style={{ color: '#254E3B' }}>
              Systolic Blood Pressure — Last 7 Days
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={bpTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#C4DDD0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#477B62' }} />
              <YAxis domain={[110, 150]} tick={{ fontSize: 12, fill: '#477B62' }} />
              <Tooltip
                formatter={(value) => [`${Number(value ?? 0)} mmHg`, 'Systolic BP']}
                contentStyle={{ borderRadius: 8, borderColor: '#C4DDD0' }}
              />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#477B62"
                strokeWidth={2.5}
                dot={{ fill: '#477B62', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bottom Row: Care Gap Detector + Refill Alerts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Care Gap Detector */}
        <div
          className="rounded-2xl p-6 shadow-sm border"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#C4DDD0' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5" style={{ color: '#477B62' }} />
            <h3 className="font-semibold" style={{ color: '#254E3B' }}>
              Care Gap Detector
            </h3>
          </div>
          <div className="space-y-3">
            {careGaps.map((gap) => {
              const Icon = gap.icon;
              return (
                <div
                  key={gap.id}
                  className="flex items-center justify-between p-3 rounded-xl border"
                  style={{ borderColor: '#C4DDD0', backgroundColor: '#F7F8F3' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: gap.statusBg }}
                    >
                      <Icon className="w-4 h-4" style={{ color: gap.statusColor }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#254E3B' }}>
                      {gap.title}
                    </span>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ backgroundColor: gap.statusBg, color: gap.statusColor }}
                  >
                    {gap.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Refill Alerts */}
        <div
          className="rounded-2xl p-6 shadow-sm border"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#C4DDD0' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" style={{ color: '#D99A38' }} />
            <h3 className="font-semibold" style={{ color: '#254E3B' }}>
              Refill Alerts
            </h3>
          </div>

          <div
            className="rounded-xl p-4 border-l-4"
            style={{
              backgroundColor: '#FDF3E0',
              borderLeftColor: '#D99A38',
              borderTopColor: '#C4DDD0',
              borderRightColor: '#C4DDD0',
              borderBottomColor: '#C4DDD0',
              borderWidth: '1px',
              borderLeftWidth: '4px',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: '#FEE7B8' }}
                >
                  <Pill className="w-5 h-5" style={{ color: '#D99A38' }} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#254E3B' }}>
                    Lisinopril
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#D99A38' }}>
                    Only 6 pills remaining
                  </p>
                </div>
              </div>

              <button
                onClick={() => setRefillRequested(true)}
                disabled={refillRequested}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                style={{
                  backgroundColor: refillRequested ? '#477B62' : '#254E3B',
                }}
              >
                <RefreshCw className="w-4 h-4" />
                {refillRequested ? 'Requested' : 'Request Refill'}
              </button>
            </div>

            {refillRequested && (
              <p className="mt-3 text-xs font-medium flex items-center gap-1" style={{ color: '#477B62' }}>
                <CheckCircle className="w-3.5 h-3.5" />
                Refill request sent to Dr. Jenkins's office.
              </p>
            )}
          </div>

          <p className="mt-4 text-xs" style={{ color: '#477B62' }}>
            Refill requests are sent to your care provider for review. Allow 1–2 business days for processing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntelligencePage;
