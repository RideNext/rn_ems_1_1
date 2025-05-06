#!/bin/bash

set +x

###############################################################################
#
# Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved"
#
################################################################################

################################################################################
##  Installation of DOCKER ENVIRONMENT and Other required Tools
##  On a Fresh system, Based on OS Type.
##  The Script Installs:
##  - Docker
##  - Docker-compose
##  - Python 3.8
##  - Java 17
##  - Maven 3.9.5
##  - npm (v8.19.4)
##  - Yarn (v1.22.21)
##  - Node.js (v16.x)
##
###############################################################################

OS_TYPE=""
CURUSER=${SUDO_USER}
CURID=${SUDO_UID}

function isCmdExists()
{
   command -v "$1" >/dev/null 2>&1
}

function check_install_success() {
    if [ $? -ne 0 ]; then
        echo " ## Error: $1 failed. Exiting."
        echo " "
        echo " ########################################################## "
        echo " ##  INSTALLATION ERROR  :   $1  : FAILED       "
        echo " ########################################################## "
        echo " "
        exit 1
    else
        echo " ### $1 succeeded. ###"
    fi
}
# Function to add settings.xml to .m2 directory
function setup_maven_settings() {
    # Get the directory where the script resides, resolving symlinks if needed
    SCRIPT_PATH="$(readlink -f "${BASH_SOURCE[0]}")"
    SCRIPT_DIR="$(dirname "$SCRIPT_PATH")"
    
    MAVEN_SETTINGS_DIR="$HOME/.m2"
    MAVEN_SETTINGS_FILE="$MAVEN_SETTINGS_DIR/settings.xml"

    echo "Script path: $SCRIPT_PATH"
    echo "Script directory: $SCRIPT_DIR"
    echo "Current working directory: $(pwd)"

    # Ensure the .m2 directory exists
    if [ ! -d "$MAVEN_SETTINGS_DIR" ]; then
        echo " ## Creating .m2 directory..."
        mkdir -p "$MAVEN_SETTINGS_DIR"
        check_install_success ".m2 directory creation"
    fi

    # Copy or create the settings.xml file in the .m2 directory
    if [ ! -f "$MAVEN_SETTINGS_FILE" ]; then
        echo " ## Adding settings.xml to $MAVEN_SETTINGS_DIR..."
        cp "$SCRIPT_DIR/settings.xml" "$MAVEN_SETTINGS_FILE" || \
        echo "<settings></settings>" > "$MAVEN_SETTINGS_FILE"
        check_install_success "settings.xml creation"
    else
        echo " ## settings.xml already exists in $MAVEN_SETTINGS_DIR"
    fi

    echo " ## Maven settings.xml setup completed!"
}


# Function to install Docker and Docker-compose
function install_docker() {
    echo " ## Installing Docker..."

    if [[ "$OS_TYPE" == "ubuntu" ]]; then
        sudo apt-get update

        # Check if docker.io is installed and remove it, allowing changes to held packages
        if dpkg -l | grep -q docker.io; then
            echo " ## Removing docker.io to prevent conflicts..."
            sudo apt-get remove -y --allow-change-held-packages docker.io
            check_install_success "docker.io removal"
        fi

        sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
        check_install_success "Docker pre-requisite"

        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        sudo add-apt-repository \
            "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
        sudo apt-get update
        sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
        check_install_success "Docker Engine and Docker Compose"
    elif [[ "$OS_TYPE" == "centos" || "$OS_TYPE" == "rhel" ]]; then
            echo "## Installing Docker on CentOS..."

       # Remove conflicting packages
       sudo yum remove -y runc containerd.io buildah containers-common podman podman-docker docker docker-ce docker-ce-cli
       check_install_success "Remove Conflicting Packages"

       # Disable modular filtering
       sudo yum module disable -y container-tools
       sudo yum module reset -y container-tools
       check_install_success "Disable Modular Filtering"

       # Add Docker's official repository
       sudo yum install -y yum-utils
       sudo yum-config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
       check_install_success "Add Docker Repo"

       # Install Docker packages
       sudo yum install -y docker-ce docker-ce-cli containerd.io --nobest
       check_install_success "Docker Tools"

       # Start Docker service
       sudo systemctl start docker
       sudo systemctl enable docker
       check_install_success "Start Docker Service"

       # Verify installation
       docker --version
      if [ $? -eq 0 ]; then
         echo "## Docker installed successfully!"
      else
         echo "## Docker installation failed!"
         displayInstallError "Docker Tools"
    fi

      echo "## Docker installation on Red Hat completed successfully!"
      sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
      sudo chmod +x /usr/local/bin/docker-compose
      check_install_success  "Docker Composite"

     echo " ## Docker installation on CentOS !"
   fi

     sudo systemctl start docker
     sudo systemctl enable docker
     sudo usermod -aG docker $CURUSER

     echo " ## Docker and Docker Compose installation completed!"
}

