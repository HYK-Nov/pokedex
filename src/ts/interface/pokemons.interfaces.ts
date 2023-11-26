export interface IPokemon {
    name: string;
    url: string;
}

export interface IPokemonDetail {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: {
        is_hidden: boolean;
        slot: number;
        ability: {
            name: string;
            url: string;
        };
    }[];
    forms: {
        name: string;
        url: string;
    }[];
    game_indices: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    held_items: {
        item: {
            name: string;
            url: string;
        };
        version_details: {
            rarity: number;
            version: {
                name: string;
                url: string;
            };
        };
    }[];
    location_area_encounters: string;
    moves: {
        move: {
            name: string;
            url: string;
        };
        version_group_details: {
            level_learned_at: number;
            version_group: {
                name: string;
                url: string;
            };
            move_learn_method: {
                name: string;
                url: string;
            };
        }[];
    }[];
    species: {
        name: string;
        url: string;
    };
    sprites: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        other: {
            dream_world: {
                front_default: string | null;
                front_female: string | null;
            };
            home: {
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
            "official-artwork": {
                front_default: string;
            };
        };
        versions: {
            "generation-i": {
                "red-blue": IPokemonSprite;
                yellow: IPokemonSprite;
            };
            "generation-ii": {
                crystal: IPokemonSprite;
                gold: IPokemonSprite;
                silver: IPokemonSprite;
            };
            "generation-iii": {
                emerald: IPokemonSprite;
                "firered-leafgreen": IPokemonSprite;
                "ruby-sapphire": IPokemonSprite;
            };
            "generation-iv": {
                "diamond-pearl": IPokemonSprite;
                "heartgold-soulsilver": IPokemonSprite;
                platinum: IPokemonSprite;
            };
            "generation-v": {
                "black-white": {
                    animated: IPokemonSprite;
                };
            } & IPokemonSprite;
        };
        "generation-vi": {
            "omegaruby-alphasapphire": IPokemonSprite;
            "x-y": IPokemonSprite;
        };
        "generation-vii": {
            icons: IPokemonSprite;
            "ultra-sun-ultra-moon": IPokemonSprite;
        };
        "generation-viii": {
            icons: IPokemonSprite;
        };
    };
    stats: {
        base_stat: number;
        effort: null;
        stat: {
            name: string;
            url: string;
        }
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    past_types: {
        generation: {
            name: string;
            url: string;
        };
        types: {
            slot: number;
            type: {
                name: string;
                url: string;
            }
        }[];
    }[];
}

export interface IPokemonSpecies {
    base_happiness: number;
    capture_rate: number;
    color: {
        name: string;
        url: string;
    };
    egg_groups: {
        name: string;
        url: string;
    }[];
    evolution_chain: {
        url: string;
    };
    evolves_from_species: {
        name: string;
        url: string;
    };
    flavor_text_entries: IPokemonFlavorText[];
    form_descriptions: {}[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: {
        genus: string;
        language: {
            name: string;
            url: string;
        }
    }[];
    generation: {
        name: string;
        url: string;
    };
    growth_rate: {
        name: string;
        url: string;
    };
    habitat: {
        name: string;
        url: string;
    };
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    order: number;
    pal_park_encounters: {
        area: {
            name: string;
            url: string;
        };
        base_score: number;
        rate: number;
    }[];
    pokedex_numbers: {
        entry_number: number;
        pokedex: {
            name: string;
            url: string;
        }
    }[];
    shape: {
        name: string;
        url: string;
    };
    varieties: {
        is_default: boolean;
        pokemon: {
            name: string;
            url: string;
        }
    }
}

export interface IPokemonGrowthRate {
    descriptions: {
        description: string;
        language: IPokemon;
    }[];
    formula: string;
    id: number;
    levels: {
        experience: number;
        level: number;
    }[];
    name: string;
    pokemon_species: IPokemon[];
}

interface IPokemonSprite {
    back_default?: string | null;
    back_female?: string | null;
    back_gray?: string | null;
    front_default?: string | null;
    front_female?: string | null;
    front_gray?: string | null;
    back_shiny?: string | null;
    back_shiny_female?: string | null;
    front_shiny?: string | null;
    front_shiny_female?: string | null;
}

export interface IPokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

export interface IPokemonAbility {
    slot: number;
    is_hidden: boolean;
    ability: {
        name: string;
        url: string;
    };
}

export interface IPokemonFlavorText {
    flavor_text: string;
    language: {
        name: string;
        url: string;
    };
    version: {
        name: string;
        url: string;
    };
}

export interface IPokemonTypeDetail {
    damage_relations: {
        double_damage_from: IPokemon[];
        double_damage_to: IPokemon[];
        half_damage_from: IPokemon[];
        half_damage_to: IPokemon[];
        no_damage_from: IPokemon[];
        no_damage_to: IPokemon[];
    };
    game_indices: {
        game_index: number;
        generation: IPokemon;
    }[];
    generation: IPokemon;
    id: number;
    move_damage_class: IPokemon;
    moves: IPokemon[];
    name: string;
    names: {
        language: IPokemon;
        name: string;
    }[];
    past_damage_relations: [];
    pokemon: {
        pokemon: IPokemon;
        slot: number;
    }[];
}