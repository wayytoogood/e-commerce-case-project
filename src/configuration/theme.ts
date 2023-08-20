import { extendTheme } from 'native-base';

export const colors = {
  primary: '#2A59FE',
};

const fontConfig = {
  Montserrat: {
    400: { normal: 'Montserrat-Regular' },
    500: { normal: 'Montserrat-Medium' },
    600: { normal: 'Montserrat-SemiBold' },
    700: { normal: 'Montserrat-Bold' },
    800: { normal: 'Montserrat-ExtraBold' },
  },
};

const fonts = {
  body: 'Montserrat',
  heading: 'Montserrat',
};

const components = {
  Text: {
    baseStyle: {
      color: 'blueGray.700',
      fontFamily: 'body',
      fontSize: 'md',
    },
  },
  Heading: {
    baseStyle: {
      color: 'blueGray.700',
      fontWeight: 600,
      fontFamily: 'heading',
    },
  },
  Button: {
    defaultProps: {
      size: 'md',
    },
    sizes: {
      lg: {
        px: 9,
        py: 3,
        _text: {
          fontSize: 'xl',
        },
      },
      md: {
        px: 6,
        py: 2.5,
        _text: {
          fontSize: 'lg',
        },
      },
      sm: {
        px: 4,
        py: 2,
        _text: {
          fontSize: 'md',
        },
      },
      xs: {
        px: 2,
        py: 1,
        _text: {
          fontSize: 'sm',
        },
      },
    },
  },
};

export const customTheme = extendTheme({
  colors,
  fontConfig,
  fonts,
  components,
});

export const COLORS = customTheme.colors;

type CustomThemeType = typeof customTheme;

declare module 'native-base' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ICustomTheme extends CustomThemeType {}
}
