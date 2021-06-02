import styles from '../styles/Filter.module.scss';
import { Button, ContentSwitcher, Select, SelectItem, Switch, TextInput } from 'carbon-components-react';
import { List16, Grid16 } from '@carbon/icons-react';
import { useAppContext, VIEWS } from '../context/AppProvider';
import { gql, useQuery } from '@apollo/client';

const FETCH_POKEMON_TYPES = gql`
  query FetchPokemonTypes {
    pokemonTypes
  }
`;

export default function Filter() {
  const { setView, setHasFavoritesOnly, searchedValue, setSearchedValue, type, setType } = useAppContext();

  const { loading, error, data, refetch } = useQuery(FETCH_POKEMON_TYPES);
  return (
    <div className={styles.filter}>
      <ContentSwitcher onChange={value => setHasFavoritesOnly(value.index === 1)}>
        <Switch text="All" />
        <Switch text="Favourites" />
      </ContentSwitcher>
      <TextInput
        value={searchedValue}
        placeholder="Search"
        onChange={e => setSearchedValue(e.target.value)}
      ></TextInput>
      <Select value={type} onChange={e => setType(e.target.value)} noLabel>
        {!loading && [
          <SelectItem key="placeholder-item" text="Type" value="" />,
          ...data.pokemonTypes.map(pokemonType => (
            <SelectItem key={pokemonType} text={pokemonType} value={pokemonType} />
          )),
        ]}
      </Select>
      <div>
        <Button
          onClick={() => setView(VIEWS.LIST)}
          kind="secondary"
          size="field"
          renderIcon={List16}
          hasIconOnly
          iconDescription="List"
        />
        <Button
          onClick={() => setView(VIEWS.GRID)}
          kind="secondary"
          size="field"
          renderIcon={Grid16}
          hasIconOnly
          iconDescription="Grid"
        />
      </div>
    </div>
  );
}
