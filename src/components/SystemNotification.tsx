import React, { useEffect, useState } from 'react';

interface SystemNotificationProps {
  systemType: string;
  notificationType: string;
  show: boolean;
}

export function SystemNotification({ systemType, notificationType, show }: SystemNotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  let message = '';
  if (systemType === 'ВКД АО') {
    message = 'ПФК. ВКД АО. ТОФК';
  } else if (systemType === 'ВГФК') {
    if (notificationType === 'Оповещение в чат ТОФК') {
      message = 'ПФК (ВГФК). Финконтроль';
    } else if (notificationType === 'Обоснование в чат Методологии') {
      message = 'ПФК_Методология_ВГФК (АСП-М)';
    }
  }

  return (
    <div className="fixed bottom-4 right-4 px-4 py-2 bg-white border-2 border-green-500 rounded-md shadow-md">
      <p className="text-sm text-gray-800">{message}</p>
    </div>
  );
}