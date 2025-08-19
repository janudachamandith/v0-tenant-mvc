import { useState } from 'react';
import { CreditCard, Calendar, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

const PayRent = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const rentDue = {
    property: 'Oak Street Apartment',
    amount: 1200,
    dueDate: '2024-01-31',
    status: 'due'
  };

  const paymentHistory = [
    { id: 1, date: '2023-12-01', property: 'Oak Street Apartment', amount: 1200, status: 'paid' },
    { id: 2, date: '2023-11-01', property: 'Oak Street Apartment', amount: 1200, status: 'paid' },
    { id: 3, date: '2023-10-01', property: 'Oak Street Apartment', amount: 1200, status: 'paid' },
    { id: 4, date: '2023-09-01', property: 'Oak Street Apartment', amount: 1200, status: 'paid' },
  ];

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="status-badge bg-success-light text-success">Paid</span>;
      case 'pending':
        return <span className="status-badge bg-warning-light text-warning">Pending</span>;
      case 'due':
        return <span className="status-badge bg-destructive text-destructive-foreground">Due</span>;
      default:
        return <span className="status-badge bg-muted text-muted-foreground">Unknown</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Pay Rent</h1>
        <p className="text-muted-foreground mt-2">Make your rent payments securely</p>
      </div>

      {/* Current Rent Due */}
      <div className="dashboard-card animate-slide-up">
        <div className="p-6 border-b border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold text-foreground">Current Rent Due</h3>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h4 className="font-semibold text-foreground text-lg">{rentDue.property}</h4>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="text-2xl font-bold text-primary">${rentDue.amount}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Due: {new Date(rentDue.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            {getStatusBadge(rentDue.status)}
          </div>

          {paymentStatus === 'success' ? (
            <div className="bg-success-light p-6 rounded-lg text-center">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-success mb-2">Payment Successful!</h4>
              <p className="text-foreground">Your rent payment has been processed successfully.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-input"
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Amount</label>
                  <input
                    type="number"
                    value={rentDue.amount}
                    readOnly
                    className="form-input bg-muted"
                  />
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Payment Notes (Optional)</label>
                <textarea
                  placeholder="Add any notes about your payment..."
                  className="form-input min-h-20"
                />
              </div>

              <button
                onClick={handlePayment}
                disabled={paymentStatus === 'processing'}
                className={`btn-primary w-full ${
                  paymentStatus === 'processing' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {paymentStatus === 'processing' ? 'Processing Payment...' : `Pay $${rentDue.amount}`}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div className="dashboard-card animate-scale-in">
        <div className="p-6 border-b border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold text-foreground">Payment History</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Property</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-[hsl(var(--sidebar-hover))]">
                  <td className="px-6 py-4 text-sm text-foreground">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{payment.property}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">${payment.amount}</td>
                  <td className="px-6 py-4">{getStatusBadge(payment.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayRent;