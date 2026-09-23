Set-Location "c:\projects\printking\printking\frontend"
yarn build *> build-check.log
"EXIT=$LASTEXITCODE" | Add-Content build-check.log
