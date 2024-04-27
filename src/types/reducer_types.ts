import { User } from "./types";

export interface LoginState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
}
