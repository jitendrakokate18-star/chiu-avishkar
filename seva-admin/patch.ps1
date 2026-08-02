$dir = "c:\Users\ABCD\Desktop\chiu avishkar\seva-admin"
$htmlFiles = Get-ChildItem -Path $dir -Filter "*.html"

$emojiMap = @{
    '📊' = 'dashboard'
    '🧑‍⚕️' = 'medical_services'
    '👨‍👩‍👧' = 'family_restroom'
    '🧓' = 'elderly'
    '📅' = 'event'
    '🗓️' = 'calendar_month'
    '⏱️' = 'schedule'
    '💰' = 'payments'
    '💳' = 'credit_card'
    '📈' = 'bar_chart'
    '🎧' = 'headset_mic'
    '⚙️' = 'settings'
    '☰' = 'menu'
    '🔍' = 'search'
    '🔔' = 'notifications'
    '👤' = 'account_circle'
    '🩺' = 'stethoscope'
}

$namesMap = @{
    'Sarah Jenkins' = 'Sunita Verma'
    'Michael Chen' = 'Rahul Desai'
    'Emily Rodriguez' = 'Anjali Patel'
    'Robert Johnson' = 'Ramesh Kumar'
}

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    foreach ($old in $namesMap.Keys) {
        $content = $content.Replace($old, $namesMap[$old])
    }
    
    foreach ($emoji in $emojiMap.Keys) {
        $icon = $emojiMap[$emoji]
        $content = $content.Replace($emoji, "<span class=""material-icons"" style=""font-size: 1.2rem;"">$icon</span>")
    }
    
    if ($content -notmatch "Material\+Icons") {
        $content = $content.Replace("</head>", "  <link href=""https://fonts.googleapis.com/icon?family=Material+Icons"" rel=""stylesheet"">`n</head>")
    }
    
    if ($content -notmatch "Outfit:wght") {
        $content = $content.Replace("</head>", "  <link href=""https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"" rel=""stylesheet"">`n</head>")
    }
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

$cssPath = Join-Path $dir "css\style.css"
if (Test-Path $cssPath) {
    $css = Get-Content -Path $cssPath -Raw -Encoding UTF8
    $css = $css.Replace("font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;", "font-family: 'Outfit', sans-serif;")
    $css = $css.Replace("font-family: Arial, sans-serif;", "font-family: 'Outfit', sans-serif;")
    
    # Also adjust the nav-icon class if needed to display nicely with material icons
    if ($css -notmatch "display: flex; align-items: center; justify-content: center;") {
        $css = $css.Replace(".nav-icon {", ".nav-icon { display: flex; align-items: center; justify-content: center;")
    }

    Set-Content -Path $cssPath -Value $css -Encoding UTF8
}

Write-Output "Done!"
