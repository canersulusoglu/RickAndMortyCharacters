import { useEffect, useState } from "react";
import {
    Grid,
    Pagination,
    Typography,
    Alert,
    AlertTitle
} from "@mui/material"
import { useFilter } from "context";
import { useApolloClient } from "@apollo/client";
import { GET_CHARACTERS_BY_FILTER } from "services/RickAndMortAPI";
import CharacterCard from "./CharacterCard";

const ResultsArea = () => {
    const { results, setResults, resultCount, setResultCount, page, setPage, gender, species, search } = useFilter();
    const apolloClient = useApolloClient();
    const [currentPage, setCurrentPage] = useState(1);

    // Initial load data
    useEffect(() => {
        apolloClient.query({
            query: GET_CHARACTERS_BY_FILTER,
            variables:{
                page: 1
            }
        }).then((res) => {
            var data = res.data.characters;
            var info = data.info;
            var pageCount = info.pages;
            var characterCount = info.count;
            var characters = data.results;
            setPage(pageCount || 1);
            setResults(characters || []);
            setResultCount(characterCount || 0);
        })
        return () => {}
    }, [])  

    // Page change data
    const handlePageChange = (_e, pageNumber) => {
        setCurrentPage(pageNumber);
        apolloClient.query({
            query: GET_CHARACTERS_BY_FILTER,
            variables:{
                page: pageNumber,
                filter:{
                    species: species,
                    gender: gender,
                    name: search
                }
            }
        }).then((res) => {
            var data = res.data.characters;
            var info = data.info;
            var pageCount = info.pages;
            var characterCount = info.count;
            var characters = data.results;
            setPage(pageCount || 1);
            setResults(characters || []);
            setResultCount(characterCount || 0);
        })
    }

    // Filter Menu and Searchbar data
    useEffect(() => {
        if(results === null) return;
        apolloClient.query({
            query: GET_CHARACTERS_BY_FILTER,
            variables:{
                page: 1,
                filter:{
                    gender: gender,
                    species: species,
                    name: search
                }
            }
        }).then((res) => {
            var data = res.data.characters;
            var info = data.info;
            var pageCount = info.pages;
            var characterCount = info.count;
            var characters = data.results;
            setPage(pageCount || 1);
            setCurrentPage(1);
            setResults(characters || []);
            setResultCount(characterCount || 0);
        })
        return () => {}
    }, [gender, species, search])
    

    if(results === null) return <div>Loading...</div>

    return(
        <Grid container spacing={{xs: 1, sm:2}}>
            <Grid item xs={12} display="flex" justifyContent="end">
                <Typography variant="body1">{resultCount} characters listed.</Typography>
            </Grid>
            {
                resultCount ? 
                results.map((x, index)=>{
                    return(
                        <Grid 
                            key={index} 
                            item 
                            xs={12} sm={12} md={6} lg={3}
                            display="flex"
                        >
                            <CharacterCard
                                key={index}
                                characterId={x.id}
                                characterName={x.name}
                                characterSpecies={x.species}
                                characterLocation={x.location}
                                characterImage={x.image}
                            />
                        </Grid>
                    );
                })
                : null
            }
            <Grid item xs={12} display="flex" justifyContent="center">
                {
                    resultCount ?
                    <Pagination onChange={handlePageChange} page={currentPage} count={page} variant="outlined" shape="rounded" />
                    :
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        No character matched. — <strong>Try another filters or clear filters!</strong>
                    </Alert>
                }
            </Grid>
        </Grid>
    )
}

export default ResultsArea;