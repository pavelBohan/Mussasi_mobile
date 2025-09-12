import { API_CONFIG, ENDPOINTS } from '../constants/api';

class TelegramService {
  constructor() {
    this.baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.TELEGRAM_BOT_TOKEN}`;
  }

  async sendMessage(text, chatId = API_CONFIG.TELEGRAM_GROUP_ID) {
    try {
      const response = await fetch(`${this.baseUrl}${ENDPOINTS.SEND_MESSAGE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();
      
      if (!data.ok) {
        throw new Error(data.description || 'Failed to send message');
      }

      return data.result;
    } catch (error) {
      console.error('Telegram send error:', error);
      throw error;
    }
  }

  async sendDailyPlan(planText) {
    const formattedText = `🎯 **ПЛАН ДНЯ ЗОЖ 4.0**\n\n${planText}`;
    return this.sendMessage(formattedText);
  }
}

export default new TelegramService();
