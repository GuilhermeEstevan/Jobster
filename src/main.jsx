import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './Features/User/UserContext.jsx'
import { JobProvider } from './Features/Job/JobContext.jsx'
import { AllJobsProvider } from './Features/Job/AllJobsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <UserProvider>
        <JobProvider>
            <AllJobsProvider>
                <App />
            </AllJobsProvider>
        </JobProvider>
    </UserProvider>

)
