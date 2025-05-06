#!/bin/bash


   ################################################################################################
   #                                                                                              #
   #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
   #                                                                                              #
   ################################################################################################


echo "===================================================================================="

printf "\n"
echo " No Of Recieved ARGS: $# "
echo " Executing $0 :  "
echo "                ARG 1 :==  $1 "
echo "                ARG 2 :==  $2 "

echo " $0 : To Update the CopyRight For RN "

fType=$2
fName=$1

###########################################################################################
##
##  Update different kinds of  copy right strings for Shell and Python scripting languages
##
###########################################################################################
re='^[0-9]+$'
RN_Cp="# Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd"
RN_Cp1="# *  Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd"

#######################################################################################
##
##  Update different kinds of  copy right strings for  jave and C programming languages
##
########################################################################################
RN_Cp_str="* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved"
RN_Cp_line="* =================================================================================="

function findAndUpdateCpRightString()
{
   insr=""
   fileName=$1
   lineN=$(awk '/# Copyright \(C\)/ { print NR, $0 }' $fileName)
   echo " MATCHING LINE-COND1 (C):: ====> $lineN "
   if [[ ! -z $lineN ]];then
       fLine=${lineN:0:1}
       if  [[ $fLine -eq  $fLine ]] ; then
         echo " Line Number COND-1:[$fLine] "
	 sed -i  "${fLine}i ${RN_Cp}"  "${fileName}"
	 insr="yes"
       fi
   else
      unset lineN
      unset fLine
      lineN=$(awk '/# Copyright / { print NR, $0 }' $fileName)
      echo " MATCHING LINE-COND2 :: ====> $lineN "
      if [[ ! -z $lineN ]];then
          fLine=${lineN:0:1}
          if  [[ $fLine -eq  $fLine ]] ; then
            echo " Line Number COND-2:[$fLine] "
	    sed -i  "${fLine}i ${RN_Cp}"  "${fileName}"
	    insr="yes"
          fi
      fi
     
   fi
   unset lineN
   if [[ -z ${insr} ]];then
        echo " Find Different Matching String In This File: $fileName"
        lineN=$(awk '/# *  Copyright \(C\)/ { print NR, $0 }' $fileName)
        echo " MATCHING LINE COND-3 *: ====> $lineN "
        if [[ ! -z $lineN ]];then
          fLine=${lineN:0:1}
          if  [[ $fLine -eq  $fLine ]] ; then
            echo " Line Number COND-3:[$fLine] "
	    sed -i  "${fLine}i ${RN_Cp1}"  "${fileName}"
	    insr="yes"
          fi
        fi
   fi

}

function findAndUpdateCpRightString_lang()
{

   insr=""
   fileName=$1
   lineN=$(awk '/* Copyright \(C\)/ { print NR, $0 }' $fileName)
   echo " MATCHING LINE-COND1 (C):: ====> $lineN "
   if [[ ! -z $lineN ]];then
       fLine=${lineN:0:1}
       if  [[ $fLine -eq  $fLine ]] ; then
         echo " Line Number COND-1:[$fLine] "
	 sed -i  "${fLine}i ${RN_Cp_line}"  "${fileName}"
	 sed -i  "${fLine}i ${RN_Cp_str}"   "${fileName}"
	 insr="yes"
       fi
   else
      unset lineN
      unset fLine
      lineN=$(awk '/* Copyright / { print NR, $0 }' $fileName)
      echo " MATCHING LINE-COND2 :: ====> $lineN "
      if [[ ! -z $lineN ]];then
          fLine=${lineN:0:1}
          if  [[ $fLine -eq  $fLine ]] ; then
            echo " Line Number COND-2:[$fLine] "
	    sed -i  "${fLine}i ${RN_Cp_line}"  "${fileName}"
	    sed -i  "${fLine}i ${RN_Cp_str}"   "${fileName}"
	    insr="yes"
          fi
      fi
     
   fi

}

case $fType in

	1)
            echo " Update RN CopyRight In Shell "
	    findAndUpdateCpRightString $fName
	    ;;
	2)
            echo " Update RN CopyRight In Python "
	    findAndUpdateCpRightString $fName
	    ;;
	3)
            echo " Update RN CopyRight In Java "
	    findAndUpdateCpRightString_lang $fName
	    ;;
	4)
            echo " Update RN CopyRight In YML "
	    findAndUpdateCpRightString $fName
	    ;;
	5)
            echo " Update RN CopyRight In TS Files "
	    findAndUpdateCpRightString_lang $fName
	    ;;
        6)
            echo " Update RN CopyRight In CPP "
	    findAndUpdateCpRightString_lang $fName
	    ;;
	*)
	    echo " Unknown Option $fType "
	    ;;

        esac
	    








