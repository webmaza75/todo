import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../header/header.jsx';

// import { createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });

const App = () => {
  return <CssBaseline>
    <Header />
  </CssBaseline>;
};

export default App;
