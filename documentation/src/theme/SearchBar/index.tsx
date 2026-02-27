import React from 'react';
// @ts-expect-error -- theme-original is resolved by Docusaurus swizzle
import OriginalSearchBar from '@theme-original/SearchBar';

interface ErrorBoundaryState {
  hasError: boolean;
}

class SearchBarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default function SearchBar(): JSX.Element {
  return (
    <SearchBarErrorBoundary>
      <OriginalSearchBar />
    </SearchBarErrorBoundary>
  );
}
