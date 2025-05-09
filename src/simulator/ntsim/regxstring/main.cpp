/*************************************************************************
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
***************************************************************************/

#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <cctype>

#include "regxstring.h"

using namespace std;

bool debug;
const char * filename;

static std::string Trim(std::string str){
    size_t i = 0,e = str.length();
    for(;i < e && std::isspace(str[i]);++i);
    size_t j = e;
    for(;j > i && std::isspace(str[j - 1]);--j);
    return (i < j ? str.substr(i,j - i) : "");
}

static bool ExtractArg(const char * argstr,const char * pattern,const char *& result)
{
    if(!argstr || !pattern)
        return false;
    for(;*pattern;++pattern,++argstr)
        if(*pattern != *argstr)
            return false;
    result = *argstr ? argstr : 0;
    return true;
}

static const char * ProgramName(const char * argstr)
{
    const char * ret = argstr;
    for(const char * cur = argstr;cur && *cur;++cur)
        if(*cur == '/')
            ret = cur + 1;
    return ret;
}

static std::string pre_handle(const std::string & str)
{
    std::string ret = Trim(str);
    if(!ret.empty()){
        if(ret[0] != '^')
            ret.insert(ret.begin(),'^');
        if(ret[ret.size() - 1] != '$')
            ret.push_back('$');
    }
    return ret;
}

#ifdef TEST
#   include "test.h"
#endif

static void printUsage(const char * exe)
{
    cout<<"Usage: "<<exe<<" [N] [-t] [-d] [-f=FILE] [-h|?|--help]\n"
        <<"  N          generate N random strings, default 1\n"
#ifdef TEST
        <<"  -t         batch test\n"
#endif
        <<"  -d         output debug info\n"
        <<"  -f         use FILE as input\n"
        <<"  -h\n"
        <<"  ?\n"
        <<"  --help     print this message\n"
        <<endl;
}

static void use(int c)
{
    CRegxString regxstr;
    std::string regx;
    std::istream * in = &cin;
    if(filename){
        std::ifstream * file = new std::ifstream(filename);
        if(!file->is_open()){
            delete file;
            cerr<<"cannot open file "<<filename<<endl;
            return;
        }
        in = file;
    }
    while(std::getline(*in,regx)){
        regxstr.ParseRegx(pre_handle(regx).c_str());
        if(debug)
            regxstr.Debug(cout);
        for(int i = 0;i < c;++i)
            cout<<regxstr.RandString()<<endl;
        cout<<endl;
    }
    if(filename)
        delete in;
}

int main(int argc,const char ** argv)
{
    int c = 1;
    bool test = false;
    for(int i = 1;i < argc;++i){
        const char * ret = 0;
        if((ExtractArg(argv[i],"-h",ret) ||
            ExtractArg(argv[i],"?",ret) ||
            ExtractArg(argv[i],"--help",ret)) && !ret)
        {
            printUsage(ProgramName(argv[0]));
            return 1;
        }else if((ExtractArg(argv[i],"-t",ret) || ExtractArg(argv[i],"-test",ret)) && !ret){
            test = true;
        }else if((ExtractArg(argv[i],"-d",ret) || ExtractArg(argv[i],"-debug",ret)) && !ret){
            debug = true;
        }else if(ExtractArg(argv[i],"-f=",ret) && ret){
            filename = ret;
        }else
            if((c = atoi(argv[i])) <= 0){
                printUsage(ProgramName(argv[0]));
                return 1;
            }
    }
#ifdef TEST
    if(test)
        test_pcre(c);
    else
#endif
        use(c);
    //test_01();
#if _MEM_LEAK
    cerr<<"__NodeBase::ref = "<<__NodeBase::ref<<endl;
#endif
    return 0;
}
