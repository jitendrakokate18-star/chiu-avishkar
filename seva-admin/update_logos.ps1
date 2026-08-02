$dir = "c:\Users\ABCD\Desktop\chiu avishkar\seva-admin"
$htmlFiles = Get-ChildItem -Path $dir -Filter "*.html"

$authLogoPattern = '(?s)<div class="auth-logo">.*?</div>'
$authLogoReplacement = '<div class="auth-logo"><img src="logo.jpg" alt="SEVA Logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: inherit; background-color: white;"></div>'

$brandIconPattern = '(?s)<div class="brand-icon">.*?</div>'
$brandIconReplacement = '<div class="brand-icon"><img src="logo.jpg" alt="SEVA Logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: inherit; background-color: white;"></div>'

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $authLogoPattern, $authLogoReplacement)
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $brandIconPattern, $brandIconReplacement)
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
Write-Output "Logos updated successfully."
