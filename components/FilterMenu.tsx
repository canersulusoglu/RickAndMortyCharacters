import { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    Button,
    Divider,
    Chip,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    SwipeableDrawer
} from '@mui/material';
import {
    RestartAlt as ClearIcon,
    Close as CloseIcon,
    FilterList as FilterIcon
} from '@mui/icons-material';
import {
    useFilter
} from 'context'


interface FilterVariablesInterface{
    [filterType: string]: Array<string>
}

let filterVariables : FilterVariablesInterface = {
    'gender': [
        "Male",
        "Female",
        "Genderless",
        "Unknown",
    ],
    "species": [
        "Human",
        "Alien",
        "Humanoid",
        "Animal",
        "Robot",
        "Cronenberg",
        "Mythology",
        "Disease",
        "Poopybutthole",
        "Unknown"
    ]
}

const FilterMenu = () => {
    const { gender, setGender, species, setSpecies, results } = useFilter();

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>, filterType: string) => {
        var value = String(event.target.value);

        if(filterType === "gender"){
            setGender(value)
        }
        else if(filterType === "species"){
            setSpecies(value);
        }
    }

    const clearAllFilters = () => {
        setGender("");
        setSpecies("");
    }

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    

    return(
        <div>
            <Grid container rowSpacing={1} direction="column" display={{xs: 'none', sm: 'none', md: "none", lg:"flex"}} sx={{width:'15rem',paddingX: '1rem', backgroundColor: '#fff', color: '#000', borderRadius: '.5rem'}}>
                <Grid container item justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Filters</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={clearAllFilters} variant="text" size="small" style={{textTransform: 'none'}} startIcon={<ClearIcon />}>
                            Clear all filters
                        </Button>
                    </Grid>
                </Grid>
                {
                    Object.keys(filterVariables).map((filterType, index) => {
                        return(
                            <Grid item key={index}>
                                <Divider sx={{my: 2}}/>
                                <Typography variant="body1" fontWeight="600" textTransform="capitalize">{filterType}</Typography>
                                <FormControl>
                                    <RadioGroup
                                        name="radio-buttons-group"
                                    >
                                    {
                                        Object.entries(filterVariables[filterType]).map(({1: value}, index) => {
                                            return(
                                                <FormControlLabel
                                                    key={index}
                                                    value={value}
                                                    checked={gender === value || species === value}
                                                    onChange={(e: any) => handleFilter(e, filterType)}
                                                    control={<Radio size='small' color="secondary"/>}
                                                    labelPlacement="end"
                                                    label={
                                                        <div>
                                                            {value}
                                                        </div>
                                                    }
                                                />
                                            );
                                        })
                                    }
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        );
                    })
                }
            </Grid>
            {
                !open ?
                <Grid container direction="column" display={{xs: 'flex', sm: 'flex', md: "flex", lg:"none"}}>
                    <Button onClick={toggleDrawer(true)} variant='contained' startIcon={<FilterIcon />} color="warning" style={{position: 'fixed', bottom:'20px', left: '50%', transform: 'translateX(-50%)', zIndex: '1'}}>
                        Filter Panel
                    </Button>
                </Grid>
                : null
            }
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Grid container direction="column" spacing={1} display="flex" sx={{padding: '1rem', backgroundColor: '#fff', color: '#000'}}>
                    <Grid item display="flex" justifyContent="end">
                        <Button onClick={toggleDrawer(false)} color="error" size="small" variant='contained'><CloseIcon/></Button>
                    </Grid>
                    <Grid container item justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Filters</Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={clearAllFilters} variant="contained" size="small" style={{textTransform: 'none'}} startIcon={<ClearIcon />}>
                                Clear all filters
                            </Button>
                        </Grid>
                    </Grid>
                    {
                        Object.keys(filterVariables).map((filterType, index) => {
                            return(
                                <Grid item key={index}>
                                    <Divider sx={{my: 2}}/>
                                    <Typography variant="body1" fontWeight="600" textTransform="capitalize">{filterType}</Typography>
                                    <FormControl>
                                        <RadioGroup
                                            name="radio-buttons-group"
                                            row
                                        >
                                        {
                                            Object.entries(filterVariables[filterType]).map(({1: value}, index) => {
                                                return(
                                                    <FormControlLabel
                                                        key={index}
                                                        value={value}
                                                        checked={gender === value || species === value}
                                                        onChange={(e: any) => handleFilter(e, filterType)}
                                                        control={<Radio size='small' color="secondary"/>}
                                                        labelPlacement="end"
                                                        label={
                                                            <div>
                                                                {value}
                                                            </div>
                                                        }
                                                    />
                                                );
                                            })
                                        }
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </SwipeableDrawer>
        </div>
    )
}

export default FilterMenu;