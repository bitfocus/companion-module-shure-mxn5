const channelList = (state, arg) => {
    let channels
    if (arg === undefined) {
        channels = ['Dante 1', 'Dante 2', 'Inputs Summed', 'Dante Output']
    } else if (typeof arg === 'number') {
        channels = Array.from({length: Math.abs(Math.round(arg)), mapfn: (_,i)=> {`Channel ${i+1}`}})
    } else if (Array.isArray(arg)) {
        channels = arg
    } else {
        channels = []
    }
    let channelList = []
	for (let i = 1; i <= channels.length; i+=1) {
		let channelListObj = {}
		channelListObj.id = i.toString()
		channelListObj.label = channels[i-1]
		if (state && state[`channel_name_${i}`]) channelListObj.label += ` ( ${state[`channel_name_${i}`]} )`
		channelList.push(channelListObj)
	}
    return channelList
}

module.exports = { channelList }
