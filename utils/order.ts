export function formatStatus(status: string): string {
  if (status.length === 0) return "";

  if (status.length === 1) return status.toUpperCase();

  return status[0].toUpperCase() + status.slice(1).toLowerCase();
}

export function formatDateTime(timestamptz: string): string {
  const date = new Date(timestamptz);
  
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}