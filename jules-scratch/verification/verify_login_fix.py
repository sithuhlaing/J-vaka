from playwright.sync_api import sync_playwright, expect

def run_verification():
    """
    This script verifies that a user can successfully log in to the application
    with the corrected credentials.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Arrange: Go to the login page.
            page.goto("http://localhost:3000/login")

            # 2. Act: Fill in the login form with valid employee credentials.
            # Use specific, user-facing locators to find the form fields.
            page.get_by_role("textbox", name="NHS Email").fill("test@nhs.uk")
            page.get_by_role("textbox", name="Password").fill("password123")

            # The role selector is a <select> element, so we can find it by its name attribute.
            # Then we select the 'employee' option by its value.
            page.select_option('select[name="role"]', value='employee')

            # Click the "Sign In" button.
            page.get_by_role("button", name="Sign In").click()

            # 3. Assert: Confirm the navigation to the employee dashboard was successful.
            # We expect the URL to change to the employee dashboard.
            expect(page).to_have_url("http://localhost:3000/employee/dashboard", timeout=5000)

            # Also, assert that the dashboard heading is visible.
            dashboard_heading = page.get_by_role("heading", name="Employee Dashboard")
            expect(dashboard_heading).to_be_visible()

            # 4. Screenshot: Capture the final result for visual verification.
            screenshot_path = "jules-scratch/verification/verification.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"An error occurred during verification: {e}")
            # Take a screenshot even on failure to help with debugging.
            page.screenshot(path="jules-scratch/verification/error.png")
            raise

        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()
