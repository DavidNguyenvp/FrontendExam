import type {RouteComponentProps} from '@reach/router';
import React from 'react';

export const NotFound: React.FC<RouteComponentProps> = () => {
  return (
    <div className="container mx-auto px-6 py-3">
      <nav className="sm:flex sm:justify-center sm:items-center mt-4">
        <div className="flex flex-col sm:flex-row">
          <h1 className="mt-3 text-black-600  sm:mx-3 sm:mt-0">
            Page not found
          </h1>
        </div>
      </nav>
    </div>
  );
};
