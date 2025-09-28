export function getRandomNumber(till: number): number {
  return Math.floor(Math.random() * (till + 1));
}

export function getRandomIndex(
  min: number,
  max: number,
  exclude?: number[],
): number {
  const indices = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  if (exclude) {
    exclude.forEach((index) => {
      const indexToRemove = indices.indexOf(index);
      if (indexToRemove !== -1) {
        indices.splice(indexToRemove, 1);
      }
    });
  }
  return indices[Math.floor(Math.random() * indices.length)];
}
