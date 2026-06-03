import React, { useEffect, useState } from 'react'
import { API } from '../../../config'
import "./mqttSettings.css"

const MqttSettings = () => {
    const [mqttConfigValues, setMqttConfigValues] = useState({
        PORT: '',
        HOST: '',
        USERNAME: '',
        PROTOCOL: '',
    });
    const { PORT, HOST, USERNAME, PROTOCOL } = mqttConfigValues

    // ---------------------------------------------------------------------
    // get current config details (display-only; managed via environment vars)
    const fetchPrevSettings = async () => {
        const res = await fetch(`${API}/getPrevMqttSetting`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setMqttConfigValues(data.prevSettings);
    }

    useEffect(() => {
        fetchPrevSettings()
    }, [])
    // ---------------------------------------------------------------------

    return (
        <div className='mqtt-settings--form-wrapper'>
            <div className='mqtt-settings--form'>
                <p className="mqtt-settings--notice">
                    MQTT settings are managed via environment variables.
                    Changing them requires editing <code>.env</code> and redeploying.
                </p>
                <div className="mqtt-settings--form-group">
                    <label>Port Number</label>
                    <div className="mqtt-settings-inputFieldArea">{PORT}</div>
                </div>
                <div className="mqtt-settings--form-group">
                    <label>Host</label>
                    <div className="mqtt-settings-inputFieldArea">{HOST}</div>
                </div>
                <div className="mqtt-settings--form-group">
                    <label>User Name</label>
                    <div className="mqtt-settings-inputFieldArea">{USERNAME}</div>
                </div>
                <div className="mqtt-settings--form-group">
                    <label>Protocol</label>
                    <div className="mqtt-settings-inputFieldArea">{PROTOCOL}</div>
                </div>
            </div>
        </div>
    )
}

export default MqttSettings
