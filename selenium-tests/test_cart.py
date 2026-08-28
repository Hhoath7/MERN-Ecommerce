from selenium import webdriver
from selenium.webdriver.common.by import By
import time

print("🤖 Starting the automated test...")

# 1. Open a new Chrome browser window
driver = webdriver.Chrome()

try:
    # 2. Go to your local React store
    print("🌐 Opening the MERN store...")
    driver.get("http://localhost:3000")
    
    # Wait 3 seconds to let the database products load
    time.sleep(3) 

    # 3. Find all the "Add to Cart" buttons on the screen
    add_buttons = driver.find_elements(By.XPATH, "//button[contains(text(), 'Add to Cart')]")
    print(f"📦 Found {len(add_buttons)} products on the page.")

    if len(add_buttons) > 0:
        # 4. Click the "Add to Cart" button on the very first product!
        print("🖱️ Clicking 'Add to Cart' on the first product...")
        add_buttons[0].click()
        time.sleep(2) # Wait a moment to let the cart update

        # 5. Find the main Cart button at the top and click it to check out
        cart_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Cart:')]")
        print("🛒 Opening the shopping cart...")
        cart_button.click()
        
        # Wait a few seconds so you can see it worked!
        time.sleep(4)
        print("✅ Automation Test completed successfully!")
    else:
        print("❌ No products found. Make sure your React app and Server are running!")

finally:
    # 6. Close the browser when finished
    print("Closing the browser...")
    driver.quit()