# Function to install Python
function install_python() {
    echo " ## Installing Python 3.8..."

    if [[ "$OS_TYPE" == "ubuntu" ]]; then
        sudo apt-get update
        sudo apt-get install -y software-properties-common
        sudo add-apt-repository -y ppa:deadsnakes/ppa
        sudo apt-get update
        sudo apt-get install -y python3.8 python3.8-venv python3.8-distutils
        check_install_success "Python 3.8"

    elif [[ "$OS_TYPE" == "centos" || "$OS_TYPE" == "rhel" ]]; then
        sudo yum install -y gcc openssl-devel bzip2-devel libffi-devel zlib-devel wget
        check_install_success "Python 3.8 pre-requisites"

        cd /usr/src
        sudo wget https://www.python.org/ftp/python/3.8.12/Python-3.8.12.tgz
        sudo tar xzf Python-3.8.12.tgz
        cd Python-3.8.12
        sudo ./configure --enable-optimizations
        sudo make altinstall
        check_install_success "Python 3.8"
    fi

    echo " ## Python 3.8 installation completed!"
}

# Function to install Java 17
function install_java() {
    echo " ## Installing Java 17..."

    if [[ "$OS_TYPE" == "ubuntu" ]]; then
        sudo apt-get update
        sudo apt-get install -y openjdk-17-jdk
        check_install_success "Java 17"

    elif [[ "$OS_TYPE" == "centos" || "$OS_TYPE" == "rhel" ]]; then
        sudo yum install -y java-17-openjdk-devel
        check_install_success "Java 17"
    fi

    echo " ## Java 17 installation completed!"
}

# Function to install Maven 3.9.5
function install_maven() {
    echo " ## Installing Maven 3.9.5..."

    # Check if Maven is already installed and remove it
    if mvn -v >/dev/null 2>&1; then
        echo " ## Maven is already installed. Removing existing Maven..."

        # Remove Maven depending on the OS
        if command -v apt-get >/dev/null 2>&1; then
            sudo apt-get remove -y maven || sudo rm -rf /usr/bin/mvn /usr/share/maven /opt/apache-maven*
        elif command -v yum >/dev/null 2>&1; then
            sudo yum remove -y maven || sudo rm -rf /usr/bin/mvn /usr/share/maven /opt/apache-maven*
        fi

        check_install_success "Existing Maven removal"
        echo " ## Existing Maven installation removed."
    fi

    # Install Maven 3.9.5
    sudo wget https://dlcdn.apache.org/maven/maven-3/3.9.5/binaries/apache-maven-3.9.5-bin.tar.gz
    sudo tar -xvzf apache-maven-3.9.5-bin.tar.gz -C /opt/
    check_install_success "Maven 3.9.5 installation"

    # Remove the existing symbolic link if it exists
    if [ -L "/usr/bin/mvn" ]; then
        echo " ## Removing existing symbolic link for Maven..."
        sudo rm -f /usr/bin/mvn
    fi

    # Create a new symbolic link for Maven
    sudo ln -s /opt/apache-maven-3.9.5/bin/mvn /usr/bin/mvn
    check_install_success "Maven symbolic link creation"

    # Clean up the downloaded tar.gz file
    echo " ## Cleaning up the downloaded Maven archive..."
    sudo rm -f apache-maven-3.9.5-bin.tar.gz
    check_install_success "Maven archive cleanup"

    echo " ## Maven 3.9.5 installation and cleanup completed!"
}



# Function to install Node.js, npm, and Yarn
function install_node_npm_yarn() {
    echo " ## Installing Node.js 16.x, npm 8.19.4, and Yarn 1.22.21..."

    if [[ "$OS_TYPE" == "ubuntu" ]]; then
        curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
        sudo apt-get install -y nodejs
        check_install_success "Node.js"

    elif [[ "$OS_TYPE" == "centos" || "$OS_TYPE" == "rhel" ]]; then
        curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
        sudo yum install -y nodejs
        check_install_success "Node.js"
    fi

    echo " ## Installing npm 8.19.4..."
    sudo npm install -g npm@8.19.4
    check_install_success "npm"

    echo " ## Installing Yarn 1.22.21..."
    sudo npm install -g yarn@1.22.21
    check_install_success "Yarn"

    echo " ## Node.js, npm, and Yarn installation completed!"
}

# Function to detect OS type and install all components
function findOSTypeAndInstallAll() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$ID
        case $OS in
            ubuntu)
                OS_TYPE="ubuntu"
                ;;
            centos)
                OS_TYPE="centos"
                ;;
            rhel)
                OS_TYPE="rhel"
                ;;
            *)
                echo " ## Unsupported operating system: $OS"
                exit 1
                ;;
        esac
    else
        echo " ## Cannot detect the operating system."
        exit 1
    fi

    echo " ## Installing components for $OS_TYPE..."

    setup_maven_settings
    install_docker
    install_python
    install_java
    install_maven
    install_node_npm_yarn

    echo " ## All components installed successfully!"
}

# Start the installation
findOSTypeAndInstallAll

