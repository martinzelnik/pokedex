import styles from '../styles/Filter.module.scss';
import { Button, ContentSwitcher, Select, SelectItem, Switch, TextInput } from 'carbon-components-react';
import { List16, Grid16 } from '@carbon/icons-react';

export default function Filter({ pokemonTypes }) {
  return (
    <div className={styles.filter}>
      <ContentSwitcher onChange={console.log}>
        <Switch name={'all'} text="All" />
        <Switch name={'favourites'} text="Favourites" />
      </ContentSwitcher>
      <TextInput placeholder="Search"></TextInput>
      <Select noLabel>
        {[
          <SelectItem text="Type" value="placeholder-item" />,
          ...pokemonTypes.map(pokemonType => <SelectItem key={pokemonType} text={pokemonType} />),
        ]}
      </Select>
      <div>
        <Button kind="secondary" size="field" renderIcon={List16} hasIconOnly iconDescription="List" />
        <Button kind="secondary" size="field" renderIcon={Grid16} hasIconOnly iconDescription="Grid" />
      </div>
    </div>
  );
}
