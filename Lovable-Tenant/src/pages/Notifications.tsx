import { Bell, CheckCircle, AlertCircle, Info, CreditCard, Calendar, MessageSquare } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: 'Rent Payment Reminder',
      message: 'Your rent payment for Oak Street Apartment is due in 3 days',
      type: 'warning',
      time: '2 hours ago',
      read: false,
      icon: CreditCard
    },
    {
      id: 2,
      title: 'Maintenance Issue Update',
      message: 'Your maintenance request for broken faucet has been resolved',
      type: 'success',
      time: '1 day ago',
      read: false,
      icon: CheckCircle
    },
    {
      id: 3,
      title: 'Booking Confirmation',
      message: 'Your reservation for Maple Avenue Studio has been confirmed',
      type: 'info',
      time: '2 days ago',
      read: true,
      icon: Calendar
    },
    {
      id: 4,
      title: 'New Review Response',
      message: 'Property manager responded to your review of Elm Street Apartment',
      type: 'info',
      time: '3 days ago',
      read: true,
      icon: MessageSquare
    },
    {
      id: 5,
      title: 'Payment Processed',
      message: 'Your rent payment of $1,200 has been successfully processed',
      type: 'success',
      time: '5 days ago',
      read: true,
      icon: CreditCard
    },
    {
      id: 6,
      title: 'Maintenance Scheduled',
      message: 'Maintenance visit scheduled for Oak Street Apartment on Jan 20th',
      type: 'info',
      time: '1 week ago',
      read: true,
      icon: AlertCircle
    }
  ];

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-warning-light border-warning';
      case 'success':
        return 'bg-success-light border-success';
      case 'info':
        return 'bg-info-light border-info';
      default:
        return 'bg-muted border-muted';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-warning';
      case 'success':
        return 'text-success';
      case 'info':
        return 'text-info';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground mt-2">Stay updated with your property activities</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {notifications.filter(n => !n.read).length} unread notifications
          </span>
        </div>
        <button className="btn-secondary text-sm">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3 animate-slide-up">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`dashboard-card p-4 border-l-4 ${getNotificationStyle(notification.type)} ${
                !notification.read ? 'shadow-hover' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getNotificationStyle(notification.type)}`}>
                  <Icon className={`w-5 h-5 ${getIconColor(notification.type)}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-semibold ${
                        !notification.read ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {notification.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="dashboard-card p-12 text-center">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
          <p className="text-muted-foreground">You're all caught up! New notifications will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;