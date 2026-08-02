import os
import re

d = r'c:\Users\ABCD\Desktop\chiu avishkar\seva-admin'
files = [os.path.join(d, f) for f in os.listdir(d) if f.endswith('.html')]

rep1 = r'<div class="auth-logo"><img src="logo.jpg" alt="SEVA Logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: inherit; background-color: white;"></div>'
rep2 = r'<div class="brand-icon"><img src="logo.jpg" alt="SEVA Logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: inherit; background-color: white;"></div>'

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = re.sub(r'<div class="auth-logo">[\s\S]*?</div>', rep1, content)
    content = re.sub(r'<div class="brand-icon">[\s\S]*?</div>', rep2, content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Done updating HTML logos.")
