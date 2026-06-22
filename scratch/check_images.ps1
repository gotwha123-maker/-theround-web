Add-Type -AssemblyName System.Drawing
Get-ChildItem "c:\Users\thero\Desktop\theround-web-next\public\assets\yearend_member_*" | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Output "$($_.Name): $($img.Width) x $($img.Height)"
    $img.Dispose()
}
