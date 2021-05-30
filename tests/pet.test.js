const fetch = require('node-fetch')

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
		await fetch('https://petstore.swagger.io/v2/pet', {
			method: 'post',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		}).then(res => {
			expect(res.status).toBe(200)
		})
	})

	test('CT-02: Finds Pets by status', async () => {
		await fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=available', {
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
})


