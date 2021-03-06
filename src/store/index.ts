import { createStore } from 'easy-peasy';
import model from 'model';
import * as expenseService from 'services/expenseService';

import { createLogger } from 'redux-logger';

const logger = createLogger();

export interface Injections {
  expenseService: typeof expenseService;
}

const store = createStore(model, {
  injections: {
    expenseService
  },
  middleware: [logger]
});

// Wrapping dev only code like this normally gets stripped out by bundlers
// such as Webpack when creating a production build.
// if (process.env.NODE_ENV === 'development') {
//   if (module.hot) {
//     module.hot.accept('../model', () => {
//       store.reconfigure(model); // 👈 Here is the magic
//     });
//   }
// }

export default store;
