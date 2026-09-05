import React, { useEffect, useState } from 'react';
import { NotificationItem } from '../../types';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { X, Bell, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { markNotificationsRead } = useAuth();

  useEffect(() => {
    apiService.getNotifications().then((data) => setNotifications(data));
    markNotificationsRead();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-amber-950 rounded-2xl max-w-md w-full p-6 border border-amber-200 dark:border-amber-800 shadow-2xl relative space-y-4 text-stone-900 dark:text-amber-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-stone-100 dark:bg-amber-900 text-stone-500 dark:text-amber-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-amber-100 dark:border-amber-900 pb-3">
          <Bell className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold font-serif">Notifications & Announcements</h3>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-xs text-stone-500 text-center py-4">No notifications yet.</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-900/30 border border-amber-200/60 dark:border-amber-800/60 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold text-amber-900 dark:text-amber-200">
                  <span>{n.title}</span>
                  <span className="text-[10px] text-stone-400 font-normal">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-stone-700 dark:text-amber-100/90 leading-relaxed text-[11px]">
                  {n.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
