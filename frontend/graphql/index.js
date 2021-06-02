import { gql } from '@apollo/client';

export const FETCH_POKEMONS = gql`
  query FetchPokemons($searchedValue: String, $type: String, $hasFavoritesOnly: Boolean) {
    pokemons(query: { limit: 500, search: $searchedValue, filter: { type: $type, isFavorite: $hasFavoritesOnly } }) {
      edges {
        id
        name
        image
        types
        isFavorite
      }
    }
  }
`;

export const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($id: ID!) {
    favoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`;

export const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`;

export const FETCH_POKEMON_DETAIL = gql`
  query Pokemon($name: String!) {
    pokemonByName(name: $name) {
      id
      name
      types
      image
      maxCP
      maxHP
      isFavorite
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      evolutions {
        id
        name
        image
        isFavorite
      }
    }
  }
`;
