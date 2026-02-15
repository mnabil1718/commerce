export function formatStatus(status: string): string {
  if (status.length === 0) return "";

  if (status.length === 1) return status.toUpperCase();

  return status[0].toUpperCase() + status.slice(1).toLowerCase();
}