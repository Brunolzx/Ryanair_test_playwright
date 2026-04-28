import { test, expect } from '@playwright/test';


// TEST SUBJECT : Flight booking on Ryanair
// PROJECT      : Ryanair Manual Testing
// TESTER       : Bruno Moreira
// ENVIRONMENT  : Windows 11 / Chrome v147
// USER STORY   : As a user I want to book a flight from Porto
//                to Milan so that I can travel for a weekend
//                in August


test('Flight booking on Ryanair', async ({ page }) => {

  // Extend the default timeout to 120 s — the booking flow has many steps
  test.setTimeout(120000);


  // PREREQ · GIVEN the user is on the Ryanair homepage: "https://www.ryanair.com/gb/en"


  // Open the Ryanair GB homepage
  await page.goto('https://www.ryanair.com/gb/en');

  // Assertion: Confirm the correct URL
  await expect(page).toHaveURL('https://www.ryanair.com/gb/en');

  // Accept the cookies
  await page.getByRole('button', { name: 'Yes, I agree' }).click();


  // TC01 · Search for valid flights


  // The user selects the Departure and Destination airport
  await page.getByRole('textbox', { name: 'To' }).click();
  await page.getByRole('textbox', { name: 'To' }).fill('Milan');
  await page.getByRole('button', { name: 'Milan (All Airports)' }).click();

  // Assertion: Date-picker should appear after a destination is chosen
  await expect(page.getByRole('button', { name: 'Depart Choose date' })).toBeVisible();

  await page.getByRole('button', { name: 'Aug' }).first().click();

  // Assertion: The date-picker tooltip should be visible
  await expect(page.getByRole('tooltip', { name: 'Exact dates Flexible dates' })).toBeVisible();

  // The user selects Friday 7th August as the departure date
  await page.getByText('7').nth(2).click();

  // Assertion: Departure button should show the chosen date
  await expect(page.getByRole('button', { name: 'Depart Fri, 7 Aug' })).toBeVisible();

  // The user selects Sunday 9th August as the return date
  await page.getByText('9').nth(1).click();

  // Assertion: Return button should show the chosen date
  await expect(page.getByRole('button', { name: 'Return Sun, 9 Aug' })).toBeVisible();

  // Confirm the passenger/date selection by clicking "Done"
  await page.getByRole('button', { name: 'Done' }).click();

  // The user clicks on the checkbox for the "Website Terms of Use"
  await page.locator('._background').click();

  // The user clicks on the button "Search"
  await page.getByRole('button', { name: 'Search' }).click();

  // Assertion: Results page loaded — Ryanair logo confirms page transition
  await expect(page.getByRole('link', { name: 'Ryanair logo' })).toBeVisible();


  // TC02 · Select basic fare


  // The user selects the first option available on the departure list
  await page.getByRole('button', { name: 'Select' }).first().click();

  // Assertion: Flight heading should confirm the correct route
  await expect(page.getByRole('heading', { name: 'Porto to Milan Bergamo' })).toBeVisible();

  // The user selects the last option available on the return list
  await page.getByRole('button', { name: 'Select' }).nth(2).click();

  // Assertion: The fare-selection row should now be visible
  await expect(page.getByRole('row', { name: 'Image that represents regular' })).toBeVisible();

  // The user selects the option "Continue with the basic for €XX"
  await page.getByRole('button', { name: 'Continue with basic for € 211 .' }).click();

  // Assertion: Fare summary heading should confirm the selected fare
  await expect(page.getByRole('heading', { name: 'Your selected fare' })).toBeVisible();

  // The user selects "Continue with Basic"
  await page.getByRole('button', { name: 'Continue with Basic' }).click();

  // The user selects on the option "Log in later"
  await page.getByRole('button', { name: 'Log in later' }).click();

  // Remove extra passengers added by default (click the minus button)
  await page.getByRole('button', { name: '-' }).click();

  // Set passenger title to "Mr"
  await page.getByRole('button', { name: 'Mr', exact: true }).click();

  // The user fills the "First Name" with "Bruno"
  await page.getByRole('textbox', { name: 'First name' }).fill('Bruno');

  // The user fills the "Last Name" with "Moreira"
  await page.getByRole('textbox', { name: 'Last name' }).fill('Moreira');

  // The user clicks on the "Continue" button
  await page.getByRole('button', { name: 'Continue' }).click();


  // TC03 · Skip seats selection


  // Assertion: Seat-selection screen should be visible before acting
  await expect(page.getByRole('button', { name: 'undefined Option 1: Sit where' })).toBeVisible();

  // The User chooses "Option 2: Select seats later" to skip seat assignment
  await page.getByRole('button', { name: 'undefined Option 2: Select' }).click();

  // Assertion: A confirmation dialog should warn about proceeding without a seat
  await expect(page.getByRole('heading', { name: 'Before continuing without a' })).toBeVisible();

  // The user clicks on the "Continue without a seat" button
  await page.getByRole('button', { name: 'Continue without a seat' }).click();

  // The user selects the option "Continue with random allocation"
  await page.getByRole('button', { name: 'Continue with random' }).click();


  // TC04 · Select only small bag


  // Assertion: Bags/equipment tab must be visible before selecting bag options
  await expect(page.getByRole('tab', { name: 'equipment-title Equipment' })).toBeVisible();

  // The user selects the option "1 Small Bag Only" on the "Porto to Milan" flight
  await page.locator('label').first().click();

  // The user selects the option "1 Small Bag Only" on the "Milan to Porto" flight
  await page.locator('label').nth(2).click();

  // The user clicks on the "Continue" button
  await page.getByRole('button', { name: 'Continue' }).click();


  // TC05 · Skip other extras
 

  // The user skips all the options on the "Airport & Trip" and clicks on the "Continue" button
  await page.getByRole('button', { name: 'Continue' }).click();

  // The user skips all the options on the "Transport" and clicks on the "Continue" button
  await page.getByRole('button', { name: 'Continue' }).click();

  // TC06 · Login popup appears (end-to-end completion assertion)


  // Assertion: The website shows a login or signup popup, AND the user is not allowed to continue without authentication
  await expect(page.getByText('Log in', { exact: false }).first()).toBeVisible();

});