import { Page } from '@playwright/test'

export function createRegistrationPage(page: Page) {
  const firstNameInput = page.locator('#input-firstname')
  const lastNameInput = page.locator('#input-lastname')
  const emailInput = page.locator('#input-email')
  const passwordInput = page.locator('#input-password')
  const privacyPolicyCheckbox = page.locator(".form-check-input[name='agree']")
  const continueButton = page.locator(".btn[class^='btn btn-primary']")

  const goto = async () => {
    await page.goto(
      'http://localhost/opencart/upload/index.php?route=account/register&language=en-gb',
    )
  }

  const fillRegistrationForm = async (data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    await firstNameInput.fill(data.firstName)
    await lastNameInput.fill(data.lastName)
    await emailInput.fill(data.email)
    await passwordInput.fill(data.password)
  }

  const acceptPrivacyPolicy = async () => {
    await privacyPolicyCheckbox.check()
  }

  const submitForm = async () => {
    await continueButton.click()
  }

  return {
    firstNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    privacyPolicyCheckbox,
    continueButton,
    goto,
    fillRegistrationForm,
    acceptPrivacyPolicy,
    submitForm,
  }
}

export const RegistrationPage = createRegistrationPage
export type RegistrationPage = ReturnType<typeof createRegistrationPage>
