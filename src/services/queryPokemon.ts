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