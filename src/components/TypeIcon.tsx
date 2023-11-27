import Normal from "../assets/images/type/normal.svg?react";
import Fire from "../assets/images/type/fire.svg?react";
import Water from "../assets/images/type/water.svg?react";
import Grass from "../assets/images/type/grass.svg?react";
import Flying from "../assets/images/type/flying.svg?react";
import Fighting from "../assets/images/type/fighting.svg?react";
import Poison from "../assets/images/type/poison.svg?react";
import Electric from "../assets/images/type/electric.svg?react";
import Ground from "../assets/images/type/ground.svg?react";
import Rock from "../assets/images/type/rock.svg?react";
import Psychic from "../assets/images/type/psychic.svg?react";
import Ice from "../assets/images/type/ice.svg?react";
import Bug from "../assets/images/type/bug.svg?react";
import Ghost from "../assets/images/type/ghost.svg?react";
import Steel from "../assets/images/type/steel.svg?react";
import Dragon from "../assets/images/type/dragon.svg?react";
import Dark from "../assets/images/type/dark.svg?react";
import Fairy from "../assets/images/type/fairy.svg?react";

interface IProps {
    type: string;
    height?: string | number;
    width?: string | number;
}

function TypeIcon({type, height, width}: IProps) {
    switch (type) {
        case 'normal':
            return <Normal height={height} width={width}/>
        case 'fire':
            return <Fire height={height} width={width}/>
        case 'water':
            return <Water height={height} width={width}/>
        case 'grass':
            return <Grass height={height} width={width}/>
        case 'flying':
            return <Flying height={height} width={width}/>
        case 'fighting':
            return <Fighting height={height} width={width}/>
        case 'poison':
            return <Poison height={height} width={width}/>
        case 'electric':
            return <Electric height={height} width={width}/>
        case 'ground':
            return <Ground height={height} width={width}/>
        case 'rock':
            return <Rock height={height} width={width}/>
        case 'psychic':
            return <Psychic height={height} width={width}/>
        case 'ice':
            return <Ice height={height} width={width}/>
        case 'bug':
            return <Bug height={height} width={width}/>
        case 'ghost':
            return <Ghost height={height} width={width}/>
        case 'steel':
            return <Steel height={height} width={width}/>
        case 'dragon':
            return <Dragon height={height} width={width}/>
        case 'dark':
            return <Dark height={height} width={width}/>
        case 'fairy':
            return <Fairy height={height} width={width}/>
        default:
            return null;
    }
}

export default TypeIcon;