import { toBool } from './toBool';

export function getFollowUpsData(data: any) {
  return {
    patientId: BigInt(data.patientId),
    date: new Date(data.date),
    attended: data.attended ? toBool(data.attended) : null,
    died: data.died ? toBool(data.died) : null,
    hasDisease: data.hasDisease ? toBool(data.hasDisease) : null,
    causeOfDeath: data.causeOfDeath || null,
    observations: data.observations || null,
    recurrenceSite: data.recurrenceSite || null,
  };
}
