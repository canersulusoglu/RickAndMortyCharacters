import {
    Grid,
    Card,
    CardContent,
    Typography,
    Tooltip,
    Chip
} from '@mui/material';
import {
    Public as LocationIcon,
    SmartToy as SpeciesIcon
} from '@mui/icons-material';
import Image from 'next/image';

interface CharacterCardProps{
    characterImage: string,
    characterId: string,
    characterName: string,
    characterSpecies: string,
    characterLocation: {
        id: string,
        name: string
    }
}

const CharacterCard = ({ characterImage, characterId, characterName, characterSpecies, characterLocation } : CharacterCardProps) => {
    return(
        <Card style={{width: '100%'}}>
            <CardContent>
                <Grid container rowSpacing={2} columnSpacing={2} alignItems="center" direction={{md:'row', lg: 'column'}}>
                    <Grid item xs={4}>
                        <Image src={characterImage} alt={characterName} width={200} height={200}/>
                    </Grid>
                    <Grid item xs={8} container rowSpacing={2} alignItems="center" direction="column">
                        <Grid item xs display="flex" justifyContent="space-between">
                            <Tooltip
                                title={<Typography variant='body1'>{characterSpecies}</Typography>} 
                                arrow
                            >
                                <Chip style={{cursor: 'pointer'}} color="info" label={<SpeciesIcon style={{width: '20px'}}/>}/>
                            </Tooltip>
                            <Tooltip 
                                title={<Typography variant='body1'>{characterLocation.name}</Typography>} 
                                arrow
                            >
                                <Chip style={{cursor: 'pointer'}} color="warning" label={<LocationIcon style={{width: '20px'}}/>}/>
                            </Tooltip>
                        </Grid>
                        <Grid item xs>
                            <Typography variant='body1' style={{fontWeight: '600', fontSize: '16px', textAlign: 'center'}}>{characterName}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default CharacterCard;