color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

echo
echo "${color}Compile testApp${reset}"
/Users/carlson/Downloads/2/elm make ./testApp/src/TestApp.elm 
cp ./index.html ./testApp/dist

echo
echo "${color}Start web server on port 8080${reset}"
http-server testApp/dist/index.html