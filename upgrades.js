const { CreateConvertToBooleanFeedbackUpgradeScript } = require('@companion-module/base')

module.exports = [
	/*
	 * Place your upgrade scripts here
	 * Remember that once it has been added it cannot be removed!
	 */
	CreateConvertToBooleanFeedbackUpgradeScript({
		channel_mute: true,
        clip_indicator: true,
		device_audio_mute: true,
		flash_state: true,
        limiter_engaged: true,
	}),
	function convertIncrementalAudioGain(context, props) {
		// this script reduces the separate increment and decrement gain actions by adding a +/- gain value
		const result = {
			updatedActions: [],
		}
		for (const action of props.actions) {
			if (action.actionId === 'channel_increasegain') {
				if (typeof action.options.gain !== 'number') action.options.gain = 0.1 // old increase was 0.1dB
				action.actionId === 'channel_incrementgain'
				result.updatedActions.push(action)
			} else if (action.actionId === 'channel_decreasegain') {
				if (typeof action.options.gain !== 'number') action.options.gain = -0.1 // old decrease was 0.1dB
				action.actionId === 'channel_incrementgain'
				result.updatedActions.push(action)
			}
		}


		return result
	},
]