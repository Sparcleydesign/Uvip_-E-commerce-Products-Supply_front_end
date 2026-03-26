'use client';
import { useState } from 'react';

const NOTES = [
  { id: 'PRD-001', name: 'Sony WH-1000XM5 Headphones', note: 'Price may increase in Q2 — monitor vairema.lt feed weekly. Customer asked for bundle option.', updated: '2 hours ago', author: 'Admin' },
  { id: 'PRD-004', name: 'Bosch Professional Drill Set', note: 'EU registration required for resale. Contact supplier for certification documents before listing.', updated: 'Yesterday', author: 'Admin' },
  { id: 'PRD-007', name: 'IKEA KALLAX Shelf Unit', note: 'Shipping size exceeds standard couriers. Use freight only. Weight: 47kg.', updated: '3 days ago', author: 'Admin' },
];

export default function NotesPage() {
  const [notes, setNotes] = useState(NOTES);
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [search, setSearch] = useState('');

  const filtered = notes.filter(n => n.name.toLowerCase().includes(search.toLowerCase()) || n.note.toLowerCase().includes(search.toLowerCase()));

  const startEdit = (note) => {
    setEditing(note.id);
    setEditText(note.note);
  };

  const saveEdit = (id) => {
    setNotes(ns => ns.map(n => n.id === id ? { ...n, note: editText, updated: 'Just now' } : n));
    setEditing(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes..."
            className="w-full pl-9 h-9 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-sage focus:bg-white transition-all" />
        </div>
        <span className="text-xs font-mono text-gray-400">{filtered.length} notes</span>
      </div>

      {/* Notes */}
      <div className="space-y-3">
        {filtered.map(note => (
          <div key={note.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-gray-300">{note.id}</span>
                  <span className="font-bold text-gray-800 text-sm">{note.name}</span>
                </div>
                <div className="text-[10px] font-mono text-gray-300 mt-0.5">Updated {note.updated} by {note.author}</div>
              </div>
              {editing !== note.id && (
                <button onClick={() => startEdit(note)} className="text-[10px] font-bold text-sage-dark hover:opacity-70 uppercase tracking-wide shrink-0">Edit Note</button>
              )}
            </div>

            {editing === note.id ? (
              <div className="space-y-2">
                <textarea
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-sage resize-none leading-relaxed"
                  rows={4}
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-[10px] font-bold text-gray-500 border border-gray-200 rounded-lg">Cancel</button>
                  <button onClick={() => saveEdit(note.id)} className="px-3 py-1.5 text-[10px] font-bold bg-sage text-white rounded-lg hover:bg-sage-dark">Save</button>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50/40 border border-amber-100/60 rounded-lg px-4 py-3">
                <p className="text-xs text-amber-900/70 leading-relaxed font-medium">{note.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white border border-dashed border-gray-200 rounded-xl">
          <p className="text-sm text-gray-400 font-medium">No notes found.</p>
        </div>
      )}
    </div>
  );
}
