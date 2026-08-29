import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def test_shopping_cart_flow():
    print("\n[Start] Launching browser for PyTest...")
    driver = webdriver.Chrome()
    
    try:
        driver.get("http://localhost:3000")
        time.sleep(3) # Wait for MongoDB products to load

        # 1. ASSERT the products loaded correctly
        add_buttons = driver.find_elements(By.XPATH, "//button[contains(text(), 'Add to Cart')]")
        assert len(add_buttons) > 0, "FAIL: No products loaded on the screen!"

        # 2. Click the first button
        print("[Action] Clicking 'Add to Cart' on the first item...")
        add_buttons[0].click()
        time.sleep(1)

        # 3. Open the cart
        print("[Action] Navigating to Checkout...")
        cart_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Cart:')]")
        cart_button.click()
        time.sleep(2)

        # 4. ASSERT the checkout page loaded by finding the 'Place Order' button
        place_order_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Place Order')]")
        assert place_order_btn.is_displayed(), "FAIL: The checkout page did not open!"
        
        print("\n✅ PASS: Cart navigation and checkout logic verified!")

    finally:
        driver.quit()