declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }

  namespace Props {
    interface WithChildren {
      children: React.ReactNode
    }

    interface WithId {
      id: string
    }
  }
}

export {}
