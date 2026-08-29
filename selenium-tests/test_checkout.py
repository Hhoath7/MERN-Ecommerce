import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def test_cart_math_validation():
    print("\n[Start] Launching browser for Data Validation Test...")
    driver = webdriver.Chrome()
    
    try:
        # 1. Navigate to the store
        driver.get("http://localhost:3000")
        time.sleep(3) # Wait for backend database to populate UI

        # 2. Locate the first product's price and button
        price_elements = driver.find_elements(By.XPATH, "//span[contains(text(), '$')]")
        add_buttons = driver.find_elements(By.XPATH, "//button[contains(text(), 'Add to Cart')]")
        
        assert len(add_buttons) > 0, "FAIL: No products loaded from MongoDB!"

        # Extract the price text (e.g., "$99.99") and convert it to a decimal number
        raw_price_text = price_elements[0].text
        item_price = float(raw_price_text.replace('$', ''))
        print(f"[Data] Scraped item price: ${item_price}")

        # 3. Add to cart
        print("[Action] Clicking 'Add to Cart'...")
        add_buttons[0].click()
        time.sleep(1)

        # 4. Navigate to Checkout
        print("[Action] Opening the shopping cart...")
        driver.find_element(By.XPATH, "//button[contains(text(), 'Cart:')]").click()
        time.sleep(2)

        # 5. Locate the Total on the checkout page
        total_element = driver.find_element(By.XPATH, "//div[contains(text(), 'Total: $')]")
        
        # Extract the total text (e.g., "Total: $99.99") and convert to decimal
        raw_total_text = total_element.text
        cart_total = float(raw_total_text.replace('Total: $', '').strip())
        print(f"[Data] Scraped cart total: ${cart_total}")

        # 6. ASSERTION: Validate the math (Regression Testing)
        assert item_price == cart_total, f"CRITICAL BUG: Expected ${item_price}, but Cart calculated ${cart_total}"
        
        print("\n✅ PASS: Cart mathematical logic successfully validated!")

    finally:
        # Always close the browser, even if the test fails
        driver.quit()