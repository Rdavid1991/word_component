
$Folder = '.\dist'
if (Test-Path -Path $Folder) {
    Remove-Item -Force -Recurse $Folder 
}
Rename-Item -Force .\build\ dist