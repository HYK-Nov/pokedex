import {gql} from "@apollo/client";

export const GET_PKM_DETAIL = gql`
    query GetPkmDetail($id: Int, $lan: String) {
        pokemon: pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
            base_experience
            height
            weight
            types: pokemon_v2_pokemontypes {
              type: pokemon_v2_type {
                name
                id
              }
            }
            specy: pokemon_v2_pokemonspecy {
              capture_rate
              gender_rate
              egg_group: pokemon_v2_pokemonegggroups {
                egg_groups: pokemon_v2_egggroup {
                  names: pokemon_v2_egggroupnames(where: {pokemon_v2_language: {name: {_eq: $lan}}}) {
                    name
                  }
                }
              }
              hatch_counter
              names: pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_in: ["ko","en","ja-Hrkt"]}}}) {
                name
                language: pokemon_v2_language {
                  name
                }
                genus
              }
            }
          }
          ability: pokemon_v2_pokemonability(where: {pokemon_v2_pokemon: {id: {_eq: $id}}}) {
            is_hidden
            abilities: pokemon_v2_ability {
              ability: pokemon_v2_abilitynames(where: {pokemon_v2_language: {name: {_eq: $lan}}}) {
                name
              }
              ability_text: pokemon_v2_abilityflavortexts(where: {pokemon_v2_language: {name: {_eq: $lan}}, version_group_id: {_eq: 20}}) {
                text: flavor_text
              }
            }
          }
          stat: pokemon_v2_stat {
            stats: pokemon_v2_pokemonstats(where: {pokemon_id: {_eq: $id}}) {
              base_stat
            }
          }
          flavor_text: pokemon_v2_pokemonspeciesflavortext(where: {pokemon_species_id: {_eq: $id}, pokemon_v2_language: {name: {_eq: $lan}}}) {
            text: flavor_text
            version: pokemon_v2_version {
              name
            }
          }
          growth_rate: pokemon_v2_growthrate(where: {pokemon_v2_pokemonspecies: {id: {_eq: $id}}}) {
            experiences: pokemon_v2_experiences {
              experience
            }
        }
    }
`;

export const GET_PREV_NEXT_NAME = gql`
    query GetPkmNames($prevId: Int, $nextId: Int, $lan: String) {
        names: pokemon_v2_pokemonspeciesname(where: {pokemon_species_id: {_gte: $prevId, _lte: $nextId}, pokemon_v2_language: {name: {_eq: $lan}}}) {
            name
            id: pokemon_species_id
        }
    }
`;

export const GET_ALL_NAMES = gql`
    query GetAllNames($lastId: Int, $lan: String) {
        names: pokemon_v2_pokemonspeciesname(where: {pokemon_species_id: {_gte: 1, _lte: $lastId}, pokemon_v2_language: {name: {_eq: $lan}}}) {
            name
            id: pokemon_species_id
        }
    }
`;

export const GET_SCROLL_CONTENTS = gql`
    query GetScrollContents($lastPage: Int = 0, $nextPage: Int = 16, $lan: String!) {
      pokemon: pokemon_v2_pokemonspeciesname(where: {pokemon_species_id: {_gt: $lastPage, _lte: $nextPage}, pokemon_v2_language: {name: {_eq: $lan}}}) {
        name
        id: pokemon_species_id
        specy: pokemon_v2_pokemonspecy {
          pokemons: pokemon_v2_pokemons {
            types: pokemon_v2_pokemontypes {
              type: pokemon_v2_type {
                name
                id
              }
            }
          }
        }
      }
}
`;

export const GET_TYPE_CONTENTS = gql`
    query GetTypeContents($type: String, $type_another: String, $lan: String) {
      pokemon: pokemon_v2_pokemonspeciesname(where: {
        pokemon_v2_language: {name: {_eq: "ko"}}, 
        pokemon_v2_pokemonspecy: {
            pokemon_v2_pokemondexnumbers: {
                pokemon_v2_pokedex: {
                    name: {_regex: "kanto", _nregex: "letsgo"}}}, 
                    pokemon_v2_pokemons: {
                        _and: [
                            {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_regex: "grass"}}}},
                            {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_regex: "poison"}}}}
                        ]
                    }
                }
            }, 
        order_by: {id: asc}) {
            name
            id: pokemon_species_id
            specy: pokemon_v2_pokemonspecy {
              pokemons: pokemon_v2_pokemons {
                types: pokemon_v2_pokemontypes {
                  type: pokemon_v2_type {
                    name
                    id
                  }
                }
              }
            }
          }
    }
`;

export const GET_REGION_CONTENTS = gql`
    query GetRegionContents($region: String, $lan: String) {
      pokemon: pokemon_v2_pokemonspeciesname(where: {pokemon_v2_language: {name: {_eq: $lan}}, pokemon_v2_pokemonspecy: {pokemon_v2_pokemondexnumbers: {pokemon_v2_pokedex: {name: {_in: $region}}}}}) {
        name
        id: pokemon_species_id
        specy: pokemon_v2_pokemonspecy {
          pokemons: pokemon_v2_pokemons {
            types: pokemon_v2_pokemontypes {
              type: pokemon_v2_type {
                id
                name
              }
            }
          }
        }
      }
    }
`;

export const GET_FILTERED_CONTENTS = gql`
    query GetFilteredContents($firstType: String, $secondType: String, $region: String, $lan: String) {
        pokemon: pokemon_v2_pokemonspeciesname(where: {
            pokemon_v2_language: {name: {_eq: $lan}}, 
            pokemon_v2_pokemonspecy: {
                pokemon_v2_generation: {
                    pokemon_v2_region: {name: {_regex: $region}}
                }, 
                pokemon_v2_pokemons: {
                    _and: [
                        {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_regex: $firstType}}}},
                        {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_regex: $secondType}}}}
                    ]
                }
            }
        }, 
        order_by: {id: asc}) {
            name
            id: pokemon_species_id
            specy: pokemon_v2_pokemonspecy {
                pokemons: pokemon_v2_pokemons {
                    types: pokemon_v2_pokemontypes {
                        type: pokemon_v2_type {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;