import { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';

const TrackIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const issues = [
    {
      id: 'ISS-2024-001',
      property: 'Oak Street Apartment',
      category: 'Plumbing',
      description: 'Kitchen faucet is leaking continuously',
      status: 'in_progress',
      priority: 'high',
      reportDate: '2024-01-15',
      lastUpdate: '2024-01-16',
      updates: [
        { date: '2024-01-15', message: 'Issue reported by tenant', type: 'info' },
        { date: '2024-01-16', message: 'Maintenance team assigned', type: 'success' },
        { date: '2024-01-16', message: 'Plumber scheduled for tomorrow', type: 'info' }
      ]
    },
    {
      id: 'ISS-2024-002',
      property: 'Oak Street Apartment',
      category: 'Electrical',
      description: 'Bedroom light switch not working',
      status: 'resolved',
      priority: 'medium',
      reportDate: '2024-01-10',
      lastUpdate: '2024-01-12',
      updates: [
        { date: '2024-01-10', message: 'Issue reported by tenant', type: 'info' },
        { date: '2024-01-11', message: 'Electrician assigned', type: 'success' },
        { date: '2024-01-12', message: 'Issue resolved - switch replaced', type: 'success' }
      ]
    },
    {
      id: 'ISS-2024-003',
      property: 'Oak Street Apartment',
      category: 'Heating/Cooling',
      description: 'Air conditioning not cooling properly',
      status: 'pending',
      priority: 'low',
      reportDate: '2024-01-14',
      lastUpdate: '2024-01-14',
      updates: [
        { date: '2024-01-14', message: 'Issue reported by tenant', type: 'info' }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge bg-warning-light text-warning">Pending</span>;
      case 'in_progress':
        return <span className="status-badge bg-info-light text-info">In Progress</span>;
      case 'resolved':
        return <span className="status-badge bg-success-light text-success">Resolved</span>;
      default:
        return <span className="status-badge bg-muted text-muted-foreground">Unknown</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="status-badge bg-destructive text-destructive-foreground">High</span>;
      case 'medium':
        return <span className="status-badge bg-warning-light text-warning">Medium</span>;
      case 'low':
        return <span className="status-badge bg-success-light text-success">Low</span>;
      default:
        return <span className="status-badge bg-muted text-muted-foreground">Unknown</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'in_progress':
        return <AlertCircle className="w-4 h-4 text-info" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const viewIssue = (issue: any) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Track Issue Status</h1>
        <p className="text-muted-foreground mt-2">Monitor the progress of your reported issues</p>
      </div>

      <div className="dashboard-card animate-slide-up">
        <div className="p-6 border-b border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold text-foreground">Your Issues</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Issue ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Property</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Priority</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Report Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-[hsl(var(--sidebar-hover))]">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{issue.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{issue.property}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{issue.category}</td>
                  <td className="px-6 py-4">{getPriorityBadge(issue.priority)}</td>
                  <td className="px-6 py-4">{getStatusBadge(issue.status)}</td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {new Date(issue.reportDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => viewIssue(issue)}
                      className="btn-secondary text-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Details Modal */}
      {showModal && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-modal max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--border))]">
              <h3 className="text-lg font-semibold text-foreground">Issue Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[hsl(var(--sidebar-hover))] rounded-lg"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground">Issue ID</label>
                  <p className="text-sm text-muted-foreground">{selectedIssue.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Property</label>
                  <p className="text-sm text-muted-foreground">{selectedIssue.property}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Category</label>
                  <p className="text-sm text-muted-foreground">{selectedIssue.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Priority</label>
                  <div className="mt-1">{getPriorityBadge(selectedIssue.priority)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedIssue.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Report Date</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedIssue.reportDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">Description</label>
                <p className="text-sm text-muted-foreground mt-1">{selectedIssue.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Progress Timeline</label>
                <div className="space-y-3">
                  {selectedIssue.updates.map((update: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        update.type === 'success' ? 'bg-success' : 'bg-info'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{update.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(update.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackIssues;