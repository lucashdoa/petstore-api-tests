const { expect } = require('@jest/globals')
const fetch = require('node-fetch')
const { endpoints } = require('../support/endpoints')
require('../support/endpoints')

describe('Everything about your Pets', () => {
	test('CT-01: Add a new pet to the store', async () => {
		const body = {
			id: 1,
			category: {
				id: 1,
				name: 'Dog'
			},
			name: 'Zidane',
			photoUrls: [],
			status: 'Available'
		}
		await fetch(endpoints.pets.pet, {
			method: 'post',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		}).then(res => {
			expect(res.status).toBe(200)
		})
	})

	test('CT-02: Finds Pets by status - Valid Status', async () => {
		await fetch(endpoints.pets.findByStatus('available'), {
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
		}).then(res => {
			expect(res.status).toBe(200)
			return res.json()
		}).then(json => {
			json.forEach(element => {
				expect(element).toHaveProperty('id')
				expect(element).toHaveProperty('status')
				// expect(element).toHaveProperty('category')
				// expect(element).toHaveProperty('name')
				// expect(element).toHaveProperty('photoUrls')
				// expect(element).toHaveProperty('tags')
			});
		})
	})
	
	test.skip('CT-03: Finds Pets by status - Invalid Status', async () => {
		await fetch(endpoints.pets.findByStatus('aaaaaa'), {
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
		}).then(res => {
			expect(res.status).toBe(400)
			return res.json()
		}).then(json => {
			// console.log(json)
		})
	})

	test('CT-04: Update an existing pet - Valid ID supplied', async () => {
		const body = {
			id: 1,
			category: {
				id: 1,
				name: 'Dog'
			},
			name: 'Zazá',
			photoUrls: [],
			status: 'Available'
		}
		await fetch(endpoints.pets.pet, {
			method: 'put',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		}).then(res => {
			expect(res.status).toBe(200)
			return res.json()
		}).then(pet => {
			expect(pet.name).toBe('Zazá')
		})
	})

	test.skip('CT-05: Update an existing pet - Invalid ID supplied', async () => {
		const body = {
			id: 'abc',
			category: {
				id: 1,
				name: 'Dog'
			},
			name: 'Zazá',
			photoUrls: [],
			status: 'Available'
		}
		await fetch(endpoints.pets.pet, {
			method: 'put',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		}).then(res => {
			expect(res.status).toBe(400)
			console.log(res)
			return res.json()
		}).then(pet => {
			console.log(pet)
		})
	})
})


