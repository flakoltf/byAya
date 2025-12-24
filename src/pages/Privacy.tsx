import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  EyeIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

const Privacy = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* EN-TÊTE */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">Confidentialité</span>
          <h1 className="text-4xl md:text-5xl font-black italic text-[#5D4037] uppercase tracking-tighter mb-6">
            Protection de vos données
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto opacity-20"></div>
        </div>

        {/* CONTENU PRINCIPAL */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-primary/5 space-y-12">
          
          {/* INTRODUCTION */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <DocumentTextIcon className="w-5 h-5 text-primary opacity-40" />
              <h2 className="text-xl font-black text-[#5D4037] uppercase tracking-tight">1. Notre Engagement</h2>
            </div>
            <p className="text-[#8D6E63] leading-relaxed text-sm">
              Chez ByAya, nous accordons une importance capitale à la protection de votre vie privée. Cette politique vous informe sur la manière dont nous traitons vos données personnelles lorsque vous utilisez notre boutique en ligne, conformément à la Loi fédérale sur la Protection des Données (LPD) en Suisse.
            </p>
          </section>

          {/* COLLECTE DES DONNÉES */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <EyeIcon className="w-5 h-5 text-primary opacity-40" />
              <h2 className="text-xl font-black text-[#5D4037] uppercase tracking-tight">2. Données collectées</h2>
            </div>
            <p className="text-[#8D6E63] leading-relaxed text-sm">
              Nous collectons uniquement les informations nécessaires au bon déroulement de votre rituel de soin :
            </p>
            <ul className="list-disc list-inside text-[#8D6E63] text-sm space-y-2 ml-4">
              <li>Informations d'identité (Nom, prénom).</li>
              <li>Coordonnées (Adresse postale, email, téléphone) pour la livraison.</li>
              <li>Données de paiement (traitées de manière cryptée par nos partenaires certifiés).</li>
              <li>Réponses au diagnostic capillaire pour personnaliser nos recommandations.</li>
            </ul>
          </section>

          {/* SÉCURITÉ */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <LockClosedIcon className="w-5 h-5 text-primary opacity-40" />
              <h2 className="text-xl font-black text-[#5D4037] uppercase tracking-tight">3. Sécurité</h2>
            </div>
            <p className="text-[#8D6E63] leading-relaxed text-sm">
              Vos données sont stockées sur des serveurs hautement sécurisés. Nous utilisons le protocole SSL pour crypter toutes les informations transitant entre votre appareil et notre boutique.
            </p>
          </section>

          {/* VOS DROITS */}
          <section className="p-8 bg-[#FAF9F6] rounded-2xl border border-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-black text-[#5D4037] uppercase tracking-tight">4. Vos Droits</h2>
            </div>
            <p className="text-[#8D6E63] leading-relaxed text-sm">
              En tant qu'utilisateur, vous avez le droit de demander l'accès, la rectification ou la suppression de vos données à tout moment. Pour toute question concernant vos données, contactez notre support à : 
              <br />
              <strong className="text-primary block mt-2 text-base">contact@byaya.ch</strong>
            </p>
          </section>

          <div className="pt-8 text-center border-t border-primary/5">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary opacity-30">
              ByAya Switzerland — Mise à jour Décembre 2025
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Privacy;