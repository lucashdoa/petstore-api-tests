const baseUrl = 'https://petstore.swagger.io/v2'

exports.endpoints = {
  pets: {
    findByStatus: status => `${baseUrl}/pet/findByStatus?status=${status}`,
    pet: `${baseUrl}/pet`
  }
}
