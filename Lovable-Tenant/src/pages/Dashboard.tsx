import { Calendar, CreditCard, AlertCircle, Search, FileText, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { title: 'Active Bookings', value: '2', icon: Calendar, color: 'bg-primary' },
    { title: 'Rent Due', value: '$1,200', icon: CreditCard, color: 'bg-warning' },
    { title: 'Reported Issues', value: '1', icon: AlertCircle, color: 'bg-destructive' },
    { title: 'Total Reviews', value: '8', icon: MessageSquare, color: 'bg-success' },
  ];

  const recentNotifications = [
    { id: 1, title: 'Rent Payment Due', message: 'Your rent payment for Oak Street Apartment is due in 3 days', time: '2 hours ago', type: 'warning' },
    { id: 2, title: 'Issue Update', message: 'Your maintenance request for broken faucet has been resolved', time: '1 day ago', type: 'success' },
    { id: 3, title: 'Booking Confirmed', message: 'Your reservation for Maple Avenue Studio has been confirmed', time: '2 days ago', type: 'info' },
  ];

  const quickActions = [
    { title: 'Search Properties', href: '/search', icon: Search, color: 'bg-primary' },
    { title: 'Pay Rent', href: '/pay-rent', icon: CreditCard, color: 'bg-success' },
    { title: 'Report Issue', href: '/report-issue', icon: AlertCircle, color: 'bg-destructive' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening with your properties today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="stats-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notifications */}
        <div className="dashboard-card p-6 animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Notifications</h3>
            <Link to="/notifications" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[hsl(var(--sidebar-hover))] transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'warning' ? 'bg-warning' :
                  notification.type === 'success' ? 'bg-success' : 'bg-info'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{notification.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card p-6 animate-scale-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  to={action.href}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-[hsl(var(--border))] hover:bg-[hsl(var(--sidebar-hover))] transition-colors group"
                >
                  <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-foreground">{action.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;