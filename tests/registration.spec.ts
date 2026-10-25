import { expect, test } from '@playwright/test'
import { createRegistrationPage } from '../pages/RegistrationPage'
import { createRegistrationData } from '../test-data/registration-data'

test.describe('OpenCart - User Registration', () => {
  test('TC-RF-001 - Verify that a user can successfully register with required fields', async ({
    page,
  }) => {
    const registrationPage = createRegistrationPage(page)
    const registrationData = createRegistrationData()

    await registrationPage.goto()
    await registrationPage.fillRegistrationForm(registrationData)
    await registrationPage.acceptPrivacyPolicy()
    await registrationPage.submitForm()

    await expect(
      page.getByRole('heading', {
        name: 'Your Account Has Been Created!',
      }),
    ).toBeVisible()
  })
})
