export function getAttributesAndResults(data: any) {
  let attributes = [];
  let results = [];
  const nonAttributeOrResultKeys = [
    'startDate',
    'endDate',
    'patientId',
    'treatmentTypeId',
    'id',
  ];

  for (const key in data) {
    const keyIsAttributeOrResult = nonAttributeOrResultKeys.indexOf(key) === -1;
    if (keyIsAttributeOrResult) {
      if (key.startsWith('attr-')) {
        const keyName = key.split('-')[1];
        attributes.push({
          name: keyName,
          treatmentTypeId: BigInt(data.treatmentTypeId),
          value: data[key],
        });
      } else {
        const keyName = key.split('-')[1];
        results.push({
          name: keyName,
          treatmentTypeId: BigInt(data.treatmentTypeId),
          value: data[key],
        });
      }
    }
  }
  return { attributes, results };
}
