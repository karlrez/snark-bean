import { useState, createContext, useContext } from "react";

interface Props {
  item: {
    id: string;
    quantity: number;
    name: string;
    price: number;
    notes: string;
    process: string;
    altitude: string;
    varietals: string;
    region: string;
    certification: string;
    roast: string;
    description: string;
  };
}

interface CartItem {
  item: Props["item"];
  weight: string;
  grind: string;
  quantity: number;
}

const DisplayLoginMsg = createContext({ rerouteToSignIn: false });
export const AppContext = createContext(Array());

export const useDisplayContext = () => useContext(DisplayLoginMsg);

export const Provider: React.FC = (props: any) => {
  const [contextCart, setContextCart] = useState(Array<CartItem>());

  return (
    <AppContext.Provider value={[contextCart, setContextCart]}>
      <DisplayLoginMsg.Provider value={{ rerouteToSignIn: false }}>
        {props.children}
      </DisplayLoginMsg.Provider>
    </AppContext.Provider>
  );
};
