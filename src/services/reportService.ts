// src/services/reportService.ts
import axios, { type AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

/**
 * Tải file báo cáo (Excel) từ backend.
 *
 * @param apiKey    JWT do Wildberries phát
 * @param dateFrom  ISO‑string ngày bắt đầu
 * @param dateTo    ISO‑string ngày kết thúc
 * @param tax       Thuế (mặc định 6 %)
 * @param discount  Chiết khấu (mặc định 3 %)
 */
async function downloadReport(
  apiKey: string,
  dateFrom: string,
  dateTo: string,
  tax = 0.06,
  discount = 3.5,
): Promise<void> {
  const payload = { apiKey, dateFrom, dateTo, tax, discount };

  const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'blob',
  };

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REPORT_URL}/v1/reports`,
      payload,
      config,
    );

    const blob = new Blob([res.data], {
      type: res.headers['content-type'] || 'application/octet-stream',
    });
    const url = URL.createObjectURL(blob);

    const disposition = res.headers['content-disposition'];
    const matched = disposition?.match(/filename="?([^"]+)"?/);
    const filename = matched?.[1] ?? 'reports.zip';

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    toast.success('Tải báo cáo thành công!');
  } catch (err) {
    console.error('Error download report:', err);
    toast.error('Tải báo cáo thất bại. Vui lòng thử lại!');
  }
}

export default {
  downloadReport,
};
