import {
  BlitzScript,
  Document as DocumentContext,
  DocumentHead,
  Html,
  Main,
} from 'blitz';

class Document extends DocumentContext {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    );
  }
}

export default Document;
