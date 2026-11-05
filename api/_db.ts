export interface StoredSubmission {
  id: string;
  service: string;
  fullName: string;
  age: string;
  whatsapp: string;
  answers: Record<string, any>;
  status: string;
  coachNotes: string;
  language: string;
  createdAt: string;
}

// In-memory store for serverless lambda instances with initial demo entries
const globalStore = globalThis as unknown as { __BOUKRAA_SUBMISSIONS__?: StoredSubmission[] };

if (!globalStore.__BOUKRAA_SUBMISSIONS__) {
  globalStore.__BOUKRAA_SUBMISSIONS__ = [
    {
      id: 'BK-2026-9041',
      service: 'strength_conditioning',
      fullName: 'Yassine Benali',
      age: '24',
      whatsapp: '+212661234567',
      answers: {
        fullName: 'Yassine Benali',
        age: '24',
        whatsapp: '+212661234567',
        sport: 'Football (Milieu défensif)',
        mainGoal: 'Améliorer la puissance et l’endurance de vitesse',
        trainingLevel: 'Avancé',
        limitations: 'Rien',
        duration: '3 mois',
        frequency: '4 séances / semaine',
      },
      status: 'NEW',
      coachNotes: 'Profil athlétique intéressant. Bon volume de jeu.',
      language: 'fr',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'BK-2026-8722',
      service: 'reathletisation',
      fullName: 'Mehdi Amrani',
      age: '28',
      whatsapp: '+212668987654',
      answers: {
        fullName: 'Mehdi Amrani',
        age: '28',
        whatsapp: '+212668987654',
        sport: 'CrossFit / Running',
        injury: 'Entorse cheville droite grade 2',
        injuryDate: 'Il y a 8 semaines',
        rehabDone: 'Oui',
        clearedReturn: 'Oui',
        physioRecommendation: 'Reprise progressive de l’impact et de la pliométrie',
        duration: '2 mois',
        frequency: '3 séances / semaine',
      },
      status: 'REVIEWING',
      coachNotes: 'Attente du compte-rendu kiné pour calibrer les impacts.',
      language: 'fr',
      createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    },
  ];
}

export const submissionsDb = {
  getAll: (service?: string, status?: string, search?: string) => {
    let list = [...(globalStore.__BOUKRAA_SUBMISSIONS__ || [])];

    if (service && service !== 'ALL') {
      list = list.filter((s) => s.service === service);
    }
    if (status && status !== 'ALL') {
      list = list.filter((s) => s.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.whatsapp.includes(q) ||
          s.id.toLowerCase().includes(q) ||
          JSON.stringify(s.answers).toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  add: (submission: StoredSubmission) => {
    if (!globalStore.__BOUKRAA_SUBMISSIONS__) {
      globalStore.__BOUKRAA_SUBMISSIONS__ = [];
    }
    globalStore.__BOUKRAA_SUBMISSIONS__.unshift(submission);
    if (globalStore.__BOUKRAA_SUBMISSIONS__.length > 200) {
      globalStore.__BOUKRAA_SUBMISSIONS__.pop();
    }
    return submission;
  },

  updateStatus: (id: string, status: string) => {
    const list = globalStore.__BOUKRAA_SUBMISSIONS__ || [];
    const item = list.find((s) => s.id === id);
    if (item) {
      item.status = status;
      return true;
    }
    return false;
  },

  updateNotes: (id: string, coachNotes: string) => {
    const list = globalStore.__BOUKRAA_SUBMISSIONS__ || [];
    const item = list.find((s) => s.id === id);
    if (item) {
      item.coachNotes = coachNotes;
      return true;
    }
    return false;
  },

  delete: (id: string) => {
    const list = globalStore.__BOUKRAA_SUBMISSIONS__ || [];
    const idx = list.findIndex((s) => s.id === id);
    if (idx !== -1) {
      list.splice(idx, 1);
      return true;
    }
    return false;
  },
};
