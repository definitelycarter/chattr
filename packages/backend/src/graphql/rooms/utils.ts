export function shouldNotify(user_id: string, payload: { user_id: string; member_ids: string[] }) {
  return user_id === payload.user_id || payload.member_ids.includes(user_id);
}
