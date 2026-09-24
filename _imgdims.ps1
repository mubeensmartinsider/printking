Add-Type -AssemblyName System.Drawing
$dir = 'c:\projects\printking\printking\frontend\public\assets'
$out = @()
Get-ChildItem -Path $dir -File | Where-Object { $_.Extension -match '(?i)\.(jpe?g|png|webp)$' } | ForEach-Object {
  try {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $ratio = [math]::Round($img.Width / $img.Height, 3)
    $out += ("{0} {1}x{2} ratio={3}" -f $_.Name, $img.Width, $img.Height, $ratio)
    $img.Dispose()
  } catch {
    $out += ("{0} ERROR {1}" -f $_.Name, $_.Exception.Message)
  }
}
$out | Out-File -Encoding ascii 'c:\projects\printking\printking\_imgdims.txt'
"done" | Out-File -Encoding ascii -Append 'c:\projects\printking\printking\_imgdims.txt'
