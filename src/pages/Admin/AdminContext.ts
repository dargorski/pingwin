import type {Admin} from "./Admin.ts";
import {createContext} from "react";

export const AdminContext = createContext<Admin>(null!);