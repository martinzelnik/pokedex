import styles from '../styles/Filter.module.scss';
import { Button, ContentSwitcher, Select, SelectItem, Switch, TextInput } from 'carbon-components-react';
import { List16, Grid16 } from '@carbon/icons-react';
import { TABS, useAppContext, VIEWS } from '../context/AppProvider';

export default function Filter({ pokemonTypes }) {
  const { setView, setActiveTab } = useAppContext();
  return (
    <div className={styles.filter}>
      <ContentSwitcher onChange={value => setActiveTab(value.index)}>
        <Switch name={TABS.ALL} text="All" />
        <Switch name={TABS.FAVORITES} text="Favourites" />
      </ContentSwitcher>
      <TextInput placeholder="Search"></TextInput>
      <Select noLabel>
        {[
          <SelectItem text="Type" value="placeholder-item" />,
          ...pokemonTypes.map(pokemonType => <SelectItem key={pokemonType} text={pokemonType} />),
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
