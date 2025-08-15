from playwright.sync_api import sync_playwright, expect
import re

def run_verification():
    """
    This script verifies that the admin dashboard buttons navigate correctly.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Log in as an admin
            page.goto("http://localhost:3000/login")
            page.get_by_role("textbox", name="NHS Email").fill("admin@example.com")
            page.get_by_role("textbox", name="Password").fill("password123")
            page.select_option('select[name="role"]', value='admin')
            page.get_by_role("button", name="Sign In").click()
            expect(page).to_have_url(re.compile(r".*/admin/dashboard"), timeout=10000)
            print("Admin login successful.")

            # 2. Click the "User Management" button
            user_management_button = page.get_by_role("button", name="User Management")
            expect(user_management_button).to_be_visible()
            user_management_button.click()

            # 3. Assert navigation
            expect(page).to_have_url(re.compile(r".*/admin/users"), timeout=5000)
            print("Navigated to admin users page.")

            # 4. Screenshot the result
            screenshot_path = "jules-scratch/verification/admin_fix_verification.png"
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
