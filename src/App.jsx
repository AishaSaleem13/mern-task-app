import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store ,persistor} from '../Store'
import Hero1 from './Components/form/hero1'

import Routerconfig from './Config/Router'


function App() {
  return (
    <>
<BrowserRouter>
       <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>



    <Routerconfig/>
    

       </PersistGate>
       </Provider>
         </BrowserRouter>

    </>

  )
}

export default App