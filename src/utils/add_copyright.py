######################################################################################################
#                                                                                                    #
#   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd] . All rights  reserved              #
#                                                                                                    #
######################################################################################################
# -*- coding: utf-8 -*-

import os
import sys
import shutil
import subprocess

newFilecopyright_text = (f"\n"
"######################################################################################################\n"
"#                                                                                                    #\n"
"#   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd] . All rights  reserved              #\n"
"#                                                                                                    #\n"
"######################################################################################################\n"
"\n")    

sourceFilecopyright_text =(f"\n" 
" /***\n"
"  * ################################################################################################\n"
"  * #                                                                                              #\n"
"  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #\n"
"  * #                                                                                              #\n"
"  * ################################################################################################\n"
" ****/"
"\n")

def add_copyright_header(folder_path, copyright_text):
    for root, dirs, files in os.walk(folder_path):
        for file_name in files:
            if file_name.endswith(".js"):
                file_path = os.path.join(root, file_name)
                with open(file_path, 'r+') as f:
                    content = f.read()
                    f.seek(0, 0)
                    f.write("/*\n" + copyright_text + "\n*/\n" + content)

            elif file_name.endswith((".py", ".java", ".cpp", ".sh")):
                file_path = os.path.join(root, file_name)
                with open(file_path, 'r+') as f:
                    content = f.read()
                    f.seek(0, 0)
                    if file_name.endswith(".py") or file_name.endswith(".sh"):
                        f.write("# " + copyright_text.replace("\n", "\n# ") + "\n" + content)
                    elif file_name.endswith(".java"):
                        f.write("/*\n" + copyright_text + "\n*/\n" + content)
                    else:  # Assuming .cpp files
                        f.write("/*\n" + copyright_text.replace("\n", "\n * ") + "\n */\n" + content)


def  shell_line_pre_adder(filename, line_to_prepend):
    print(f" Updating the Shell file {filename} : with RN CopyRight ")
    with open(filename, 'r') as fold:
        os.unlink(filename)
        with open(filename, 'w') as fnew:
            fnew.write(str(line_to_prepend) + "\n")
            shutil.copyfileobj(fold, fnew)


def  src_line_pre_adder(filename, line_to_prepend):
     print(f" Updating the Source file {filename} : with RN CopyRight ")
     with open(filename, 'r') as fold:
        os.unlink(filename)
        with open(filename, 'w') as fnew:
            fnew.write(str(line_to_prepend) + "\n")
            shutil.copyfileobj(fold, fnew)


def  rn_append_cp_rt(file_path):
    print(f"###### Appening the RN Copy Right Details into File: {file_path} " )
    ftype = 0
    if file_path.endswith((".sh")):
        ftype = 1
    elif file_path.endswith((".py")):
        ftype = 2
    elif file_path.endswith((".java")):
        ftype = 3
    elif file_path.endswith((".yml")):
        ftype = 4
    elif file_path.endswith((".ts",".tsx")):
        ftype = 5
    elif file_path.endswith((".cpp",".c",".h",".hpp",".js")):
        ftype = 6
    print(f" Invoke the shell script for :updating Copy Right String in File: {file_path} and FileType: {ftype}  ") 
    try:
       shout =  subprocess.check_output(["./updateRNTxt.sh" , file_path,str(ftype)]) 
       #shout =  subprocess.run(["./updateRNTxt.sh" , file_path,str(ftype)],shell=True,text=True) 
    except subprocess.CalledProcessError as e:
        shout = e.output.decode()
    except Exception as e:
        shout = str(e)

    print (f": {shout} ")
    print(" ")
         


def list_files_recursive(fileType,newF):
    path=newF
    for entry in os.listdir(path):
        file_path = os.path.join(path, entry)
        if os.path.isdir(file_path):
            list_files_recursive(fileType,file_path)
        else:
            if file_path.endswith((".py", ".java", ".cpp", ".sh", ".yml",".c",".ts",".tsx",".h",".js")):
                print(f" FILE TYPE { fileType } : FILENAME: {file_path}" ) 
                if fileType == "curr":
                   print( " Initiate the Shell script to Update Copy right string ")
                   rn_append_cp_rt(file_path)
                else:
                   print(f"  Add The Copy right string in File: {file_path} ")
                   if newF.endswith((".py",".sh",".yml")):
                      print(" Add the RN CopyRight String @ Beginning of File ")
                      shell_line_pre_adder(newF , newFilecopyright_text) 
                   elif newF.endswith((".java",".cpp",".c",".h",".js")):
                      print(" Add the RN CopyRight String @ Begenning of File {newF} ")
                      src_line_pre_adder(newF , sourceFilecopyright_text) 
                   else:
                       print(f" ****  ERROR:UnSupported File Extension: {file_path} :: {newF} ***")

                


