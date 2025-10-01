import { createContext, useContext, useMemo } from 'react';
import { createApiClient } from '../services/mockApi.js';

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const client = useMemo(() => createApiClient(), []);

  const value = useMemo(
    () => ({
      authApi: client.auth,
      ticketApi: client.tickets,
      teamApi: client.team,
      dashboardApi: client.dashboard
    }),
    [client]
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
}
