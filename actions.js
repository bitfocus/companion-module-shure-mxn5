const { channelList } = require("./choices")

module.exports = function (self) {

	let channelChoices = channelList(self.state)

	self.setActionDefinitions({
		'get_all_status': {
			name: 'Get Updated Status of Device',
            options: [],
            callback: async () => {
                self.sendCmd('< GET 0 ALL >')
            }
		},
		'device_mute': {
			name: 'Mute or Unmute Device',
			options: [
				{
					type: 'dropdown',
					label: 'Mute/Unmute/Toggle',
					id: 'choice',
					default: 'ON',
					choices: [
						{id: 'ON', label: 'Mute'},
						{id: 'OFF', label: 'Unmute'},
						{id: 'TOGGLE', label: 'Toggle Mute/Unmute'}
					]
				}
			],
			callback: async ({options}) => {
				self.sendCmd('< SET DEVICE_AUDIO_MUTE ' + options.choice + ' >')
            }
		},
		'channel_mute': {
			name: 'Mute or Unmute Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: '1',
					choices: channelChoices
				},
				{
					type: 'dropdown',
					label: 'Mute/Unmute/Toggle',
					id: 'choice',
					default: 'ON',
					choices: [
						{id: 'ON', label: 'Mute'},
						{id: 'OFF', label: 'Unmute'},
						{id: 'TOGGLE', label: 'Toggle Mute/Unmute'}
					]
				}
			],
			callback: async ({options}) => {
				self.sendCmd('< SET ' + options.channel + ' AUDIO_MUTE ' + options.choice + ' >')
            }
		},
		'channel_incrementgain': {
			name: 'Incremental change of Audio Gain of Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: '1',
					choices: channelChoices
				},
				{
					type: 'number',
					label: 'Gain Increment',
					id: 'gain',
					default: 0,
					min: -18,
					max: 18,
					steps: 0.1
				}
			],
			callback: async ({options}) => {
				let gain = 0
				let oldgain = self.state[`channel_audio_gain_${options.channel}`] ?? 0
				if (typeof options.gain === 'number') {
					gain = Math.round(options.gain * 10) / 10
				} else {
					self.log('error', `Can't increment gain, input is not a number (${gain})`)
				}
				if (oldgain + gain >= 30) {
					self.sendCmd(`< SET ${options.channel} AUDIO_GAIN_HI_RES 1400 >`)
					self.updateVariable(`channel_audio_gain_${options.channel}`, 30)
					return
				}
				if (oldgain + gain <= -110) {
					self.sendCmd(`< SET ${options.channel} AUDIO_GAIN_HI_RES 0 >`)
					self.updateVariable(`channel_audio_gain_${options.channel}`, -110)
					return
				}
				let dir = 'INC'
				if (gain < 0) dir = 'DEC'

				self.sendCmd(`< SET ${options.channel} AUDIO_GAIN_HI_RES ${dir} ${Math.abs(gain * 10)} >`)
				self.updateVariable(`channel_audio_gain_${options.channel}`, oldgain + gain)
            }
		},
		'channel_setgain': {
			name: 'Set Audio Gain of Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: '1',
					choices: channelChoices
				},
				{
					type: 'number',
					label: 'Gain',
					id: 'gain',
					tooltip: 'Value in dB, Range is -110dB to +30dB, Steps of 0.1dB',
					default: 0,
					min: -110,
					max: 30,
					steps: 0.1
				}
			],
			callback: async ({options}) => {
				let gain = 1100
				if (typeof options.gain === 'number') {
					gain = Math.round(1100 + options.gain * 10)
				}
				self.sendCmd(`< SET ${options.channel} AUDIO_GAIN_HI_RES ${gain} >`)
            }
		},
		'preset_recall': {
			name: 'Preset Recall',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Number',
					id: 'preset',
					default: '1',
					choices: [
						{id: '1', label: 'Preset 1'},
						{id: '2', label: 'Preset 2'},
						{id: '3', label: 'Preset 3'},
						{id: '4', label: 'Preset 4'},
						{id: '5', label: 'Preset 5'},
						{id: '6', label: 'Preset 6'},
						{id: '7', label: 'Preset 7'},
						{id: '8', label: 'Preset 8'},
						{id: '9', label: 'Preset 9'},
						{id: '10', label: 'Preset 10'}
					]
				}
			],
            callback: async ({options}) => {
                self.sendCmd(`< SET PRESET ${ options.preset } >`)
            }
		},
		'flash_lights': {
			name: 'Flash Lights on Device',
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'onoff',
					default: 'ON',
					choices: [
						{id: 'OFF', label: 'Off'},
						{id: 'ON', label: 'On'}
					]
				}
			],
            callback: async ({options}) => {
                self.sendCmd(`< SET FLASH ${ options.onoff } >`)
            }
		},
		'reboot': {
			name: 'Reboot the Device',
            options: [],
            callback: async () => {
                self.sendCmd('< SET REBOOT >')
            }
		},
        'signal_generator_on': {
            name: 'Signal Generator on/off',
            options: [
                {
					type: 'dropdown',
					label: 'On/Off/Toggle',
					id: 'choice',
					default: 'ON',
					choices: [
						{id: 'ON', label: 'Mute'},
						{id: 'OFF', label: 'Unmute'},
						{id: 'TOGGLE', label: 'Toggle On/Off'}
					]
				},
            ],
            callback: ({options}) => {
                self.sendCmd(`< SET 3 SIG_GEN ${ options.choice } >`)
            }
        },
        'signal_generator_setting': {
            name: 'Signal Generator Settings',
            options: [
                {
					type: 'dropdown',
					label: 'Type',
					id: 'type',
					default: 'PINK',
					choices: [
						{id: 'PINK', label: 'Pink noise'},
						{id: 'WHITE', label: 'White noise'},
						{id: 'TONE', label: 'Sine wave'},
                        {id: 'SWEEP', label: 'Sweep'}
					]
				},
                {
					type: 'number',
					label: 'Frequency',
					id: 'freq',
                    tooltip: 'Value in Hz, Range is 125Hz to 20kHz, Steps of 1 Hz',
					default: 1000,
                    min: 125,
                    max: 20000,
                    steps: 1,
				},
               {
					type: 'number',
					label: 'Gain',
					id: 'gain',
					tooltip: 'Value in dB, Range is -110dB to +21dB, Steps of 0.1dB',
					default: 0,
					min: -110,
					max: 21,
					steps: 0.1
				}
            ],
            callback: ({options}) => {
				let gain = Math.max( Math.min( Math.round(1100 + options.gain * 10), 1310), 0 )
                self.sendCmd(`< SET 3 SIG_GEN_TYPE ${ options.type } > < SET 3 SIG_GEN_FREQ ${ options.freq } > < SET 3 SIG_GEN_GAIN ${ gain } >`)
            }
        }
	})
}