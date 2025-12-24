import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  UserCircleIcon, 
  PencilSquareIcon, 
  MapPinIcon, 
  CheckIcon, 
  XMarkIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/login'); return; }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFormData(data);
    } catch (err) {
      console.error("Erreur profil:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          address: formData.address,
          civility: formData.civility
        })
        .eq('id', user.id);

      if (error) throw error;

      // Mise à jour locale pour éviter de recharger la page
      setProfile({ ...formData });
      setIsEditing(false);
      alert("Profil mis à jour avec succès !");
      
    } catch (error: any) {
      alert("Erreur : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) return (
    <div className="flex justify-center items-center min-h-screen bg-[#FAF9F6]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* EN-TÊTE : Espacement corrigé */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative mb-6">
            <div className="bg-primary text-white rounded-full w-24 h-24 shadow-xl flex items-center justify-center border-4 border-white">
              <span className="text-3xl font-serif italic font-bold">
                {profile?.first_name?.charAt(0)}{profile?.last_name?.charAt(0)}
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-black italic text-primary uppercase tracking-tighter">Mon Espace Personnel</h1>
          <div className="mt-4 px-6 py-1 bg-primary/10 rounded-full border border-primary/20">
             <span className="text-xs font-black uppercase tracking-widest text-primary">Membre Privilège ByAya</span>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-primary/5">
          <div className="p-8 md:p-12">
            
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-base-200">
              <h2 className="text-xl font-bold text-[#5D4037] flex items-center gap-2 italic font-serif">
                <UserCircleIcon className="w-6 h-6 text-primary" />
                Informations du compte
              </h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:border-primary rounded-full px-6"
                >
                  <PencilSquareIcon className="w-4 h-4 mr-2" /> Modifier
                </button>
              )}
            </div>

            {/* FORMULAIRE : Police plus grande et bordures visibles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-sm uppercase text-gray-500">Civilité</span>
                </label>
                {isEditing ? (
                  <select 
                    className="select select-bordered w-full text-base bg-white border-primary/30 h-14"
                    value={formData.civility}
                    onChange={(e) => setFormData({...formData, civility: e.target.value})}
                  >
                    <option value="Mme">Madame</option>
                    <option value="M.">Monsieur</option>
                  </select>
                ) : (
                  <p className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100">{profile?.civility || '—'}</p>
                )}
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-sm uppercase text-gray-500">Prénom</span>
                </label>
                {isEditing ? (
                  <input type="text" className="input input-bordered w-full text-base bg-white border-primary/30 h-14" 
                    value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
                ) : (
                  <p className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100">{profile?.first_name}</p>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-sm uppercase text-gray-500">Téléphone</span>
                </label>
                {isEditing ? (
                  <input 
                    type="tel" 
                    placeholder="079 000 00 00"
                    className="input input-bordered w-full text-base bg-white border-primary/30 h-14" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  />
                ) : (
                  <p className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100 flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4 opacity-40" /> {profile?.phone || 'Non renseigné'}
                  </p>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-sm uppercase text-gray-500">Nom de famille</span>
                </label>
                <p className="text-lg font-medium text-gray-400 py-2 border-b border-gray-100 italic">{profile?.last_name}</p>
              </div>
            </div>

            <div className="mt-12">
              <label className="label">
                <span className="label-text font-bold text-sm uppercase text-gray-500">Adresse de livraison</span>
              </label>
              {isEditing ? (
                <textarea 
                  className="textarea textarea-bordered w-full text-base bg-white border-primary/30 min-h-[120px]" 
                  value={formData.address} 
                  onChange={(e) => setFormData({...formData, address: e.target.value})} 
                />
              ) : (
                <div className="mt-2 p-6 bg-[#FAF9F6] rounded-2xl border border-gray-100">
                  <p className="text-gray-700 leading-relaxed italic">
                    {profile?.address || 'Aucune adresse enregistrée.'}
                  </p>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="mt-12 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="btn btn-primary flex-1 h-14 text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg"
                >
                  {loading ? 'Enregistrement...' : <><CheckIcon className="w-5 h-5 mr-2" /> Valider les changements</>}
                </button>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="btn btn-ghost h-14 font-bold text-gray-500 uppercase text-xs"
                >
                  <XMarkIcon className="w-5 h-5 mr-2" /> Annuler
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;