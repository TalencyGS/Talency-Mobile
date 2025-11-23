
import { Platform } from 'react-native';

export const Colors = {
  primary1: '#FFEBAF',
  primary2: '#4C9DB0',

  secundary1: '#FFC857',
  secundary2: '#2C7A8C',
  secundary3: '#F6D46B',

  success: '#62B587',
  attention: '#F2B263',
  error: '#E06464',

  background1: '#FAFAFA',
  background2: '#1A1A1A',
  background3: '#F5F5F5',

  text1: '#2E2E2E',
  text2: '#6C6C6C',

  shadow: '#E0E0E0'
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
