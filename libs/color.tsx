//- libs/color-generator.tsx

export const getRandomHexColor = (): string => {
  const color = Math.floor(Math.random() * 16777215).toString(16);

  return `#${color.padStart(6, '0')}`;
};

export const isColorDark = (hex: string): boolean => {
  // Remove '#' if present
  hex = hex.replace('#', '');

  // Parse R, G, B
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

  // Return true if dark
  return luminance < 128;
}
