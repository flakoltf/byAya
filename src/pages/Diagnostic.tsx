import { useState } from 'react';
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

const Diagnostic = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 'type',
      title: "Quel est votre type de cheveu ?",
      options: [
        { label: "Lisses", value: "lisses", icon: "I" },
        { label: "Ondulés", value: "ondules", icon: "S" },
        { label: "Bouclés", value: "boucles", icon: "C" },
        { label: "Crépus", value: "crepus", icon: "Z" }
      ]
    },
    {
      id: 'condition',
      title: "Comment décririez-vous vos cheveux ?",
      options: [
        { label: "Secs & Cassants", value: "secs" },
        { label: "Gras en racines", value: "gras" },
        { label: "Ternes / Sans éclat", value: "ternes" },
        { label: "Sains", value: "sains" }
      ]
    },
    {
      id: 'priority',
      title: "Quelle est votre priorité n°1 ?",
      options: [
        { label: "Hydratation intense", value: "hydratation" },
        { label: "Volume & Vitalité", value: "volume" },
        { label: "Croissance / Anti-chute", value: "croissance" },
        { label: "Éclat & Brillance", value: "eclat" }
      ]
    }
  ];

  const handleAnswer = (optionValue: string) => {
    setAnswers({ ...answers, [questions[step].id]: optionValue });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetDiagnostic = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-[3rem] p-12 shadow-2xl border border-primary/10 text-center animate-fade-in">
          <SparklesIcon className="w-16 h-16 text-primary mx-auto mb-6 opacity-40" />
          <h2 className="text-3xl font-black text-[#5D4037] uppercase tracking-tighter mb-4">Votre Diagnostic ByAya</h2>
          <p className="text-[#8D6E63] mb-8">
            Selon vos réponses, vos cheveux ont besoin d'une cure de <strong>Nutrition Intense</strong>.
          </p>
          
          <div className="bg-[#FAF9F6] rounded-2xl p-6 mb-8 text-left border border-primary/5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 text-center">Votre routine recommandée</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-bold text-[#5D4037]">
                <CheckCircleIcon className="w-5 h-5 text-primary" /> Shampoing Douceur de Soie
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-[#5D4037]">
                <CheckCircleIcon className="w-5 h-5 text-primary" /> Masque Réparateur aux Huiles Suisses
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <button className="w-full py-4 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl shadow-xl hover:bg-[#A68966] transition-all">
              Ajouter la routine au panier
            </button>
            <button 
              onClick={resetDiagnostic}
              className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#8D6E63] hover:text-primary transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4" /> Recommencer le test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* PROGRESS BAR */}
        <div className="w-full h-1 bg-primary/10 rounded-full mb-12 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">Question {step + 1} sur {questions.length}</span>
          <h2 className="text-4xl font-black text-[#5D4037] uppercase tracking-tighter leading-tight">
            {questions[step].title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions[step].options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="group bg-white p-8 rounded-2xl border border-primary/5 shadow-sm hover:border-primary/40 hover:shadow-xl transition-all text-center flex flex-col items-center gap-4"
            >
              <span className="text-sm font-black uppercase tracking-widest text-[#5D4037] group-hover:text-primary">
                {option.label}
              </span>
              <ArrowRightIcon className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diagnostic;