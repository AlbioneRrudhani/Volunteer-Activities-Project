import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestError from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';


function App(): JSX.Element { 
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() =>{
    if(commonStore.token){
      userStore.getUser().finally(() =>commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  }, [commonStore, useStore])

  if(!commonStore.appLoaded) return <LoadingComponent  content='Loading app...'/>









  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <ModalContainer />
      <Route exact path='/' component={HomePage}  />
      <Route 
        path={'/(.+)'})
        render={() => (
          <>
            <NavBar />
            <Container style={{marginTop:'3em'}}>
              <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route path ='/profiles/:username' component={ProfilePage}/>
              <Route path ='/errors' component={TestError}/>
              <Route path ='/server-error' component={ServerError}/>
              <Route path ='/login' component={LoginForm}/>
              <Route component={NotFound}/>
              </Switch>



         

            </Container>
          </>
        )}
      />

    </Fragment>
  );
}

export default observer(App);



