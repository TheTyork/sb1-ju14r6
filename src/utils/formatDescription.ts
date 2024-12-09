interface UpdateItem {
  description: string;
  justification: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function formatDescription(
  systemType: string,
  notificationType: string,
  startDate: string,
  endDate: string,
  updateItems: UpdateItem[]
): string {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  if (systemType === 'ВКД АО' && notificationType === 'Оповещение в чат ТОФК') {
    return formatVkdDescription(formattedStartDate, formattedEndDate, updateItems);
  } else if (systemType === 'ВГФК' && notificationType === 'Оповещение в чат ТОФК') {
    return formatVgfkTofkDescription(formattedStartDate, formattedEndDate, updateItems);
  } else if (systemType === 'ВГФК' && notificationType === 'Обоснование в чат Методологии') {
    return formatVgfkMethodologyDescription(formattedStartDate, formattedEndDate, updateItems);
  }
  
  return '';
}

function formatVkdDescription(
  startDate: string,
  endDate: string,
  updateItems: UpdateItem[]
): string {
  let text = `Коллеги, добрый день! С ${startDate} с 23:00 по 02:00 ${endDate} МСК будет проводиться обновление системы. Основные изменения следующие:\n\n`;
  
  updateItems.forEach((item, index) => {
    if (item.description.trim()) {
      text += `${index + 1}. ${item.description}\n`;
      if (item.justification.trim()) {
        text += `Обоснование: ${item.justification}\n`;
      }
      text += '\n';
    }
  });

  text += 'Полный список обновлений опубликован в системе на стартовой странице в разделе «Новости».\n';
  text += '#ПлановоеОбновление';
  
  return text;
}

function formatVgfkTofkDescription(
  startDate: string,
  endDate: string,
  updateItems: UpdateItem[]
): string {
  let text = `Коллеги, добрый день! С ${startDate} с 23:00 по 02:00 ${endDate} МСК будет проводиться обновление системы. Основные изменения следующие:\n\n`;
  
  updateItems.forEach((item, index) => {
    if (item.description.trim()) {
      text += `${index + 1}. ${item.description}\n`;
      if (item.justification.trim()) {
        text += `Обоснование: ${item.justification}\n`;
      }
      text += '\n';
    }
  });

  text += 'Полный список обновлений опубликован в системе на стартовой странице в разделе «Новости».\n';
  text += '#ПлановоеОбновление';
  
  return text;
}

function formatVgfkMethodologyDescription(
  startDate: string,
  endDate: string,
  updateItems: UpdateItem[]
): string {
  let text = `Коллеги, добрый день! Планируется обновление С ${startDate} с 23:00 по 02:00 ${endDate} МСК, просим согласовать приложенный состав изменений:\n\n`;
  
  updateItems.forEach((item, index) => {
    if (item.description.trim()) {
      text += `${index + 1}. ${item.description}\n`;
      if (item.justification.trim()) {
        text += `Обоснование: ${item.justification}\n`;
      }
      text += '\n';
    }
  });

  text += '@handra77';
  
  return text;
}