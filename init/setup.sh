#!/bin/bash

confirm() {
	read -r -p "Proceed with setup for $2? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo "Cancelling setup"
		echo "Now exiting"
		exit
	else
		./"$1".sh
	fi
}

declare -a options=(
	"Configure for MacOS"
	"Configure for Ubuntu / Debian / CentOS / Fedora"
	"Configure for Arch"
	"Deploy Mission Control"
	"Exit"
)

COLUMNS=12

PS3="Please choose an option: "

select opt in "${options[@]}"
do
	case $opt in
		"Configure for MacOS")
			confirm "mac" 'MacOS'
			break
			;;
		"Configure for Ubuntu / Debian / CentOS / Fedora")
			confirm "linux" 'Linux'
			break
			;;
		"Configure for Arch")
			confirm "arch" 'Arch'
			break
			;;
		"Deploy Mission Control")
			confirm "mc" 'Mission Control'
			break
			;;
		"Exit")
			echo "Stopping..."
			break
			;;
		*) echo "invalid option $REPLY";;
	esac
done
