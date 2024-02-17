import { ScrollToTop } from "../";

type  MessageProps = {
  message: string;
}

export function Message({ message }: MessageProps): JSX.Element {
  const loadingStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '1.5em',
  };

  return (
    <>
      <ScrollToTop />
      <div style={loadingStyles}>
        <h1>{message}</h1>
      </div>
    </>
  );
}
