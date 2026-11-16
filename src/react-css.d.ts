import 'react';

// Permite custom properties (--alguma-coisa) no style inline sem cast.
declare module 'react' {
  interface CSSProperties {
    [propriedade: `--${string}`]: string | number | undefined;
  }
}
