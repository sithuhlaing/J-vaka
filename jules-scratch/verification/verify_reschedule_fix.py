from playwright.sync_api import sync_playwright, expect
import re

def run_verification():
    """
    This script verifies that the employee "Reschedule" button works correctly.
    It logs in, clicks the reschedule button, and confirms the appointment
    wizard appears on the correct page.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Log in as an employee
            page.goto("http://localhost:3000/login")
            page.get_by_role("textbox", name="NHS Email").fill("employee@example.com")
            page.get_by_role("textbox", name="Password").fill("password123")
            page.select_option('select[name="role"]', value='employee')
            page.get_by_role("button", name="Sign In").click()
            expect(page).to_have_url(re.compile(r".*/employee/dashboard"), timeout=10000)
            print("Login successful.")

            # 2. Find the "Reschedule" button and click it
            reschedule_button = page.get_by_role("button", name="Reschedule").first
            expect(reschedule_button).to_be_visible()
            print("Reschedule button found.")
            reschedule_button.click()

            # 3. Assert navigation and wizard visibility
            expect(page).to_have_url(re.compile(r".*/employee/appointments\?reschedule=.*"), timeout=5000)
            print("Navigated to appointments page with reschedule parameter.")

            wizard_title = page.get_by_role("heading", name="Date & Time")
            expect(wizard_title).to_be_visible()
            print("Appointment wizard is visible.")

            # 4. Screenshot the result
            screenshot_path = "jules-scratch/verification/reschedule_fix_verification.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"An error occurred during verification: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
            raise
        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()
