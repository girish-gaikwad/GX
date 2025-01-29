"use client";
import { useState, useEffect } from 'react';
import { Shield, Search, AlertCircle, MessageSquare, Truck, Loader2, MapPin, Clock, DollarSign, BarChart3, HandshakeIcon, Send, CheckCircle, XCircle, X } from 'lucide-react';

// Toast Context and Provider
const ToastContext = React.createContext(null);

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400" />
  };

  const backgrounds = {
    success: 'bg-emerald-500/10 border-emerald-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    warning: 'bg-amber-500/10 border-amber-500/20'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md transform transition-all duration-300 ${backgrounds[type]} rounded-lg border p-4`}>
      <div className="flex items-start gap-3">
        {icons[type]}
        <div className="flex-1 pt-0.5">
          <p className="text-sm font-medium text-white">{message.title}</p>
          {message.description && (
            <p className="mt-1 text-sm text-gray-400">{message.description}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Custom Slider Component (unchanged)
const CustomSlider = ({ value, onChange, min, max, step }) => {
  // ... (keep existing CustomSlider code)
};

const NegotiationDialog = ({ isOpen, onClose, partner }) => {
  const { showToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [negotiatedRate, setNegotiatedRate] = useState(partner?.base_rate_per_kg || 0);
  const [sending, setSending] = useState(false);

  const minRate = (partner?.base_rate_per_kg || 0) * 0.7;
  const maxRate = (partner?.base_rate_per_kg || 0) * 1.3;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setNegotiatedRate(partner?.base_rate_per_kg || 0);
    }
  }, [isOpen, partner]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setMessage('');
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch('/api/send-negotiation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: partner.contact_email,
          subject: `Rate Negotiation Request - ${partner.partner_name}`,
          partnerName: partner.partner_name,
          contactPerson: partner.contact_person,
          currentRate: partner.base_rate_per_kg,
          proposedRate: negotiatedRate,
          message: message,
          region: partner.region,
          serviceType: partner.service_type
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      showToast({
        title: "Success!",
        description: "Your negotiation request has been sent successfully."
      }, 'success');

      handleClose();
    } catch (error) {
      console.error('Email sending error:', error);
      showToast({
        title: "Error",
        description: error.message || "Failed to send negotiation request"
      }, 'error');
    } finally {
      setSending(false);
    }
  };

  // ... (rest of the NegotiationDialog component code remains the same)
};

export default function LogisticsPage() {
  const [negotiationDialog, setNegotiationDialog] = useState({
    isOpen: false,
    partner: null
  });

  const handleNegotiate = (partnerId) => {
    const partner = results.find(p => p.id === partnerId);
    setNegotiationDialog({
      isOpen: true,
      partner
    });
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* ... (keep existing JSX) ... */}
        
        <NegotiationDialog
          isOpen={negotiationDialog.isOpen}
          onClose={() => setNegotiationDialog({ isOpen: false, partner: null })}
          partner={negotiationDialog.partner}
        />
      </div>
    </ToastProvider>
  );
}