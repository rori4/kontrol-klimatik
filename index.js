require('dotenv').config()
const Gree = require('gree-hvac-client')

const client = new Gree.Client({ host: process.env.GREE_AC_IP_ADDRESS })
let properties = {
	[Gree.PROPERTY.lights]: Gree.VALUE.lights.on,
	[Gree.PROPERTY.power]: Gree.VALUE.power.on,
	[Gree.PROPERTY.fanSpeed]: Gree.VALUE.fanSpeed.medium,
	[Gree.PROPERTY.temperatureUnit]: Gree.VALUE.temperatureUnit.celsius,
	[Gree.PROPERTY.temperature]: 25,
	[Gree.PROPERTY.air]: Gree.VALUE.air.outside,
	[Gree.PROPERTY.health]: Gree.VALUE.health.on,
	[Gree.PROPERTY.swingHor]: Gree.VALUE.swingHor.fixedLeft
}

client.on('connect', (client) => {
	console.log('connected to', client.getDeviceId())
	client.setProperties(properties)
})

client.on('success', (updatedProperties, properties, client) => {
  console.log('Current AC Properties:', properties)
  console.log(new Date())
	setTimeout(() => {
		const { power } = updatedProperties
		client.setProperty(
			Gree.PROPERTY.power,
			power === Gree.VALUE.power.on ? Gree.VALUE.power.off : Gree.VALUE.power.on
		)
	}, 2 * 60 * 1000)
})

client.on('no_response', () => {
	console.log('no response')
})
