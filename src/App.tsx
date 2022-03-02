import {RouteComponentProps} from '@reach/router';
import React, {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import './App.css';
import {AppState, LocalStorageKey, recoilState, Routes} from './DataStructure';
import {HomePage} from './pages/homepage/HomPage';

interface Props {
  path: Routes;
}

const App: React.FC<Props & RouteComponentProps> = ({path}) => {
  const appState = useRecoilValue<AppState>(recoilState);

  // if appState has changes, save it LocalStorage.
  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState), // convert JavaScript Object to string
    );
  }, [appState]);

  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;
