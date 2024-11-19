const { createContext, useContext } = require("react");

const colorModeContext = createContext({ toggleColorMode: () => {} });

const useColorModeContext = useContext(colorModeContext);

export { colorModeContext };
export default useColorModeContext;
