color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

echo
echo "${color}Compile reader${reset}"
/Users/carlson/Downloads/2/elm make --optimize ./src/Reader.elm --output /usr/local/var/www/Main.js

if [ "$1" = "-r" ]
then
echo
echo "${color}Start web server on port 8080${reset}"
http-server ./dist
fi



if [ "$1" = "-i" ]
then
echo
echo "${color}  -i: Compile app to Main.js, use index.html${reset}"
/Users/carlson/Downloads/2/elm make --optimize ./src/Reader.elm --output Main.js
echo
echo "${color}Copy files to  /usr/local/var/www/ and restart nginx${reset}"
nginx -s stop
cp ./dist/index.html /usr/local/var/www/        
nginx
fi  