import React, { useEffect, useState, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

// Lazy-loaded MyComponent
//const MyComponent = lazy(() => import('./MyComponent'));

const MyComponent = lazy(() =>
new Promise((resolve)=>{
  setTimeout(()=>resolve(import('./MyComponent')),5000)
}))

// ErrorBoundary component
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    //It attaches an error event listener to the global window object.

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return <div>Something went wrong!</div>;
  }

  return <>{children}</>;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  //children: A special prop in React that represents whatever you put inside a component.
//PropTypes.node: It can be any valid thing you can show on the screen, like text, numbers, elements (<div>), or fragments (<>...</>).
//isRequired: You must provide children to this component, or React will warn you during development.
};

// App component
function App() {
  return (
    <div>
      <h1>App</h1>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <MyComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
