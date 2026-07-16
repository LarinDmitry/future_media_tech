export const VALID_USERS = [
  {email: 'ada@dispatch.dev', password: '123456', name: 'Ada Lovelace'},
  {email: 'dima@dispatch.dev', password: '777777', name: 'Dima Test'},
  {email: 'test@dispatch.dev', password: '654321', name: 'Test User'},
];

export const AVAILABLE_TAGS = ['PRODUCT', 'DESIGN', 'RANDOM', 'ANNOUNCE'];

export const formatTimeAgo = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    return new Date(isoString).toLocaleDateString();
};