#!/bin/bash

declare -a packages=(
	"docker"
	"docker-compose"
)

install_packages() {
	read -r -p "\nInstall Docker & docker-compose? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping Docker systemctl setup...\n"
	else
		echo -e "\nInstalling Docker for MacOS..."

		brew install ${packages[@]}
		brew cask install docker

		echo -e "DONE.\n"
	fi
}

setup_homebrew() {
	read -r -p "\nInstall Homebrew? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping Homebrew setup...\n"
	else
		if [[ ! $(which brew) ]] && [[ ! $(brew --version &> /dev/null) ]]; then
			echo -e "\nCould not find existing HOMEBREW installation."
			echo -e "\nNow installing..."
			/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
		fi
	fi
}

setup_macos() {
	echo -e "\nSetting up MacOS config...\n"

	setup_homebrew
	install_packages

	open /Applications/Docker.app
	echo -e "\nStarting the Docker daemon, this could take a while"
	echo -e "Check your task bar to make sure it's running before continuing"
}

setup_macos
