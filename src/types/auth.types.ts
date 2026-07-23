


export interface AuthStateProps {
  user?: {
    uid: string
    displayName?: string;
    email?: string;
    photoUrl?: string;
  },
  error?: string;
  loading: boolean;
}