import {createContext} from "react";
import type { App } from "./App";

export const AppContext = createContext<App>(null!);