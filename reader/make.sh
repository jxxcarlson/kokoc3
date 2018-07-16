color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

echo
echo "${color}Compile reader${reset}"
/Users/carlson/Downloads/2/elm make --optimize ./src/Reader.elm --output ./dist/Main.js

if [ "$1" = "-r" ]
then
echo
echo "${color}Start web server on port 8080${reset}"
http-server ./dist
fi
