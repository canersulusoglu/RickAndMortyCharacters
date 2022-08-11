import { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

interface IFilterContext {
    page: number, setPage: Dispatch<SetStateAction<number>>, 
    gender: string, setGender: Dispatch<SetStateAction<string>>, 
    species: string, setSpecies: Dispatch<SetStateAction<string>>, 
    results: Array<any> | null, setResults: Dispatch<SetStateAction<Array<never>>> | Dispatch<SetStateAction<null>>,
    search: string, setSearch: Dispatch<SetStateAction<string>>, 
    resultCount: number, setResultCount: Dispatch<SetStateAction<number>>,
}

const FilterContext = createContext<IFilterContext>({} as IFilterContext);

export const FilterProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [gender, setGender] = useState('');
    const [species, setSpecies] = useState('');
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(null);
    const [resultCount, setResultCount] = useState(0);

    const values : IFilterContext = { 
        page, setPage, 
        gender, setGender, 
        species, setSpecies, 
        results, setResults,
        search, setSearch,
        resultCount, setResultCount
    };

    return <FilterContext.Provider value={values}>{children}</FilterContext.Provider>;
};

export const useFilter = () => useContext<IFilterContext>(FilterContext)