import {
    Grid,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton 
} from '@mui/material';
import {
    Search as SearchIcon,
    ClearRounded as ClearIcon
} from '@mui/icons-material';
import { useFilter } from 'context';

const SearchBar = () => {
    
    const { search, setSearch } = useFilter();

    const clearInput = () => {
        setSearch("");
    }

    return(
        <Grid container direction="column" alignItems="center">
            <Grid item width={{xs: '90%', md: '70%'}}>
                <FormControl fullWidth>
                    <OutlinedInput
                        placeholder="Character name"
                        sx={{backgroundColor: '#ffffff', borderRadius: '5rem'}}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start"><SearchIcon/></InputAdornment>
                        }
                        endAdornment={
                            search ? 
                            <InputAdornment position="end">
                                <IconButton onClick={clearInput}>
                                    <ClearIcon/>
                                </IconButton>
                            </InputAdornment>
                            : null
                        }
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default SearchBar;