$port = 9224
$profile = 'D:/code/dily cafe/project/.tmp/cp2'
try { & 'taskkill' '/F' '/IM' 'chrome.exe' '/T' } catch {}
Start-Sleep -Seconds 1
$chrome = Start-Process '"C:\Program Files\Google\Chrome\Application\chrome.exe"' -ArgumentList "--headless=new --disable-gpu --no-sandbox --no-first-run --hide-scrollbars --remote-debugging-port=$port --user-data-dir=`"$profile`" about:blank" -PassThru -WindowStyle Hidden
Write-Output "chrome pid: $($chrome.Id)"
Start-Sleep -Seconds 4
try { $r = Invoke-WebRequest "http://127.0.0.1:$port/json/version" -UseBasicParsing -TimeoutSec 5; Write-Output "version: $($r.Content)" } catch { Write-Output "FAIL: $($_.Exception.Message)" }
# kill
try { & 'taskkill' '/F' '/IM' 'chrome.exe' '/T' } catch {}
