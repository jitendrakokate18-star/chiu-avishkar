import os
import re

def remove_pravatar(directory):
    for root, _, files in os.walk(directory):
        if 'build' in root: continue
        for file in files:
            if file.endswith('.dart'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace backgroundImage: NetworkImage('https://i.pravatar.cc...')
                # with child: const Icon(Icons.person, color: Colors.white)
                pattern = r"backgroundImage:\s*NetworkImage\('https://i\.pravatar\.cc[^']+'\),*"
                replacement = r"child: const Icon(Icons.person, color: Colors.white),"
                
                new_content = re.sub(pattern, replacement, content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")

remove_pravatar(r"c:\Users\ABCD\Desktop\chiu avishkar")
print("Done!")
