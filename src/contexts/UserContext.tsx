import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  userId: null as string | null,
};

// Tipo para o estado
type State = typeof initialState;

// Tipo para ações
type Action = { type: 'SET_USER_ID'; payload: string | null };

// Função redutora
function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    default:
      return state;
  }
}

// Tipo para o contexto
interface UserContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Criação do contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar o contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
