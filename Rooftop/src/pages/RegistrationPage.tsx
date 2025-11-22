import React, { useState } from 'react';
import { FileSignature, Send, Download, CheckCircle, User, Phone, MapPin, Zap, Home } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useTranslations } from '../hooks/useTranslations';

interface RegistrationPageProps {
  language: string;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ language }) => {
  const { t } = useTranslations(language);
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    state: '',
    district: '',
    consumer_number: '',
    capacity: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `PSG-${Math.floor(Math.random() * 1000000)}`;
    setApplicationId(newId);
    setSubmitted(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(255, 153, 51); // Orange
    doc.text('PM Surya Ghar: Muft Bijli Yojana', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 128, 0); // Green
    doc.text('Application Acknowledgement', 105, 30, { align: 'center' });

    // Application ID Box
    doc.setDrawColor(0, 0, 0);
    doc.rect(140, 40, 60, 15);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`App ID: ${applicationId}`, 145, 50);

    // Date
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 50);

    // Content
    let y = 70;
    const lineHeight = 12;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Applicant Details', 15, y);
    y += lineHeight;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    const addField = (label: string, value: string) => {
        doc.text(`${label}:`, 20, y);
        doc.text(value, 80, y);
        y += lineHeight;
    };

    addField('Full Name', formData.fullname);
    addField('Mobile Number', formData.mobile);
    addField('State', formData.state);
    addField('District', formData.district);
    
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Installation Details', 15, y);
    y += lineHeight;
    doc.setFont('helvetica', 'normal');

    addField('Consumer Number', formData.consumer_number);
    addField('Proposed Capacity', `${formData.capacity} kW`);

    // Footer / Disclaimer
    y += 20;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Disclaimer: This is a computer-generated acknowledgement.', 105, y, { align: 'center' });
    doc.text('Please keep this ID for future reference.', 105, y + 5, { align: 'center' });

    doc.save(`PM_Surya_Ghar_Application_${applicationId}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8 space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-2 shadow-lg shadow-green-500/20">
            <FileSignature size={32} className="text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 neon-text">
            {t('registration.title')}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('registration.desc')}
        </p>
      </div>

      {!submitted ? (
        <div className="glass-pane rounded-2xl p-8 shadow-2xl border-t border-white/50 dark:border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Details Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
                        <User size={20} /> Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('form.fullname')}</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    name="fullname"
                                    required
                                    value={formData.fullname}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-400 outline-none"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('form.mobile')}</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    type="tel" 
                                    name="mobile"
                                    required
                                    pattern="[0-9]{10}"
                                    title="10 digit mobile number"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-400 outline-none"
                                    placeholder="Enter 10-digit number"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('form.state')}</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    name="state"
                                    required
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-400 outline-none"
                                    placeholder="State"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                             <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('form.district')}</label>
                             <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    name="district"
                                    required
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-400 outline-none"
                                    placeholder="District"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-300 dark:border-slate-700 my-6"></div>

                {/* Installation Details Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
                        <Home size={20} /> Installation Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('form.consumer_number')}</label>
                            <div className="relative">
                                <Zap className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    name="consumer_number"
                                    required
                                    value={formData.consumer_number}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-400 outline-none"
                                    placeholder="Electricity Consumer No."
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('form.capacity')}</label>
                            <div className="relative">
                                <Zap className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    type="number" 
                                    name="capacity"
                                    required
                                    min="1"
                                    max="10"
                                    step="0.5"
                                    value={formData.capacity}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-400 outline-none"
                                    placeholder="e.g., 3 kW"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Send size={20} />
                        {t('form.submit')}
                    </button>
                </div>
            </form>
        </div>
      ) : (
        <div className="glass-pane rounded-2xl p-8 shadow-2xl text-center animate-fade-in border-t-4 border-green-500">
             <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-green-500" />
             </div>
             <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('form.success')}</h3>
             <p className="text-slate-600 dark:text-slate-300 mb-6">{t('form.application_id')}: <span className="font-mono font-bold text-lg text-sky-600 dark:text-sky-400">{applicationId}</span></p>
             
             <div className="flex justify-center">
                 <button 
                    onClick={generatePDF}
                    className="bg-slate-800 dark:bg-slate-700 text-white px-6 py-3 rounded-xl hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 shadow-lg"
                 >
                    <Download size={20} />
                    {t('form.download_pdf')}
                 </button>
             </div>
             
             <button 
                onClick={() => { setSubmitted(false); setFormData({ fullname: '', mobile: '', state: '', district: '', consumer_number: '', capacity: '' }); }}
                className="mt-8 text-sm text-sky-600 dark:text-sky-400 hover:underline"
             >
                Submit another application
             </button>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;