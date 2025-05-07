#! /bin/bash

################################################################################
#                                                                              #
# Copyright 2024 RideNext Software Solutions Pvt Ltd                           #
#                                                                              #
#################################################################################

Tag=$1 #Tag for the built image
Components=$2 
Registry=$3 #Registry to push the image
build=(1 1 1)
NOW=$(date +"%m.%d.%Y")

LOCAL_DB_TYPE="ELASTIC"

#Checking valid numbers of arguments
if [ "$#" -lt 2 -o "$#" -gt 3 ]; then
    echo -e "\nUsage: ./buildImage.sh <tag> <component - 1.sdnc-web, 2.sdnr,   3.perf  4.vescollector  5.nbi  6.dfc  <Registry>\n\t\t"
    echo -e "Components:"
    echo -e "\tsdnc-web"
    echo -e "\tsdnr"
    echo -e "\tperf"
    echo -e "\tvescollector"
    echo -e "\tnbi"
    echo -e "\tdfc"
    echo -e "\tall"
    echo " "
    echo "If built image need to be pushed to registry then "
    exit 1
fi

if [[ $Components && $Components != 'all' ]]; then
   build=(0 0 0)
   index=0
   for j in sdnc-web sdnr perf vescollector nbi  dfc
   do
     if [[ "$j" == *"$Components"* ]]; then
        build[$index]=1
     fi
     index=$index+1
   done
elif [[ $Components && $Components == 'all' ]]; then
  # Enable all Compilation
   build[0]=1 
   build[1]=1 
   build[2]=1 
   build[3]=1 
   build[4]=1 
   build[5]=1 
else
   echo " Un supported Option : $Components "
fi


if [[ $Registry ]]; then
   echo "Ensure docker login $Registry is done"
   ImageBaseName=$Registry/$Buildtype
else
   ImageBaseName=$Buildtype
fi

index=0
buildDir=$PWD
for j in sdnc-web sdnr  perf vescollector nbi  dfc
do
   #echo " ${build[$index]} "
   #echo " building Image  $buildDir  : $j"

   if [[ ${build[$index]} == '1' ]]; then
      echo " building Image  $buildDir  : $j"
      if [ $j == 'sdnc-web' ]; then
	 cd "${buildDir}/sdncWeb"
         docker build . -t $j:$Tag  -f Dockerfile
      elif [ $j == 'sdnr' ]; then
	 cd "${buildDir}/sdnr/docker"
         docker build . -t $j:$Tag  -f Dockerfile
      elif [ $j == 'vescollector' ]; then
	 cd "${buildDir}/vesCollector"
         docker build . -t $j:$Tag  -f Dockerfile
      elif [ $j == 'nbi' ]; then
	 cd "${buildDir}/nbi/docker"
         docker build . -t $j:$Tag  -f Dockerfile
      elif [ $j == 'dfc' ]; then
	 cd "${buildDir}/dfc"
         docker build . -t $j:$Tag  -f Dockerfile
      else
	 cd  "${buildDir}/perf/docker"
         echo "DB_TYPE: ${LOCAL_DB_TYPE} "
	 echo " Buidling Performance Docker image with DB Type: ${LOCAL_DB_TYPE} "
         docker build . -t $j:$Tag --build-arg DB_TYPE=${LOCAL_DB_TYPE}  -f Dockerfile
      fi
      #docker build . -t $j:$Tag  -f Dockerfile
      
      if [[ $Registry ]]; then
         docker push localhost:5000/$j:$Tag
      fi
   fi
   index=$index+1
done

cd ${buildDir}
