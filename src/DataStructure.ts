import type { RecoilState } from "recoil";
import { atom } from "recoil";

export type Routes = "/" | "/homepage";

export interface Project {
  id: string;
  projectName: string;
}

export type ProjectListType = Project[];

export interface AppState {
  projectList: ProjectListType;
}

export enum LocalStorageKey {
  APP_STATE = "APP_STATE",
}

function LoadAppStateFromLocalStorage(): AppState {
  const stringifiedJSON: string | null = window.localStorage.getItem(
    LocalStorageKey.APP_STATE
  );
  if (typeof stringifiedJSON === "string") {
    const Loaded: AppState = JSON.parse(stringifiedJSON);
    return Loaded;
  }

  const BlankAppState: AppState = {
    projectList: [],
  };

  return BlankAppState;
}

export const recoilState: RecoilState<AppState> = atom({
  key: "initialAppState",
  default: LoadAppStateFromLocalStorage(),
});
