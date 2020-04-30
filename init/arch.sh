#!/bin/bash

declare -a packages=(
"docker"
"docker-compose"
)

install_packages() {
	read -r -p "Install Docker? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping Docker Install..."
	else
		echo -e "\nInstalling required packages for Arch..."

	sudo pacman -Syu ${packages[@]}

	echo -e "DONE.\n"
	fi
}

enable_docker() {
	read -r -p "Start and enable Docker? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping Docker systemctl setup..."
	else
		echo -e "\nStarting Docker through systemctl..."
		systemctl start docker

		echo -e "\nEnabling Docker through systemctl..."
		systemctl enable docker

		echo -e "DONE.\n"
	fi
}

configure_docker() {
	read -r -p "Manage Docker as a non-root user? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping Docker non-root configuration..."
	else
		echo -e "\nAdding 'docker' group..."
		sudo groupadd docker

		echo -e "\nAdding user $USER to 'docker' group..."
		sudo usermod -aG docker "$USER"

		echo -e "\nDone. Logout and back in to refresh groups.\n"
	fi
}

install_packages
enable_docker
configure_docker
