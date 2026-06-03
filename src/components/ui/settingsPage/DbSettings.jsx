import React, { useEffect, useState } from 'react'
import { API } from '../../../config';
import "./dbSettings.css"

const DbSettings = () => {
    const [dbConfigValues, setDbConfigValues] = useState({
        HOST: '',
        DB_PORT: '',
        DATABASE: '',
        USER: '',
    });
    const { HOST, DB_PORT, DATABASE, USER } = dbConfigValues

    // ---------------------------------------------------------------------
    // get current config details (display-only; managed via environment vars)
    const fetchPrevSettings = async () => {
        const res = await fetch(`${API}/getPrevDbSetting`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setDbConfigValues(data.prevSettings);
    }

    useEffect(() => {
        fetchPrevSettings()
    }, [])
    // ---------------------------------------------------------------------

    return (
        <div className='db-settings--form-wrapper'>
            <div className='db-settings--form'>
                <p className="db-settings--notice">
                    Database settings are managed via environment variables.
                    Changing them requires editing <code>.env</code> and redeploying.
                </p>
                <div className="db-settings--form-group">
                    <label>Host</label>
                    <div className="db-settings-inputFieldArea">{HOST}</div>
                </div>
                <div className="db-settings--form-group">
                    <label>Port Number</label>
                    <div className="db-settings-inputFieldArea">{DB_PORT}</div>
                </div>
                <div className="db-settings--form-group">
                    <label>Database Name</label>
                    <div className="db-settings-inputFieldArea">{DATABASE}</div>
                </div>
                <div className="db-settings--form-group">
                    <label>User</label>
                    <div className="db-settings-inputFieldArea">{USER}</div>
                </div>
            </div>
        </div>
    )
}

export default DbSettings
