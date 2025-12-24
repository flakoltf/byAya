import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PlusIcon, TrashIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // Savoir si on modifie ou on ajoute

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    category: 'Shampoing',
    image_url: '',
    description: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  // Ouvrir le modal pour modifier
  const openEditModal = (product: any) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      image_url: product.image_url,
      description: product.description
    });
    setShowModal(true);
  };

  // Réinitialiser et ouvrir le modal pour ajouter
  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', price: 0, stock: 0, category: 'Shampoing', image_url: '', description: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // MODE MODIFICATION
      const { error } = await supabase.from('products').update(formData).eq('id', editingId);
      if (!error) {
        setShowModal(false);
        fetchProducts();
      }
    } else {
      // MODE AJOUT
      const { error } = await supabase.from('products').insert([formData]);
      if (!error) {
        setShowModal(false);
        fetchProducts();
      }
    }
  };

  const deleteProduct = async (id: string) => {
    if (window.confirm("Supprimer ce produit ?")) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold italic text-primary">Catalogue Admin</h1>
          <button onClick={openAddModal} className="btn btn-primary rounded-full">
            <PlusIcon className="w-5 h-5 mr-2" /> Nouveau Produit
          </button>
        </div>

        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>Produit</th>
                <th>Prix</th>
                <th>Stock</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={p.image_url} className="w-10 h-10 object-cover rounded" />
                      <span className="font-bold">{p.name}</span>
                    </div>
                  </td>
                  <td>{p.price}CHF</td>
                  <td><div className={`badge ${p.stock > 0 ? 'badge-success' : 'badge-error'}`}>{p.stock}</div></td>
                  <td className="text-right space-x-2">
                    <button onClick={() => openEditModal(p)} className="btn btn-ghost btn-sm text-info">
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="btn btn-ghost btn-sm text-error">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL UNIQUE POUR AJOUT / MODIF */}
      {showModal && (
        <div className="modal modal-open">
          <form onSubmit={handleSubmit} className="modal-box max-w-2xl relative">
            <button 
              type="button" 
              onClick={() => setShowModal(false)} 
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
            
            <h3 className="font-bold text-xl mb-6">
              {editingId ? "Modifier le produit" : "Ajouter un nouveau produit"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text mb-1">Nom</label>
                <input type="text" className="input input-bordered w-full" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-control">
                <label className="label-text mb-1">Catégorie</label>
                <select className="select select-bordered" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>Shampoing</option>
                  <option>Après-Shampoing</option>
                  <option>Masque</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label-text mb-1">Prix (CHF)</label>
                <input type="number" step="0.01" className="input input-bordered" required
                  value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} />
              </div>
              <div className="form-control">
                <label className="label-text mb-1">Stock</label>
                <input type="number" className="input input-bordered" required
                  value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label-text mb-1">URL de l'image</label>
                <input type="text" className="input input-bordered" required
                  value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label-text mb-1">Description</label>
                <textarea className="textarea textarea-bordered h-20"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary w-full">
                {editingId ? "Mettre à jour" : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;