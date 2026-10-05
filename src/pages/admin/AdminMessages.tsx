import React, { useState, useEffect } from 'react';
import { Mail, Phone, Building, Calendar, DollarSign, Clock, Trash2, CheckCircle2, Reply, Search, Eye, X } from 'lucide-react';
import { api } from '../../services/api';
import { ContactInquiry } from '../../types';
import { useToast } from '../../contexts/ToastContext';

export const AdminMessages: React.FC = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const { success, error } = useToast();

  const loadMessages = async () => {
    const data = await api.getInquiries();
    setInquiries(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ContactInquiry['status']) => {
    await api.updateInquiryStatus(id, newStatus);
    success(`Lead status updated to ${newStatus}`);
    loadMessages();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this inquiry permanently?')) {
      await api.deleteInquiry(id);
      success('Inquiry deleted.');
      setSelectedInquiry(null);
      loadMessages();
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchStatus = filterStatus === 'all' || inq.status === filterStatus;
    const matchSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.message.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: ContactInquiry['status']) => {
    switch (status) {
      case 'new':
        return 'bg-emerald-500/20 text-emerald-400 light:text-emerald-700 border-emerald-500/30';
      case 'read':
        return 'bg-blue-500/20 text-blue-400 light:text-blue-700 border-blue-500/30';
      case 'contacted':
        return 'bg-purple-500/20 text-purple-400 light:text-purple-700 border-purple-500/30';
      case 'qualified':
        return 'bg-amber-500/20 text-amber-400 light:text-amber-700 border-amber-500/30';
      case 'closed':
        return 'bg-slate-700 light:bg-slate-200 text-slate-300 light:text-slate-700 border-slate-600';
      case 'spam':
        return 'bg-rose-500/20 text-rose-400 light:text-rose-700 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white light:text-slate-900">
          Messages & Project Leads
        </h1>
        <p className="text-xs text-slate-400 light:text-slate-600">
          Review incoming client inquiries, update lead lifecycle stages, and reply directly.
        </p>
      </div>

      {/* Message Modal Preview */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1021] light:bg-white border border-white/10 light:border-slate-300 rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 light:border-slate-200">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusBadge(selectedInquiry.status)}`}>
                  {selectedInquiry.status}
                </span>
                <span className="text-xs font-mono text-slate-400 light:text-slate-500">
                  {new Date(selectedInquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white light:hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-lg font-bold text-white light:text-slate-900 mb-1">{selectedInquiry.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-slate-400 light:text-slate-600">
                  <span className="text-blue-400 light:text-blue-600 font-semibold">{selectedInquiry.email}</span>
                  {selectedInquiry.phone && <span>• {selectedInquiry.phone}</span>}
                  {selectedInquiry.company && <span>• {selectedInquiry.company}</span>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-white/5 light:border-slate-200 font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 light:text-slate-600 block">Type:</span>
                  <span className="text-slate-200 light:text-slate-800">{selectedInquiry.projectType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 light:text-slate-600 block">Budget:</span>
                  <span className="text-emerald-400 light:text-emerald-600 font-bold">{selectedInquiry.budget || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 light:text-slate-600 block">Timeline:</span>
                  <span className="text-slate-200 light:text-slate-800">{selectedInquiry.timeline || 'N/A'}</span>
                </div>
              </div>

              {selectedInquiry.subject && (
                <div>
                  <span className="text-[11px] font-mono text-slate-400 light:text-slate-600 block mb-1 font-semibold">Subject:</span>
                  <p className="text-sm font-semibold text-slate-200 light:text-slate-800">{selectedInquiry.subject}</p>
                </div>
              )}

              <div>
                <span className="text-[11px] font-mono text-slate-400 light:text-slate-600 block mb-1 font-semibold">Message Body:</span>
                <div className="p-4 rounded-xl bg-slate-900 light:bg-slate-50 border border-white/5 light:border-slate-200 text-slate-300 light:text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update & Actions */}
              <div className="pt-4 border-t border-white/10 light:border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 light:text-slate-600 font-mono">Status:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedInquiry.id,
                        e.target.value as ContactInquiry['status']
                      )
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 light:bg-slate-100 border border-white/10 light:border-slate-300 text-white light:text-slate-900 font-mono text-xs focus:outline-none"
                  >
                    <option value="new">new</option>
                    <option value="read">read</option>
                    <option value="contacted">contacted</option>
                    <option value="qualified">qualified</option>
                    <option value="closed">closed</option>
                    <option value="spam">spam</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(
                      selectedInquiry.subject || 'Project Inquiry'
                    )}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="p-2 rounded-xl bg-rose-950/50 light:bg-rose-100 hover:bg-rose-900 light:hover:bg-rose-200 text-rose-300 light:text-rose-700"
                    title="Delete Message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['all', 'new', 'read', 'contacted', 'qualified', 'closed', 'spam'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all ${
                filterStatus === status
                  ? 'bg-blue-600 text-white font-bold shadow-glow-sm'
                  : 'bg-slate-900/80 light:bg-slate-100 text-slate-400 light:text-slate-700 hover:bg-slate-800 light:hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 light:bg-white border border-white/10 light:border-slate-300 text-xs text-white light:text-slate-900 placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="rounded-2xl border border-white/10 light:border-slate-300 bg-[#0a0f20]/90 light:bg-white overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#080c1a] light:bg-slate-100 border-b border-white/10 light:border-slate-300 text-slate-400 light:text-slate-600 font-mono uppercase">
              <tr>
                <th className="p-4">Sender & Contact</th>
                <th className="p-4">Project Type</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 light:divide-slate-200 text-slate-300 light:text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 light:text-slate-400">
                    No inquiries match this criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-slate-800/40 light:hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedInquiry(inq);
                      if (inq.status === 'new') handleStatusChange(inq.id, 'read');
                    }}
                  >
                    <td className="p-4">
                      <div className="font-bold text-white light:text-slate-900">{inq.name}</div>
                      <div className="text-slate-400 light:text-slate-500 text-[11px]">{inq.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-cyan-300 light:text-blue-700">{inq.projectType}</span>
                    </td>
                    <td className="p-4 font-mono text-emerald-400 light:text-emerald-700 font-semibold">
                      {inq.budget || '—'}
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusBadge(inq.status)}`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-500 light:text-slate-600">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            if (inq.status === 'new') handleStatusChange(inq.id, 'read');
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 light:bg-slate-100 light:hover:bg-slate-200 text-slate-300 light:text-slate-700 hover:text-white"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-1.5 rounded-lg bg-rose-950/40 light:bg-rose-100 hover:bg-rose-900 light:hover:bg-rose-200 text-rose-400 light:text-rose-700"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
