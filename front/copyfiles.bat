del ..\everion\templates\index.html
del ..\everion\plot\static\css\main*.*
del ..\everion\plot\static\js\main*.*
copy build\index.html ..\everion\templates\index.html
copy build\static\css\*.* ..\everion\plot\static\css\
copy build\static\js\*.* ..\everion\plot\static\js\
git add ..\everion\plot\static\
