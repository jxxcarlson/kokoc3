color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

echo
echo "${color}Compile reader to ./dist/Main.js${reset}"
/Users/carlson/Downloads/2/elm make  --optimize ./src/Reader.elm --output ./dist/Main.js

echo
echo "${color}Uglify ...${reset}"
uglifyjs ./dist/Main.js -mc 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9"' -o ./dist/Main.min.js

echo
echo "${color}Clean up${reset}"
rm ./dist/Main.js

echo
echo "${color}Deploy to now ... ${reset}"
now --public ./dist