import {useState, createContext, useContext, ReactNode} from 'react'

type GlobalTypes = {
    allpokemon: [];
    allpokemonset: (pokemon:any) => void;      
}

const GlobalDefaults: GlobalTypes = {
    allpokemon: [],
    allpokemonset: () => {}
}

const GlobalContext = createContext<GlobalTypes>(GlobalDefaults)

export function useGlobal() {
    return useContext(GlobalContext)
}

type Props = {
    children: ReactNode;
}

export function GlobalProvider({ children }: Props ) {

    const [allpokemon, setAllpokemon] = useState<[]>([])

    const allpokemonset = (pokemon:any) => {
        setAllpokemon(pokemon)
    }

    const value = {
        allpokemon,
        allpokemonset
    }

    return (
        <>
        <GlobalContext.Provider value={value}>
                {children}
        </GlobalContext.Provider>
        </>
    )
};
