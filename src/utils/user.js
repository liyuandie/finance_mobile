export function getUserRiskLevel(scroe) {
  if (scroe <= 30) return 'I类客户(保守型)';
  if (scroe > 30 && scroe <= 60) return 'II类客户(稳健型)';
  if (scroe > 60) return 'III类客户(积极型)';
}
