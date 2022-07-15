import { render as defaultRender, RenderResult } from '@testing-library/react';
import { BlitzProvider, BlitzRouter, RouterContext } from 'blitz';

export * from '@testing-library/react';

// --------------------------------------------------------------------------------
// This file customizes the render() and renderHook() test functions provided
// by React testing library. It adds a router context wrapper with a mocked router.
//
// You should always import `render` and `renderHook` from this file
//
// This is the place to add any other context providers you need while testing.
// --------------------------------------------------------------------------------

// --------------------------------------------------
// render()
// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
export const render = (
  ui: RenderUI,
  { wrapper, router, dehydratedState, ...options }: RenderOptions = {}
): RenderResult => {
  if (!wrapper) {
    // Add a default context wrapper if one isn't supplied from the test
    wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
      return (
        <BlitzProvider dehydratedState={dehydratedState}>
          {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
          <RouterContext.Provider value={{ ...mockRouter, ...router }}>
            {children}
          </RouterContext.Provider>
        </BlitzProvider>
      );
    };
  }

  return defaultRender(ui, { wrapper, ...options });
};

export const mockRouter: BlitzRouter = {
  asPath: '/',
  back: jest.fn(),
  basePath: '',
  beforePopState: jest.fn(),
  events: {
    emit: jest.fn(),
    off: jest.fn(),
    on: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isPreview: false,
  isReady: true,
  params: {},
  pathname: '/',
  prefetch: jest.fn(),
  push: jest.fn(),
  query: {},
  reload: jest.fn(),
  replace: jest.fn(),
  route: '/',
};

type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & {
  dehydratedState?: unknown;
  router?: Partial<BlitzRouter>;
};
