export function getFollowUpsData(data: any) {
  return {
    patientId: BigInt(data.patientId),
    date: new Date(data.date),
    attended: data.attended ? Boolean(data.attended) : null,
    died: data.died ? Boolean(data.died) : null,
    hasDisease: data.hasDisease ? Boolean(data.hasDisease) : null,
    causeOfDeath: data.causeOfDeath || null,
    observations: data.observations || null,
    recurrenceSite: data.recurrenceSite || null,
  };
}
