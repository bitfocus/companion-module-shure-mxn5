module.exports = async function (self) {

    let variableDefinitions = [
        { variableId: 'audio_gain_hi_res', name: 'Audio Gain Hi Res' },
        { variableId: 'bypass_dsp', name: 'Bypass DSP' },
        { variableId: 'clip_indicator', name: 'Clip Indicator' },
        { variableId: 'device_audio_mute', name: 'Device Audio Mute' },
        { variableId: 'deviceid', name: 'Device ID' },
        { variableId: 'encryption', name: 'Encryption' },
        { variableId: 'firmware_version', name: 'Firmware Version' },
        { variableId: 'flash_state', name: 'Flash State' },
        { variableId: 'gateway_audio_primary', name: 'Gateway Audio Primary' },
        { variableId: 'ipaddress_audio_primary', name: 'IP Address Audio Primary' },
        { variableId: 'last_command_received',	name: 'Last Command Received' },
        { variableId: 'last_command_sent',	name: 'Last Command Sent' },
        { variableId: 'last_error_event', name: 'Last Error Event' },
        { variableId: 'limiter_engaged', name: 'Limiter Engaged' },
        { variableId: 'mac_address', name: 'MAC Address' },
        { variableId: 'meter_rate', name: 'Meter Rate' },
        { variableId: 'model',name: 'Model' },
        { variableId: 'na_deviceid', name: 'Network Audio Device ID' },
        { variableId: 'preset_active',	name: 'Active Preset' },
        { variableId: 'serial_number', name: 'Serial Number' },
        { variableId: 'subnet_audio_primary', name: 'Subnet Audio Primary' },
    ]

    for (let i = 1; i <= self.channelcount; i+=1) {
		variableDefinitions.push({ variableId: `channel_name_${i}`, name: `Channel ${i} Name` })
		variableDefinitions.push({ variableId: `channel_mute_${i}`, name: `Channel ${i} Mute` })
		variableDefinitions.push({ variableId: `na_channel_name_${i}`, name: `NA Channel ${i} Name` })
        variableDefinitions.push({ variableId: `channel_audio_gain_${i}`, name: `Channel ${i} Audio Gain` })
		variableDefinitions.push({ variableId: `peq_filter${i}`, name: `PEQ Filter ${i}` })
		variableDefinitions.push({ variableId: `delay${i}`, name: `Delay ${i}` })
		variableDefinitions.push({ variableId: `sig_gen_type${i}`, name: `Signal Generator Type ${i}` })
		variableDefinitions.push({ variableId: `sig_gen_freq${i}`, name: `Signal Generator Freq ${i}` })
		variableDefinitions.push({ variableId: `sig_gen_gain${i}`, name: `Signal Generator Gain ${i}` })
		variableDefinitions.push({ variableId: `sig_gen_status${i}`, name: `Signal Generator Status ${i}` })
	}

	for (let i = 1; i <= 10; i+=1) {
		variableDefinitions.push({ variableId: `preset_name_${i}`, name: `Preset ${i} Name` })
	}
	self.setVariableDefinitions(variableDefinitions)
}