import * as React from 'react';

import Navbar from '../navbar/navbar';
import AppPanel from '../app-panel/app-panel';
import AppTable from '../app-table/app-table';
import {TaskItem} from '../../types';

const classes = {
  root: {
    flexGrow: 1,
  },
  tableWrapper: {
    marginTop: 150,
    marginRight: 'auto',
    marginBottom: 20,
    marginLeft: 'auto',
    width: '80%'
  }
};

interface IProps {

};

/**
 * @prop {number[]} selected Выбранная задача в списке.
 */
interface IState {
  selected: number[];
};

class Main extends React.Component<IProps, IState> {
  state: IState = {
    selected: []
  };

  render() {
    const {selected} = this.state;
    return <div style={classes.root}>
      <Navbar />
      <AppPanel />
      <div style={classes.tableWrapper}>
        <AppTable
          onItemSelect={this.handleItemSelect}
          selected={selected}
        />
      </div>
    </div>;
  }

  // private findItemById(itemId: number, taskList: TaskItem[]) {
  //   return taskList.find(({id}) => id === itemId);
  // }

  handleItemSelect = (item: TaskItem): void => {
    const {selected} = this.state;
    const {id} = item;
    const res = selected.includes(id);

    if (res === false) {
      this.setState({
        selected: [
          ...selected,
          id
        ]
      });
    } else {
      this.setState({
        selected: selected.filter((idx) => idx !== item.id)
      });
    }    
  }
}

export default Main;
