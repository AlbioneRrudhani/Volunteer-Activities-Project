import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Grid, GridColumn, Loader } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';



export default observer(function ActivityDashboard() { 
  const {activityStore} = useStore();

  const {loadActivities, activityRegistry,setPagingParams,pagination}=activityStore;
  const[loadingNext,setLoadingNext]=useState(false);

  function handleGetNext(){
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage+1))
    loadActivities().then(()=>setLoadingNext(false));
  }
  
  useEffect(() =>{
   if(activityRegistry.size <= 1) loadActivities(); 

  },[activityRegistry.size, loadActivities])

  if(activityStore.loadingIntial && !loadingNext) return <LoadingComponent content ='loading activities'/> 
  return (
    <Grid>
      <GridColumn width='15'>
        <ActivityFilters/>
      </GridColumn>


      <GridColumn width='16'>
        <InfiniteScroll
        pageStart={0}
        loadMore={handleGetNext}
        hasMore={!loadingNext && !!pagination && pagination.currentPage<pagination.totalPages}
        initialLoad={false}
        >
          <ActivityList
          />
        </InfiniteScroll>
        
      </GridColumn>
      <GridColumn width={10}>
        <Loader active={loadingNext}/>

      </GridColumn>
    </Grid>
  )
})
