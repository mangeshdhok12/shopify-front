import React from 'react'

import RepeatCustomersChart from './components/RepeatCustomerChart'
import GeoDistributionChart from './components/GeoDistributionChart'
import LifetimeValueChart from './components/LifetimeValueChart'
// import SalesGrowthChart from './components/TotalGrowthChart'
import SalesGrowthChart from './components/SalesGrowthChart'
import NewCustomersChart from './components/NewCustomerChart'
import TotalSalesChart from './components/TotalSalesChart'

const App = () => {
  return (
    <>

  <TotalSalesChart/>
  <SalesGrowthChart/>
  <NewCustomersChart/>
  <RepeatCustomersChart/>
  <GeoDistributionChart/> 
  <LifetimeValueChart/>

    </>
  )
}

export default App
