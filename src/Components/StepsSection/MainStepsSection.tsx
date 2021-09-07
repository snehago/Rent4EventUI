import React from 'react'
import DividerComponent from '../DividerComponent/DividerComponent';
import ClientSteps from './ClientSteps';
import HostSteps from './HostSteps';

function MainStepsSection() {
    return (
        <div>
            {/* {role==='client' && <ClientSteps /> }
            {role==='host' && <HostSteps /> } */}

            <ClientSteps />
            <DividerComponent />
            <HostSteps />
        </div>
    )
}

export default MainStepsSection
