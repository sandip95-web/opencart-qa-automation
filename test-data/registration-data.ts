export function createRegistrationData() {
  const uniqueId = Math.floor(Math.random() * 1000000);

  return {
    firstName: `FirstName-${uniqueId}`,
    lastName: `LastName-${uniqueId}`,
    email: `email${uniqueId}@example.com`,
    password: 'test123',
  };
}