def updateNewFileList(newFiles):
    print(" ======================================================================================= ")
    print( " Updation In Progress for New File List .... {newFiles} ")
    print(" ======================================================================================= ")
    newList = newFiles.split('\n')
    for newF in newList:
        if os.path.isfile(newF):
            if newF:
               print(f" FILE: {newF} ")
               if newF.endswith((".py", ".java", ".cpp", ".sh",".c",".ts",".yml",".tsx",".js")):
                     print(f"VALID FILES  ==== {newF}")
                     print(" ")
                     if newF.endswith((".py",".sh",".yml")):
                         print(" Add the RN CopyRight String @ Begenning of File ")
                         shell_line_pre_adder(newF , newFilecopyright_text) 
                     elif newF.endswith((".cpp",".java",".ts",".c",".tsx",".js")):
                         print(" Add the RN CopyRight String @ Begenning of File ")
                         src_line_pre_adder(newF , sourceFilecopyright_text) 
               else:
                     if  newF:
                         print(f" DIR: {newF} ")
                         list_files_recursive("new",newF)
                         print(" ")



def updateCurFileList(curFiles):
    print(" ======================================================================================= ")
    print( " Updation In Progress for  Modified File List .... ")
    print(" ======================================================================================= ")
    curList = curFiles.split('\n')
    for curF in curList:
        if os.path.isfile(curF):
            if curF:
               print(f" FILE: {curF} ")
               if curF.endswith((".py", ".java", ".cpp", ".sh",".c",".yml",".ts",".tsx",".h")):
                     print(f"VALID FILES  ==== {curF}")
                     print(" ")
                     if curF.endswith((".py",".sh",".yml")):
                         print(" Append the RN CopyRight String @  ")
                         rn_append_cp_rt(curF)
                     elif curF.endswith((".java",".cpp",".c",".ts","tsx",".h")): 
                         print(" Append The RN CopyRight String @ ")
                         rn_append_cp_rt(curF)
        elif os.path.isdir(curF):
               if curF:
                   print(f" DIR: {curF} ")
                   list_files_recursive("curr",curF)
                   print(" ")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print( "-------------------------------------------------------------------")
        print(f"Usage:=====  python {sys.argv[0]}  <NewFileList> <CurrFileList>")
        print( "-------------------------------------------------------------------")
        print(f" NEW FILE: COPY RIGHT STRING : ")
        print(f" {newFilecopyright_text} ")
        print("")
        print("")
        print(f" MODIFIED FILE COPY RIGHT  STRING : ")
        print(f" {curFilecopyright_text} ")
        sys.exit(1)

    FileList1 = sys.argv[1]
    FileList2 = sys.argv[2]

    if not os.path.isfile(FileList1):
        print(f"Error: Cannot Find New Files List: {FileList1}")
        sys.exit(1)

    if not os.path.isfile(FileList2):
        print(f"Error: Cannot Find Current Modified File List:: {FileList2}")
        sys.exit(1)

    if "new" in FileList1:
        newFileList = FileList1
        curFileList = FileList2
    elif "new" in FileList2:
        newFileList = FileList2
        curFileList = FileList1
    else:
        printf(f" {FileList1} or {FileList2} : File Name should containe string : new ")
        sys.exit(1)

    print(f" NEW FILE LIST: {newFileList} : Will be added with  RN Copy right string ")
    print(f" CURR FILE LIST: {curFileList} : Will be Appended with  RN Copy right string ")

    newFile = open(newFileList, 'r')
    newFileCon = newFile.read()

    curFile = open(curFileList, 'r')
    modFileCon = curFile.read()

    print(" read: NewCreatedList and Modified File List ")
    updateNewFileList(newFileCon)
    updateCurFileList(modFileCon)




