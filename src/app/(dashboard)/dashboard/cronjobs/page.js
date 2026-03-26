'use client';

const CRONS = [
  { id: 'CRON-01', name: 'Daily Product Sync', schedule: '02:00 daily', suppliers: 'All suppliers', status: 'active', lastRun: 'Today 02:00', nextRun: 'Tomorrow 02:00', duration: '3m 24s', result: 'ok' },
  { id: 'CRON-02', name: 'Price Update Check', schedule: '06:00 daily', suppliers: 'Global Brands XML, TechGear API', status: 'active', lastRun: 'Today 06:00', nextRun: 'Tomorrow 06:00', duration: '1m 12s', result: 'ok' },
  { id: 'CRON-03', name: 'Duplicate Detection', schedule: '04:00 daily', suppliers: 'All suppliers', status: 'active', lastRun: 'Today 04:00', nextRun: 'Tomorrow 04:00', duration: '0m 48s', result: 'warn' },
  { id: 'CRON-04', name: 'AI Description Queue', schedule: '03:00 daily', suppliers: 'New products only', status: 'paused', lastRun: '3 days ago', nextRun: 'Paused', duration: '—', result: 'info' },
  { id: 'CRON-05', name: 'FashionHub Retry', schedule: 'Every 6 hours', suppliers: 'FashionHub Feeds', status: 'error', lastRun: '6 hours ago', nextRun: 'In 30 mins', duration: 'Timeout', result: 'err' },
];

const resultStyle = {
  ok: 'bg-green-50 text-green-700 border border-green-200',
  warn: 'bg-amber-50 text-amber-700 border border-amber-200',
  err: 'bg-red-50 text-red-600 border border-red-200',
  info: 'bg-gray-100 text-gray-500',
};
const resultLabel = { ok: 'Success', warn: 'Warning', err: 'Failed', info: 'Skipped' };

const statusDot = { active: 'bg-green-400', paused: 'bg-gray-300', error: 'bg-red-400' };

export default function CronjobsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-black text-green-500">{CRONS.filter(c => c.status === 'active').length}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mt-1">Active Jobs</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-black text-amber-500">{CRONS.filter(c => c.status === 'paused').length}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mt-1">Paused</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-black text-red-500">{CRONS.filter(c => c.status === 'error').length}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mt-1">Failing</div>
        </div>
      </div>

      {/* Cronjobs List */}
      <div className="space-y-3">
        {CRONS.map((job) => (
          <div key={job.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-200 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${statusDot[job.status]}`} />
                  <span className="font-bold text-gray-800 text-sm">{job.name}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded ${resultStyle[job.result]}`}>{resultLabel[job.result]}</span>
                </div>
                <div className="font-mono text-[10px] text-gray-400 ml-4">{job.suppliers}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {job.status === 'active' ? (
                  <button className="text-[10px] font-bold text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-50 uppercase tracking-wide">Pause</button>
                ) : job.status === 'paused' ? (
                  <button className="text-[10px] font-bold text-green-600 border border-green-200 rounded-lg px-2.5 py-1 hover:bg-green-50 uppercase tracking-wide">Resume</button>
                ) : (
                  <button className="text-[10px] font-bold text-amber-600 border border-amber-200 rounded-lg px-2.5 py-1 hover:bg-amber-50 uppercase tracking-wide">Retry</button>
                )}
                <button className="text-[10px] font-bold text-sage-dark border border-sage/30 rounded-lg px-2.5 py-1 hover:bg-sage/5 uppercase tracking-wide">Run Now</button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-50">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Schedule</div>
                <div className="font-mono text-[11px] text-gray-600 mt-0.5 font-bold">{job.schedule}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Last Run</div>
                <div className="font-mono text-[11px] text-gray-600 mt-0.5">{job.lastRun}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Next Run</div>
                <div className="font-mono text-[11px] text-gray-600 mt-0.5">{job.nextRun}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Duration</div>
                <div className="font-mono text-[11px] text-gray-600 mt-0.5">{job.duration}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
