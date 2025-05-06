#!/bin/bash

#set -x

###############################################################################
#
# Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved"
#
################################################################################

################################################################################
##  Installation of DOCKER ENVIRONMENT and Other requred Tools
##  On a Fresh system, Based on OS Type.
##  The Script Installs
##
##
###############################################################################

OS_TYPE=""

CURUSER=${SUDO_USER:-$(whoami)}
#CURUSER=${SUDO_USER}
CURID=${SUDO_UID}

function isCmdExists()
{
   command -v "$1" >/dev/null 2>&1
}

function getOSType() {
   readarray -t arr < <(hostnamectl)
   for ((i=k;i<${#ar[@]};i++)); do
     printf '%s\n' "${ar[i]}"
   done
}

check_install_success() {
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



# Function to install Python 3.8 on Ubuntu
function install_ubuntu_tools() {

    CUR_WRK=${PWD}

    UBUNTU_VERSION=$(grep 'VERSION_ID' /etc/os-release | cut -d '"' -f 2)

    sudo apt-get update --fix-missing 

    sudo apt-get install -y software-properties-common
    check_install_success "software-properties-common"


    echo " ## Installing Python 3.8 and Other  Tools:"
    sudo apt-get update
    sudo apt-get install unzip openssl net-tools iputils-ping  wget -y
    check_install_success "EMS Pre-requisite-tools-1"


    sudo add-apt-repository -y ppa:deadsnakes/ppa
    sudo apt-get update
    sudo apt-get install -y python3.8

    if [[ "$UBUNTU_VERSION" == "18.04" ]]; then
      echo " This is Ubuntu 18.04 (Bionic Beaver)"
      sudo apt install -y python3.8 python3.8-distutils python3.8-venv curl
    elif [[ "$UBUNTU_VERSION" == "20.04" ]]; then
      echo " This is Ubuntu 20.04 (Focal Fossa)"
      sudo apt install -y python3.8 python3.8-distutils python3.8-venv curl
    elif [[ "$UBUNTU_VERSION" == "22.04" ]]; then
      echo "This is Ubuntu 22.04 (Jammy Jellyfish)"
      sudo apt install -y python3.8 python3-distutils python3.8-venv curl
    else
      echo "This is not Ubuntu 18.04, 20.04, or 22.04. It's Ubuntu $UBUNTU_VERSION"
    fi


    check_install_success "Python Curl"

    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    check_install_success "Python PIP"

    sudo python3.8 get-pip.py
    check_install_success "PIP"

    sudo python3.8 -m pip install elasticsearch==7.17.9
    python3.8 -m pip install requests

    check_install_success "ElasticSearch"


    echo " ## Python 3.8 installation on Ubuntu completed!"

    cd ${CUR_WRK}
}

# Function to install Python 3.8 on CentOS
function install_centos_tools() {

    CUR_WRK=${PWD}

    echo " ## Installing Python and Other Tools..."
    sudo yum install -y gcc openssl-devel bzip2-devel libffi-devel zlib-devel net-tools  wget
    check_install_success "EMS Pre-Requisite"

    sudo yum groupinstall -y "Development Tools"
    check_install_success "EMS Pre-Requisite-tools"

    if [[ -d "/usr/src" ]];then
        cd /usr/src
    elif [[ -d "/usr/local/src" ]];then
        cd /usr/local/src
    else 
        cd /tmp/
    fi

    sudo wget https://www.python.org/ftp/python/3.8.12/Python-3.8.12.tgz
    check_install_success "Python 3.8"

    sudo tar xzf Python-3.8.12.tgz
    cd Python-3.8.12
    sudo ./configure --enable-optimizations
    check_install_success "Python configure"

    sudo make altinstall
    check_install_success "Python Install"
    echo " ## Python 3.8 installation on CentOS completed!"

    # Install pip for Python 3.8
    sudo curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    sudo python3.8 get-pip.py

    # Install Elasticsearch client
    sudo python3.8 -m pip install elasticsearch==7.9.3
    python3.8 -m pip install requests


    cd ${CUR_WRK}
}

# Function to install Python 3.8 on Red Hat
function install_redhat_tools() {
    CUR_WRK=${PWD}

    echo " ## Installing Python 3.8 on Red Hat..."

    sudo yum install -y gcc openssl-devel bzip2-devel libffi-devel zlib-devel net-tools  wget
    check_install_success "EMS Pre-Requisite "

    sudo yum groupinstall -y "Development Tools"
    check_install_success "EMS Pre-Requisite-tools"

    if [[ -d "/usr/src" ]];then
        cd /usr/src
    elif [[ -d "/usr/local/src" ]];then
        cd /usr/local/src
    else 
        cd /tmp/
    fi

    sudo wget https://www.python.org/ftp/python/3.8.12/Python-3.8.12.tgz
    check_install_success "Python PkgGet "
    sudo tar xzf Python-3.8.12.tgz
    cd Python-3.8.12
    sudo ./configure --enable-optimizations
    check_install_success "Python Config "

    sudo make altinstall
    echo " ## Python 3.8 installation on Red Hat completed!"

    # Install pip for Python 3.8
    sudo curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    sudo python3.8 get-pip.py

    # Install Elasticsearch client and requests
    sudo python3.8 -m pip install elasticsearch==7.9.3
    python3.8 -m pip install requests



    cd ${CUR_WRK}
}


function installDocker() { 
  OSType=$1

  # Add the current user to the 'docker' group
  sudo usermod -aG docker ${CURUSER}
  sudo chmod 666 /var/run/docker.sock
  perm=$(ls -lrt /var/run/docker.sock)
  sudo systemctl start docker

  echo " ########################################################## "
  echo " ##  DOCKER INSTALLATION ON  :   $OSType  : COMPLETED       "
  echo " ##  DOCKER SOCK PERM: $perm        "
  echo " ##  REBOOT THE SYSTEM: BEFORE INSTALLING EMS PKG  ### "
  echo " ##  SYSTEM REBOOT REQUIRED:  "
  echo " ########################################################## "
  echo " "

  # Check if the docker group exists
  if getent group docker > /dev/null 2>&1; then
    echo " ## The 'docker' group exists.: Add User $CURUSER to docker Group ##"
  else
    echo " ## The 'docker' group does not exist. : Create it  ##"
    sudo groupadd docker
  fi

  echo "Printing EUID before checking if: ${EUID}"

  if [[ "${EUID}" -eq 0 ]]; then
    echo " ## THIS IS ROOT : LOGIN ## "
    echo " ####### Exit From ROOT PROMPT ###### "
    echo " #### WAIT FOR COMPLETION ###### "
  fi

  # Apply docker group changes without terminating the session
  sg docker -c "sudo systemctl enable docker && echo 'Docker enabled successfully'"

  echo " #### INITIATE SYSTEM REBOOT: BEFORE INSTALLING EMS PKG ###### "
}




# Function to install Docker on Ubuntu
function install_docker_ubuntu() {
    echo " ## Installing Docker on Ubuntu..."
    sudo apt-get update

    sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
    check_install_success  "Docker pre-requisite"

    sudo rm /etc/apt/keyrings/docker.gpg
    sudo mkdir -p /etc/apt/keyrings

    if [[ "$UBUNTU_VERSION" == "18.04" ]]; then

      echo " This is Ubuntu 18.04 (Bionic Beaver)"
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
      sudo add-apt-repository \
       "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
      sudo apt update
      sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    elif [[ "$UBUNTU_VERSION" == "20.04" ]]; then

      echo " This is Ubuntu 18.04 (Bionic Beaver)"
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
      sudo add-apt-repository \
       "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
      sudo apt update
      sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

      echo " This is Ubuntu 20.04 (Focal Fossa)"

    elif [[ "$UBUNTU_VERSION" == "22.04" ]]; then

      echo "This is Ubuntu 22.04 (Jammy Jellyfish)"
      sudo mkdir -p /etc/apt/keyrings
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
      echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
          $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

      sudo apt update
      sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    else
      echo "This is not Ubuntu 18.04, 20.04, or 22.04. It's Ubuntu $UBUNTU_VERSION"
    fi


    check_install_success  "Docker Engine"

    sudo curl -L "https://github.com/docker/compose/releases/download/2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    check_install_success  "Docker Compose"

    # sudo chmod +x /usr/local/bin/docker-compose

    echo " ## Docker installation on Ubuntu !"
    installDocker "UBUNTU"
}

# Function to install Docker on CentOS
function install_docker_centos() {
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

    # Install Docker Compose
    sudo curl -L https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    check_install_success "Docker Compose"

    echo " ## Docker installation on Ubuntu !"
    installDocker "CentOS"

    echo "## Docker installation on CentOS completed successfully!"

}

function install_docker_redhat() {
    echo "## Installing Docker on Red Hat..."

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

    echo " ## Docker installation on Ubuntu !"
    installDocker "RHEL"

}

# Function to install OpenJDK 17 and Node JS on Ubuntu
function install_openjdk_ubuntu() {
    echo " ## Installing OpenJDK 17  and NodeJS :  Ubuntu..."
    sudo apt-get update
    sudo apt-get install -y openjdk-17-jdk
    check_install_success "OPenJDK"

    sudo apt-get install -y curl
    check_install_success "Curl"

    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
    check_install_success "NodeJS"

    echo " ## OpenJDK 17  and NodeJS installation on Ubuntu completed!"
}

# Function to install OpenJDK 17 and Node JS on CentOS
function install_openjdk_centos() {
    echo " ## Installing OpenJDK 17 and Node JS : CentOS..."
    sudo yum install -y java-17-openjdk-devel
    check_install_success "OPenJDK"

    sudo yum install -y curl
    check_install_success "Curl"

    curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
    sudo yum install -y nodejs
    check_install_success "NodeJS"

    echo " ## OpenJDK 17 : NODE JS installation on CentOS completed!"
}

# Function to install OpenJDK 17 and Node JS on Red Hat
function install_openjdk_redhat() {
    echo " ## Installing OpenJDK 17 and Node JS on Red Hat..."
    sudo yum install -y java-17-openjdk-devel
    check_install_success "OPenJDK"

    sudo yum install -y curl
    check_install_success "Curl"

    curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
    sudo yum install -y nodejs
    check_install_success "NodeJS"

    echo " ## OpenJDK 17 and NodeJS  installation on Red Hat completed!"
}

# Function to install Maven
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

#function install_maven_ubuntu() {
    #echo " ## Installing Maven on Ubuntu..."
    #sudo apt-get update
    #sudo apt-get install -y maven
    #check_install_success "MAVEN"
    #echo " ## Maven installation on Ubuntu completed!"
#}

# Function to install Maven on CentOS
#function install_maven_centos() {
    #echo " ## Installing Maven on CentOS..."
    #sudo yum install -y maven
    #check_install_success "MAVEN"
    #echo " ## Maven installation on CentOS completed!"
#}

# Function to install Maven on Red Hat
#function install_maven_redhat() {
    #echo " ## Installing Maven on Red Hat..."
    #sudo yum install -y maven
    #check_install_success "MAVEN"
    #echo " ## Maven installation on Red Hat completed!"
#}


function isInstallCmdExists()
{
  cmdType=$1

   echo " "
   echo " ########################################################## "
   echo " ##  OS TYPE :   -----------------                       ## "
   echo " "
   cat  /etc/os-release
   echo " "
   echo " ########################################################## "

if isCmdExists $cmdType;then
   # installRequiredSoftware  "yum"
   echo " "
   echo " ##  INSTALL TOOL :  $cmdType                    ## "
   echo " "
else
   echo " ########################################################## "
   echo " ##  INSTALL ERROR: COMMAND NOT FOUND                   ##  "
   echo " ##  INSTALL FAIL: $cmdType NOT FOUND ERROR :        ## "
   echo " ########################################################## "
   echo " "
   exit 1
fi

}

function displayInstallError()
{
   toolType=$1

   echo " ########################################################## "
   echo " ##  INSTALL ERROR: COMMAND NOT FOUND                   ##  "
   echo " ##  INSTALL FAIL: $toolType NOT FOUND ERROR :        ## "
   echo " ########################################################## "
   echo " "
   exit 1

}


function displayVerInfo()
{

   echo " ########################################################## "
   # Verify Docker Installation
   docker --version
   if [ $? -eq 0 ]; then
       echo " ## Docker installed successfully!"
   else
       echo " ## Docker installation failed!"
       displayInstallError "Docker Tools"
   fi

   # Verify OpenJDK Installation
   java -version
   if [ $? -eq 0 ]; then
       echo " ## OpenJDK 17 installed successfully!"
   else
       echo " ## OpenJDK 17 installation failed!"
       displayInstallError "JDK Tools"
   fi

   # Verify Maven Installation
   mvn -version
   if [ $? -eq 0 ]; then
       echo " ## Maven installed successfully!"
   else
       echo " ## Maven installation failed!"
       displayInstallError "Maven Tools"
   fi
   echo " ########################################################## "

}






function findOSTypeAndInstallEMS_Env()
{
  echo " ##################################### "
  echo " ## - CURRENT USER : ${CURUSER} ## "
  echo " ## - CURRENT USER ID : ${CURID}  ## "
  echo " ##   EMS ENVIRONMENT : INITIATED  ## "
  echo " ##################################### "

  getOSType
  # Detect the operating system and install Docker, OpenJDK 17, and Maven
  if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    case $OS in
        ubuntu)
	    OS_TYPE="ubuntu"
	    isInstallCmdExists "apt-get"
	    install_ubuntu_tools
            install_openjdk_ubuntu
            install_maven
            install_docker_ubuntu
            ;;
        centos)
	    OS_TYPE="centos"
	    isInstallCmdExists "yum"
	    install_centos_tools
            install_openjdk_centos
            install_maven
            install_docker_centos
            ;;
        rhel)
	    OS_TYPE="rhel"
	    isInstallCmdExists "yum"
	    install_redhat_tools
            install_openjdk_redhat
            install_maven
            install_docker_redhat
            ;;
        *)
            echo " ## Unsupported operating system: $OS"
            displayInstallError $OS
            exit 1
            ;;
    esac
  else
    echo " ## Cannot detect the operating system."
    displayInstallError $OS
    exit 1
  fi

}






findOSTypeAndInstallEMS_Env
displayVerInfo





