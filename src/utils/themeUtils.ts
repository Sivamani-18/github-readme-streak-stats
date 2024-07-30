// utils/themeUtils.ts
interface Theme {
  [key: string]: string;
}

const THEMES: Record<string, Theme> = {
  default: {
    background: '#ffffff',
    border: '#000000',
    text: '#000000',
    // other theme properties...
  },
  // other themes...
};

export function normalizeThemeName(theme: string): string {
  return theme.toLowerCase().replace('_', '-');
}

export function getRequestedTheme(params: Record<string, string>): Theme {
  const selectedTheme = normalizeThemeName(params.theme ?? 'default');
  return THEMES[selectedTheme] ?? THEMES.default;
}
