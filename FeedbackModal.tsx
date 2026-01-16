import React, { useState } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden">
        <div className="bg-blue-600 px-8 py-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-bold italic uppercase">Feedback</h3>
          <button onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        </div>
        <div className="p-8">
          {submitted ? (
            <div className="text-center py-10">
              <i className="fa-solid fa-check-circle text-6xl text-green-500 mb-6"></i>
              <h4 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 italic uppercase">Thank You!</h4>
              <button onClick={onClose} className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-bold uppercase text-xs">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Name" className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-4 py-3 outline-none dark:text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required type="email" placeholder="Email" className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-4 py-3 outline-none dark:text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <textarea required rows={4} placeholder="Your Message" className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-4 py-3 outline-none dark:text-white" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs">
                {loading ? "Sending..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;