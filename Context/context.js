// truyền trong các component nhỏ với nhau
import { createContext } from "react";

const CollectionsContext = createContext({
    hidden: true,
    toggleHidden: () => {},
});

export default CollectionsContext;

/* use in Component
    const collections = useContext(CollectionsContext) 

    or trong component cha dùng: 
    <CollectionsContext.Provider value={data cần truyền}>
        <Component con />
    </CollectionsContext.Provider>

    trong con cũng dùng useContext y trên
*/
