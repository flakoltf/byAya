import { 
  TruckIcon, 
  ArrowPathIcon, 
  BanknotesIcon, 
  ScaleIcon 
} from '@heroicons/react/24/outline';

const Terms = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* EN-TÊTE */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">Conditions Générales</span>
          <h1 className="text-4xl md:text-5xl font-black italic text-[#5D4037] uppercase tracking-tighter mb-6">
            CGV ByAya
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto opacity-20"></div>
        </div>

        {/* CONTENU DES CGV */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-primary/5 space-y-12">
          
          {/* ARTICLE 1 : CHAMP D'APPLICATION */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <ScaleIcon className="w-5 h-5 text-primary opacity-40" />
              <h2 className="text-xl font-black text-[#5D4037] uppercase tracking-tight">1. Champ d'application</h2>
            </div>
            <p className="text-[#8D6E63] leading-relaxed text-sm">
              Les présentes conditions générales de vente s'appliquent à toutes les commandes passées sur le site **ByAya.ch**. En validant votre commande, vous acceptez sans réserve ces conditions.
            </p>
          </section>

          {/* ARTICLE 2 : PRIX ET PAIEMENT */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <BanknotesIcon className="w-5 h-5 text-primary opacity-40" />
              <h2 className="text-xl font-black text-[#5D4037] uppercase tracking-tight">2. Prix et Paiement</h2>
            </div>
            <p className="text-[#8D6E63] leading-relaxed text-sm">
              Les prix sont indiqués en Francs Suisses (CHF). ByAya se réserve le droit de modifier ses prix à tout moment. Les paiements s'effectuent par carte bancaire ou TWINT via notre interface sécurisée.
            </p>
          </section>

          {/* ARTICLE 3 : LIVRAISON */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <TruckIcon className="w-5 h-5 text-primary opacity-40" />
              <h2 className="text-xl font-black text-[#5D4037] uppercase tracking-tight">3. Livraison</h2>
            </div>
            <p className="text-[#8D6E63] leading-relaxed text-sm">
              Nous livrons principalement en Suisse. Les délais de livraison sont de 2 à 5 jours ouvrables. La livraison est offerte selon les conditions indiquées lors du paiement. ByAya n'est pas responsable des retards causés par les prestataires de transport.
            </p>
          </section>

          {/* ARTICLE 4 : RETOURS ET REMBOURSEMENTS */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <ArrowPathIcon className="w-5 h-5 text-primary opacity-40" />
              <h2 className="text-xl font-black text-[#5D4037] uppercase tracking-tight">4. Retours</h2>
            </div>
            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-[#8D6E63] leading-relaxed text-sm italic">
                Pour des raisons d'hygiène et de sécurité sanitaire, les produits cosmétiques **ouverts ou utilisés** ne peuvent faire l'objet d'un retour ou d'un remboursement. 
              </p>
              <p className="text-[#8D6E63] leading-relaxed text-sm mt-3">
                Tout produit non ouvert peut être retourné dans son emballage d'origine sous 14 jours, les frais de retour étant à la charge du client.
              </p>
            </div>
          </section>

          {/* ARTICLE 5 : DROIT APPLICABLE */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-[#5D4037] uppercase tracking-tight">5. Droit applicable</h2>
            <p className="text-[#8D6E63] leading-relaxed text-sm">
              Le droit suisse est seul applicable. En cas de litige, le for juridique est établi à **Genève, Suisse**.
            </p>
          </section>

          <div className="pt-8 text-center border-t border-primary/5">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary opacity-30">
              ByAya Switzerland — Excellence & Transparence
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;