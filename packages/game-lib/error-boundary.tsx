import { Component } from "react";
const errorMessage = "Algo anda mal. Escribime en instagram @ignacio_barocchi.";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: JSON.stringify(error) };
  }

  componentDidCatch(error, errorInfo) {
    console.error(errorMessage, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <FloatingNotification
          position="center"
          dismiss={false}
          fullHeight={true}
          fullWidth={true}
        >
          <h1>{errorMessage}</h1>
          <div>{this.state.error}</div>
        </FloatingNotification>
      );
    }
    return this.props.children;
  }
}
