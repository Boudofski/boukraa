import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AssessmentSubmission, SubmissionStatus } from '../types';
import {
  X,
  Lock,
  Search,
  Download,
  MessageSquare,
  Eye,
  Trash2,
  RefreshCw,
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const { locale, t } = useLanguage();
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('boukraa_admin_token'));
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<AssessmentSubmission | null>(null);

  // Filters
  const [serviceFilter, setServiceFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Coach notes live state
  const [coachNotesText, setCoachNotesText] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const fetchSubmissions = async (authToken: string) => {
    setIsLoading(true);
    try {
      let url = '/api/admin/submissions?';
      if (serviceFilter !== 'ALL') url += `service=${serviceFilter}&`;
      if (statusFilter !== 'ALL') url += `status=${statusFilter}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.status === 401) {
        setToken(null);
        sessionStorage.removeItem('boukraa_admin_token');
        return;
      }

      const data = await res.json();
      if (data.submissions) {
        setSubmissions(data.submissions);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchSubmissions(token);
    }
  }, [isOpen, token, serviceFilter, statusFilter, searchQuery]);

  // Synchronize notes when modal opens for selected submission
  useEffect(() => {
    if (selectedSubmission) {
      setCoachNotesText(selectedSubmission.coachNotes || '');
    }
  }, [selectedSubmission]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        sessionStorage.setItem('boukraa_admin_token', data.token);
        fetchSubmissions(data.token);
      } else {
        setAuthError(data.error || 'Mot de passe invalide');
      }
    } catch (err) {
      setAuthError('Erreur de connexion');
    }
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('boukraa_admin_token');
    setSubmissions([]);
    setSelectedSubmission(null);
  };

  const handleStatusChange = async (id: string, newStatus: SubmissionStatus) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
        );
        if (selectedSubmission?.id === id) {
          setSelectedSubmission((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!token || !selectedSubmission) return;
    setIsSavingNotes(true);
    try {
      const res = await fetch(`/api/admin/submissions/${selectedSubmission.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ coachNotes: coachNotesText }),
      });
      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub.id === selectedSubmission.id ? { ...sub, coachNotes: coachNotesText } : sub
          )
        );
      }
    } catch (err) {
      console.error('Failed to update notes', err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!window.confirm(t.admin.detailsModal.deleteConfirm)) return;

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        setSelectedSubmission(null);
      }
    } catch (err) {
      console.error('Failed to delete submission', err);
    }
  };

  const handleExportCsv = () => {
    if (!token) return;
    window.open(`/api/admin/export?token=${token}`, '_blank');
  };

  const openClientWhatsApp = (sub: AssessmentSubmission) => {
    const rawNumber = sub.whatsapp.replace(/[^0-9]/g, '');
    const clientName = sub.fullName;
    let greeting = `Bonjour ${clientName}, c'est Coach Mohamed Amine Boukraa. J'ai bien reçu votre bilan d'évaluation (${sub.id}) pour le service ${sub.service}.`;
    if (sub.language === 'ar') {
      greeting = `السلام عليكم ${clientName}، معك الكوتش بوكرع محمد أمين. لقد استلمت تقييمك الرياضي (${sub.id}) وأود مناقشة خطتك التدريبية.`;
    } else if (sub.language === 'en') {
      greeting = `Hello ${clientName}, this is Coach Mohamed Amine Boukraa. I reviewed your training assessment (${sub.id}) and would like to connect.`;
    }
    const url = `https://wa.me/${rawNumber}?text=${encodeURIComponent(greeting)}`;
    window.open(url, '_blank');
  };

  const statusColors: Record<SubmissionStatus, string> = {
    NEW: 'bg-red-500/20 text-red-400 border-red-500/40',
    REVIEWING: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    CONTACTED: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    ACCEPTED: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    PAYMENT_PENDING: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    ACTIVE: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    COMPLETED: 'bg-gray-500/20 text-gray-300 border-gray-500/40',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-brand-surface rounded-3xl border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-brand-surface/90 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-mark.png" alt="BOUKRAA" className="h-7 w-auto object-contain" />
            <div>
              <h2 className="text-base font-black uppercase text-white tracking-wider flex items-center gap-2">
                <span>{t.admin.title}</span>
                <span className="text-[10px] font-mono font-bold bg-brand-red text-white px-2 py-0.5 rounded">
                  ADMIN V1
                </span>
              </h2>
              <p className="text-xs text-brand-silver/70 font-medium">
                {t.admin.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-bold text-brand-silver hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/[0.08] transition-colors"
              >
                {t.admin.logoutBtn}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-brand-gray hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!token ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-12 text-center">
              <div className="w-14 h-14 rounded-full bg-brand-navy border border-brand-red/40 flex items-center justify-center mx-auto mb-6 text-brand-red shadow-inner">
                <Lock className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black text-white uppercase tracking-wide mb-2">
                {t.admin.loginTitle}
              </h3>
              <p className="text-xs sm:text-sm text-brand-silver/80 mb-6 font-medium">
                {t.admin.loginPrompt}
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoFocus
                  className="w-full px-4 py-3.5 bg-brand-navy border border-white/[0.12] focus:border-brand-red rounded-xl text-white text-center text-lg font-mono tracking-widest focus:outline-none"
                />

                {authError && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-brand-red/40 text-red-200 text-xs font-semibold">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-red hover:bg-brand-redHover text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-brand-red/30"
                >
                  {t.admin.loginBtn}
                </button>
              </form>
            </div>
          ) : (
            /* Admin Submissions Dashboard */
            <div className="space-y-6">
              
              {/* Top Stats Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-brand-navy border border-white/[0.08]">
                  <div className="text-xs text-brand-gray uppercase font-bold font-mono">Total Reçus</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">
                    {submissions.length}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-brand-navy border border-red-500/30">
                  <div className="text-xs text-red-400 uppercase font-bold font-mono">Nouveaux</div>
                  <div className="text-2xl font-black text-red-400 font-mono mt-1">
                    {submissions.filter((s) => s.status === 'NEW').length}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-brand-navy border border-blue-500/30">
                  <div className="text-xs text-blue-400 uppercase font-bold font-mono">Contactés</div>
                  <div className="text-2xl font-black text-blue-400 font-mono mt-1">
                    {submissions.filter((s) => s.status === 'CONTACTED').length}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-brand-navy border border-emerald-500/30">
                  <div className="text-xs text-emerald-400 uppercase font-bold font-mono">Acceptés / Actifs</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                    {submissions.filter((s) => s.status === 'ACCEPTED' || s.status === 'ACTIVE').length}
                  </div>
                </div>
              </div>

              {/* Filters & Actions Bar */}
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-brand-navy p-4 rounded-2xl border border-white/[0.08]">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search box */}
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-brand-gray absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.admin.searchPlaceholder}
                      className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 bg-brand-surface border border-white/[0.1] rounded-xl text-xs text-white placeholder:text-brand-gray/60 focus:outline-none focus:border-brand-red"
                    />
                  </div>

                  {/* Service filter */}
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="px-3 py-2.5 bg-brand-surface border border-white/[0.1] rounded-xl text-xs font-bold text-brand-silver focus:outline-none"
                  >
                    <option value="ALL">{t.admin.allServices}</option>
                    <option value="strength_conditioning">Strength & Conditioning</option>
                    <option value="reathletisation">Réathlétisation</option>
                    <option value="private_coaching">Private Coaching</option>
                  </select>

                  {/* Status filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2.5 bg-brand-surface border border-white/[0.1] rounded-xl text-xs font-bold text-brand-silver focus:outline-none"
                  >
                    <option value="ALL">{t.admin.allStatuses}</option>
                    {Object.entries(t.admin.statusLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => token && fetchSubmissions(token)}
                    className="p-2.5 bg-brand-surface hover:bg-white/10 border border-white/[0.08] rounded-xl text-brand-silver hover:text-white"
                    title="Actualiser"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/[0.1] rounded-xl text-xs font-bold text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.admin.exportCsv}</span>
                  </button>
                </div>
              </div>

              {/* Submissions Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-brand-navy">
                <table className="w-full text-left rtl:text-right border-collapse text-xs">
                  <thead>
                    <tr className="bg-brand-surface text-brand-gray uppercase tracking-wider border-b border-white/[0.08]">
                      <th className="p-3.5 font-bold">{t.admin.table.id}</th>
                      <th className="p-3.5 font-bold">{t.admin.table.client}</th>
                      <th className="p-3.5 font-bold">{t.admin.table.service}</th>
                      <th className="p-3.5 font-bold">{t.admin.table.sport}</th>
                      <th className="p-3.5 font-bold">{t.admin.table.date}</th>
                      <th className="p-3.5 font-bold">{t.admin.table.status}</th>
                      <th className="p-3.5 font-bold text-right rtl:text-left">{t.admin.table.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-brand-gray">
                          {t.admin.emptyState}
                        </td>
                      </tr>
                    ) : (
                      submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-brand-red">
                            {sub.id}
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-white text-sm">{sub.fullName}</div>
                            <div className="text-brand-gray text-[11px] font-mono">
                              {sub.whatsapp} · {sub.age} ans
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded bg-brand-surface border border-white/[0.08] text-[11px] font-bold text-brand-silver uppercase">
                              {sub.service === 'strength_conditioning'
                                ? 'S&C'
                                : sub.service === 'reathletisation'
                                ? 'Réathlétisation'
                                : 'Coaching Privé'}
                            </span>
                          </td>
                          <td className="p-3.5 text-brand-silver font-medium">
                            {sub.answers.sport || '—'}
                          </td>
                          <td className="p-3.5 text-brand-gray font-mono">
                            {new Date(sub.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-MA' : 'fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={sub.status}
                              onChange={(e) => handleStatusChange(sub.id, e.target.value as SubmissionStatus)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-black border uppercase focus:outline-none ${
                                statusColors[sub.status] || 'bg-brand-navy text-white'
                              }`}
                            >
                              {Object.entries(t.admin.statusLabels).map(([val, lbl]) => (
                                <option key={val} value={val} className="bg-brand-navy text-white">
                                  {lbl}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-3.5 text-right rtl:text-left space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => openClientWhatsApp(sub)}
                              title="Contacter sur WhatsApp"
                              className="p-2 bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-lg border border-emerald-500/30 transition-colors inline-flex items-center"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setSelectedSubmission(sub)}
                              title="Voir la fiche complète"
                              className="p-2 bg-brand-surface text-brand-silver hover:text-white hover:bg-brand-red rounded-lg border border-white/[0.1] transition-colors inline-flex items-center"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Athlete Full Profile Details Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-brand-surface rounded-3xl border border-white/[0.12] shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="px-6 py-4 bg-brand-navy border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">
                  DOSSIER ATHLÈTE · {selectedSubmission.id}
                </span>
                <h3 className="text-xl font-black text-white uppercase">
                  {selectedSubmission.fullName} ({selectedSubmission.age} ans)
                </h3>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1.5 text-brand-gray hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left rtl:text-right">
              
              {/* Quick Action Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-brand-navy border border-white/[0.08]">
                <div>
                  <div className="text-xs text-brand-gray font-medium">WhatsApp direct :</div>
                  <div className="font-mono text-sm font-bold text-white">
                    {selectedSubmission.whatsapp}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openClientWhatsApp(selectedSubmission)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.admin.detailsModal.openWhatsApp}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(selectedSubmission.id)}
                    className="p-2.5 text-brand-gray hover:text-red-400 bg-brand-surface rounded-xl border border-white/[0.08]"
                    title={t.admin.detailsModal.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Questionnaire Answers Breakdown */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-red mb-3">
                  {t.admin.detailsModal.serviceDetails}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(selectedSubmission.answers).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-4 rounded-xl bg-brand-navy border border-white/[0.08]"
                    >
                      <div className="text-[11px] font-semibold text-brand-gray uppercase mb-1">
                        {key}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white break-words">
                        {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach Private Notes Field */}
              <div className="pt-4 border-t border-white/[0.08]">
                <label className="block text-xs font-black uppercase tracking-wider text-brand-silver mb-2">
                  {t.admin.detailsModal.coachNotesLabel}
                </label>
                <textarea
                  rows={3}
                  value={coachNotesText}
                  onChange={(e) => setCoachNotesText(e.target.value)}
                  placeholder={t.admin.detailsModal.notesPlaceholder}
                  className="w-full px-4 py-3 bg-brand-navy border border-white/[0.1] rounded-xl text-xs sm:text-sm text-white placeholder:text-brand-gray/50 focus:outline-none focus:border-brand-red"
                />
                <div className="mt-2.5 flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    className="px-5 py-2 bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors shadow-md shadow-brand-red/20"
                  >
                    {isSavingNotes ? 'Enregistrement...' : 'Sauvegarder la note'}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};
